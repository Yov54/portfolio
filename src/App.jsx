import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Education from './components/Education';


export default function App() {
  
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:btn-retro focus:bg-pastel-yellow focus:text-black"
      >
        Skip to main content
      </a>
      <main id="main-content" className="bg-grid-pattern min-h-screen">

        <Header/>
        <Hero/>
        <About/>
        <Projects/>
        <Experience/>
        <Education/>
        <Contact/>
        <Footer/>
      </main>
    </>
  )
}