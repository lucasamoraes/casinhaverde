import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Play } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const DEFAULT_IMAGES = [
  "https://picsum.photos/800/800?random=50",
  "https://picsum.photos/800/800?random=51",
  "https://picsum.photos/800/800?random=52"
];

export const Hero: React.FC = () => {
  const { whatsapp, heroImages } = useContent();
  const [isHouseOpen, setIsHouseOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use dynamic images if available, otherwise default
  const images = (heroImages && heroImages.length > 0 && heroImages.some(img => img !== "")) 
    ? heroImages.filter(img => img !== "") 
    : DEFAULT_IMAGES;

  // Animation Cycle Logic
  useEffect(() => {
    const runCycle = () => {
      setIsHouseOpen(true);
      setTimeout(() => {
        setIsHouseOpen(false);
      }, 6000);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 8500); 
    };

    runCycle();
    const intervalId = setInterval(runCycle, 10000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsapp}?text=Olá! Gostaria de agendar uma visita na Casinha Verde.`, '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#EAFBF9] pt-20">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-casinha-leaf/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="text-center md:text-left space-y-6">
          <div className="inline-block px-4 py-1 bg-white rounded-full text-casinha-leaf font-bold text-sm shadow-sm mb-2 animate-bounce">
            🌿 Matrículas abertas para 2026
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-casinha-brown leading-tight">
            Aprender brincando na <span className="text-casinha-leaf">Casinha Verde</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-body max-w-lg mx-auto md:mx-0">
            Um ambiente de acolhimento, afeto e desenvolvimento integral para o seu filho, do berçário ao 2º período.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Button size="lg" className="bg-casinha-leaf hover:bg-green-800 shadow-green-200" onClick={openWhatsApp}>
              Agendar Visita
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2 justify-center border-casinha-leaf text-casinha-leaf hover:bg-casinha-leaf">
              <Play size={20} fill="currentColor" />
              Ver o vídeo
            </Button>
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center mt-12 md:mt-0">
          
          <div className="relative z-30 w-0 h-0 
            border-l-[150px] border-r-[150px] border-b-[120px] 
            md:border-l-[200px] md:border-r-[200px] md:border-b-[160px] 
            border-l-transparent border-r-transparent border-b-casinha-brown 
            drop-shadow-xl translate-y-[1px]">
          </div>
            
          <div className={`house-container relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] ${isHouseOpen ? 'house-open' : ''}`}>
            
            <div className="w-full h-full bg-white relative overflow-hidden shadow-2xl rounded-b-xl border-x-4 border-b-4 border-green-900">
               
               <img 
                 src={images[currentImageIndex]}
                 alt="Crianças brincando" 
                 className="w-full h-full object-cover absolute inset-0 z-0 transition-opacity duration-500"
               />

               <div className="door door-left absolute top-0 left-0 w-1/2 h-full bg-green-500 z-10 border-r-2 border-dashed border-white/50 flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full absolute right-4 shadow-sm"></div>
                  <div className="w-20 h-20 border-4 border-white/30 rounded-full"></div>
               </div>
               <div className="door door-right absolute top-0 right-0 w-1/2 h-full bg-green-500 z-10 border-l-2 border-dashed border-white/50 flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full absolute left-4 shadow-sm"></div>
                  <div className="w-20 h-20 border-4 border-white/30 rounded-full"></div>
               </div>

            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF"></path>
        </svg>
      </div>
    </section>
  );
};