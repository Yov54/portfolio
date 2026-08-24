import { useState, useEffect } from 'react';
import { scooterCodeSnippets } from '../../data/codeSnippets';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ isOpen, onClose, project }) => {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const details = project?.details || {};

  // Function to handle clicking outside the modal content to close it
  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };

  const formatRoleTitle = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const ProjectImage = ({ src, alt, label, heightClass = "h-40" }) => {
    const [error, setError] = useState(false);
    const imageSrc = src ? `${import.meta.env.BASE_URL}${src}` : null;

    if (error || !imageSrc) {
      return (
        <div className={`w-full ${heightClass} rounded-2xl border border-dashed border-accent/20 bg-surface-light/10 transition-all duration-300 hover:border-accent/40 soft-surface-shadow`} />
      );
    }

    return (
      <div className={`relative ${heightClass} w-full overflow-hidden retro-border bg-surface`}>
        <img
          src={imageSrc}
          alt={alt || label}
          onError={() => setError(true)}
          className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none" />
      </div>
    );
  };

  const ProjectVideo = ({ src, heightClass = "h-64 sm:h-[400px]" }) => {
    const videoSrc = src ? `${import.meta.env.BASE_URL}${src}` : null;
    if (!videoSrc) return null;

    return (
      <div className={`relative ${heightClass} w-full overflow-hidden retro-border bg-surface`}>
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          controls
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none" />
      </div>
    );
  };

  const StoryVisual = ({ title, image, caption, heightClass = 'h-80 sm:h-96' }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-8 group"
    >
      <ProjectImage src={image} alt={title} label={title} heightClass={heightClass} />
      {caption && (
        <p className="mt-3 text-center text-sm text-gray-400 italic">{caption}</p>
      )}
    </motion.div>
  );

  const overviewVisual = (details.visuals || []).find((item) => item.section === 'overview');

  const ScooterArchitecture = () => {
    const nodes = [
      { name: "GPS NEO-6M", desc: "Data Lokasi & Kecepatan", icon: "bx-map-pin", color: "border-accent/40" },
      { name: "ESP32 Transmitter", desc: "Pemrosesan & Enkapsulasi", icon: "bx-chip", color: "border-accent/60 bg-accent/5" },
      { name: "LoRa SX1278 (TX)", desc: "Transmisi Frekuensi Radio", icon: "bx-broadcast", color: "border-orange-500/40" },
      { name: "LoRa SX1278 (RX)", desc: "Penerimaan Gateway", icon: "bx-broadcast", color: "border-orange-500/40" },
      { name: "ESP32 Receiver", desc: "Penerusan Data Serial", icon: "bx-chip", color: "border-accent/60 bg-accent/5" },
      { name: "MQTT Broker", desc: "Pub/Sub Messaging Layer", icon: "bx-server", color: "border-blue-500/40" },
      { name: "MySQL Database", desc: "Penyimpanan Riwayat", icon: "bx-data", color: "border-green-500/40" },
      { name: "Web Dashboard", desc: "Pemantauan Real-time", icon: "bx-desktop", color: "border-accent shadow-[0_0_15px_rgba(var(--color-accent),0.2)]" }
    ];

    return (
      <div className="w-full py-6">
        {/* Desktop view: Horizontal flow */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-y-6 gap-x-3">
          {nodes.map((node, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex flex-col items-center w-32 p-3 retro-border bg-surface text-center ${node.color} transition-all duration-300 hover:scale-105 hover:bg-pastel-cream`}>
                <div className="w-8 h-8 retro-border bg-surface-light flex items-center justify-center text-text-primary text-base mb-1.5">
                  <i className={`bx ${node.icon}`}></i>
                </div>
                <h4 className="text-[10px] font-retro uppercase tracking-widest text-text-primary whitespace-nowrap">{node.name}</h4>
                <p className="text-[10px] text-text-secondary mt-0.5 leading-tight">{node.desc}</p>
              </div>
              
              {index < nodes.length - 1 && (
                <div className="flex flex-col items-center px-0.5">
                  <div className="relative w-6 h-[2px] bg-accent/30">
                    <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent animate-ping" style={{ animationDelay: `${index * 0.25}s`, animationDuration: '2s' }}></div>
                  </div>
                  <i className="bx bx-chevron-right text-accent/50 text-[10px] mt-0.5"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile view: Vertical flow */}
        <div className="md:hidden flex flex-col items-center gap-2">
          {nodes.map((node, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <div className={`flex items-center w-full max-w-xs p-3 retro-border bg-surface gap-3 ${node.color}`}>
                <div className="w-8 h-8 retro-border bg-surface-light flex items-center justify-center text-text-primary text-lg shrink-0">
                  <i className={`bx ${node.icon}`}></i>
                </div>
                <div>
                  <h4 className="text-xs font-retro font-bold text-text-primary tracking-widest">{node.name}</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">{node.desc}</p>
                </div>
              </div>
              
              {index < nodes.length - 1 && (
                <div className="flex flex-col items-center py-1.5">
                  <div className="relative w-[2px] h-4 bg-accent/30">
                    <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent animate-ping" style={{ animationDelay: `${index * 0.25}s`, animationDuration: '2s' }}></div>
                  </div>
                  <i className="bx bx-chevron-down text-accent/50 text-[10px]"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CodeExplorer = () => {
    const snippets = details.codeSnippets || scooterCodeSnippets;
    const [activeTab, setActiveTab] = useState(Object.keys(snippets)[0] || 'transmitter');

    useEffect(() => {
      setActiveTab(Object.keys(snippets)[0] || 'transmitter');
    }, [details.codeSnippets]);

    const snippet = snippets[activeTab] || {};

    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-10 retro-card bg-surface overflow-hidden !p-0"
      >
        {/* Header / Tabs */}
        <div className="flex items-center justify-between border-b-2 border-border bg-surface p-4 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <i className="bx bx-code-block text-pastel-pink text-xl"></i>
            <span className="text-sm font-retro font-bold uppercase tracking-widest text-text-primary">Technical Code Explorer</span>
          </div>
          
          <div className="flex gap-2">
            {Object.entries(snippets).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 font-retro uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer retro-border focus-ring ${
                  activeTab === key
                    ? 'bg-pastel-lime text-[rgb(34,48,65)] shadow-[2px_2px_0_rgba(var(--color-shadow))]'
                    : 'bg-surface text-text-primary hover:bg-pastel-cream hover:text-[rgb(34,48,65)]'
                }`}
              >
                {key === 'transmitter' ? 'Transmitter (C++)' : key === 'receiver' ? 'Receiver (C++)' : 'Dashboard (JS)'}
              </button>
            ))}
          </div>
        </div>

        {/* Snippet Description */}
        <div className="p-4 bg-surface border-b-2 border-border border-dashed">
          <p className="text-sm text-text-secondary leading-relaxed font-retro">
            {snippet.description}
          </p>
        </div>

        {/* Code Area */}
        <div className="relative max-h-96 overflow-y-auto bg-black/40 p-4 font-mono text-xs text-gray-300 leading-relaxed scrollbar-hide">
          <pre className="whitespace-pre-wrap select-text">
            <code>{snippet.code}</code>
          </pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(snippet.code || '');
              alert("Kode berhasil disalin!");
            }}
            className="absolute top-4 right-4 btn-retro !py-1 !px-2 !text-[10px]"
          >
            <i className="bx bx-copy"></i> Copy
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          id="modal-backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto retro-card bg-surface !p-0 shadow-[8px_8px_0_rgba(0,0,0,0.5)] scrollbar-hide"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            
            {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-pastel-pink border-b-4 border-black">
          <div>
            <span className="text-black text-sm font-retro font-bold tracking-widest uppercase block mb-1">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-retro font-bold tracking-widest text-black">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 retro-border bg-white text-black hover:bg-pastel-cream transition-transform hover:-translate-y-1 shadow-[2px_2px_0_rgba(var(--color-shadow))] focus-ring"
            aria-label="Close project modal"
          >
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* Header Layout: Tech Badges, Tagline, Hero Image */}
          <div className="mb-10 flex flex-col items-center">
            {(project.tags || project.tech) && (project.tags || project.tech).length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {(project.tags || project.tech).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-pastel-yellow text-black retro-border text-sm font-retro font-bold uppercase tracking-widest shadow-[2px_2px_0_rgba(var(--color-shadow))]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            
            {details.heroTagline && (
              <p className="text-center mx-auto text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mb-8">
                {details.heroTagline}
              </p>
            )}

            {project.demo && project.demo !== "#" && (
              <div className="mb-8 flex justify-center w-full">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-retro flex items-center gap-2"
                >
                  <i className="bx bx-play-circle text-xl"></i>
                  Live Demo
                </a>
              </div>
            )}

            {(details.heroVideo || details.heroImage || project.image) && (
              <div className="mt-6 w-full">
                {details.heroVideo ? (
                  <ProjectVideo src={details.heroVideo} heightClass="h-64 sm:h-[400px]" />
                ) : (
                  <ProjectImage 
                    src={details.heroImage || project.image} 
                    alt={details.heroTitle || project.title} 
                    heightClass="h-64 sm:h-[400px]" 
                  />
                )}
              </div>
            )}
          </div>

          {/* Project Overview */}
          {details.overview && (
            <>
              {overviewVisual && (
                <StoryVisual
                  title={overviewVisual.title}
                  image={overviewVisual.image}
                  caption={overviewVisual.caption}
                />
              )}
              <div className="mb-8">
                <h3 className="text-xl font-retro font-bold mb-3 text-text-primary flex items-center gap-2 uppercase tracking-widest">
                  <i className="bx bx-book-open text-pastel-pink"></i>
                  Project Overview
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                  {details.overview}
                </p>
              </div>
            </>
          )}

          {/* My Role */}
          {details.myRole && (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-retro tracking-widest text-text-primary mb-4 flex items-center gap-2 uppercase">
                  <i className="bx bx-user-voice text-pastel-pink"></i>
                  My Role
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {Object.entries(details.myRole).map(([key, items]) => (
                    <div key={key} className="retro-card bg-surface hover:bg-pastel-cream transition-colors">
                      <h4 className="mb-3 text-lg font-retro font-bold uppercase tracking-widest text-text-primary">
                        {formatRoleTitle(key)}
                      </h4>
                      <ul className="space-y-2">
                        {items.map((item, index) => (
                          <li key={`${key}-${index}`} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-pastel-blue text-xs mt-[2px]">▶</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              {(details.visuals || []).filter((item) => item.section === 'myRole').map((item, index) => (
                <StoryVisual key={`myRole-${index}`} title={item.title} image={item.image} caption={item.caption} />
              ))}
            </>
          )}

          {/* Architecture Section */}
          {(details.architecture || details.architectureDescription) && (
            <div className="mb-8">
              <h3 className="text-xl font-retro font-bold mb-4 text-text-primary flex items-center gap-2 uppercase tracking-widest">
                <i className="bx bx-git-repo-forked text-pastel-blue"></i>
                System Architecture
              </h3>

              {details.architecture && (
                <div className="mb-6">
                  {project.title.includes("Scooter") ? (
                    <ScooterArchitecture />
                  ) : (
                    <div className="mb-4 retro-card bg-surface-dark p-4">
                      <pre className="whitespace-pre-wrap text-sm leading-7 text-text-secondary font-mono">
                        {details.architecture}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {details.architectureDescription && (
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                  {details.architectureDescription}
                </p>
              )}
            </div>
          )}

          {/* Key Features */}
          {details.features && (
            <>
              <div className="mb-8 retro-card bg-surface-dark p-5 sm:p-6">
                <h3 className="text-2xl font-retro tracking-widest text-text-primary mb-4 flex items-center gap-2 uppercase">
                  <i className="bx bx-star text-pastel-yellow"></i>
                  Key Features
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {details.features.map((feature, i) => {
                    const isObject = typeof feature === 'object';
                    return (
                      <div key={i} className="retro-card bg-surface hover:bg-pastel-cream transition-colors p-4 group">
                        {isObject ? (
                          <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-10 h-10 retro-border bg-white text-black text-xl shrink-0 group-hover:scale-110 transition-transform">
                              <i className={feature.icon || "bx bx-check-circle"}></i>
                            </div>
                            <div>
                              <h4 className="text-lg font-retro font-bold text-text-primary uppercase tracking-widest mb-1 group-hover:text-black">{feature.title}</h4>
                              <p className="text-sm text-text-secondary leading-relaxed group-hover:text-gray-800">{feature.description}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="text-pastel-pink text-xs">▶</span>
                            <p className="text-sm text-text-secondary leading-relaxed group-hover:text-black">{feature}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {(details.visuals || []).filter((item) => item.section === 'features').map((item, index) => (
                <StoryVisual key={`features-${index}`} title={item.title} image={item.image} caption={item.caption} />
              ))}
            </>
          )}

          {/* Hardware Design */}
          {details.hardwareDesign && (
            <div className="mb-8">
              <h3 className="text-xl font-retro font-bold mb-4 text-text-primary flex items-center gap-2 uppercase tracking-widest">
                <i className="bx bx-chip text-pastel-sage"></i>
                Hardware Design
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(details.hardwareDesign).map(([key, items]) => (
                  <div key={key} className="retro-card bg-surface p-4">
                    <h4 className="mb-3 text-sm font-retro font-bold uppercase tracking-widest text-text-primary">
                      {formatRoleTitle(key)}
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {items.map((item, index) => (
                        <li key={`${key}-${index}`} className="flex items-start gap-2 text-sm text-text-secondary">
                          <i className="bx bx-check-circle text-pastel-lime mt-[2px]"></i>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <ProjectImage
                      src={`images/projects/scooter/${key}.jpg`}
                      alt={formatRoleTitle(key)}
                      label={`${formatRoleTitle(key)} Photo`}
                      heightClass="h-44"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Web Dashboard */}
          {details.webDashboard && (
            <div className="mb-8">
              <h3 className="text-xl font-retro font-bold mb-4 text-text-primary flex items-center gap-2 uppercase tracking-widest">
                <i className="bx bx-desktop text-pastel-blue"></i>
                Web Dashboard
              </h3>
              <p className="mb-4 text-text-secondary leading-relaxed text-sm sm:text-base">
                {details.webDashboard}
              </p>
              <ProjectImage
                src="images/projects/scooter/dashboard.jpg"
                alt="Web Dashboard Screenshot"
                label="Web Dashboard Screenshot"
                heightClass="h-64 sm:h-80"
              />
            </div>
          )}

          {/* Challenges Section */}
          {details.challenges && (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-retro font-bold mb-3 text-text-primary flex items-center gap-2 uppercase tracking-widest">
                  <i className="bx bx-target-lock text-pastel-pink"></i>
                  Challenges &amp; Solutions
                </h3>
                <div className="space-y-4">
                  {details.challenges.map((challenge, index) => (
                    <div key={index} className="retro-card bg-surface p-4">
                      <h4 className="mb-2 text-base font-retro font-bold uppercase tracking-widest text-text-primary">
                        {challenge.title}
                      </h4>
                      <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                        {challenge.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {(details.visuals || []).filter((item) => item.section === 'challenges').map((item, index) => (
                <StoryVisual key={`challenges-${index}`} title={item.title} image={item.image} caption={item.caption} />
              ))}
            </>
          )}

          {/* Results */}
          {details.results && (
            <div className="mb-8 retro-card bg-surface-dark p-5 sm:p-6">
              <h3 className="text-xl font-retro font-bold mb-4 text-text-primary flex items-center gap-2 uppercase tracking-widest">
                <i className="bx bx-medal text-pastel-yellow"></i>
                Results
              </h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {details.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <i className="bx bx-check-circle text-pastel-lime mt-[2px]"></i>
                    <span className="leading-relaxed">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {details.gallery && (
            <div className="mb-8">
              <h3 className="text-xl font-retro font-bold mb-4 text-text-primary flex items-center gap-2 uppercase tracking-widest">
                <i className="bx bx-image text-pastel-blue"></i>
                Gallery
              </h3>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {details.gallery.map((item, index) => (
                  <div key={index} className="retro-card bg-surface p-3">
                    <ProjectImage
                      src={item.image}
                      alt={item.title}
                      label={item.title}
                      heightClass="h-36"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-retro font-bold mb-3 text-text-primary uppercase tracking-widest">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {(details.technologies || project.tech || []).map((t) => (
                <span
                  key={t}
                  className="bg-white text-black retro-border text-xs px-3 py-1 font-retro tracking-widest uppercase shadow-[2px_2px_0_rgba(var(--color-shadow))]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          {(details.visuals || []).filter((item) => item.section === 'technologies').map((item, index) => (
            <StoryVisual key={`technologies-${index}`} title={item.title} image={item.image} caption={item.caption} />
          ))}

          {/* Technical Code Explorer */}
          {project.title.includes("Scooter") && (
            <CodeExplorer />
          )}

          {/* Action Links */}
          {project.github && project.github !== "#" && (
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t-2 border-border/20">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-retro flex items-center gap-2"
              >
                <i className="bx bxl-github text-xl"></i>
                View Source Code
              </a>
            </div>
          )}
          
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
