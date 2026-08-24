import 'boxicons/css/boxicons.min.css';
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(100vh-6rem)] pt-24 lg:pt-20 px-4 lg:px-20 overflow-hidden">

      {/* Decorative Pixel Stars */}
      <div className="pointer-events-none absolute -left-4 top-32 text-pastel-pink text-4xl animate-pixel-bounce" aria-hidden="true">★</div>
      <div className="pointer-events-none absolute right-12 bottom-20 text-pastel-blue text-5xl animate-pixel-bounce" style={{ animationDelay: '0.5s' }} aria-hidden="true">★</div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl z-10 mt-8 lg:mt-0"
      >

        
        {/* Tag box */}
        <div className='inline-flex items-center gap-2 px-3 py-1 bg-pastel-yellow text-black retro-border shadow-[2px_2px_0px_0px_rgba(var(--color-shadow))] font-retro text-xl uppercase tracking-wider mb-6'>
          <i className='bx bx-game' aria-hidden="true"></i>
          <span className="sr-only">Section:</span>
          <span>Player 1</span>
        </div>

        {/* Main Heading */}
        <motion.h1 
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-retro font-bold tracking-widest my-4 leading-tight text-text-primary'
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>Hi!</motion.span><br />
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>I'm </motion.span>
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className='text-pastel-lavender dark:text-accent drop-shadow-[2px_2px_0_rgba(var(--color-shadow))]'>Yovi</motion.span>
        </motion.h1>

        {/* Description */}
        <p className='text-base sm:text-lg tracking-wider text-text-secondary max-w-[25rem] lg:max-w-[30rem] leading-relaxed animate-fade-in mt-6 bg-surface p-4 retro-border shadow-[4px_4px_0px_0px_rgba(var(--color-shadow))]'>
          I&apos;m a software developer and machine learning enthusiast with experience in web development, IoT, and technology education. I enjoy building practical solutions that create real impact.
        </p>

        {/* Buttons */}
        <div className='flex flex-wrap gap-6 mt-10'>
          <motion.a 
            whileHover={{ scale: 1.05, y: -4, boxShadow: "6px 6px 0px 0px rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.95, boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.8)" }}
            className='btn-retro bg-pastel-lime flex items-center gap-2'
            href="#projects"
          >
            <i className='bx bx-play-circle text-2xl' aria-hidden="true"></i>
            START GAME
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05, y: -4, boxShadow: "6px 6px 0px 0px rgba(0,0,0,0.8)" }}
            whileTap={{ scale: 0.95, boxShadow: "1px 1px 0px 0px rgba(0,0,0,0.8)" }}
            className='btn-retro bg-surface text-text-primary flex items-center gap-2'
            href="#contact"
          >
            <i className='bx bx-envelope text-2xl' aria-hidden="true"></i>
            CONTACT
          </motion.a>
        </div>

      </motion.div>

      {/* Avatar Image */}
      <div className='w-full lg:w-[45%] h-auto flex-shrink-0 relative mt-8 lg:mt-0 flex justify-center items-center'>
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          src={`${import.meta.env.BASE_URL}images/hero_avatar.png`}
          alt="Yovi's Avatar"
          className="w-[80%] sm:w-[70%] lg:w-full h-auto object-contain animate-pixel-bounce drop-shadow-[10px_10px_0px_rgba(var(--color-shadow))]"
        />
      </div>

    </section>
  )
}

export default Hero
