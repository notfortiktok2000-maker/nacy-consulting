import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { getWhatsappLink } from '../utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[900px] z-[100] transition-colors duration-500 rounded-2xl md:rounded-full border ${scrolled ? 'bg-[#000000cc] border-[#333] shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl' : 'bg-transparent border-transparent'}`}
      >
        <div className="px-6 md:px-8 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex flex-col items-start leading-none text-white hover:opacity-80 transition-opacity">
            <div className="text-[9px] font-sans uppercase font-bold tracking-[0.2em] mb-[2px] text-[#aaa]">Nacy .</div>
            <div className="text-xl font-heading uppercase tracking-tight">Consulting</div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/services" className={`text-xs uppercase font-sans tracking-[0.15em] transition-colors duration-200 ${location.pathname === '/services' ? 'text-white font-bold' : 'text-[#999] hover:text-white'}`}>Services</Link>
            <Link to="/portfolio" className={`text-xs uppercase font-sans tracking-[0.15em] transition-colors duration-200 ${location.pathname === '/portfolio' ? 'text-white font-bold' : 'text-[#999] hover:text-white'}`}>Portfolio</Link>
            
            <Link 
              to="/book"
              className="ml-2 bg-white text-black px-6 py-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.15em] font-bold hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Book ton call
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#050505] z-[90] flex flex-col items-center justify-center gap-10 px-6 md:hidden"
          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-lg font-sans uppercase tracking-[0.2em] text-[#aaa] hover:text-white transition-colors">Accueil</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)} className="text-lg font-sans uppercase tracking-[0.2em] text-[#aaa] hover:text-white transition-colors">Services</Link>
            <Link to="/portfolio" onClick={() => setMenuOpen(false)} className="text-lg font-sans uppercase tracking-[0.2em] text-[#aaa] hover:text-white transition-colors">Portfolio</Link>
            <Link to="/book" onClick={() => setMenuOpen(false)} className="text-lg font-sans uppercase tracking-[0.2em] text-white cta-underline relative mt-4">Book ton call &rarr;</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
