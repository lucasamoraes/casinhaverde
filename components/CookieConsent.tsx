import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Cookie } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentDate = localStorage.getItem('cookieConsentDate');
    
    if (consentDate) {
      const date = new Date(consentDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Se passou menos de 30 dias, não mostra
      if (diffDays < 30) {
        return;
      }
    }

    // Se não tem data ou já passou 30 dias, mostra
    // Pequeno delay para animação de entrada
    setTimeout(() => setIsVisible(true), 1000);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6">
      <div className="container mx-auto max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border-2 border-casinha-green animate-slide-up">
        
        <div className="hidden md:flex bg-casinha-light-green/20 p-4 rounded-full text-casinha-leaf">
           <Cookie size={32} />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h4 className="font-display font-bold text-lg text-casinha-brown mb-2 flex items-center justify-center md:justify-start gap-2">
            <Cookie size={20} className="md:hidden text-casinha-leaf" />
            Nós usamos cookies
          </h4>
          <p className="text-sm text-gray-600">
            Utilizamos cookies para melhorar sua experiência em nosso site. 
            Ao continuar navegando, você concorda com nossa <button className="text-casinha-leaf font-bold underline hover:text-casinha-green">Política de Privacidade</button>.
            Esta aceitação é válida por 30 dias.
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Button 
            variant="primary" 
            className="w-full md:w-auto bg-casinha-leaf hover:bg-green-800"
            onClick={handleAccept}
          >
            Aceitar e Continuar
          </Button>
        </div>

      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};