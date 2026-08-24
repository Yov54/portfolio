import 'boxicons/css/boxicons.min.css';
import { motion } from 'framer-motion';

const educationItems = [
  {
    title: 'Electrical Engineering',
    institution: 'Udayana University',
    period: 'Sep 2020 — Aug 2024',
    detail: 'Graduated with Cum Laude distinction and a GPA of 3.95/4.00.',
    extra: 'Thesis: IoT-based location and safety monitoring system for rental electric scooter users using LoRaWAN.',
  },
];

const developmentItems = [
  {
    title: 'Bangkit Academy 2023',
    type: 'Machine Learning Cohort',
    period: 'Feb 2023 — Jun 2023',
    detail: 'Completed intensive training in machine learning, deep learning, TensorFlow, and Google Cloud.',
  },
  {
    title: 'Digital Talent Scholarship',
    type: 'Fresh Graduate Academy (IT Support)',
    period: 'Apr 2024 — Jul 2024',
    detail: 'Strengthened fundamentals in IT support, networking, system administration, and troubleshooting.',
  },
  {
    title: 'LoRa Communication Training',
    type: 'Edutech Solution',
    period: 'Sep 2023 — Oct 2023',
    detail: 'Completed practical training on LoRa and LoRaWAN for long-range, low-power IoT applications.',
  },
];

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 lg:px-20 relative">
      <div className="absolute top-0 left-0 right-0 section-retro-line"></div>
      
      <div className="max-w-6xl mx-auto pt-10">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-yellow text-black retro-border shadow-[2px_2px_0px_0px_rgba(var(--color-shadow))] font-retro text-xl uppercase tracking-wider mb-6">
            <i className="bx bx-book-open" aria-hidden="true"></i>
            <span>TUTORIAL LEVEL</span>
          </div>
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-retro font-bold text-center mt-4 mb-16 tracking-widest text-text-primary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Education <span className="text-pastel-blue dark:text-accent drop-shadow-[2px_2px_0_rgba(var(--color-shadow))]">&amp; Growth</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="retro-card bg-surface hover:bg-pastel-cream group transition-colors"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-retro tracking-widest uppercase mb-6 text-text-primary flex items-center gap-2">
              <span className="text-pastel-pink text-3xl">✦</span>
              Academic Background
            </h3>
            <div className="space-y-6">
              {educationItems.map((item) => (
                <div key={item.title} className="border-l-4 border-dotted border-pastel-lavender pl-4">
                  <p className="text-pastel-pink dark:text-accent font-retro text-xl tracking-wide uppercase">{item.title}</p>
                  <p className="text-text-primary font-bold mt-1 group-hover:text-black">{item.institution}</p>
                  <p className="text-sm font-retro tracking-widest text-text-secondary group-hover:text-gray-800 mt-1 uppercase">{item.period}</p>
                  <p className="text-sm text-text-secondary group-hover:text-gray-800 mt-2 leading-relaxed">{item.detail}</p>
                  <p className="text-sm text-text-secondary group-hover:text-gray-800 mt-2 leading-relaxed italic">{item.extra}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="retro-card bg-surface hover:bg-pastel-cream group transition-colors"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-retro tracking-widest uppercase mb-6 text-text-primary flex items-center gap-2">
              <span className="text-pastel-lime text-3xl">✦</span>
              Professional Dev
            </h3>
            <div className="space-y-6">
              {developmentItems.map((item) => (
                <div key={item.title} className="border-l-4 border-dotted border-pastel-sage pl-4">
                  <p className="text-pastel-lime dark:text-accent font-retro text-xl tracking-wide uppercase">{item.title}</p>
                  <p className="text-text-primary font-bold mt-1 group-hover:text-black">{item.type}</p>
                  <p className="text-sm font-retro tracking-widest text-text-secondary group-hover:text-gray-800 mt-1 uppercase">{item.period}</p>
                  <p className="text-sm text-text-secondary group-hover:text-gray-800 mt-2 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
