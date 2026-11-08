import React from 'react';
import { Heart, Sparkles, Clock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { BRAND } from '../data/confectionery';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenOrderForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onOpenOrderForm }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-cream-50 to-cream-100 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-rose-100/70">
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-wine-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-wine-900 tracking-wider uppercase">
              <span className="flex items-center gap-1.5 bg-wine-100/80 text-wine-900 px-3 py-1 rounded-full border border-wine-200/60 shadow-2xs">
                <Heart className="w-3.5 h-3.5 text-wine-700 fill-wine-700" />
                <span>Confeitaria Artesanal de Alta Qualidade</span>
              </span>
              <span className="hidden sm:inline-block text-stone-400">·</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-wine-700" />
                Goiânia e Região
              </span>
            </div>

            {/* Main Title with Playfair Display and balance */}
            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-wine-950 leading-[1.15]" style={{ textWrap: 'balance' }}>
              Aqui cada doce é feito com <span className="italic text-wine-800">muito amor</span> e carinho.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-700 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              Sobremesas refinadas, Taças Supreme de 2 Litros para compartilhar, travessas gourmet,
              bolos no pote e bolos vulcão. O toque especial de doçura que transforma qualquer encontro
              ou comemoração em uma memória inesquecível.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold tracking-wide text-white bg-wine-800 hover:bg-wine-900 active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Explorar Cardápio & Preços</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenOrderForm}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold tracking-wide text-wine-900 bg-white hover:bg-rose-50/70 border border-wine-300/80 active:scale-[0.98] rounded-xl shadow-2xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Fazer Encomenda Online</span>
              </button>
            </div>

            {/* Trust points strip */}
            <div className="pt-6 border-t border-rose-200/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-rose-100/70 text-wine-800 mt-0.5 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">100% Artesanal</h4>
                  <p className="text-xs text-stone-600">Ingredientes nobres e frutas frescas</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-rose-100/70 text-wine-800 mt-0.5 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Sinal Seguro 50%</h4>
                  <p className="text-xs text-stone-600">Reserva de data com total garantia</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-1.5 rounded-lg bg-rose-100/70 text-wine-800 mt-0.5 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Pontualidade</h4>
                  <p className="text-xs text-stone-600">Retirada no horário combinado</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Featuring Authentic Media */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Frame Stack */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back Card with real story highlight */}
              <div className="relative rounded-2xl p-3 bg-white shadow-xl border border-rose-200/80 transition-transform hover:-translate-y-1 duration-300">
                <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-wine-900/10 group">
                  <img
                    src={BRAND.banners.menuGeneral}
                    alt="Cardápio Doçuras da Gomes - Bolos no pote e sobremesas"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-wine-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-xs font-medium tracking-wider uppercase text-rose-200">
                      Cardápio & Especialidades
                    </span>
                    <h3 className="font-serif-brand text-xl font-bold mt-1">
                      Taças Supreme & Travessas Especiais
                    </h3>
                    <p className="text-xs text-rose-100/90 mt-1">
                      Mais de 15 opções artesanais feitas no dia para sua festa ou almoço
                    </p>
                  </div>
                </div>

                {/* Floating Authentic Logo Badge */}
                <div className="absolute -top-5 -left-5 bg-white p-1.5 rounded-full shadow-lg border border-rose-200">
                  <img
                    src={BRAND.logoUrl}
                    alt="Logo Doçuras da Gomes"
                    className="w-16 h-16 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Floating highlight badge */}
                <div className="absolute -bottom-4 -right-3 bg-wine-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-wine-800 text-xs flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-300 fill-rose-300 shrink-0" />
                  <div>
                    <div className="font-bold text-amber-200">Encomendas Abertas</div>
                    <div className="text-[11px] text-rose-100">Reserve com 48h de antecedência</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
