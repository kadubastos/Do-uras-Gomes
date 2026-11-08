import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Catalog } from './components/Catalog';
import { ContactForm } from './components/ContactForm';
import { PolicyAndFAQ } from './components/PolicyAndFAQ';
import { Footer } from './components/Footer';
import { OrderDrawer, CartItem } from './components/OrderDrawer';
import { Product, BRAND } from './data/confectionery';
import { Phone, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [prefilledProduct, setPrefilledProduct] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (product: Product, quantity = 1, notes?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.notes === notes
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, notes }];
      }
    });
    showToast(`"${product.name}" adicionado à sacola!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number, notes?: string) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.notes === notes) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveItem = (productId: string, notes?: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.notes === notes))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOrderFormWithProduct = (productName?: string) => {
    if (productName) {
      setPrefilledProduct(productName);
    }
    scrollToSection('contato');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-stone-800 antialiased selection:bg-rose-200 selection:text-wine-900">
      
      {/* Top Announcement Bar */}
      <div className="bg-wine-900 text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-wine-800">
        <span className="font-semibold text-amber-200">✨ Encomendas Abertas:</span>{' '}
        Garanta sua Taça Supreme de 2L ou Travessa para seus encontros especiais com antecedência mínima de 48h!
      </div>

      {/* Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreCatalog={() => scrollToSection('catalogo')}
          onOpenOrderForm={() => scrollToSection('contato')}
        />

        <About />

        <Catalog
          onAddToCart={handleAddToCart}
          onOpenOrderForm={handleOpenOrderFormWithProduct}
        />

        <PolicyAndFAQ />

        <ContactForm
          cartItems={cartItems}
          prefilledProduct={prefilledProduct}
          onClearCart={handleClearCart}
        />
      </main>

      {/* Order Slide-over Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToForm={() => {
          setIsCartOpen(false);
          scrollToSection('contato');
        }}
      />

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={BRAND.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco no WhatsApp"
        className="fixed bottom-5 right-5 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 group cursor-pointer"
        title="Fale conosco no WhatsApp"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider pr-1">
          WhatsApp
        </span>
      </a>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 border border-stone-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
