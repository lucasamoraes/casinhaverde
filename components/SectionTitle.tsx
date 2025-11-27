import React from 'react';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  subtitle, 
  title, 
  align = 'center',
  light = false
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col ${alignmentClass[align]} mb-12`}>
      {subtitle && (
        <span className={`uppercase tracking-widest text-sm font-bold mb-2 ${light ? 'text-white/80' : 'text-casinha-red'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-4xl md:text-5xl font-display font-bold relative inline-block ${light ? 'text-white' : 'text-casinha-brown'}`}>
        {title}
        {/* Decorative underline/squiggle */}
        <svg className={`absolute -bottom-4 w-full h-3 ${light ? 'text-white/50' : 'text-casinha-green'} left-0`} viewBox="0 0 100 10" preserveAspectRatio="none">
           <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
      </h2>
    </div>
  );
};