import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Phone, AlertCircle } from 'lucide-react';
import { Product, BRAND } from '../data/confectionery';

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number, notes?: string) => void;
  onRemoveItem: (productId: string, notes?: string) => void;
  onClearCart: () => void;
  onProceedToForm: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToForm,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const depositAmount = totalAmount * 0.5;
  const remainingAmount = totalAmount * 0.5;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const generateWhatsAppMessage = () => {
    let msg = `Olá, Doçuras da Gomes! Gostaria de fazer uma encomenda:%0A%0A`;
    items.forEach((item) => {
      msg += `• *${item.quantity}x* ${item.product.name} (${item.product.formattedPrice})`;
      if (item.notes) msg += ` - _${item.notes}_`;
      msg += `%0A`;
    });
    msg += `%0A*Total:* ${formatBRL(totalAmount)}`;
    msg += `%0A*Sinal 50%:* ${formatBRL(depositAmount)}`;
    msg += `%0A*Restante na retirada:* ${formatBRL(remainingAmount)}`;
    msg += `%0A%0AQual a disponibilidade para a data desejada?`;
    return `https://wa.me/${BRAND.phoneRaw}?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-rose-100">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-rose-100 bg-cream-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-100 rounded-lg text-wine-800">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-brand text-lg font-bold text-wine-950">
                  Sua Sacola de Encomendas
                </h3>
                <span className="text-xs text-stone-500">
                  {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-rose-100/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-brand text-base font-bold text-stone-700">
                  Sua sacola está vazia
                </h4>
                <p className="text-xs text-stone-500 max-w-xs">
                  Adicione delícias do cardápio como Taças Supreme, Travessas ou Bolos de Pote para montar seu pedido.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-wine-800 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors cursor-pointer"
                >
                  Explorar Cardápio
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${index}-${item.notes || ''}`}
                    className="p-3.5 rounded-xl bg-cream-50/70 border border-rose-100/80 flex items-start gap-3"
                  >
                    <div className="w-14 h-14 rounded-lg bg-rose-100 overflow-hidden shrink-0">
                      {item.product.imageStory ? (
                        <img
                          src={item.product.imageStory}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-wine-800 text-xs font-bold">
                          Doce
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-wine-950 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.notes)}
                          className="text-stone-400 hover:text-rose-700 p-0.5"
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.notes && (
                        <span className="text-[11px] text-wine-700 italic block mt-0.5">
                          {item.notes}
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-rose-100/60">
                        <span className="text-xs font-bold text-stone-900 tabular-nums">
                          {formatBRL(item.product.price * item.quantity)}
                        </span>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-lg border border-rose-200">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1, item.notes)}
                            className="text-stone-500 hover:text-stone-800 font-bold text-xs w-4 h-4 flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold px-1 tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1, item.notes)}
                            className="text-stone-500 hover:text-stone-800 font-bold text-xs w-4 h-4 flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-stone-400 hover:text-rose-700 underline cursor-pointer"
                  >
                    Esvaziar sacola
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer with Calculations */}
          {items.length > 0 && (
            <div className="p-5 border-t border-rose-100 bg-cream-50 space-y-4">
              
              {/* Financial summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Subtotal dos Doces:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{formatBRL(totalAmount)}</span>
                </div>
                
                {/* 50% Rule breakdown from Instagram story banner */}
                <div className="flex items-center justify-between text-wine-900 font-medium bg-rose-100/60 p-2 rounded-lg border border-rose-200/60">
                  <div className="flex flex-col">
                    <span className="font-bold text-[11px]">Sinal de Confirmação (50%):</span>
                    <span className="text-[10px] text-wine-700">Para garantir a data de retirada</span>
                  </div>
                  <span className="font-bold text-sm text-wine-950 tabular-nums">{formatBRL(depositAmount)}</span>
                </div>

                <div className="flex items-center justify-between text-stone-500 text-[11px] px-1">
                  <span>Restante no dia da retirada (50%):</span>
                  <span className="font-medium tabular-nums">{formatBRL(remainingAmount)}</span>
                </div>
              </div>

              {/* Policy Note */}
              <div className="flex items-start gap-1.5 text-[11px] text-stone-500">
                <AlertCircle className="w-3.5 h-3.5 text-wine-700 shrink-0 mt-0.5" />
                <span>Encomendas com antecedência mínima de 48h. Retirada combinada em Goiânia.</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToForm();
                  }}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-wine-800 hover:bg-wine-900 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Preencher Formulário de Encomenda</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-wine-900 bg-white hover:bg-rose-50 border border-wine-300 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Enviar Pedido pelo WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
