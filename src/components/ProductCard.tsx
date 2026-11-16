import React, { useState } from 'react';
import { Heart, ShoppingBag, Clock, Users, Zap, Check } from 'lucide-react';
import { Product } from '../types/bakery';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct
}) => {
  const [imgSrc, setImgSrc] = useState(product.imagen || FALLBACK_IMAGE);

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className={`bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 card-shadow hover:shadow-xl transition-all duration-300 border flex flex-col justify-between group cursor-pointer relative ${
        product.precioActualizado
          ? 'border-emerald-400 ring-2 ring-emerald-300/40'
          : 'border-pink-50/60 hover:border-pink-200'
      }`}
    >
      {/* Product Image Container with rounded corners */}
      <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-pink-50/40 mb-2.5">
        <img
          src={imgSrc}
          alt={product.nombre}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-sm flex items-center justify-center transition-transform active:scale-90"
          title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'
            }`}
          />
        </button>

        {/* Category tag */}
        <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-[#C73866] font-bold text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full shadow-xs">
          {product.categoria}
        </span>

        {/* Real-time price updated badge */}
        {product.precioActualizado && (
          <span className="absolute top-2 left-2 bg-emerald-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 animate-pulse">
            <Zap className="w-2.5 h-2.5 fill-white" />
            ¡Precio Nuevo!
          </span>
        )}
      </div>

      {/* Card Info & Price Row */}
      <div className="flex flex-col flex-grow justify-between px-0.5">
        <div>
          <h3 className="font-bold text-gray-800 text-xs sm:text-sm group-hover:text-[#E85A8A] transition-colors leading-snug line-clamp-1 mb-1">
            {product.nombre}
          </h3>

          <p className="text-gray-400 text-[10px] sm:text-[11px] line-clamp-1 mb-2">
            {product.descripcion}
          </p>
        </div>

        {/* Bottom row: Price on left, circular pink cart button on right (Exact match to reference mockup) */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[9px] text-gray-400 block uppercase font-medium">Precio</span>
            <div className="flex items-baseline gap-0.5">
              <span
                className={`text-sm sm:text-base font-extrabold ${
                  product.precioActualizado ? 'text-emerald-700' : 'text-gray-900'
                }`}
              >
                {product.precio}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#E85A8A]">Bs.</span>
            </div>
          </div>

          {/* Circular Pink Action Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E85A8A] hover:bg-[#C73866] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all active:scale-90"
            title="Personalizar y agregar al pedido"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
};
