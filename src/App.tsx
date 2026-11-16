/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { ArrowUpDown, X, Cake, Zap, RefreshCw } from 'lucide-react';
import { Product, SheetsSyncState } from './types/bakery';
import { DEFAULT_PRODUCTS } from './data/defaultCatalog';
import {
  getCachedProducts,
  getSavedSheetUrl,
  saveSheetUrl as persistSheetUrl,
  removeSavedSheetUrl,
  fetchAndParseGoogleSheet,
  isGlobalOfficialSheetActive
} from './services/sheetsSync';
import { useCart } from './hooks/useCart';
import { useFavorites } from './hooks/useFavorites';
import { Header } from './components/Header';
import { CategoryIconBar } from './components/CategoryIconBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { BranchInfoModal } from './components/BranchInfoModal';
import { SheetsConfigModal } from './components/SheetsConfigModal';
import { SeniorAnalysisReportModal } from './components/SeniorAnalysisReportModal';
import { BottomNav } from './components/BottomNav';
import { InstallPwaPrompt } from './components/InstallPwaPrompt';
import { Footer } from './components/Footer';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => getCachedProducts());
  const [syncState, setSyncState] = useState<SheetsSyncState>(() => {
    const initialProducts = getCachedProducts();
    const savedUrl = getSavedSheetUrl() || '';
    return {
      url: savedUrl,
      status: savedUrl ? 'syncing' : 'idle',
      productCount: initialProducts.length
    };
  });

  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [pollingInterval, setPollingInterval] = useState(20); // 20 seconds default
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');
  const [showingFavoritesOnly, setShowingFavoritesOnly] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<'catalog' | 'branches' | 'cart' | 'admin'>('catalog');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [isSeniorReportOpen, setIsSeniorReportOpen] = useState(false);

  // Cart & Favorites Hooks
  const {
    items: cartItems,
    isOpen: isCartOpen,
    openCart,
    closeCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount
  } = useCart();

  const { isFavorite, toggleFavorite, favoritesCount } = useFavorites();

  // Helper to show brief toast feedback
  const showToast = useCallback((text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  }, []);

  // Main sync function with real-time zero cache
  const productsRef = useRef(products);
  productsRef.current = products;

  const loadSheetData = useCallback(
    async (url: string, isSilent: boolean = false) => {
      if (!url.trim()) return;

      if (!isSilent) setIsSyncing(true);

      const startTime = performance.now();
      const result = await fetchAndParseGoogleSheet(url, productsRef.current);
      const duration = Math.round(performance.now() - startTime);

      if (result.success && result.products.length > 0) {
        setProducts(result.products);
        setSyncState({
          url,
          status: 'connected',
          lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          productCount: result.products.length,
          lastSyncDurationMs: duration
        });
        persistSheetUrl(url);

        if (result.changedPricesCount && result.changedPricesCount > 0) {
          showToast(`⚡ ¡Se actualizaron los precios de ${result.changedPricesCount} producto(s) en vivo!`, 'success');
        } else if (!isSilent) {
          showToast(`✓ Catálogo sincronizado en tiempo real (${result.products.length} productos)`, 'info');
        }
      } else {
        setSyncState((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: result.error || 'No se pudo sincronizar'
        }));
        if (!isSilent && result.error) {
          showToast(`Error: ${result.error}`, 'info');
        }
      }

      if (!isSilent) setIsSyncing(false);
      return result;
    },
    [showToast]
  );

  // Initial load on mount
  useEffect(() => {
    const savedUrl = getSavedSheetUrl();
    if (savedUrl) {
      loadSheetData(savedUrl, isGlobalOfficialSheetActive());
    }
  }, [loadSheetData]);

  // Background auto-polling interval (every 20s)
  useEffect(() => {
    if (!autoSyncEnabled || !syncState.url || syncState.status === 'error') {
      return;
    }

    const intervalId = setInterval(() => {
      loadSheetData(syncState.url, true);
    }, pollingInterval * 1000);

    return () => clearInterval(intervalId);
  }, [autoSyncEnabled, syncState.url, syncState.status, pollingInterval, loadSheetData]);

  // Tab Focus & Visibility Revalidation (SWR Pattern)
  useEffect(() => {
    if (!syncState.url) return;

    const handleTabFocus = () => {
      if (document.visibilityState === 'visible' && syncState.url) {
        loadSheetData(syncState.url, true);
      }
    };

    window.addEventListener('focus', handleTabFocus);
    document.addEventListener('visibilitychange', handleTabFocus);

    return () => {
      window.removeEventListener('focus', handleTabFocus);
      document.removeEventListener('visibilitychange', handleTabFocus);
    };
  }, [syncState.url, loadSheetData]);

  const handleManualSync = () => {
    if (syncState.url) {
      loadSheetData(syncState.url, false);
    } else {
      setIsSheetsModalOpen(true);
    }
  };

  const handleSaveSheetUrl = async (url: string) => {
    const result = await loadSheetData(url, false);
    if (!result || !result.success) {
      throw new Error(result?.error || 'No se pudo conectar con la hoja de Google Sheets.');
    }
  };

  const handleRestoreDefaults = () => {
    removeSavedSheetUrl();
    setProducts(DEFAULT_PRODUCTS);
    setSyncState({
      url: '',
      status: 'idle',
      productCount: DEFAULT_PRODUCTS.length
    });
    setSelectedCategory('Todos');
    showToast('Catálogo restablecido a datos locales predeterminados.', 'info');
  };

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.categoria && p.categoria.trim()) {
        set.add(p.categoria.trim());
      }
    });
    return ['Todos', ...Array.from(set)];
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'Todos' && p.categoria !== selectedCategory) {
          return false;
        }

        // Favorites filter
        if (showingFavoritesOnly && !isFavorite(p.id)) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.nombre.toLowerCase().includes(q);
          const matchDesc = p.descripcion.toLowerCase().includes(q);
          const matchCat = p.categoria.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (priceSort === 'asc') return a.precio - b.precio;
        if (priceSort === 'desc') return b.precio - a.precio;
        return 0;
      });
  }, [products, selectedCategory, showingFavoritesOnly, searchQuery, priceSort, isFavorite]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#341F14] flex flex-col font-sans pb-16 md:pb-0">
      {/* PWA Install Banner */}
      <InstallPwaPrompt />

      {/* Toast Notification for Real-Time Price Changes */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div
            className={`p-3.5 px-4 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-bold ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-500 shadow-emerald-950/20'
                : 'bg-[#2B180D] text-amber-100 border-amber-600 shadow-black/20'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-bounce" />
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-white/60 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Header with Blush Pink Curved Hero, Search Bar & Cart Icon (Reference UI) */}
      <Header
        cartCount={cartCount}
        favoritesCount={favoritesCount}
        onOpenCart={openCart}
        onOpenBranches={() => setIsBranchesOpen(true)}
        onOpenSheetsModal={() => setIsSheetsModalOpen(true)}
        onOpenSeniorReport={() => setIsSeniorReportOpen(true)}
        onFilterFavorites={() => setShowingFavoritesOnly(!showingFavoritesOnly)}
        showingFavoritesOnly={showingFavoritesOnly}
        syncState={syncState}
        onManualSync={handleManualSync}
        isSyncing={isSyncing}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 py-4 flex-grow w-full">
        {/* Circular Category Icons Carousel (Exact Match to Reference UI) */}
        <CategoryIconBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setShowingFavoritesOnly(false);
          }}
        />

        {/* Real-time sync indicator when Google Sheets is connected */}
        {syncState.status === 'connected' && (
          <div className="mb-4 p-2.5 sm:p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 flex flex-wrap items-center justify-between gap-2 text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium">
                Sincronización en vivo activa con Google Sheets ({syncState.lastSyncedAt || 'recién'})
              </span>
            </div>

            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-2.5 py-0.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-1 text-[11px] transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
          </div>
        )}

        {syncState.status === 'error' && syncState.url && (
          <div className="mb-4 p-2.5 sm:p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-wrap items-center justify-between gap-2 text-xs shadow-xs">
            <span className="text-[11px] font-medium">
              ⚠️ No se pudo sincronizar con Google Sheets ({syncState.errorMessage || 'revisa tu conexión'}). Mostrando última copia disponible.
            </span>
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-2.5 py-0.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-bold flex items-center gap-1 text-[11px] transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Reintentar</span>
            </button>
          </div>
        )}

        {/* Filter & Sorting Controls Header */}
        <div className="mb-4 flex items-center justify-between text-xs text-gray-500 font-medium px-1">
          <div>
            <span className="font-bold text-gray-800 text-sm sm:text-base">
              {showingFavoritesOnly
                ? 'Tus Favoritos'
                : selectedCategory === 'Todos'
                ? 'Todas las Tortas'
                : selectedCategory}
            </span>
            <span className="ml-1.5 text-gray-400 text-xs">({filteredProducts.length})</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-white border border-pink-100 rounded-full px-2.5 py-1 shadow-xs">
              <ArrowUpDown className="w-3 h-3 text-[#E85A8A]" />
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as typeof priceSort)}
                className="bg-transparent text-[11px] font-bold focus:outline-none text-gray-800 cursor-pointer"
              >
                <option value="default">Recomendados</option>
                <option value="asc">Menor precio</option>
                <option value="desc">Mayor precio</option>
              </select>
            </div>

            {showingFavoritesOnly && (
              <button
                onClick={() => setShowingFavoritesOnly(false)}
                className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-full px-2 py-0.5 flex items-center gap-1 hover:bg-rose-100"
              >
                <span>Ver todas</span>
                <X className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Mobile Layout & 3-4 Column Tablet/Desktop Grid (Reference UI) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-pink-200 p-8">
            <div className="w-14 h-14 mx-auto bg-pink-50 rounded-full flex items-center justify-center text-[#E85A8A] mb-3">
              <Cake className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">
              No se encontraron tortas
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
              Prueba con otra palabra en el buscador o selecciona otra categoría arriba.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
                setShowingFavoritesOnly(false);
              }}
              className="px-4 py-2 bg-[#E85A8A] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#C73866] transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Bottom Bar for Mobile Cart Checkout (when items are added) */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-30 animate-in slide-in-from-bottom duration-300">
          <button
            onClick={openCart}
            className="w-full sm:w-auto bg-[#E85A8A] hover:bg-[#C73866] text-white p-3 sm:px-6 rounded-2xl shadow-xl flex items-center justify-between sm:justify-start gap-4 transition-transform active:scale-95 border border-white/30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white text-[#C73866] flex items-center justify-center font-bold text-xs shadow-xs">
                {cartCount}
              </div>
              <span className="font-bold text-xs sm:text-sm">Ver Mi Pedido</span>
            </div>
            <div className="font-black text-xs sm:text-sm border-l border-white/30 pl-3">
              {cartTotal} Bs.
            </div>
          </button>
        </div>
      )}

      {/* Product Customization & Ordering Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, custom, qty) => addToCart(p, custom, qty)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        cartTotal={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* Branches Info Modal */}
      <BranchInfoModal
        isOpen={isBranchesOpen}
        onClose={() => setIsBranchesOpen(false)}
      />

      {/* Google Sheets Config Modal */}
      <SheetsConfigModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        syncState={syncState}
        onSaveSheetUrl={handleSaveSheetUrl}
        onRestoreDefaults={handleRestoreDefaults}
        autoSyncEnabled={autoSyncEnabled}
        onToggleAutoSync={setAutoSyncEnabled}
        pollingInterval={pollingInterval}
        onChangePollingInterval={setPollingInterval}
      />

      {/* Senior Developer Analysis Report Modal */}
      <SeniorAnalysisReportModal
        isOpen={isSeniorReportOpen}
        onClose={() => setIsSeniorReportOpen(false)}
      />

      {/* PWA Mobile Bottom Navigation Dock (Exact match to reference UI dock) */}
      <BottomNav
        activeTab={activeBottomTab}
        cartCount={cartCount}
        favoritesCount={favoritesCount}
        onOpenCatalog={() => {
          setActiveBottomTab('catalog');
          setShowingFavoritesOnly(false);
          setSelectedCategory('Todos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBranches={() => {
          setActiveBottomTab('branches');
          setIsBranchesOpen(true);
        }}
        onOpenCart={() => {
          setActiveBottomTab('cart');
          openCart();
        }}
        onOpenAdmin={() => {
          setActiveBottomTab('admin');
          setIsSeniorReportOpen(true);
        }}
        onToggleFavorites={() => {
          setShowingFavoritesOnly(!showingFavoritesOnly);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        showingFavoritesOnly={showingFavoritesOnly}
      />

      {/* Footer */}
      <Footer
        onOpenBranches={() => setIsBranchesOpen(true)}
        onOpenSheetsModal={() => setIsSheetsModalOpen(true)}
        onOpenSeniorReport={() => setIsSeniorReportOpen(true)}
      />
    </div>
  );
}
