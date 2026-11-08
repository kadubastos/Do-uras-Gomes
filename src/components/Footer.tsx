import React from 'react';
import { Heart, Instagram, Phone, MapPin, ArrowUp } from 'lucide-react';
import { BRAND } from '../data/confectionery';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-wine-950 text-white pt-16 pb-12 border-t border-wine-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-wine-900/80">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-300/40">
                <img
                  src={BRAND.logoUrl}
                  alt="Logo Doçuras da Gomes"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif-brand text-2xl font-bold tracking-tight text-white">
                  {BRAND.name}
                </h3>
                <span className="text-xs uppercase font-semibold tracking-widest text-rose-300">
                  {BRAND.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-rose-100/70 max-w-sm leading-relaxed">
              &ldquo;{BRAND.slogan}&rdquo; Confeitaria artesanal dedicada a criar sobremesas de festa,
              taças supreme e lembranças doces para os seus melhores momentos.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-wine-900 hover:bg-wine-800 flex items-center justify-center text-rose-200 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-wine-900 hover:bg-wine-800 flex items-center justify-center text-rose-200 transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-200">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-rose-100/80">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sobre Nós & Depoimentos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cardápio & Catálogo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('politica')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Política de Encomendas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contato')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Formulário de Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Location */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-200">
              Atendimento & Retirada
            </h4>
            <div className="space-y-2 text-xs text-rose-100/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-300 shrink-0" />
                <span>WhatsApp: {BRAND.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-rose-300 shrink-0" />
                <span>Instagram: {BRAND.instagram}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                <span>Goiânia - GO (Retirada com horário agendado com antecedência de 48h)</span>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] text-rose-300/80 block mb-1">Pagamentos aceitos:</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-rose-200">
                <span className="bg-wine-900 px-2 py-0.5 rounded-sm">Pix Instantâneo</span>
                <span className="bg-wine-900 px-2 py-0.5 rounded-sm">Cartão de Crédito</span>
                <span className="bg-wine-900 px-2 py-0.5 rounded-sm">Cartão de Débito</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-200/60">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-rose-300">
              Feito com <Heart className="w-3 h-3 fill-rose-300 text-rose-300 inline" /> amor
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-rose-200 hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
