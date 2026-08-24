import { useState } from 'react';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: '', // Honeypot field
  });
  
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Honeypot check
    if (formData.botcheck) {
      setStatus('error');
      return;
    }

    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
      subject: formData.subject || 'New Contact Submission from Portfolio',
      from_name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', botcheck: '' });
      } else {
        console.error('Web3Forms Error:', result);
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
    }

    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  const contactCards = [
    {
      icon: <FiMail className="text-black text-2xl" />,
      label: 'Email',
      value: 'yovi.revikasari03@gmail.com',
      href: 'mailto:yovi.revikasari03@gmail.com',
      color: 'bg-pastel-blue'
    },
    {
      icon: <FiMapPin className="text-black text-2xl" />,
      label: 'Location',
      value: 'Indonesia',
      href: null,
      color: 'bg-pastel-pink'
    },
  ];

  const socialLinks = [
    {
      icon: <FiGithub className="text-2xl" />,
      label: 'GitHub',
      href: 'https://github.com/Yov54',
      color: 'hover:bg-pastel-lime'
    },
    {
      icon: <FiLinkedin className="text-2xl" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/yovi-revikasari/',
      color: 'hover:bg-pastel-lavender'
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 px-4 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 section-retro-line"></div>

      <div className="relative z-10 max-w-6xl mx-auto pt-10">
        {/* Section Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-pink text-black retro-border shadow-[2px_2px_0px_0px_rgba(var(--color-shadow))] font-retro text-xl uppercase tracking-wider">
            <i className="bx bx-envelope" aria-hidden="true"></i>
            <span>COMMUNICATIONS</span>
          </div>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-retro font-bold tracking-widest text-center mb-16 text-text-primary"
        >
          Contact <span className="text-pastel-lavender dark:text-accent drop-shadow-[2px_2px_0_rgba(var(--color-shadow))]">Me</span>
        </motion.h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Info Cards */}
            {contactCards.map((card) => {
              const Wrapper = card.href ? 'a' : 'div';
              return (
                <Wrapper
                  key={card.label}
                  {...(card.href ? { href: card.href } : {})}
                  className={`flex items-center gap-4 retro-card bg-surface group transition-colors !p-4 ${
                    card.href
                      ? 'hover:bg-pastel-cream focus-ring'
                      : ''
                  }`}
                >
                  <div className={`flex items-center justify-center w-14 h-14 retro-border ${card.color} shadow-[2px_2px_0_rgba(var(--color-shadow))] transition-transform group-hover:scale-105`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-sm font-retro tracking-widest uppercase text-text-secondary group-hover:text-[rgb(60,72,85)]">{card.label}</p>
                    <p className="text-text-primary font-bold text-lg group-hover:text-[rgb(34,48,65)] font-retro tracking-wide">
                      {card.value}
                    </p>
                  </div>
                </Wrapper>
              );
            })}

            {/* Social Links */}
            <div className="mt-4">
              <p className="text-text-primary font-retro tracking-widest uppercase text-lg mb-4 flex items-center gap-2">
                <span className="text-pastel-pink">♥</span> Find me on
              </p>
              <div className="flex gap-4 flex-wrap">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 retro-card bg-surface !p-3 group ${link.color} transition-colors focus-ring`}
                  >
                    <div className="text-text-primary group-hover:text-[rgb(34,48,65)] transition-colors duration-300">
                      {link.icon}
                    </div>
                    <span className="text-lg font-retro tracking-widest uppercase text-text-primary group-hover:text-[rgb(34,48,65)] transition-colors duration-300">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Extra message */}
            <div className="mt-4 p-5 retro-card bg-pastel-blue/20">
              <p className="text-text-secondary text-sm leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to collaborate on technology that creates real impact. Feel free to reach out!
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 retro-card bg-surface p-6 sm:p-8"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-retro text-text-primary mb-2 tracking-widest uppercase"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="PLAYER 1"
                  required
                  className="input-retro"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-retro text-text-primary mb-2 tracking-widest uppercase"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="PLAYER1@EMAIL.COM"
                  required
                  className="input-retro"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-lg font-retro text-text-primary mb-2 tracking-widest uppercase"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="NEW QUEST"
                  required
                  className="input-retro"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-retro text-text-primary mb-2 tracking-widest uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="ENTER MESSAGE..."
                  required
                  rows={4}
                  className="input-retro resize-none"
                />
              </div>

              {/* Honeypot field for spam bots */}
              <input 
                type="checkbox" 
                name="botcheck" 
                className="hidden" 
                style={{ display: 'none' }} 
                onChange={handleChange}
                value={formData.botcheck}
              />

              {/* Submit & Status */}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-retro w-full flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                  <FiSend className={`text-xl ${status === 'loading' ? 'animate-pixel-bounce' : ''}`} />
                </button>
                
                {status === 'success' && (
                  <div className="bg-pastel-sage text-black font-retro tracking-widest uppercase p-2 border-[3px] border-black text-center shadow-[2px_2px_0_rgba(var(--color-shadow))] animate-pixel-bounce">
                    MESSAGE SENT!
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-pastel-pink text-black font-retro tracking-widest uppercase p-2 border-[3px] border-black text-center shadow-[2px_2px_0_rgba(var(--color-shadow))]">
                    ERROR! TRY AGAIN
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
