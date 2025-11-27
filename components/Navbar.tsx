import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { EDUCATION_LEVELS } from '../constants';
import { Button } from './Button';
import { useContent } from '../contexts/ContentContext';

interface NavbarProps {
  onNavigate: (page: string, id?: string) => void;
  transparentVariant?: 'default' | 'light';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, transparentVariant = 'default' }) => {
  const { whatsapp } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDesktopTransparent = !scrolled;
  const isContactPageTop = isDesktopTransparent && transparentVariant === 'light';

  const desktopTextClass = scrolled 
    ? 'md:text-casinha-brown' 
    : (isContactPageTop ? 'md:text-white md:hover:text-white/80' : 'md:text-casinha-leaf md:hover:text-casinha-red');

  const logoContainerClass = isContactPageTop
    ? 'bg-white text-casinha-green'
    : 'bg-casinha-leaf text-white';

  let buttonVariant: 'primary' | 'secondary' = 'primary';
  let buttonClasses = '';

  if (isContactPageTop) {
    buttonVariant = 'secondary';
  } else {
    buttonVariant = 'primary';
    buttonClasses = 'bg-casinha-leaf hover:bg-green-800 shadow-green-200 border-none';
  }

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      onNavigate(href);
    }
    setIsOpen(false);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsapp}?text=Olá! Gostaria de informações sobre Matrículas.`, '_blank');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        bg-white shadow-md py-2 
        md:shadow-none md:bg-transparent md:py-4
        ${scrolled ? 'md:bg-white/95 md:backdrop-blur-md md:shadow-lg md:py-2' : ''}
      `}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center gap-2 group">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md ${logoContainerClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className={`font-display font-bold text-2xl drop-shadow-sm text-casinha-brown ${desktopTextClass}`}>
            Casinha Verde
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className={`font-body font-bold text-lg transition-colors ${desktopTextClass}`}
          >
            Home
          </a>

          <div 
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className={`flex items-center gap-1 font-body font-bold text-lg transition-colors ${desktopTextClass}`}
              onClick={() => handleNavClick('#education')}
            >
              Educação <ChevronDown size={16} />
            </button>
            
            <div className={`absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl py-2 transform transition-all duration-200 origin-top-left ${dropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              {EDUCATION_LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => {
                    onNavigate('education-detail', level.id);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-casinha-brown hover:bg-casinha-light-green/20 hover:text-casinha-leaf font-bold"
                >
                  {level.title}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleNavClick('structure')}
            className={`font-body font-bold text-lg transition-colors ${desktopTextClass}`}
          >
            Estrutura
          </button>
          
          <button
            onClick={() => handleNavClick('contact')}
            className={`font-body font-bold text-lg transition-colors ${desktopTextClass}`}
          >
            Contato
          </button>

          <Button 
            variant={buttonVariant}
            className={buttonClasses}
            size="sm"
            onClick={openWhatsApp}
          >
             Matrículas
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-casinha-brown"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />} 
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out flex flex-col items-center justify-center space-y-6 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button className="absolute top-6 right-6 text-casinha-brown hover:text-casinha-red" onClick={() => setIsOpen(false)}>
           <X size={32} />
        </button>

        <a href="#home" onClick={() => handleNavClick('#home')} className="text-casinha-brown font-display text-2xl font-bold hover:text-casinha-leaf">Home</a>
        
        <div className="text-center space-y-4 w-full px-8">
           <span className="text-casinha-leaf font-display text-xl font-bold block mb-2 border-b-2 border-casinha-light-green/30 pb-2 mx-auto w-1/2">Educação</span>
           {EDUCATION_LEVELS.map((level) => (
             <button
               key={level.id}
               onClick={() => {
                 onNavigate('education-detail', level.id);
                 setIsOpen(false);
               }}
               className="block w-full text-center text-gray-600 hover:text-casinha-leaf font-bold text-xl py-1"
             >
               {level.title}
             </button>
           ))}
        </div>

        <button onClick={() => handleNavClick('structure')} className="text-casinha-brown font-display text-2xl font-bold hover:text-casinha-leaf">Estrutura</button>
        <button onClick={() => handleNavClick('contact')} className="text-casinha-brown font-display text-2xl font-bold hover:text-casinha-leaf">Contato</button>

        <Button 
            variant="primary" 
            size="lg"
            onClick={() => {
              setIsOpen(false);
              openWhatsApp();
            }}
            className="mt-4 bg-casinha-leaf hover:bg-green-800"
          >
             Agendar Visita
          </Button>
      </div>
    </nav>
  );
};