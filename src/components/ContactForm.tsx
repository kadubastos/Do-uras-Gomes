import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, Calendar, Mail, User, MessageSquare, Sparkles, Check, Copy } from 'lucide-react';
import { BRAND, ORDER_POLICY } from '../data/confectionery';
import { CartItem } from './OrderDrawer';

interface ContactFormProps {
  cartItems: CartItem[];
  prefilledProduct?: string;
  onClearCart: () => void;
}

interface FormState {
  nome: string;
  whatsapp: string;
  email: string;
  tipoPedido: string;
  dataEvento: string;
  mensagem: string;
  aceiteTermos: boolean;
}

interface FormErrors {
  nome?: string;
  whatsapp?: string;
  email?: string;
  tipoPedido?: string;
  dataEvento?: string;
  mensagem?: string;
  aceiteTermos?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  cartItems,
  prefilledProduct,
  onClearCart,
}) => {
  const [formData, setFormData] = useState<FormState>({
    nome: '',
    whatsapp: '',
    email: '',
    tipoPedido: 'encomenda',
    dataEvento: '',
    mensagem: '',
    aceiteTermos: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    protocol: string;
    data: FormState;
    cartSummary?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Calculate min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  // Auto-populate message when cart items change or prefilledProduct is passed
  useEffect(() => {
    if (cartItems.length > 0) {
      let text = 'Itens selecionados na sacola:\n';
      cartItems.forEach((item) => {
        text += `- ${item.quantity}x ${item.product.name} (${item.product.formattedPrice})`;
        if (item.notes) text += ` [${item.notes}]`;
        text += '\n';
      });
      text += '\nGostaria de verificar a disponibilidade para retirada.';
      setFormData((prev) => ({
        ...prev,
        tipoPedido: 'encomenda',
        mensagem: text,
      }));
    } else if (prefilledProduct) {
      setFormData((prev) => ({
        ...prev,
        mensagem: `Olá! Tenho interesse em: ${prefilledProduct}. Poderiam me passar mais informações e disponibilidade?`,
      }));
    }
  }, [cartItems, prefilledProduct]);

  // Phone mask helper: (62) 98138-0524
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  // Validate entire form or single field
  const validate = (data: FormState): FormErrors => {
    const errs: FormErrors = {};

    // Nome
    if (!data.nome.trim()) {
      errs.nome = 'O nome completo é obrigatório.';
    } else if (data.nome.trim().length < 3) {
      errs.nome = 'Digite pelo menos 3 caracteres no nome.';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(data.nome.trim())) {
      errs.nome = 'O nome deve conter apenas letras e espaços.';
    }

    // WhatsApp
    const rawDigits = data.whatsapp.replace(/\D/g, '');
    if (!rawDigits) {
      errs.whatsapp = 'O número do WhatsApp é obrigatório para contato.';
    } else if (rawDigits.length < 10 || rawDigits.length > 11) {
      errs.whatsapp = 'Número inválido. Digite DDD + número (ex: 62 98138-0524).';
    }

    // Email
    if (!data.email.trim()) {
      errs.email = 'O e-mail é obrigatório para envio do protocolo.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Por favor, digite um endereço de e-mail válido.';
    }

    // Data evento (se for encomenda)
    if (data.tipoPedido === 'encomenda' || data.tipoPedido === 'evento') {
      if (!data.dataEvento) {
        errs.dataEvento = 'Informe a data desejada para a retirada da encomenda.';
      } else {
        const selectedDate = new Date(data.dataEvento + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          errs.dataEvento = 'A data de retirada não pode ser no passado.';
        }
      }
    }

    // Mensagem
    if (!data.mensagem.trim()) {
      errs.mensagem = 'Por favor, descreva seu pedido ou dúvida.';
    } else if (data.mensagem.trim().length < 10) {
      errs.mensagem = 'A mensagem deve ter pelo menos 10 caracteres.';
    }

    // Aceite Termos
    if (!data.aceiteTermos) {
      errs.aceiteTermos = 'É necessário confirmar o termo de sinal de 50% para prosseguir.';
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => {
        const updated = { ...prev, [name]: checked };
        if (touched[name]) setErrors(validate(updated));
        return updated;
      });
    } else if (name === 'whatsapp') {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => {
        const updated = { ...prev, whatsapp: formatted };
        if (touched.whatsapp) setErrors(validate(updated));
        return updated;
      });
    } else {
      setFormData((prev) => {
        const updated = { ...prev, [name]: value };
        if (touched[name]) setErrors(validate(updated));
        return updated;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all as touched
    const allTouched: Record<string, boolean> = {
      nome: true,
      whatsapp: true,
      email: true,
      tipoPedido: true,
      dataEvento: true,
      mensagem: true,
      aceiteTermos: true,
    };
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate fast network dispatch
      setTimeout(() => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const protocol = `DG-${new Date().getFullYear()}-${randomNum}`;
        setSubmittedData({
          protocol,
          data: { ...formData },
        });
        setIsSubmitting(false);
        onClearCart();
      }, 700);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      nome: '',
      whatsapp: '',
      email: '',
      tipoPedido: 'encomenda',
      dataEvento: '',
      mensagem: '',
      aceiteTermos: false,
    });
    setTouched({});
    setErrors({});
  };

  const getWhatsAppSubmissionLink = () => {
    if (!submittedData) return BRAND.whatsappUrl;
    const { protocol, data } = submittedData;
    let msg = `*Novo Contato / Encomenda - Doçuras da Gomes*%0A`;
    msg += `*Protocolo:* ${protocol}%0A`;
    msg += `*Nome:* ${data.nome}%0A`;
    msg += `*Telefone:* ${data.whatsapp}%0A`;
    msg += `*E-mail:* ${data.email}%0A`;
    msg += `*Tipo:* ${data.tipoPedido}%0A`;
    if (data.dataEvento) msg += `*Data desejada:* ${data.dataEvento}%0A`;
    msg += `%0A*Mensagem e Itens:*%0A${encodeURIComponent(data.mensagem)}%0A%0A`;
    msg += `_Cliente confirmou ciência do sinal de 50% para reserva._`;
    return `https://wa.me/${BRAND.phoneRaw}?text=${msg}`;
  };

  const copyProtocol = () => {
    if (submittedData) {
      navigator.clipboard.writeText(submittedData.protocol);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contato" className="py-16 lg:py-24 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-wine-800">
            <Send className="w-3.5 h-3.5 text-wine-700" />
            <span>Fale com a Confeiteira</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950">
            Faça sua Encomenda ou Tire Dúvidas
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Preencha o formulário abaixo com os detalhes do seu pedido ou evento.
            Validamos sua solicitação e entramos em contato para formalizar a reserva e os dados do sinal de 50%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-cream-100 border border-rose-200/80 space-y-4">
              <h3 className="font-serif-brand text-xl font-bold text-wine-950">
                Informações de Atendimento
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Respondemos rapidamente para agendar sua encomenda com carinho e pontualidade.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-rose-100 hover:border-wine-300 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">WhatsApp Oficial</span>
                    <span className="text-xs font-bold text-stone-800 group-hover:text-wine-800">{BRAND.phone}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-rose-100">
                  <div className="p-2 rounded-lg bg-rose-50 text-wine-800">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Antecedência</span>
                    <span className="text-xs font-semibold text-stone-800">{ORDER_POLICY.anticipation}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-rose-100">
                  <div className="p-2 rounded-lg bg-rose-50 text-wine-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Regra do Sinal</span>
                    <span className="text-xs font-semibold text-stone-800">50% na reserva + 50% na retirada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner visual reminder from user attachments */}
            <div className="rounded-2xl overflow-hidden border border-rose-100 shadow-xs group">
              <img
                src={BRAND.banners.encomendasInfo}
                alt="Regras de Encomendas Doçuras da Gomes"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

          {/* Right Column: Interactive Form with Validation */}
          <div className="lg:col-span-7">
            <div className="bg-cream-50/80 rounded-2xl p-6 sm:p-8 border border-rose-200/90 shadow-sm relative">
              
              {submittedData ? (
                /* Success View with simulated protocol & WhatsApp jump */
                <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Solicitação Registrada com Sucesso!
                    </span>
                    <h3 className="font-serif-brand text-2xl font-bold text-wine-950">
                      Obrigado, {submittedData.data.nome.split(' ')[0]}!
                    </h3>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      Recebemos seus dados. Um resumo foi preparado e você pode confirmar diretamente pelo WhatsApp agora mesmo.
                    </p>
                  </div>

                  {/* Protocol Card */}
                  <div className="max-w-sm mx-auto p-4 bg-white rounded-xl border border-rose-200 shadow-2xs space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                      Protocolo do Pedido
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono font-bold text-lg text-wine-900 tabular-nums">
                        {submittedData.protocol}
                      </span>
                      <button
                        onClick={copyProtocol}
                        className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
                        title="Copiar protocolo"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Data prevista: <strong>{submittedData.data.dataEvento || 'A combinar'}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={getWhatsAppSubmissionLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Agilizar no WhatsApp</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Nova Solicitação
                    </button>
                  </div>

                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Nome Completo <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="nome"
                        placeholder="Ex: Maria Carolina Bastos"
                        value={formData.nome}
                        onChange={handleChange}
                        onBlur={() => handleBlur('nome')}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white border text-stone-800 transition-all ${
                          touched.nome && errors.nome
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-rose-200 focus:border-wine-700 focus:ring-1 focus:ring-wine-700'
                        }`}
                      />
                    </div>
                    {touched.nome && errors.nome && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.nome}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1">
                        WhatsApp com DDD <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          name="whatsapp"
                          placeholder="(62) 99999-9999"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          onBlur={() => handleBlur('whatsapp')}
                          className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white border text-stone-800 transition-all ${
                            touched.whatsapp && errors.whatsapp
                              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                              : 'border-rose-200 focus:border-wine-700 focus:ring-1 focus:ring-wine-700'
                          }`}
                        />
                      </div>
                      {touched.whatsapp && errors.whatsapp && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.whatsapp}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1">
                        E-mail de Contato <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          name="email"
                          placeholder="seuemail@exemplo.com"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur('email')}
                          className={`w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-white border text-stone-800 transition-all ${
                            touched.email && errors.email
                              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                              : 'border-rose-200 focus:border-wine-700 focus:ring-1 focus:ring-wine-700'
                          }`}
                        />
                      </div>
                      {touched.email && errors.email && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Type of Request & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1">
                        Tipo de Solicitação <span className="text-rose-600">*</span>
                      </label>
                      <select
                        name="tipoPedido"
                        value={formData.tipoPedido}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs rounded-xl bg-white border border-rose-200 text-stone-800 focus:border-wine-700 focus:ring-1 focus:ring-wine-700"
                      >
                        <option value="encomenda">Encomenda para Data Específica</option>
                        <option value="evento">Festa / Casamento / Confraternização</option>
                        <option value="duvida">Dúvidas sobre o Cardápio / Ingredientes</option>
                        <option value="orcamento">Orçamento Personalizado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1">
                        Data Prevista para Retirada
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="dataEvento"
                          min={minDateString}
                          value={formData.dataEvento}
                          onChange={handleChange}
                          onBlur={() => handleBlur('dataEvento')}
                          className={`w-full px-3 py-2.5 text-xs rounded-xl bg-white border text-stone-800 transition-all ${
                            touched.dataEvento && errors.dataEvento
                              ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                              : 'border-rose-200 focus:border-wine-700 focus:ring-1 focus:ring-wine-700'
                          }`}
                        />
                      </div>
                      {touched.dataEvento && errors.dataEvento && (
                        <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.dataEvento}</span>
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-stone-800">
                        Detalhes do Pedido ou Mensagem <span className="text-rose-600">*</span>
                      </label>
                      <span className="text-[10px] text-stone-400">
                        {formData.mensagem.length} caracteres
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        name="mensagem"
                        rows={4}
                        placeholder="Descreva quais sobremesas deseja (ex: 1 Taça Supreme Sensação, 2 Bolos de Pote Ninho com Morango), horário preferido de retirada ou dúvidas..."
                        value={formData.mensagem}
                        onChange={handleChange}
                        onBlur={() => handleBlur('mensagem')}
                        className={`w-full p-3 text-xs rounded-xl bg-white border text-stone-800 leading-relaxed transition-all ${
                          touched.mensagem && errors.mensagem
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-rose-200 focus:border-wine-700 focus:ring-1 focus:ring-wine-700'
                        }`}
                      />
                    </div>
                    {touched.mensagem && errors.mensagem && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.mensagem}</span>
                      </p>
                    )}
                  </div>

                  {/* Terms acceptance checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="aceiteTermos"
                        checked={formData.aceiteTermos}
                        onChange={handleChange}
                        onBlur={() => handleBlur('aceiteTermos')}
                        className="mt-0.5 w-4 h-4 text-wine-800 rounded-sm border-rose-300 focus:ring-wine-700 cursor-pointer"
                      />
                      <span className="text-[11px] text-stone-600 leading-snug">
                        Estou ciente de que a reserva da encomenda só é confirmada mediante o pagamento do sinal de <strong>50% de entrada</strong>, com os outros 50% pagos na retirada.
                      </span>
                    </label>
                    {touched.aceiteTermos && errors.aceiteTermos && (
                      <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.aceiteTermos}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-wine-800 hover:bg-wine-900 active:scale-[0.99] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Validando e Registrando...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Solicitação de Encomenda</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-stone-400 mt-2">
                      Seus dados são usados exclusivamente para a comunicação da sua encomenda.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
