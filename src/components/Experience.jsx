import { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import { motion } from 'framer-motion';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/experiences.json`)
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load experiences:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="experience" className="py-20 px-4 lg:px-20 relative">
      <div className="absolute top-0 left-0 right-0 section-retro-line"></div>
      
      <div className="max-w-6xl mx-auto pt-10">
        {/* Section Badge */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-blue text-black retro-border shadow-[2px_2px_0px_0px_rgba(var(--color-shadow))] font-retro text-xl uppercase tracking-wider mb-6">
            <i className="bx bx-briefcase" aria-hidden="true"></i>
            <span>SAVE FILES</span>
          </div>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-retro font-bold text-center mt-4 mb-16 tracking-widest text-text-primary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          My <span className="text-pastel-sage dark:text-accent drop-shadow-[2px_2px_0_rgba(var(--color-shadow))]">Experience</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[4px] border-l-4 border-dotted border-border opacity-50"
          />

          {/* Experience Entries */}
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="text-2xl font-retro text-pastel-blue animate-pixel-bounce uppercase tracking-widest">Loading...</div>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {experiences.map((exp, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col lg:flex-row items-start lg:items-center ${
                      isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-2 lg:left-1/2 -translate-x-[2px] lg:-translate-x-1/2 top-6 lg:top-1/2 lg:-translate-y-1/2 z-10">
                      <div className="w-6 h-6 retro-border bg-pastel-yellow shadow-[2px_2px_0_rgba(var(--color-shadow))]" />
                    </div>

                    {/* Card */}
                    <motion.div
                      className={`ml-12 lg:ml-0 lg:w-[calc(50%-3rem)] ${
                        isLeft ? 'lg:pr-0 lg:mr-auto' : 'lg:pl-0 lg:ml-auto'
                      }`}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="retro-card bg-surface hover:bg-pastel-cream group">
                        {/* Card Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 pb-4 border-b-2 border-border/10 group-hover:border-[rgb(34,48,65)]/10">
                          <div className="w-12 h-12 retro-border bg-surface-light flex items-center justify-center text-text-primary text-2xl shrink-0 group-hover:bg-[rgb(255,255,255)] group-hover:text-[rgb(34,48,65)] transition-colors duration-300">
                            <i className={exp.icon}></i>
                          </div>
                          <div>
                            <h3 className="text-2xl font-retro font-bold text-text-primary group-hover:text-[rgb(34,48,65)] tracking-wide">
                              {exp.role}
                            </h3>
                            <p className="text-pastel-pink dark:text-accent font-retro text-lg tracking-widest uppercase group-hover:text-[rgb(180,80,100)]">{exp.company}</p>
                          </div>
                        </div>

                        {/* Date */}
                        <p className="text-sm font-retro tracking-widest uppercase text-text-secondary group-hover:text-[rgb(60,72,85)] mb-4 flex items-center gap-2">
                          <i className="bx bx-time"></i>
                          {exp.date}
                        </p>

                        {/* Description Bullets */}
                        <ul className="space-y-3">
                          {exp.description.map((bullet, i) => (
                            <li
                              key={i}
                              className="text-text-secondary group-hover:text-[rgb(60,72,85)] text-sm leading-relaxed flex items-start gap-3"
                            >
                              <span className="text-pastel-blue text-xs mt-1">▶</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
