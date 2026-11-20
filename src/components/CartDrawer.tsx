import React, { useState } from 'react';
import { X, Trash2, Send, ShoppingBag, Store, Truck, Calendar, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderDetails } from '../types/bakery';
import { BRANCHES_DATA, BAKERY_INFO } from '../data/branches';
import { FALLBACK_CAKE_IMAGE, buildWhatsAppUrl } from '../utils/bakeryHelpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  cartTotal,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    customerPhone: '',
    deliveryType: 'pickup',
    branchId: BRANCHES_DATA[0].id,
    deliveryAddress: '',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow by default
    deliveryTime: '15:00',
    paymentMethod: 'efectivo',
    generalNotes: ''
  });

  if (!isOpen) return null;

  const handleSendToWhatsApp = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    let msg = `🎂 *NUEVO PEDIDO - PASTELERÍA WILMA* 🎂\n`;
    msg += `─────────────────────────\n`;

    if (orderDetails.customerName.trim()) {
      msg += `👤 *Cliente:* ${orderDetails.customerName.trim()}\n`;
    }
    if (orderDetails.customerPhone.trim()) {
      msg += `📱 *Teléfono:* ${orderDetails.customerPhone.trim()}\n`;
    }

    msg += `\n📦 *PRODUCTOS SOLICITADOS (${items.length}):*\n`;

    items.forEach((item, index) => {
      msg += `\n*${index + 1}. ${item.product.nombre}* (x${item.quantity})\n`;
      msg += `   • Tamaño: ${item.customization.tamanoTexto}\n`;
      msg += `   • Bizcocho: ${item.customization.saborBizcocho}\n`;
      msg += `   • Relleno: ${item.customization.relleno}\n`;

      if (item.customization.dedicatoria) {
        msg += `   • Dedicatoria: "${item.customization.dedicatoria}"\n`;
      }
      if (item.customization.velasOTop) {
        msg += `   • Extra: Vela de bengala / Topper (+10 Bs.)\n`;
      }
      if (item.customization.notaEspecial) {
        msg += `   • Nota: ${item.customization.notaEspecial}\n`;
      }
      msg += `   • Subtotal: ${item.subtotal} Bs.\n`;
    });

    msg += `\n─────────────────────────\n`;
    msg += `💰 *TOTAL A PAGAR:* *${cartTotal} Bs.*\n`;
    msg += `─────────────────────────\n`;

    // Delivery info
    if (orderDetails.deliveryType === 'pickup') {
      const selectedBranch = BRANCHES_DATA.find((b) => b.id === orderDetails.branchId) || BRANCHES_DATA[0];
      msg += `🏬 *Método:* Retiro en Sucursal #${selectedBranch.numero}\n`;
      msg += `📍 *Ubicación:* ${selectedBranch.nombre} - ${selectedBranch.ubicacion}\n`;
    } else {
      msg += `🛵 *Método:* Envío a Domicilio (Tarija)\n`;
      msg += `🏠 *Dirección:* ${orderDetails.deliveryAddress ? orderDetails.deliveryAddress.trim() : 'Coordinar ubicación por chat'}\n`;
    }

    msg += `📅 *Fecha requerida:* ${orderDetails.deliveryDate}\n`;
    msg += `⏰ *Hora aproximada:* ${orderDetails.deliveryTime}\n`;

    const paymentLabels = {
      efectivo: 'Efectivo contra entrega',
      transferencia_qr: 'Transferencia por QR',
      en_tienda: 'Pago anticipado en tienda'
    };
    msg += `💳 *Forma de pago:* ${paymentLabels[orderDetails.paymentMethod]}\n`;

    if (orderDetails.generalNotes?.trim()) {
      msg += `💬 *Observaciones generales:* ${orderDetails.generalNotes.trim()}\n`;
    }

    msg += `\n¡Quedo atento a su confirmación y disponibilidad! Muchas gracias ✨`;

    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#341F14] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E85A8A] flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">Tu Pedido</h2>
              <p className="text-xs text-amber-200">
                {items.length === 0
                  ? 'El carrito está vacío'
                  : `${items.length} producto${items.length > 1 ? 's' : ''} seleccionado${items.length > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {items.length === 0 ? (
          <div className="p-8 text-center flex-grow flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-[#E85A8A] mb-4">
              <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Tu carrito está vacío</h3>
            <p className="text-gray-500 text-xs max-w-xs mb-6">
              Elige cualquiera de nuestras deliciosas tortas artesanales y personalízalas a tu gusto.
            </p>
            <button
              onClick={onClose}
              className="bg-[#E85A8A] hover:bg-[#C73866] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Ver Catálogo de Tortas
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto p-4 sm:p-5 space-y-6 flex-grow">
            {/* List of Cart Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span>Productos Seleccionados</span>
                <button
                  onClick={onClearCart}
                  className="text-rose-500 hover:underline flex items-center gap-1 font-semibold normal-case"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Vaciar todo
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3.5 rounded-2xl border border-gray-200 bg-white hover:border-pink-200 transition-colors shadow-xs"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.imagen}
                      alt={item.product.nombre}
                      className="w-16 h-16 rounded-xl object-cover bg-amber-50 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_CAKE_IMAGE;
                      }}
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-gray-800 truncate">
                          {item.product.nombre}
                        </h4>
                        <span className="font-bold text-xs text-[#C73866] whitespace-nowrap">
                          {item.subtotal} Bs.
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                        {item.customization.tamanoTexto}
                      </p>
                      <p className="text-[10px] text-gray-400 line-clamp-1">
                        {item.customization.saborBizcocho} • {item.customization.relleno}
                      </p>

                      {item.customization.dedicatoria && (
                        <p className="text-[10px] text-pink-700 italic bg-pink-50 rounded px-1.5 py-0.5 mt-1 truncate">
                          "{item.customization.dedicatoria}"
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                            className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                            className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery and Pickup Coordination Form */}
            <div className="border-t border-gray-200 pt-5 space-y-4">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#E85A8A]" />
                Datos de Entrega & Contacto
              </h4>

              {/* Delivery method tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setOrderDetails((p) => ({ ...p, deliveryType: 'pickup' }))}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    orderDetails.deliveryType === 'pickup'
                      ? 'bg-white text-[#341F14] shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  Retiro en Sucursal
                </button>
                <button
                  type="button"
                  onClick={() => setOrderDetails((p) => ({ ...p, deliveryType: 'delivery' }))}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    orderDetails.deliveryType === 'delivery'
                      ? 'bg-white text-[#341F14] shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  Envío a Domicilio
                </button>
              </div>

              {orderDetails.deliveryType === 'pickup' ? (
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                    Selecciona la Sucursal de Retiro:
                  </label>
                  <select
                    value={orderDetails.branchId}
                    onChange={(e) => setOrderDetails((p) => ({ ...p, branchId: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-medium focus:ring-2 focus:ring-[#E85A8A] focus:outline-none bg-white"
                  >
                    {BRANCHES_DATA.map((b) => (
                      <option key={b.id} value={b.id}>
                        Sucursal #{b.numero}: {b.nombre} ({b.ubicacion})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                    Dirección de Envío en Tarija:
                  </label>
                  <input
                    type="text"
                    value={orderDetails.deliveryAddress}
                    onChange={(e) => setOrderDetails((p) => ({ ...p, deliveryAddress: e.target.value }))}
                    placeholder="Barrio, calle, número de casa o referencia..."
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
                  />
                </div>
              )}

              {/* Customer Name and Phone */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                    Tu Nombre:
                  </label>
                  <input
                    type="text"
                    value={orderDetails.customerName}
                    onChange={(e) => setOrderDetails((p) => ({ ...p, customerName: e.target.value }))}
                    placeholder="Nombre completo"
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                    Teléfono / WhatsApp:
                  </label>
                  <input
                    type="tel"
                    value={orderDetails.customerPhone}
                    onChange={(e) => setOrderDetails((p) => ({ ...p, customerPhone: e.target.value }))}
                    placeholder="Ej: 70232346"
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-pink-600" />
                    Fecha para el evento:
                  </label>
                  <input
                    type="date"
                    value={orderDetails.deliveryDate}
                    onChange={(e) => setOrderDetails((p) => ({ ...p, deliveryDate: e.target.value }))}
                    className="w-full p-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-pink-600" />
                    Hora aproximada:
                  </label>
                  <input
                    type="time"
                    value={orderDetails.deliveryTime}
                    onChange={(e) => setOrderDetails((p) => ({ ...p, deliveryTime: e.target.value }))}
                    className="w-full p-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Preferencia de Pago:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                  {[
                    { id: 'efectivo', label: 'Efectivo' },
                    { id: 'transferencia_qr', label: 'QR Bancario' },
                    { id: 'en_tienda', label: 'En Sucursal' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          paymentMethod: p.id as OrderDetails['paymentMethod']
                        }))
                      }
                      className={`p-2 rounded-lg border text-center font-medium transition-all ${
                        orderDetails.paymentMethod === p.id
                          ? 'border-[#E85A8A] bg-pink-50 text-[#C73866] font-bold'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drawer Sticky Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-amber-50/80 border-t border-amber-200/60 space-y-3 flex-shrink-0">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Total del Pedido:
              </span>
              <div className="flex items-baseline gap-1 text-[#C73866]">
                <span className="text-2xl sm:text-3xl font-black">{cartTotal}</span>
                <span className="text-sm font-bold text-gray-700">Bs.</span>
              </div>
            </div>

            <button
              onClick={handleSendToWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido por WhatsApp ({BAKERY_INFO.displayPhone})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
