import React from 'react';
import {
  Search,
  ShoppingBag,
  Sheet,
  Code2,
  RefreshCw,
  X,
  Heart,
  MapPin,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { BAKERY_INFO } from '../data/branches';
import { SheetsSyncState } from '../types/bakery';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenBranches: () => void;
  onOpenSheetsModal: () => void;
  onOpenSeniorReport: () => void;
  onFilterFavorites: () => void;
  showingFavoritesOnly: boolean;
  syncState: SheetsSyncState;
  onManualSync: () => void;
  isSyncing: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isAdminMode: boolean;
  onExitAdmin: () => void;
  onSecretAdminTap: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenBranches,
  onOpenSheetsModal,
  onOpenSeniorReport,
  onFilterFavorites,
  showingFavoritesOnly,
  syncState,
  onManualSync,
  isSyncing,
  searchQuery,
  onSearchChange,
  isAdminMode,
  onExitAdmin,
  onSecretAdminTap
}) => {
  return (
    <header className="relative w-full z-20">
      {/* Private Admin Toolbar: visible ONLY when authenticated in Admin Mode */}
      {isAdminMode && (
        <div className="bg-[#2B180D] text-amber-100 text-xs py-1.5 px-3 sm:px-4 border-b border-white/10">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF8DA8]" />
                <span>Admin</span>
              </span>

              <button
                type="button"
                onClick={onOpenSheetsModal}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors whitespace-nowrap"
                title="Configurar Google Sheets"
              >
                <Sheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {syncState.status === 'connected'
                    ? `Google Sheets (${syncState.productCount})`
                    : `Catálogo Base (${syncState.productCount})`}
                </span>
              </button>

              {syncState.url && (
                <button
                  type="button"
                  onClick={onManualSync}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold text-[11px] transition-all disabled:opacity-50 whitespace-nowrap"
                  title="Sincronizar cambios inmediatamente"
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">
                    {isSyncing ? 'Sincronizando...' : 'Sync Precios'}
                  </span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenSeniorReport}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-pink-900/60 hover:bg-pink-800 text-pink-200 border border-pink-700/50 text-[11px] font-medium transition-colors whitespace-nowrap"
              >
                <Code2 className="w-3 h-3 text-pink-300" />
                <span className="hidden sm:inline">Auditoría Técnica</span>
                <span className="sm:hidden">Reporte</span>
              </button>

              <button
                type="button"
                onClick={onExitAdmin}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-rose-600 text-amber-100 hover:text-white text-[11px] font-semibold transition-colors whitespace-nowrap"
                title="Salir del modo administrador y ver como cliente"
              >
                <LogOut className="w-3 h-3" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blush Pink Hero Container with Organic Wave/Curved Edge */}
      <div className="blush-hero-gradient text-[#341F14] pt-5 pb-8 px-4 sm:px-6 rounded-b-[2.5rem] sm:rounded-b-[3.5rem] shadow-sm relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-10 -right-16 w-56 h-56 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10 space-y-4">
          {/* Top Row: Search Input Pill, Favorites & Shopping Cart Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* White Search Input Pill */}
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar tortas o sabores..."
                aria-label="Buscar tortas o sabores"
                className="w-full bg-white text-gray-800 pl-10 pr-9 py-2.5 min-h-[44px] rounded-full shadow-xs text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E85A8A] placeholder:text-gray-400 border-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-0.5"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Circular Favorites Filter Button */}
            <button
              type="button"
              onClick={onFilterFavorites}
              className={`w-11 h-11 rounded-full shadow-xs hover:shadow-md flex items-center justify-center transition-transform active:scale-90 relative flex-shrink-0 ${
                showingFavoritesOnly
                  ? 'bg-[#E85A8A] text-white'
                  : 'bg-white text-[#E85A8A]'
              }`}
              title="Ver mis tortas favoritas"
              aria-label="Ver mis tortas favoritas"
            >
              <Heart className={`w-5 h-5 stroke-[2] ${showingFavoritesOnly ? 'fill-white' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Circular Cart Button with Notification Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="w-11 h-11 rounded-full bg-white text-[#E85A8A] shadow-xs hover:shadow-md flex items-center justify-center transition-transform active:scale-90 relative flex-shrink-0"
              title="Ver mi carrito de pedidos"
              aria-label="Ver mi carrito de pedidos"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#E85A8A] text-white text-[10px] font-black flex items-center justify-center shadow-xs tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Bakery Brand Title & Narrative (5 quick taps discreetly opens Admin login) */}
          <div className="text-center pt-2">
            <h1
              onClick={onSecretAdminTap}
              className="font-cursive text-4xl sm:text-5xl font-bold text-[#341F14] tracking-wide drop-shadow-xs select-none cursor-default"
            >
              {BAKERY_INFO.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-gray-700 mt-1">
              Tortas artesanales para todo tipo de acontecimientos
            </p>
          </div>

          {/* Tarija Branches Bar */}
          <div className="bg-white/45 backdrop-blur-xs rounded-2xl p-2.5 px-3 border border-white/60 shadow-xs flex items-center justify-between text-[11px] sm:text-xs text-[#341F14]/90 gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#C73866] flex-shrink-0" />
              <span className="font-semibold truncate">
                3 Sucursales en Tarija · Mercado Campesino · Central · Moto Méndez
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenBranches}
              className="text-[#C73866] font-bold hover:underline whitespace-nowrap text-[11px] sm:text-xs flex-shrink-0"
            >
              Ver sucursales
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
