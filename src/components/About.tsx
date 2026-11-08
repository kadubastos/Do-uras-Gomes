import React from 'react';
import { Heart, Sparkles, Award, UtensilsCrossed, CheckCircle2, Instagram } from 'lucide-react';
import { BRAND, TESTIMONIALS } from '../data/confectionery';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-16 lg:py-24 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-wine-800">
            <Heart className="w-3.5 h-3.5 fill-wine-700 text-wine-700" />
            <span>Nossa História & Tradição</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950" style={{ textWrap: 'balance' }}>
            A Arte da Confeitaria com Afeto e Excelência
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Na <strong>{BRAND.name}</strong>, acreditamos que todo dia especial merece ser celebrado com uma sobremesa inesquecível.
            Cada receita é executada manualmente com técnica artesanal, dedicação e os melhores ingredientes do mercado.
          </p>
        </div>

        {/* Story Grid with Authenticity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Visual Gallery from Real Story Media */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-md border border-rose-100 group">
                <img
                  src={BRAND.banners.cheesecakes}
                  alt="Cheesecakes e Pudim Doçuras da Gomes"
                  className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-rose-50/50 text-xs text-stone-700 font-medium border-t border-rose-100">
                  Cheesecakes artesanais & Pudim cremoso
                </div>
              </div>
              <div className="bg-wine-900 text-white p-6 rounded-2xl shadow-md text-center space-y-2">
                <span className="font-serif-brand text-3xl font-bold text-amber-200">100%</span>
                <h4 className="font-semibold text-sm tracking-wide">Produção Manual</h4>
                <p className="text-xs text-rose-100/80 leading-relaxed">
                  Sem misturas prontas industriais. Brigadeiros no ponto ideal de colher e frutas frescas.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="bg-cream-100 p-5 rounded-2xl border border-rose-200/80 text-stone-800 space-y-2">
                <div className="flex items-center gap-1.5 text-wine-800 font-bold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4 text-wine-700" />
                  <span>Destaque das Festas</span>
                </div>
                <h4 className="font-serif-brand text-base font-bold text-wine-950">
                  Taças Supreme de 2 Litros
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Criadas para encantar convidados e servir até 10 porções fartas com camadas visíveis de pura gostosura.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md border border-rose-100 group">
                <img
                  src={BRAND.banners.travessas}
                  alt="Travessas de Sobremesa Doçuras da Gomes"
                  className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-rose-50/50 text-xs text-stone-700 font-medium border-t border-rose-100">
                  Travessas com morangos frescos & brownies
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border-l-2 border-wine-700/60 pl-4 py-1">
              <span className="font-serif-brand text-xl font-bold text-wine-900 block">
                &ldquo;Doce é sempre uma boa ideia!&rdquo;
              </span>
              <p className="text-xs text-stone-500 mt-1">
                Lema oficial Doçuras da Gomes em todas as nossas criações.
              </p>
            </div>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              Nossa confeitaria nasceu em Goiânia com o propósito de levar o verdadeiro sabor artesanal às mesas de famílias,
              aniversários, confraternizações e momentos especiais. Não utilizamos conservantes excessivos nem aromas artificiais;
              nosso segredo é o tempo certo de cozimento e a seleção minuciosa dos ingredientes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-cream-50 border border-rose-100">
                <CheckCircle2 className="w-5 h-5 text-wine-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Frutas Frescas Selecionadas</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Morangos e uvas higienizados e picados perto da montagem.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-cream-50 border border-rose-100">
                <UtensilsCrossed className="w-5 h-5 text-wine-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Brigadeiro Tradicional de Panela</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Cremosidade e textura sedosa que derrete na boca.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-cream-50 border border-rose-100">
                <Sparkles className="w-5 h-5 text-wine-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Embalagens Prontas para Servir</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Design limpo e resistente que valoriza a apresentação na sua mesa.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-cream-50 border border-rose-100">
                <Award className="w-5 h-5 text-wine-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Encomendas Personalizadas</h4>
                  <p className="text-xs text-stone-600 mt-0.5">Sobremesas sob medida para o tamanho da sua reunião.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-wine-900 hover:text-wine-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Acompanhe nosso dia a dia no Instagram {BRAND.instagram}</span>
              </a>
            </div>

          </div>

        </div>

        {/* Customer Feedbacks Strip */}
        <div className="bg-cream-100/90 rounded-2xl p-6 sm:p-10 border border-rose-200/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-wine-800">
                Depoimentos Reais
              </span>
              <h3 className="font-serif-brand text-2xl font-bold text-stone-900 mt-1">
                O que dizem os nossos clientes
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              Retirados dos destaques de feedbacks do nosso perfil oficial
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-xl shadow-xs border border-rose-100/80 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="pt-3 border-t border-rose-50 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-wine-950">{t.name}</h5>
                    <span className="text-[11px] text-stone-500">{t.city}</span>
                  </div>
                  <span className="text-[11px] font-medium text-wine-700 bg-rose-50 px-2 py-0.5 rounded-sm">
                    {t.itemOrdered}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
