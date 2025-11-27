import React from 'react';
import { EDUCATION_LEVELS } from '../constants';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

interface EducationProps {
  onNavigate: (page: string, id: string) => void;
}

export const Education: React.FC<EducationProps> = ({ onNavigate }) => {
  return (
    <section id="education" className="py-20 bg-casinha-light-green/20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle title="Nossas Turmas" subtitle="Educação Infantil" />
        
        <div className="space-y-12">
          {EDUCATION_LEVELS.map((level, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 bg-white p-6 md:p-8 rounded-[3rem] shadow-md hover:shadow-xl transition-shadow`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative overflow-hidden rounded-3xl h-64 md:h-80 group">
                  <img 
                    src={level.image} 
                    alt={level.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-casinha-brown/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-4">
                <div className="inline-block px-3 py-1 bg-casinha-leaf text-white text-sm font-bold rounded-full">
                  {level.age}
                </div>
                <h3 className="text-3xl font-display font-bold text-casinha-brown">{level.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {level.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="mt-4 border-casinha-leaf text-casinha-leaf hover:bg-casinha-leaf hover:text-white"
                  onClick={() => onNavigate('education-detail', level.id)}
                >
                  Saiba mais <ArrowRight size={18} className="ml-2 inline" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative SVG Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF"></path>
        </svg>
      </div>
    </section>
  );
};