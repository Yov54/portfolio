export const scooterCodeSnippets = {
  transmitter: {
    title: "ESP32 Transmitter (C++)",
    language: "cpp",
    description: "Firmware untuk ESP32 Transmitter yang dipasang pada skuter listrik. Membaca koordinat dari GPS NEO-6M, memproses kecepatan, mendeteksi penekanan tombol SOS menggunakan interrupt hardware, dan memaketkan data untuk dikirim melalui LoRa SX1278.",
    code: `#include <SPI.h>
#include <LoRa.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>

// Pinout konfigurasi LoRa SX1278
#define SS      18
#define RST     14
#define DIO0    26
#define BAND    915E6 // Frekuensi LoRa (disesuaikan dengan wilayah)

TinyGPSPlus gps;
HardwareSerial gpsSerial(2); // GPS terhubung pada UART2

const float SPEED_LIMIT = 25.0; // Limit kecepatan dalam km/jam
const int SOS_BUTTON_PIN = 4;
volatile bool sosPressed = false;

// Hardware ISR (Interrupt Service Routine) untuk tombol darurat SOS
void IRAM_ATTR handleSOS() {
  sosPressed = true;
}

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600, SERIAL_8N1, 16, 17); // Rx=PIN 16, Tx=PIN 17
  
  pinMode(SOS_BUTTON_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(SOS_BUTTON_PIN), handleSOS, FALLING);
  
  LoRa.setPins(SS, RST, DIO0);
  if (!LoRa.begin(BAND)) {
    Serial.println("Memulai LoRa gagal!");
    while (1);
  }
  Serial.println("ESP32 LoRa Transmitter berhasil diinisialisasi.");
}

void loop() {
  // Membaca stream data NMEA dari modul GPS
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }

  // Kirim data jika modul GPS memperbarui lokasi
  if (gps.location.isUpdated()) {
    float latitude = gps.location.lat();
    float longitude = gps.location.lng();
    float speed = gps.speed.kmh();
    
    // Validasi batas kecepatan
    bool overspeed = (speed > SPEED_LIMIT);
    
    // Enkapsulasi data menjadi format paket CSV: "LAT,LNG,SPEED,OVERSPEED,SOS"
    String packet = String(latitude, 6) + "," +
                   String(longitude, 6) + "," +
                   String(speed, 2) + "," +
                   (overspeed ? "1" : "0") + "," +
                   (sosPressed ? "1" : "0");
                   
    // Mengirimkan paket melalui sinyal RF LoRa
    LoRa.beginPacket();
    LoRa.print(packet);
    LoRa.endPacket();
    
    Serial.println("Paket Terkirim: " + packet);
    
    // Reset status interupsi SOS setelah berhasil terkirim
    if (sosPressed) {
      sosPressed = false;
    }
  }
  delay(1000); // Sampling data berkala setiap 1 detik
}`
  },
  receiver: {
    title: "ESP32 Receiver (C++)",
    language: "cpp",
    description: "Firmware untuk ESP32 Receiver sebagai gateway penerima sinyal LoRa di sisi operator. Menerima paket data enkapsulasi dari skuter, menghubungkan perangkat ke jaringan Wi-Fi lokal, lalu mempublikasikan payload mentah ke MQTT broker.",
    code: `#include <SPI.h>
#include <LoRa.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Pinout konfigurasi LoRa SX1278
#define SS      18
#define RST     14
#define DIO0    26
#define BAND    915E6

const char* ssid = "WIFI_AP_SSID";
const char* password = "WIFI_PASSWORD";
const char* mqtt_server = "broker.hivemq.com";
const char* mqtt_topic = "scooter/monitoring/data";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  setup_wifi();
  
  client.setServer(mqtt_server, 1883);
  
  LoRa.setPins(SS, RST, DIO0);
  if (!LoRa.begin(BAND)) {
    Serial.println("Memulai LoRa gagal!");
    while (1);
  }
  Serial.println("ESP32 LoRa Receiver (Gateway) Terinisialisasi.");
}

void setup_wifi() {
  delay(10);
  Serial.print("Menghubungkan ke ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi terhubung.");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Mencoba koneksi MQTT...");
    if (client.connect("ESP32_Scooter_Receiver_Gateway")) {
      Serial.println("terhubung ke broker MQTT");
    } else {
      Serial.print("gagal, status=");
      Serial.print(client.state());
      Serial.println(" mencoba kembali dalam 5 detik...");
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Parsing jika ada paket LoRa RF yang masuk
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String payload = "";
    while (LoRa.available()) {
      payload += (char)LoRa.read();
    }
    Serial.println("Menerima paket LoRa: " + payload);
    
    // Publikasikan payload ke MQTT Broker secara langsung
    if (client.publish(mqtt_topic, payload.c_str())) {
      Serial.println("Data berhasil diteruskan ke MQTT topic");
    } else {
      Serial.println("Gagal mempublikasikan data ke MQTT");
    }
  }
}`
  },
  dashboard: {
    title: "Web Dashboard (JS - MQTT)",
    language: "javascript",
    description: "Kode sisi klien pada Dashboard Web Pemantauan. Menghubungkan browser ke broker MQTT menggunakan protokol WebSockets, menerima pembaruan koordinat real-time, lalu memperbarui posisi penanda (marker) skuter di atas peta interaktif Leaflet.js.",
    code: `import mqtt from 'mqtt';
import L from 'leaflet';

// Inisialisasi peta Leaflet berpusat di Universitas Udayana, Bali
const map = L.map('map-container').setView([-8.673, 115.216], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Kustomisasi marker skuter listrik
const scooterIcon = L.icon({
  iconUrl: '/images/scooter-icon.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

let scooterMarker = L.marker([-8.673, 115.216], { icon: scooterIcon }).addTo(map);
scooterMarker.bindPopup("<b>Skuter #01</b><br>Menghubungkan ke GPS...").openPopup();

// Menghubungkan ke HiveMQ MQTT Broker via WebSockets port 8000
const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

client.on('connect', () => {
  console.log('Koneksi broker MQTT via WebSocket berhasil!');
  client.subscribe('scooter/monitoring/data');
});

client.on('message', (topic, message) => {
  const payload = message.toString(); // Format string payload: "lat,lng,speed,overspeed,sos"
  const [latStr, lngStr, speedStr, overspeedStr, sosStr] = payload.split(',');
  
  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);
  const speed = parseFloat(speedStr);
  const isOverspeed = overspeedStr === '1';
  const isSos = sosStr === '1';

  // Memindahkan penanda skuter ke koordinat baru secara dinamis
  const newLatLng = new L.LatLng(lat, lng);
  scooterMarker.setLatLng(newLatLng);
  map.panTo(newLatLng);

  // Kustomisasi teks popup sesuai status telemetri terkini
  let popupContent = \`
    <div class="scooter-popup text-slate-800">
      <h4 class="font-bold text-sm">Skuter Rental #01</h4>
      <p class="text-xs mt-1">Kecepatan: 
        <span class="font-semibold \\\${isOverspeed ? 'text-red-600 font-bold' : 'text-slate-600'}"\>
          \\\${speed} km/jam
        </span>
      </p>
      <p class="text-xs">Status: 
        \\\${isSos ? '<span class="text-red-500 font-bold animate-pulse">⚠️ SOS AKTIF</span>' : '<span class="text-green-600">Normal</span>'}
      </p>
    </div>
  \`;
  scooterMarker.getPopup().setContent(popupContent);

  // Memicu notifikasi sistem jika tombol SOS ditekan pengendara
  if (isSos) {
    triggerAlertBanner(lat, lng);
  }
});

function triggerAlertBanner(lat, lng) {
  const notificationArea = document.getElementById('alert-toast-container');
  notificationArea.innerHTML = \`
    <div class="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-xl flex justify-between items-center animate-pulse">
      <div class="flex items-center gap-2">
        <span class="text-xl">🚨</span>
        <div>
          <h5 class="font-bold text-sm">ALARM SOS AKTIF!</h5>
          <p class="text-xs">Pengendara membutuhkan bantuan di koordinat: \\\${lat}, \\\${lng}</p>
        </div>
      </div>
      <button class="bg-red-600 text-white text-xs px-3 py-1 rounded" onclick="this.parentElement.remove()">Tutup</button>
    </div>
  \`;
}
`
  }
};
