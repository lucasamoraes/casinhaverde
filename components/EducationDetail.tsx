import React, { useEffect } from 'react';
import { EDUCATION_LEVELS } from '../constants';
import { Button } from './Button';
import { SectionTitle } from './SectionTitle';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface EducationDetailProps {
  levelId: string;
  onBack: () => void;
}

export const EducationDetail: React.FC<EducationDetailProps> = ({ levelId, onBack }) => {
  const { whatsapp, educationImages } = useContent();
  const level = EDUCATION_LEVELS.find(l => l.id === levelId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [levelId]);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsapp}?text=Olá! Gostaria de agendar uma visita para a turma: ${level?.title}.`, '_blank');
  };

  if (!level) return <div>Nível não encontrado</div>;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        
        <Button variant="outline" size="sm" onClick={onBack} className="mb-8 flex items-center gap-2">
          <ArrowLeft size={16} /> Voltar para Home
        </Button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
           <div className="relative">
              <div className="absolute inset-0 bg-casinha-leaf rounded-[2rem] transform rotate-3"></div>
              <img 
                src={educationImages[level.id] || level.image} 
                alt={level.title} 
                className="relative rounded-[2rem] shadow-2xl w-full aspect-square object-cover border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                 <p className="text-casinha-leaf font-bold text-lg flex items-center gap-2">
                   <Clock size={20} /> Rotina
                 </p>
                 <p className="text-sm text-gray-600 mt-1 max-w-[200px]">{level.details?.schedule}</p>
              </div>
           </div>

           <div className="space-y-8">
             <div>
                <span className="inline-block px-4 py-1 bg-casinha-leaf text-white font-bold rounded-full mb-4">
                  {level.age}
                </span>
                <SectionTitle title={level.title} subtitle="Detalhes da Turma" align="left" />
                <p className="text-xl text-gray-700 leading-relaxed font-body">
                  {level.details?.intro}
                </p>
             </div>

             <div className="bg-white p-8 rounded-3xl shadow-lg border border-casinha-light-green/30">
               <h3 className="text-2xl font-display font-bold text-casinha-brown mb-6">Atividades Principais</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {level.details?.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                       <div className="text-casinha-leaf"><CheckCircle size={20} /></div>
                       <span className="font-bold text-gray-700">{activity}</span>
                    </div>
                  ))}
               </div>
             </div>

             <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
               <h4 className="font-bold text-casinha-brown mb-2 text-lg">Interessado nesta turma?</h4>
               <p className="text-gray-600 mb-4">Agende uma visita para conhecer o espaço e as professoras.</p>
               <Button onClick={openWhatsApp}>Agendar Visita no WhatsApp</Button>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};