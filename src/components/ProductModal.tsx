import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Send, Sparkles, Check, Cake, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, CustomizationOptions } from '../types/bakery';
import { SIZES_OPTIONS, SPONGE_OPTIONS, FILLING_OPTIONS } from '../data/defaultCatalog';
import { BAKERY_INFO } from '../data/branches';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, customization: CustomizationOptions, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // Standard default
  const [sponge, setSponge] = useState(SPONGE_OPTIONS[0]);
  const [filling, setFilling] = useState(FILLING_OPTIONS[0]);
  const [dedication, setDedication] = useState('');
  const [candles, setCandles] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Reset when product changes
  useEffect(() => {
    if (product) {
      setSelectedSizeIndex(1);
      setSponge(SPONGE_OPTIONS[0]);
      setFilling(FILLING_OPTIONS[0]);
      setDedication('');
      setCandles(false);
      setSpecialNote('');
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentSizeOption = SIZES_OPTIONS[selectedSizeIndex] || SIZES_OPTIONS[1];
  const candlePrice = candles ? 10 : 0;
  const unitPrice = Math.round(product.precio * currentSizeOption.multiplicador) + candlePrice;
  const totalPrice = unitPrice * quantity;

  const getCustomizationObject = (): CustomizationOptions => ({
    tamano: currentSizeOption.id as CustomizationOptions['tamano'],
    tamanoTexto: currentSizeOption.label,
    multiplicadorPrecio: currentSizeOption.multiplicador,
    saborBizcocho: sponge,
    relleno: filling,
    dedicatoria: dedication.trim(),
    velasOTop: candles,
    notaEspecial: specialNote.trim()
  });

  const handleAddToCart = () => {
    onAddToCart(product, getCustomizationObject(), quantity);
    setAddedAnimation(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      onClose();
    }, 450);
  };

  const handleDirectWhatsApp = () => {
    const custom = getCustomizationObject();
    let text = `¡Hola Pastelería Wilma! 👋 Quisiera hacer el siguiente pedido:\n\n`;
    text += `🍰 *Producto:* ${product.nombre}\n`;
    text += `📏 *Tamaño:* ${custom.tamanoTexto}\n`;
    text += `🧁 *Bizcocho:* ${custom.saborBizcocho}\n`;
    text += `🍓 *Relleno:* ${custom.relleno}\n`;

    if (custom.dedicatoria) {
      text += `✍️ *Dedicatoria:* "${custom.dedicatoria}"\n`;
    }
    if (custom.velasOTop) {
      text += `🕯️ *Incluye:* Velitas / Topper (+10 Bs.)\n`;
    }
    if (custom.notaEspecial) {
      text += `📝 *Nota especial:* ${custom.notaEspecial}\n`;
    }

    text += `🔢 *Cantidad:* ${quantity}\n`;
    text += `💰 *Total estimado:* ${totalPrice} Bs.\n\n`;
    text += `¿Me confirman disponibilidad y horario para coordinar? Muchas gracias!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BAKERY_INFO.whatsappPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-amber-100 my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header with Image */}
        <div className="relative h-56 sm:h-64 bg-amber-50 flex-shrink-0">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="absolute bottom-4 left-4 bg-[#E85A8A] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
            {product.categoria}
          </span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-grow">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#341F14]">
                {product.nombre}
              </h2>
              <div className="flex items-baseline gap-1 text-[#C73866]">
                <span className="text-2xl sm:text-3xl font-black">{totalPrice}</span>
                <span className="text-sm font-bold text-gray-600">Bs.</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {product.descripcion}
            </p>
          </div>

          {/* Size / Portions Selector */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Cake className="w-4 h-4 text-[#E85A8A]" />
                1. Selecciona el Tamaño & Porciones
              </span>
              <span className="text-[11px] text-pink-600 font-semibold lowercase">
                (afecta el precio)
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SIZES_OPTIONS.map((opt, idx) => {
                const isSelected = selectedSizeIndex === idx;
                const optPrice = Math.round(product.precio * opt.multiplicador);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#E85A8A] bg-pink-50/60 ring-2 ring-[#E85A8A]/30 shadow-xs'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-800">{opt.label}</div>
                      <div className="text-[11px] text-gray-500">{opt.baseExtraText}</div>
                    </div>
                    <div className="text-xs font-bold text-[#C73866]">
                      {optPrice} Bs.
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cake Sponge Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              2. Sabor del Bizcochuelo
            </label>
            <select
              value={sponge}
              onChange={(e) => setSponge(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#E85A8A] focus:outline-none bg-white"
            >
              {SPONGE_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Artisanal Filling Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              3. Relleno Especial
            </label>
            <select
              value={filling}
              onChange={(e) => setFilling(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#E85A8A] focus:outline-none bg-white"
            >
              {FILLING_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Dedication Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              4. Dedicatoria en la Torta / Letrero (Opcional)
            </label>
            <input
              type="text"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="Ej: '¡Feliz Cumpleaños Mamá!' o 'Nuestra Boda Lucía & Pedro'"
              maxLength={60}
              className="w-full p-3 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-1 text-right">
              {dedication.length}/60 caracteres
            </p>
          </div>

          {/* Extras: Candles / Topper Checkbox */}
          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/60 flex items-center justify-between">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={candles}
                onChange={(e) => setCandles(e.target.checked)}
                className="w-4 h-4 text-[#E85A8A] rounded focus:ring-[#E85A8A]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#341F14] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Incluir Vela de bengala o Topper Feliz Cumpleaños
                </span>
                <span className="text-gray-500 text-[11px] block">
                  Agrega un toque festivo para soplar los deseos
                </span>
              </div>
            </label>
            <span className="text-xs font-bold text-[#C73866] whitespace-nowrap">
              +10 Bs.
            </span>
          </div>

          {/* Notes or Allergens */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              5. Instrucciones especiales o alergias (Opcional)
            </label>
            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="Ej: Decorar con tonos lila en vez de rosa, sin nueces por alergia..."
              rows={2}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-700 uppercase">Cantidad:</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 active:scale-95"
              >
                -
              </button>
              <span className="font-bold text-sm min-w-6 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#E85A8A] hover:bg-[#C73866] text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 animate-scale" />
                <span>¡Agregado al Carrito!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito ({totalPrice} Bs.)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Pedir directo WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
