import 'boxicons/css/boxicons.min.css';
import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark'
  );

  // Synchronize theme state with the html element class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Track scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 flex justify-between items-center py-4 px-4 lg:px-20 z-50 transition-all duration-300 ${scrolled ? 'bg-surface retro-border shadow-[4px_4px_0px_0px_rgba(var(--color-shadow))] m-2' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
    >
      <motion.a 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="#" 
        className="flex items-center gap-3 group"
      >
        <div className="w-10 h-10 retro-border bg-pastel-yellow text-black flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(var(--color-shadow))] group-hover:-translate-y-1 transition-transform">
          <span className="font-retro font-bold mt-1">Y</span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-retro font-bold m-0 tracking-widest mt-1">
          Yovi
        </h1>
      </motion.a>

      {/* NavBar */}
      <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
        {navLinks.map((link, index) => (
          <motion.a
            key={link.label}
            whileHover={{ y: -4 }}
            className="text-lg font-retro tracking-widest text-text-primary z-50 relative group focus-ring rounded-none"
            href={link.href}
          >
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-pastel-pink text-sm transition-opacity">★</span>
            {link.label}
          </motion.a>
        ))}
      </nav>

      {/* Contact/Social Button */}
      <div className='md:flex hidden items-center space-x-4'>
        <button 
          onClick={toggleTheme} 
          className='cursor-pointer z-50 flex items-center justify-center btn-retro !px-3 !py-2 !text-sm'
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <FiSun className='w-5 h-5'/> : <FiMoon className='w-5 h-5'/>}
        </button>

        <motion.a 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='hover:-translate-y-1 transition-transform duration-300 z-50 text-xl hover:text-pastel-blue focus-ring p-1' href="https://github.com/Yov54" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FiGithub className='w-5 h-5'/>
        </motion.a>

        <motion.a 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='hover:-translate-y-1 transition-transform duration-300 z-50 text-xl hover:text-pastel-blue focus-ring p-1' href="https://www.linkedin.com/in/yovi-revikasari/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FiLinkedin className='w-5 h-5'/>
        </motion.a>

        <motion.a 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='hover:-translate-y-1 transition-transform duration-300 z-50 text-xl hover:text-pastel-blue focus-ring p-1' href="mailto:yovi.revikasari03@gmail.com" aria-label="Email">
          <FiMail className='w-5 h-5'/>
        </motion.a>
      </div>


      {/* Mobile Menu Button / Theme Toggle */}
      <div className='flex items-center gap-4 md:hidden z-50'>
        <button 
          onClick={toggleTheme} 
          className='cursor-pointer flex items-center justify-center btn-retro !px-2 !py-2 !text-sm'
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <FiSun className='w-5 h-5'/> : <FiMoon className='w-5 h-5'/>}
        </button>
        <button onClick={toggleMobileMenu} className='text-3xl retro-border bg-surface p-1 shadow-[2px_2px_0px_0px_rgba(var(--color-shadow))] active:translate-y-1 active:translate-x-1 active:shadow-none focus-ring' aria-label="Toggle menu">
          <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </button>
      </div>
      
      {/* Mobile Menu Expand */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 bottom-0 md:hidden z-40 bg-bg"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
            <nav className="relative flex flex-col gap-8 items-center justify-center h-full" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  className="text-4xl font-retro tracking-widest transition-colors hover:text-pastel-pink focus-ring px-2 py-1"
                  href={link.href}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              ))}

              <div className='flex space-x-8 items-center mt-8'>
                <a className='hover:-translate-y-1 transition-transform duration-300 hover:text-pastel-blue focus-ring p-2' href="https://github.com/Yov54" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FiGithub className='w-8 h-8'/>
                </a>

                <a className='hover:-translate-y-1 transition-transform duration-300 hover:text-pastel-blue focus-ring p-2' href="https://www.linkedin.com/in/yovi-revikasari/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FiLinkedin className='w-8 h-8'/>
                </a>

                <a className='hover:-translate-y-1 transition-transform duration-300 hover:text-pastel-blue focus-ring p-2' href="mailto:yovi.revikasari03@gmail.com" aria-label="Email">
                  <FiMail className='w-8 h-8'/>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  )
}

export default Header
