import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { WHATSAPP_NUMBER } from '../constants';

interface ContentContextType {
  whatsapp: string;
  heroImages: string[];
  structureImages: Record<string, string>; // title -> url
  educationImages: Record<string, string>; // id -> url
  loading: boolean;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({
  whatsapp: WHATSAPP_NUMBER,
  heroImages: [],
  structureImages: {},
  educationImages: {},
  loading: true,
  refreshContent: async () => {},
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [whatsapp, setWhatsapp] = useState(WHATSAPP_NUMBER);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [structureImages, setStructureImages] = useState<Record<string, string>>({});
  const [educationImages, setEducationImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase.from('site_content').select('*');
      
      if (error) throw error;

      if (data) {
        data.forEach(item => {
          if (item.key === 'whatsapp_number') setWhatsapp(item.value);
          if (item.key === 'hero_images') setHeroImages(JSON.parse(item.value));
          if (item.key === 'structure_images') setStructureImages(JSON.parse(item.value));
          if (item.key === 'education_images') setEducationImages(JSON.parse(item.value));
        });
      }
    } catch (err) {
      console.error('Erro ao buscar conteúdo:', err);
      // Fallback para valores padrão caso falhe ou não tenha conexão
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ whatsapp, heroImages, structureImages, educationImages, loading, refreshContent: fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);