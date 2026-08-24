import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FiGithub size={24} />, href: 'https://github.com/Yov54', label: 'GitHub', color: 'hover:bg-pastel-lime' },
    { icon: <FiLinkedin size={24} />, href: 'https://www.linkedin.com/in/yovi-revikasari/', label: 'LinkedIn', color: 'hover:bg-pastel-lavender' },
    { icon: <FiMail size={24} />, href: 'mailto:yovi.revikasari02@gmail.com', label: 'Email', color: 'hover:bg-pastel-pink' },
  ];

  return (
    <>
      <footer className="relative bg-surface py-16 px-4 lg:px-20 overflow-hidden" role="contentinfo">
        {/* Top divider retro line */}
        <div className="absolute top-0 left-0 right-0 section-retro-line" />
        
        {/* Top Row — 3 Columns */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 relative z-10 pt-4">

          {/* Column 1: Logo / Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-retro font-bold tracking-widest text-text-primary">
              Yov <span className="text-pastel-blue drop-shadow-[2px_2px_0_rgba(var(--color-shadow))] dark:text-accent">Portfo</span>
            </h2>
            <p className="mt-4 text-text-secondary text-sm leading-relaxed max-w-xs">
              Building practical solutions across web development, machine learning, and technology education.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.nav
            aria-label="Footer navigation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-retro uppercase tracking-widest text-text-primary mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-pastel-pink hover:ml-2 font-retro tracking-widest uppercase transition-all duration-300 text-lg flex items-center gap-2 before:content-['▶'] before:text-[10px] before:opacity-0 hover:before:opacity-100 focus-ring px-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Column 3: Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-retro uppercase tracking-widest text-text-primary mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-12 h-12 retro-border bg-[rgb(255,253,222)] text-[rgb(34,48,65)] flex items-center justify-center transition-all hover:-translate-y-1 shadow-[2px_2px_0_rgba(var(--color-shadow))] focus-ring ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto mt-12 mb-6 border-t-4 border-dotted border-border opacity-50" />

        {/* Bottom Row: Copyright */}
        <p className="text-center text-sm font-retro tracking-widest uppercase text-text-secondary">
          &copy; 2026 Yovi Revikasari. All rights reserved. GAME OVER.
        </p>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        initial={{ opacity: 0, y: 10 }}
        animate={showBackToTop ? { opacity: 1, y: 0 } : { opacity: 0, y: 10, pointerEvents: 'none' }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-pastel-yellow text-[rgb(34,48,65)] flex items-center justify-center retro-border shadow-[4px_4px_0_rgba(var(--color-shadow))] hover:-translate-y-2 active:translate-y-0 active:shadow-[0px_0px_0_rgba(var(--color-shadow))] focus-ring cursor-pointer"
      >
        <FiArrowUp size={28} />
      </motion.button>
    </>
  );
};

export default Footer;
