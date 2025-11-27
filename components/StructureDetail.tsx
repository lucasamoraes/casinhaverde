import React, { useEffect } from 'react';
import { STRUCTURE_ITEMS } from '../constants';
import { Button } from './Button';
import { SectionTitle } from './SectionTitle';
import { ArrowLeft, Check } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface StructureDetailProps {
  onBack: () => void;
}

export const StructureDetail: React.FC<StructureDetailProps> = ({ onBack }) => {
  const { whatsapp, structureImages } = useContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsapp}?text=Olá! Gostaria de agendar uma visita para conhecer a estrutura da escola.`, '_blank');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft size={16} /> Voltar
          </Button>
          <Button size="sm" onClick={openWhatsApp}>Agendar Visita</Button>
        </div>

        <div className="text-center mb-16">
          <SectionTitle title="Nossa Estrutura" subtitle="Conheça cada cantinho" align="center" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
             A Casinha Verde foi planejada para ser segura, estimulante e acolhedora. 
             Cada ambiente tem um propósito pedagógico.
          </p>
        </div>

        <div className="space-y-20">
          {STRUCTURE_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
            >
               <div className="w-full md:w-1/2">
                 <div className="relative group">
                    <div className="absolute inset-0 bg-casinha-leaf/20 rounded-[2rem] transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    <img 
                      src={structureImages[item.title] || item.image} 
                      alt={item.title} 
                      className="relative w-full h-80 object-cover rounded-[2rem] shadow-xl border-4 border-white z-10"
                    />
                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-300 rounded-full opacity-50 blur-xl"></div>
                 </div>
               </div>

               <div className="w-full md:w-1/2 space-y-6">
                 <h3 className="text-3xl font-display font-bold text-casinha-brown">{item.title}</h3>
                 <p className="text-lg text-gray-600 leading-relaxed">
                   {item.description}
                 </p>
                 
                 <ul className="space-y-3">
                   {item.features.map((feature, idx) => (
                     <li key={idx} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                       <div className="bg-casinha-light-green/30 p-1 rounded-full text-casinha-leaf">
                         <Check size={16} strokeWidth={3} />
                       </div>
                       <span className="font-bold">{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-casinha-leaf/10 rounded-[3rem] p-12 text-center">
           <h3 className="text-3xl font-display font-bold text-casinha-brown mb-4">Venha ver de perto!</h3>
           <p className="text-gray-600 mb-8 text-lg">Nada substitui a experiência de conhecer nosso espaço pessoalmente.</p>
           <Button size="lg" className="bg-casinha-leaf hover:bg-green-800" onClick={openWhatsApp}>
             Marcar Visita Agora
           </Button>
        </div>

      </div>
    </div>
  );
};