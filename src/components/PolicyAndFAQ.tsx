import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Clock, CreditCard, Sparkles } from 'lucide-react';
import { ORDER_POLICY, BRAND } from '../data/confectionery';

export const PolicyAndFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como funciona a política de sinal de 50%?',
      a: 'Para garantir os insumos frescos e reservar o horário de produção exclusivo na nossa agenda, solicitamos 50% do valor total como entrada no momento da confirmação (via Pix ou cartão). Os 50% restantes são quitados no momento da retirada.'
    },
    {
      q: 'Qual a antecedência mínima necessária para encomendar?',
      a: 'Pedimos no mínimo 48 horas de antecedência para encomendas regulares (Taças Supreme, Travessas e Tortas). Para datas festivas especiais (Natal, Dia das Mães, Páscoa), as vagas costumam esgotar rapidamente, por isso recomendamos agendar com 1 a 2 semanas de antecedência.'
    },
    {
      q: 'A Taça Supreme de 2 Litros vem com o recipiente?',
      a: 'Sim! A taça em acrílico cristal resistente e decorativo já está inclusa no valor de R$ 100,00. Ela vai higienizada, decorada com laço e fica com você para ser reutilizada em outros momentos felizes.'
    },
    {
      q: 'Como devo conservar os doces até a hora de servir?',
      a: 'Todas as nossas sobremesas (especialmente as que contêm brigadeiro de ninho cremoso e morangos frescos) devem ser mantidas refrigeradas na geladeira até cerca de 15 minutos antes de servir. O frescor e a consistência ficam perfeitos!'
    },
    {
      q: 'Quais são as formas de pagamento aceitas?',
      a: `Aceitamos ${ORDER_POLICY.paymentMethods.join(', ')}. O Pix é a forma mais rápida e prática para a confirmação imediata da entrada.`
    },
    {
      q: 'Vocês realizam entrega ou é apenas retirada?',
      a: `Trabalhamos preferencialmente com retirada agendada em Goiânia - GO para garantir que as sobremesas cheguem íntegras e impecáveis. Caso você precise de envio por aplicativo de entrega (Uber Flash / 99 Entrega), podemos combinar o agendamento por sua conta.`
    }
  ];

  return (
    <section id="politica" className="py-16 lg:py-20 bg-cream-100/70 border-b border-rose-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-wine-800">
            <HelpCircle className="w-3.5 h-3.5 text-wine-700" />
            <span>Transparência & Cuidado</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-wine-950">
            Política de Encomendas & Dúvidas
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Tudo o que você precisa saber para que sua experiência doce seja perfeita do pedido à degustação.
          </p>
        </div>

        {/* 3 Pillars Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-4 bg-white rounded-xl border border-rose-100 shadow-2xs text-center space-y-1">
            <Clock className="w-5 h-5 text-wine-700 mx-auto" />
            <h4 className="text-xs font-bold text-stone-900 uppercase">Antecedência</h4>
            <p className="text-[11px] text-stone-500">Mínimo 48 horas para preparo artesanal sob demanda</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-rose-100 shadow-2xs text-center space-y-1">
            <CreditCard className="w-5 h-5 text-wine-700 mx-auto" />
            <h4 className="text-xs font-bold text-stone-900 uppercase">Sinal de Entrada</h4>
            <p className="text-[11px] text-stone-500">50% para confirmação e 50% na retirada</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-rose-100 shadow-2xs text-center space-y-1">
            <Sparkles className="w-5 h-5 text-wine-700 mx-auto" />
            <h4 className="text-xs font-bold text-stone-900 uppercase">Frescor Garantido</h4>
            <p className="text-[11px] text-stone-500">Frutas e brigadeiros finalizados no dia agendado</p>
          </div>
        </div>

        {/* Accordion FAQ */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-rose-200/70 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-rose-50/40 transition-colors"
                >
                  <span className="font-serif-brand text-sm sm:text-base font-bold text-wine-950">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-wine-800 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-rose-50 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
