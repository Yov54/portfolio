import { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import ProjectModal from './ui/ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const categories = [
  'All',
  'Frontend',
  'Backend',
  'ML',
  'Robotics',
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // wait for fade out
  };

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/projects.json`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load projects:', err);
        setLoading(false);
      });
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleKeyDown = (e, project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(project);
    }
  };

  // Helper for retro colors
  const retroColors = ['bg-pastel-lavender', 'bg-pastel-lime', 'bg-pastel-pink', 'bg-pastel-blue', 'bg-pastel-yellow'];

  return (
    <section id="projects" className="py-20 px-4 lg:px-20 relative">
      <div className="absolute top-0 left-0 right-0 section-retro-line"></div>
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 pt-10"
      >
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-lime text-black retro-border shadow-[2px_2px_0px_0px_rgba(var(--color-shadow))] font-retro text-xl uppercase tracking-wider mb-6">
          <i className="bx bx-briefcase" aria-hidden="true"></i>
          <span>LEVEL SELECT</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-retro font-bold tracking-widest text-text-primary">
          Featured <span className="text-pastel-pink drop-shadow-[2px_2px_0_rgba(var(--color-shadow))]">Projects</span>
        </h2>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide justify-start lg:justify-center px-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            aria-pressed={activeFilter === cat}
            className={`whitespace-nowrap px-4 py-1.5 font-retro text-xl uppercase tracking-wider transition-all duration-200 flex-shrink-0 cursor-pointer retro-border focus-ring ${
              activeFilter === cat
                ? 'bg-pastel-blue text-[rgb(34,48,65)] shadow-[4px_4px_0_rgba(var(--color-shadow))] -translate-y-0.5'
                : 'bg-surface text-text-primary shadow-[2px_2px_0_rgba(var(--color-shadow))] hover:-translate-y-1 hover:bg-pastel-cream hover:text-[rgb(34,48,65)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Project Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-2xl font-retro text-pastel-pink animate-pixel-bounce uppercase tracking-widest">Loading...</div>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const cardBgColor = retroColors[index % retroColors.length];
              return (
              <motion.div
                  layout
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  key={project.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => openModal(project)}
                  onKeyDown={(e) => handleKeyDown(e, project)}
                  className="group cursor-pointer retro-card !p-0 overflow-hidden flex flex-col bg-surface hover:bg-pastel-cream focus-visible:bg-pastel-cream transition-colors focus-ring"
                >
                  {/* Solid Pastel Placeholder Image / Icon */}
                  <div
                    className={`h-[200px] flex items-center justify-center relative overflow-hidden ${cardBgColor} border-b-2 border-border`}
                  >
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                    
                    {/* Status Badge */}
                    {project.status && (
                      <div className="absolute top-3 right-3 bg-[rgb(34,48,65)] text-[rgb(255,253,222)] font-retro text-xs uppercase tracking-widest px-2 py-1 retro-border shadow-[2px_2px_0_rgba(255,255,255,0.3)]">
                        {project.status}
                      </div>
                    )}
                    
                    <i className={`bx ${project.icon || 'bx-image'} text-6xl text-[rgb(34,48,65)]/50 group-hover:scale-110 transition-transform duration-300 relative z-10`}></i>
                    
                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <span className="btn-retro !text-lg !py-1 !px-4 pointer-events-none">
                        PRESS START
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Category Label */}
                    <span className="text-pastel-pink dark:text-accent-light font-retro text-lg tracking-widest uppercase mb-1 group-hover:text-[rgb(200,100,120)] dark:group-hover:text-[rgb(200,100,120)]">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-retro font-bold tracking-wide mt-1 mb-2 text-text-primary group-hover:text-[rgb(34,48,65)] transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-[rgb(60,72,85)] transition-colors">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-surface text-text-secondary border border-text-secondary/30 text-xs px-2 py-0.5 font-retro tracking-widest uppercase group-hover:bg-[rgb(255,255,255)] group-hover:text-[rgb(34,48,65)] group-hover:border-[rgb(34,48,65)]/40 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 pt-3 border-t-2 border-border/20 group-hover:border-[rgb(34,48,65)]/20">
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} on GitHub`}
                        className="flex items-center gap-2 font-retro text-lg text-text-primary hover:text-pastel-pink group-hover:text-[rgb(34,48,65)] group-hover:hover:text-pastel-pink transition-colors duration-300 focus-ring px-1"
                      >
                        <i className="bx bxl-github text-xl" aria-hidden="true"></i>
                        CODE
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live demo for ${project.title}`}
                          className="flex items-center gap-2 font-retro text-lg text-text-primary hover:text-pastel-pink group-hover:text-[rgb(34,48,65)] group-hover:hover:text-pastel-pink transition-colors duration-300 focus-ring px-1"
                        >
                          <i className="bx bx-play-circle text-xl" aria-hidden="true"></i>
                          DEMO
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modal Integration */}
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        project={selectedProject} 
      />
    </section>
  );
};

export default Projects;
