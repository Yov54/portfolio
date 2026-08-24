import { FiCpu, FiLayers, FiMonitor, FiServer } from 'react-icons/fi';
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTensorflow,
  SiArduino,
  SiUnity,
  SiTypescript,
  SiPostgresql,
} from 'react-icons/si';
import { PiGameControllerFill, PiRobotFill } from 'react-icons/pi';
import { motion } from 'framer-motion';

const skillDomains = [
  { label: 'Fullstack', icon: <FiLayers className="text-xl" /> },
  { label: 'Backend', icon: <FiServer className="text-xl" /> },
  { label: 'Frontend', icon: <FiMonitor className="text-xl" /> },
  { label: 'Machine Learning', icon: <FiCpu className="text-xl" /> },
  { label: 'Robotics', icon: <PiRobotFill className="text-xl" /> },
  { label: 'Game Dev', icon: <PiGameControllerFill className="text-xl" /> },
];

const techStack = [
  { label: 'React', icon: <SiReact /> },
  { label: 'Node.js', icon: <SiNodedotjs /> },
  { label: 'Python', icon: <SiPython /> },
  { label: 'TensorFlow', icon: <SiTensorflow /> },
  { label: 'Arduino', icon: <SiArduino /> },
  { label: 'Unity', icon: <SiUnity /> },
  { label: 'TypeScript', icon: <SiTypescript /> },
  { label: 'PostgreSQL', icon: <SiPostgresql /> },
];

const About = () => {
  return (
    <motion.section 
      id="about" 
      className="py-20 px-4 lg:px-20 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 right-0 section-retro-line"></div>
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 pt-10">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-pink text-black retro-border shadow-[2px_2px_0px_0px_rgba(var(--color-shadow))] font-retro text-xl uppercase tracking-wider mb-6">
          <i className="bx bx-user" aria-hidden="true"></i>
          <span>CHARACTER SELECT</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-retro font-bold tracking-widest text-text-primary">
          About <span className="text-pastel-lavender dark:text-accent drop-shadow-[2px_2px_0_rgba(var(--color-shadow))]">Me</span>
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 max-w-6xl mx-auto">
        {/* LEFT — Portrait Frame */}
        <motion.div 
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-[300px] h-[350px] retro-card bg-pastel-blue flex flex-col items-center justify-center p-4">
            {/* Inner surface */}
            <div className="w-full h-full retro-border bg-surface flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              
              {/* Initial */}
              <motion.span 
                className="text-9xl font-retro font-bold text-text-primary select-none relative z-10"
                whileHover={{ scale: 1.15, rotate: [-2, 2, -1, 0] }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                Y
              </motion.span>
              
              <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                <span className="bg-black text-white font-retro px-2 py-1 text-sm tracking-widest uppercase retro-border">LVL 99</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Bio + Skills */}
        <motion.div 
          className="flex-1 max-w-2xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Bio paragraphs */}
          <div className="space-y-4 mb-10 retro-card bg-surface p-6 text-text-secondary leading-relaxed tracking-wide shadow-[4px_4px_0px_0px_rgba(var(--color-shadow))]">
            <p>
              I&apos;m an Electrical Engineering graduate who combines software development, machine learning, and technology education to build meaningful digital solutions. My background spans frontend and backend development, AI-powered applications, and IoT systems.
            </p>
            <p>
              Over the years, I&apos;ve worked on production web applications, mentored learners in machine learning and programming, and developed projects around embedded systems and long-range communication. I&apos;m especially interested in creating technology that is both practical and impactful.
            </p>
          </div>

          {/* Skill Domain Chips */}
          <div className="mb-10">
            <h3 className="text-lg font-retro uppercase tracking-widest text-text-primary mb-4 flex items-center gap-2">
              <span className="text-pastel-pink">♥</span> SKILLS
            </h3>
            <div className="flex flex-wrap gap-4">
              {skillDomains.map((skill) => (
                <div
                  key={skill.label}
                  className="flex items-center gap-2 px-3 py-1.5 bg-pastel-sage text-[rgb(34,48,65)] retro-border shadow-[2px_2px_0_rgba(var(--color-shadow))] font-retro text-lg hover:-translate-y-1 hover:bg-pastel-lime transition-all duration-200 select-none"
                >
                  {skill.icon}
                  {skill.label}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div>
            <h3 className="text-lg font-retro uppercase tracking-widest text-text-primary mb-4 flex items-center gap-2">
              <span className="text-pastel-blue">✦</span> INVENTORY
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.label}
                  className="group flex flex-col items-center gap-2 p-3 retro-card bg-surface hover:bg-pastel-cream hover:text-[rgb(34,48,65)] transition-colors hover:-translate-y-1 cursor-default"
                >
                  <span className="text-3xl text-text-primary transition-transform group-hover:scale-110 group-hover:text-[rgb(34,48,65)]">
                    {tech.icon}
                  </span>
                  <span className="text-sm font-retro tracking-widest text-text-secondary group-hover:text-[rgb(34,48,65)] uppercase mt-1">
                    {tech.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
