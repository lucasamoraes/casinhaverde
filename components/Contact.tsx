import React, { useState, useEffect } from 'react';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';
import { MapPin, Phone, Instagram, Send, Map as MapIcon, ArrowLeft } from 'lucide-react';
import { GOOGLE_MAPS_LINK } from '../constants';
import { useContent } from '../contexts/ContentContext';

interface ContactProps {
  isPage?: boolean;
  onBack?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ isPage = false, onBack }) => {
  const { whatsapp } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    childName: '',
    message: ''
  });

  useEffect(() => {
    if(isPage) {
      window.scrollTo(0, 0);
    }
  }, [isPage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const text = `Olá! Meu nome é *${formData.name}*.\n` +
                 `Gostaria de informações sobre vagas para *${formData.childName}*.\n` +
                 `Telefone para contato: ${formData.phone}.\n\n` +
                 `Mensagem: ${formData.message}`;
    
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${whatsapp}?text=${encodedText}`;
    
    window.open(waUrl, '_blank');
  };

  const openMaps = () => {
    window.open(GOOGLE_MAPS_LINK, '_blank');
  };

  return (
    <section id="contact" className={`bg-casinha-leaf relative overflow-hidden ${isPage ? 'pt-24 pb-20 min-h-screen' : 'py-20'}`}>
      <div className="absolute top-0 right-0 p-12 opacity-10">
         <div className="w-64 h-64 border-8 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {isPage && onBack && (
          <div className="mb-8">
             <Button variant="secondary" size="sm" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft size={16} /> Voltar para Home
             </Button>
          </div>
        )}

        <SectionTitle title="Entre em Contato" subtitle="Venha nos visitar" light />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          
          <div className="space-y-8 text-white">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-display font-bold">Informações</h3>
              
              <div className="flex items-center gap-4">
                <div className="bg-white text-casinha-leaf p-3 rounded-full"><Phone /></div>
                <div>
                  <p className="font-bold">Telefone / WhatsApp</p>
                  <p>{whatsapp.replace(/^55/, '')}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white text-casinha-leaf p-3 rounded-full"><MapPin /></div>
                <div>
                  <p className="font-bold">Endereço</p>
                  <p>Rua das Flores, 123 - Bairro Jardim</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white text-casinha-leaf p-3 rounded-full"><Instagram /></div>
                <div>
                  <p className="font-bold">Instagram</p>
                  <p>@escolacasinhaverde</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-gray-200 rounded-3xl overflow-hidden shadow-lg relative group">
              <img src="https://picsum.photos/800/400?grayscale" alt="Mapa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Button variant="primary" onClick={openMaps} className="flex items-center gap-2">
                   <MapIcon size={18} /> Como Chegar
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl font-display font-bold text-casinha-brown mb-6">Agende sua visita</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-600 ml-2">Nome do Responsável</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-3 rounded-full bg-gray-50 border border-gray-200 focus:border-casinha-green focus:ring-2 focus:ring-casinha-green/20 outline-none transition-all" 
                    placeholder="Seu nome" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-600 ml-2">Telefone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-3 rounded-full bg-gray-50 border border-gray-200 focus:border-casinha-green focus:ring-2 focus:ring-casinha-green/20 outline-none transition-all" 
                    placeholder="(00) 00000-0000" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-600 ml-2">Nome da Criança e Idade</label>
                <input 
                  type="text" 
                  name="childName"
                  required
                  value={formData.childName}
                  onChange={handleChange}
                  className="w-full px-6 py-3 rounded-full bg-gray-50 border border-gray-200 focus:border-casinha-green focus:ring-2 focus:ring-casinha-green/20 outline-none transition-all" 
                  placeholder="Ex: João, 3 anos" 
                />
              </div>

              <div className="space-y-1">
                 <label className="text-sm font-bold text-gray-600 ml-2">Mensagem (Opcional)</label>
                 <textarea 
                   rows={4} 
                   name="message"
                   value={formData.message}
                   onChange={handleChange}
                   className="w-full px-6 py-3 rounded-3xl bg-gray-50 border border-gray-200 focus:border-casinha-green focus:ring-2 focus:ring-casinha-green/20 outline-none transition-all resize-none" 
                   placeholder="Gostaria de agendar para o período da manhã..."
                 ></textarea>
              </div>

              <Button type="submit" className="w-full mt-4 flex items-center justify-center gap-2" size="lg">
                 Enviar para WhatsApp <Send size={18} />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};