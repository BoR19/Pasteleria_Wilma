import React from 'react';
import { Cake, Store, ShoppingBag, Heart } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'catalog' | 'branches' | 'cart';
  cartCount: number;
  favoritesCount: number;
  onOpenCatalog: () => void;
  onOpenBranches: () => void;
  onOpenCart: () => void;
  onToggleFavorites: () => void;
  showingFavoritesOnly: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  cartCount,
  favoritesCount,
  onOpenCatalog,
  onOpenBranches,
  onOpenCart,
  onToggleFavorites,
  showingFavoritesOnly
}) => {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-100 py-1.5 px-3 md:hidden shadow-[0_-4px_20px_rgba(232,90,138,0.12)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center">
        {/* Tab 1: Menú / Catálogo */}
        <button
          type="button"
          onClick={onOpenCatalog}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 px-2 text-center transition-transform active:scale-90"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'catalog' && !showingFavoritesOnly
                ? 'bg-[#E85A8A] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <Cake className="w-5 h-5 stroke-[2]" />
          </div>
          <span
            className={`text-[10px] mt-0.5 font-bold whitespace-nowrap ${
              activeTab === 'catalog' && !showingFavoritesOnly ? 'text-[#C73866]' : 'text-gray-400'
            }`}
          >
            Menú
          </span>
        </button>

        {/* Tab 2: Favoritos */}
        <button
          type="button"
          onClick={onToggleFavorites}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 px-2 text-center transition-transform active:scale-90 relative"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              showingFavoritesOnly
                ? 'bg-[#E85A8A] text-white shadow-sm'
                : 'text-gray-400 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-5 h-5 stroke-[2] ${showingFavoritesOnly ? 'fill-white' : ''}`} />
          </div>
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-4 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center tabular-nums">
              {favoritesCount}
            </span>
          )}
          <span
            className={`text-[10px] mt-0.5 font-bold whitespace-nowrap ${
              showingFavoritesOnly ? 'text-[#C73866]' : 'text-gray-400'
            }`}
          >
            Favoritos
          </span>
        </button>

        {/* Tab 3: Carrito / Mi Pedido */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 px-2 text-center transition-transform active:scale-90 relative"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              cartCount > 0 ? 'bg-[#E85A8A] text-white shadow-md' : 'text-gray-400'
            }`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
          </div>
          {cartCount > 0 && (
            <span className="absolute top-0.5 right-3 min-w-4 h-4 px-1 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs tabular-nums">
              {cartCount}
            </span>
          )}
          <span
            className={`text-[10px] mt-0.5 font-bold whitespace-nowrap ${
              cartCount > 0 ? 'text-[#C73866]' : 'text-gray-400'
            }`}
          >
            Carrito
          </span>
        </button>

        {/* Tab 4: Sucursales */}
        <button
          type="button"
          onClick={onOpenBranches}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 px-2 text-center transition-transform active:scale-90"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'branches'
                ? 'bg-[#E85A8A] text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <Store className="w-5 h-5 stroke-[2]" />
          </div>
          <span
            className={`text-[10px] mt-0.5 font-bold whitespace-nowrap ${
              activeTab === 'branches' ? 'text-[#C73866]' : 'text-gray-400'
            }`}
          >
            Sucursales
          </span>
        </button>
      </div>
    </nav>
  );
};
