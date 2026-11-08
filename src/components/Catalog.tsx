import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Sparkles, Heart, Check, X, Users, Utensils, Info } from 'lucide-react';
import { Product, PRODUCTS, CATEGORIES } from '../data/confectionery';

interface CatalogProps {
  onAddToCart: (product: Product, quantity?: number, notes?: string) => void;
  onOpenOrderForm: (productName?: string) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onAddToCart, onOpenOrderForm }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [modalOption, setModalOption] = useState<string>('Padrão');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  const handleOpenDetail = (product: Product) => {
    setActiveModalProduct(product);
    setModalQuantity(1);
    if (product.id === 'torta-cookie') {
      setModalOption('Nutella');
    } else {
      setModalOption('Padrão');
    }
  };

  const handleModalAdd = () => {
    if (activeModalProduct) {
      const note = activeModalProduct.id === 'torta-cookie' ? `Recheio: ${modalOption}` : undefined;
      onAddToCart(activeModalProduct, modalQuantity, note);
      setActiveModalProduct(null);
    }
  };

  return (
    <section id="catalogo" className="py-16 lg:py-24 bg-cream-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-wine-800">
            <Sparkles className="w-3.5 h-3.5 text-wine-700" />
            <span>Cardápio & Catálogo Completo</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950">
            Nossas Delícias Artesanais
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Escolha suas sobremesas favoritas, adicione à sua sacola de encomenda e envie o pedido diretamente
            pelo formulário ou WhatsApp para confirmação rápida da sua data.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-rose-100/60 rounded-xl overflow-x-auto max-w-full w-full md:w-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-wine-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-wine-900 hover:bg-rose-50/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar sabor, ninho, brownie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white border border-rose-200 text-stone-800 focus:outline-hidden focus:border-wine-700 focus:ring-1 focus:ring-wine-700 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                title="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-rose-100 max-w-md mx-auto my-8">
            <Utensils className="w-10 h-10 text-rose-300 mx-auto mb-3" />
            <h4 className="font-serif-brand text-lg font-bold text-stone-800">Nenhum doce encontrado</h4>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Não encontramos nenhum item correspondente a &quot;{searchQuery}&quot;. Tente outro termo ou limpe os filtros.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 text-xs font-semibold bg-wine-800 text-white rounded-lg hover:bg-wine-900 transition-colors cursor-pointer"
            >
              Ver Cardápio Inteiro
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = justAddedId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => handleOpenDetail(product)}
                  className="bg-white rounded-2xl overflow-hidden border border-rose-100/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer"
                >
                  {/* Visual Header / Banner Snapshot */}
                  <div className="relative h-48 bg-gradient-to-br from-rose-100/60 to-rose-50 overflow-hidden flex items-center justify-center">
                    {product.imageStory ? (
                      <img
                        src={product.imageStory}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-center p-6 text-wine-900/40">
                        <Heart className="w-12 h-12 mx-auto stroke-1" />
                        <span className="text-[11px] font-medium tracking-wide block mt-1">Confeitaria Artesanal</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/10" />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-wine-800 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* Category Label Pill */}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-wine-950 text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-2xs">
                      {product.categoryLabel}
                    </span>

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-wine-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3 py-1.5 bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Detalhes</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div>
                      {/* Servings metadata */}
                      {product.servings && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-wine-800 mb-1.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>{product.servings}</span>
                        </div>
                      )}

                      <h3 className="font-serif-brand text-lg font-bold text-wine-950 group-hover:text-wine-800 transition-colors leading-snug">
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Ingredients list pills */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {product.ingredients.slice(0, 3).map((ing, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-rose-50 text-stone-600 px-2 py-0.5 rounded-sm border border-rose-100"
                          >
                            {ing}
                          </span>
                        ))}
                        {product.ingredients.length > 3 && (
                          <span className="text-[10px] text-stone-400 px-1 py-0.5 self-center">
                            +{product.ingredients.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div className="pt-3 border-t border-rose-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-stone-400 block">Preço</span>
                        <span className="font-sans font-bold text-base text-wine-950 tabular-nums">
                          {product.formattedPrice}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(product, e)}
                          className={`px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-wine-800 hover:bg-wine-900 text-white shadow-2xs hover:shadow-xs active:scale-95'
                          }`}
                          title="Adicionar à sacola de encomendas"
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Adicionado!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Pedir</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Custom Order Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-wine-900 to-wine-950 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-200">
              Personalização & Sobremesas para Festas
            </span>
            <h3 className="font-serif-brand text-xl sm:text-2xl font-bold">
              Precisa de um tamanho maior ou combinação exclusiva?
            </h3>
            <p className="text-xs sm:text-sm text-rose-100/80 max-w-xl">
              Fazemos taças personalizadas, bolos vulcão grandes e combos de sobremesas para aniversários, noivados e celebrações familiares.
            </p>
          </div>
          <button
            onClick={() => onOpenOrderForm('Orçamento Personalizado para Evento')}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-wine-950 bg-amber-200 hover:bg-amber-100 rounded-xl transition-all shadow-sm shrink-0 whitespace-nowrap cursor-pointer active:scale-95"
          >
            Solicitar Orçamento
          </button>
        </div>

      </div>

      {/* Product Details Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-rose-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-48 bg-stone-900 overflow-hidden">
              {activeModalProduct.imageStory && (
                <img
                  src={activeModalProduct.imageStory}
                  alt={activeModalProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300">
                  {activeModalProduct.categoryLabel}
                </span>
                <h3 className="font-serif-brand text-xl font-bold leading-tight">
                  {activeModalProduct.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-stone-700">
              
              <div className="flex items-center justify-between pb-3 border-b border-rose-100">
                <div>
                  <span className="text-xs text-stone-400 block">Preço unitário</span>
                  <span className="font-sans text-2xl font-bold text-wine-900 tabular-nums">
                    {activeModalProduct.formattedPrice}
                  </span>
                </div>
                {activeModalProduct.servings && (
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block">Rendimento</span>
                    <span className="text-xs font-semibold text-stone-800">
                      {activeModalProduct.servings}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Descrição Completa
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                  {activeModalProduct.description}
                </p>
              </div>

              {/* Special flavor options (e.g. Torta Cookie) */}
              {activeModalProduct.id === 'torta-cookie' && (
                <div className="p-3.5 bg-rose-50/70 rounded-xl border border-rose-100 space-y-2">
                  <label className="text-xs font-bold text-wine-950 block">
                    Escolha o Recheio da sua Torta Cookie:
                  </label>
                  <div className="flex gap-2">
                    {['Nutella', 'Doce de Leite'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setModalOption(opt)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          modalOption === opt
                            ? 'bg-wine-800 text-white border-wine-800 shadow-2xs'
                            : 'bg-white text-stone-700 border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Ingredientes & Camadas
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalProduct.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 bg-cream-100/70 rounded-lg text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-wine-700 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Storage Tip */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Conservação recomendada:</span> Manter refrigerado entre 2°C a 6°C. Consumir em até 4 dias para garantir o frescor das frutas e a cremosidade dos brigadeiros.
                </div>
              </div>

              {/* Quantity selector */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">Quantidade:</span>
                <div className="flex items-center gap-3 bg-rose-50 p-1 rounded-xl border border-rose-200">
                  <button
                    onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                    className="w-7 h-7 rounded-lg bg-white text-stone-700 font-bold hover:bg-rose-100 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold px-2 tabular-nums">{modalQuantity}</span>
                  <button
                    onClick={() => setModalQuantity(modalQuantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white text-stone-700 font-bold hover:bg-rose-100 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-cream-50 border-t border-rose-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-200/60 rounded-xl transition-colors cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleModalAdd}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white bg-wine-800 hover:bg-wine-900 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar à Sacola ({modalQuantity}x)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
