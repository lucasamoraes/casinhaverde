import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useContent } from '../../contexts/ContentContext';
import { Button } from '../Button';
import { LogOut, Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { EDUCATION_LEVELS, STRUCTURE_ITEMS } from '../../constants';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { whatsapp, heroImages, structureImages, educationImages, refreshContent } = useContent();
  const [activeTab, setActiveTab] = useState<'geral' | 'banner' | 'estrutura' | 'turmas'>('geral');
  const [loading, setLoading] = useState(false);
  
  // Estados locais para edição
  const [tempWhatsapp, setTempWhatsapp] = useState(whatsapp);
  const [statusMsg, setStatusMsg] = useState<{ type: 'info' | 'success' | 'error', text: string } | null>(null);

  const handleUpload = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      // Gera nome único para evitar conflitos e caracteres especiais
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      console.log(`Iniciando upload para: ${filePath}`);

      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      return urlData.publicUrl;
    } catch (error: any) {
      console.error('Erro detalhado do upload:', error);
      
      let msg = error.message || 'Erro desconhecido ao fazer upload.';
      
      // Tratamento de erros comuns do Supabase para ajudar o usuário
      if (msg.includes('The resource was not found') || error.statusCode === '404') {
        msg = 'ERRO CRÍTICO: O Bucket "images" não existe no Supabase. Vá ao SQL Editor e rode: insert into storage.buckets (id, name, public) values (\'images\', \'images\', true);';
      } else if (msg.includes('violates row-level security')) {
        msg = 'Permissão negada. Verifique se as Políticas (RLS) de Storage foram criadas corretamente no Supabase.';
      }

      setStatusMsg({ type: 'error', text: msg });
      return null;
    }
  };

  const saveData = async (key: string, value: any) => {
    setLoading(true);
    setStatusMsg(null);
    try {
      const { error } = await supabase.from('site_content').upsert({ 
        key, 
        value: typeof value === 'string' ? value : JSON.stringify(value) 
      });

      if (error) throw error;
      setStatusMsg({ type: 'success', text: 'Salvo com sucesso!' });
      await refreshContent();
    } catch (error: any) {
      console.error('Erro ao salvar:', error);
      setStatusMsg({ type: 'error', text: `Erro ao salvar dados: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  // Handlers específicos
  const handleWhatsappSave = () => saveData('whatsapp_number', tempWhatsapp);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files || !e.target.files[0]) return;
    setStatusMsg({ type: 'info', text: 'Enviando imagem...' });
    setLoading(true);
    
    const url = await handleUpload(e.target.files[0], 'banners');
    
    if (url) {
      const newImages = [...heroImages];
      // Garante que o array tenha tamanho suficiente
      while(newImages.length <= index) newImages.push("");
      newImages[index] = url;
      await saveData('hero_images', newImages);
    } else {
      setLoading(false); // Remove loading se falhar
    }
  };

  const handleStructureUpload = async (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
    if (!e.target.files || !e.target.files[0]) return;
    setStatusMsg({ type: 'info', text: 'Enviando imagem...' });
    setLoading(true);

    const url = await handleUpload(e.target.files[0], 'structure');
    
    if (url) {
      const newImages = { ...structureImages, [title]: url };
      await saveData('structure_images', newImages);
    } else {
      setLoading(false);
    }
  };

  const handleEducationUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (!e.target.files || !e.target.files[0]) return;
    setStatusMsg({ type: 'info', text: 'Enviando imagem...' });
    setLoading(true);

    const url = await handleUpload(e.target.files[0], 'education');
    
    if (url) {
      const newImages = { ...educationImages, [id]: url };
      await saveData('education_images', newImages);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm">
           <h1 className="text-2xl font-display font-bold text-casinha-brown">Painel Administrativo</h1>
           <div className="flex gap-4">
             <Button variant="secondary" size="sm" onClick={() => window.location.href = '/'}>Ver Site</Button>
             <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center gap-2">
               <LogOut size={16} /> Sair
             </Button>
           </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar Menu */}
          <div className="md:col-span-1 space-y-2">
            {[
              { id: 'geral', label: 'Geral (WhatsApp)' },
              { id: 'banner', label: 'Banner Home' },
              { id: 'estrutura', label: 'Estrutura' },
              { id: 'turmas', label: 'Turmas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setStatusMsg(null); }}
                className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-casinha-leaf text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 bg-white rounded-[2rem] p-8 shadow-xl min-h-[500px]">
            {statusMsg && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                statusMsg.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
                statusMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {statusMsg.type === 'error' ? <AlertCircle className="shrink-0 mt-0.5" size={18} /> : 
                 statusMsg.type === 'success' ? <CheckCircle className="shrink-0 mt-0.5" size={18} /> : 
                 <RefreshCw className={`shrink-0 mt-0.5 ${loading ? 'animate-spin' : ''}`} size={18} />}
                <p className="text-sm font-bold">{statusMsg.text}</p>
              </div>
            )}

            {activeTab === 'geral' && (
              <div className="space-y-6">
                <h3 className="text-xl font-display font-bold text-casinha-brown">Configurações Gerais</h3>
                <div className="space-y-2">
                  <label className="font-bold text-gray-600">Número do WhatsApp (apenas números)</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={tempWhatsapp} 
                      onChange={(e) => setTempWhatsapp(e.target.value)}
                      className="flex-1 px-6 py-3 rounded-full bg-gray-50 border border-gray-200 outline-none focus:border-casinha-leaf focus:ring-2 focus:ring-casinha-light-green/20"
                    />
                    <Button onClick={handleWhatsappSave} disabled={loading} className="flex items-center gap-2">
                      <Save size={18} /> Salvar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">Este número será usado em todos os botões de contato do site.</p>
                </div>
              </div>
            )}

            {activeTab === 'banner' && (
              <div className="space-y-6">
                <h3 className="text-xl font-display font-bold text-casinha-brown">Imagens da Casinha (Hero)</h3>
                <p className="text-gray-500 text-sm">São exibidas 3 imagens rotativas dentro da casinha.</p>
                
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="border border-gray-100 p-4 rounded-2xl flex items-center gap-4 hover:border-casinha-light-green transition-colors">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                      {(heroImages[idx]) ? (
                        <img src={heroImages[idx]} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs">Sem Imagem</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-casinha-brown mb-2">Imagem {idx + 1}</p>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleBannerUpload(e, idx)}
                        disabled={loading}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-casinha-light-green/20 file:text-casinha-leaf hover:file:bg-casinha-light-green/30 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'estrutura' && (
              <div className="space-y-6">
                 <h3 className="text-xl font-display font-bold text-casinha-brown">Imagens da Estrutura</h3>
                 {STRUCTURE_ITEMS.map((item, idx) => (
                   <div key={idx} className="border-b border-gray-100 pb-6 last:border-0">
                     <p className="font-bold text-lg text-casinha-brown mb-3">{item.title}</p>
                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-32 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-sm relative group">
                          <img 
                            src={structureImages[item.title] || item.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleStructureUpload(e, item.title)}
                          disabled={loading}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-casinha-light-green/20 file:text-casinha-leaf hover:file:bg-casinha-light-green/30 cursor-pointer"
                        />
                     </div>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === 'turmas' && (
              <div className="space-y-6">
                 <h3 className="text-xl font-display font-bold text-casinha-brown">Imagens das Turmas</h3>
                 {EDUCATION_LEVELS.map((level, idx) => (
                   <div key={idx} className="border-b border-gray-100 pb-6 last:border-0">
                     <p className="font-bold text-lg text-casinha-brown mb-3">{level.title}</p>
                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-32 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                          <img 
                            src={educationImages[level.id] || level.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleEducationUpload(e, level.id)}
                          disabled={loading}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-casinha-light-green/20 file:text-casinha-leaf hover:file:bg-casinha-light-green/30 cursor-pointer"
                        />
                     </div>
                   </div>
                 ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};