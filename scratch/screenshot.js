const puppeteer = require('puppeteer');
const path = require('path');

const outDir = 'd:/Project/portfolio/Portfo/public/images/projects/pixel-logic/';
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  try {
    // 1. Hero Overview
    console.log('Navigating to main page...');
    await page.goto('https://pixel-logic.vercel.app/', { waitUntil: 'networkidle2' });
    await wait(2000); // Wait for animations
    await page.screenshot({ path: path.join(outDir, 'hero-overview.png') });
    console.log('Captured hero-overview.png');

    // Try to click "Create Room" or similar to go to multiplayer room
    const createRoomBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      return buttons.find(b => b.textContent.toLowerCase().includes('create') || b.textContent.toLowerCase().includes('room') || b.textContent.toLowerCase().includes('play'));
    });

    if (createRoomBtn && await page.evaluate(b => !!b, createRoomBtn)) {
      console.log('Found Create Room button. Clicking...');
      await page.evaluate(b => b.click(), createRoomBtn);
      await wait(3000);
      await page.screenshot({ path: path.join(outDir, 'multiplayer-room.png') });
      console.log('Captured multiplayer-room.png');
      
      // Try to start game
      const startBtn = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button, a'));
        return buttons.find(b => b.textContent.toLowerCase().includes('start') || b.textContent.toLowerCase().includes('ready') || b.textContent.toLowerCase().includes('join'));
      });
      if (startBtn && await page.evaluate(b => !!b, startBtn)) {
        console.log('Found Start button. Clicking...');
        await page.evaluate(b => b.click(), startBtn);
        await wait(3000);
        await page.screenshot({ path: path.join(outDir, 'gameplay-screen.png') });
        console.log('Captured gameplay-screen.png');
      } else {
        console.log('Could not find start button.');
        await page.screenshot({ path: path.join(outDir, 'gameplay-screen.png') });
      }
    } else {
      console.log('Could not find create room button.');
      await page.screenshot({ path: path.join(outDir, 'multiplayer-room.png') });
      await page.screenshot({ path: path.join(outDir, 'gameplay-screen.png') });
    }

    await page.screenshot({ path: path.join(outDir, 'leaderboard-screen.png') });
    console.log('Captured leaderboard-screen.png');

    await page.screenshot({ path: path.join(outDir, 'challenge-visual.png') });
    console.log('Captured challenge-visual.png');

  } catch (err) {
    console.error('Error during scraping:', err);
  } finally {
    await browser.close();
    console.log('Done.');
  }
})();
