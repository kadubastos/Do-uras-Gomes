import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, Heart } from 'lucide-react';
import { BRAND } from '../data/confectionery';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Sobre Nós', id: 'sobre' },
    { label: 'Cardápio & Catálogo', id: 'catalogo' },
    { label: 'Encomendas', id: 'politica' },
    { label: 'Fale Conosco', id: 'contato' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Single text element wordmark / brand mark */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-wine-700/30 shadow-xs shrink-0 transition-transform group-hover:scale-105">
              <img 
                src={BRAND.logoUrl} 
                alt="Doçuras da Gomes Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-brand text-xl sm:text-2xl font-bold tracking-tight text-wine-900 leading-none group-hover:text-wine-700 transition-colors">
                {BRAND.name}
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-rose-800/80 mt-0.5">
                {BRAND.tagline}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-wine-800 transition-colors py-1 relative text-stone-700 font-medium hover:underline underline-offset-8 decoration-wine-700/50 cursor-pointer whitespace-nowrap shrink-0"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Cart Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-wine-800 hover:bg-rose-50/80 transition-all border border-rose-200/60 flex items-center justify-center cursor-pointer"
              aria-label="Abrir pedido selecionado"
              title="Sacola de Pedidos"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-wine-700 text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Call to Action */}
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-wine-800 hover:bg-wine-900 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Pedir no WhatsApp</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg text-stone-700 hover:bg-rose-50 transition-colors focus:outline-hidden"
              aria-label="Alternar menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-rose-100 bg-white/98 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left px-3 py-2.5 text-base font-medium text-stone-800 hover:bg-rose-50 hover:text-wine-800 rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-rose-100 flex flex-col gap-2">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-wine-800 hover:bg-wine-900 rounded-lg shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Atendimento WhatsApp {BRAND.phone}</span>
              </a>
              <div className="text-center text-xs text-stone-500 pt-1 flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-wine-600 fill-wine-600" />
                <span>Doces feitos artesanalmente com amor</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
