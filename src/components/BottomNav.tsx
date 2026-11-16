import React from 'react';
import { Cake, Store, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'catalog' | 'branches' | 'cart' | 'admin';
  cartCount: number;
  favoritesCount: number;
  onOpenCatalog: () => void;
  onOpenBranches: () => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
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
  onOpenAdmin,
  onToggleFavorites,
  showingFavoritesOnly
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-100 py-1.5 px-3 md:hidden shadow-[0_-4px_20px_rgba(232,90,138,0.12)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Tab 1: Menú / Catálogo */}
        <button
          type="button"
          onClick={onOpenCatalog}
          className="flex flex-col items-center justify-center py-1 px-3 text-center transition-transform active:scale-90"
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
            className={`text-[10px] mt-0.5 font-bold ${
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
          className="flex flex-col items-center justify-center py-1 px-3 text-center transition-transform active:scale-90 relative"
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
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
          <span
            className={`text-[10px] mt-0.5 font-bold ${
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
          className="flex flex-col items-center justify-center py-1 px-3 text-center transition-transform active:scale-90 relative"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              cartCount > 0 ? 'bg-[#E85A8A] text-white shadow-md animate-pulse' : 'text-gray-400'
            }`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
          </div>
          {cartCount > 0 && (
            <span className="absolute top-0.5 right-2 min-w-4 h-4 px-1 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
          <span
            className={`text-[10px] mt-0.5 font-bold ${cartCount > 0 ? 'text-[#C73866]' : 'text-gray-400'}`}
          >
            Carrito
          </span>
        </button>

        {/* Tab 4: Sucursales */}
        <button
          type="button"
          onClick={onOpenBranches}
          className="flex flex-col items-center justify-center py-1 px-3 text-center transition-transform active:scale-90"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700">
            <Store className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-gray-400">Sucursales</span>
        </button>

        {/* Tab 5: Sync / Admin */}
        <button
          type="button"
          onClick={onOpenAdmin}
          className="flex flex-col items-center justify-center py-1 px-3 text-center transition-transform active:scale-90"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700">
            <ShieldCheck className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold text-gray-400">Sync & Dev</span>
        </button>
      </div>
    </nav>
  );
};
