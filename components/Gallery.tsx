import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { SectionTitle } from './SectionTitle';
import { X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="structure" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Nossa Estrutura" subtitle="Conheça a Escola" />

        {/* Masonry-like Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
              onClick={() => setSelectedImage(item.src)}
            >
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-casinha-brown/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <ZoomIn size={32} className="mb-2" />
                <span className="font-display font-bold text-lg">{item.alt}</span>
                <span className="text-sm font-body">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-casinha-red transition-colors">
            <X size={40} />
          </button>
          <img 
            src={selectedImage} 
            alt="Gallery preview" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
        </div>
      )}
    </section>
  );
};