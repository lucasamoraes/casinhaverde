import React from 'react';
import { Heart, MapPin, Phone, Lock } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface FooterProps {
  onNavigate: (page: string, id?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { whatsapp } = useContent();
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-casinha-brown text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <h2 className="font-display font-bold text-3xl">Casinha Verde</h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Um espaço de acolhimento, afeto e desenvolvimento integral para o seu filho.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/70 pt-2">
              <span className="flex items-center gap-2"><MapPin size={16}/> Rua das Flores, 123 - Bairro Jardim</span>
              <span className="flex items-center gap-2"><Phone size={16}/> (11) 99999-9999</span>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4 text-casinha-light-green">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => handleLinkClick('home')} className="text-white/80 hover:text-white hover:translate-x-1 transition-all">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('structure')} className="text-white/80 hover:text-white hover:translate-x-1 transition-all">
                  Estrutura
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="text-white/80 hover:text-white hover:translate-x-1 transition-all">
                  Contato e Matrículas
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4 text-casinha-light-green">Informações</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <button onClick={() => handleLinkClick('privacy')} className="hover:text-white transition-colors text-left">
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('terms')} className="hover:text-white transition-colors text-left">
                  Termos de Uso
                </button>
              </li>
              <li className="pt-4">
                 <button 
                   onClick={() => window.open(`https://wa.me/${whatsapp}`, '_blank')}
                   className="px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-casinha-brown transition-colors"
                 >
                   Fale no WhatsApp
                 </button>
              </li>
              <li className="pt-2">
                <button onClick={() => handleLinkClick('admin')} className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-xs">
                  <Lock size={12} /> Área Restrita
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© {currentYear} Escola Infantil Casinha Verde. Todos os direitos reservados.</p>
          
          <p className="flex items-center gap-2">
             Feito com <Heart size={14} className="text-casinha-red fill-current animate-pulse" /> para nossas crianças
          </p>
        </div>
      </div>
    </footer>
  );
};