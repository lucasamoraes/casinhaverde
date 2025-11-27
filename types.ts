import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: 'Estrutura' | 'Atividades' | 'Eventos';
}

export interface Review {
  name: string;
  role: string;
  text: string;
}

export interface StructureItem {
  title: string;
  description: string;
  image: string;
  features: string[];
}