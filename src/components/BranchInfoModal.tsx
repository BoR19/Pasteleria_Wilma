import React from 'react';
import { X, Store, MapPin, Clock, Phone, ExternalLink, Navigation } from 'lucide-react';
import { BRANCHES_DATA, BAKERY_INFO } from '../data/branches';

interface BranchInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BranchInfoModal: React.FC<BranchInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-100 my-auto"
        role="dialog"
      >
        <div className="p-5 sm:p-6 bg-[#341F14] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E85A8A] flex items-center justify-center text-white shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Nuestras 3 Sucursales</h3>
              <p className="text-xs text-amber-200">Tarija, Bolivia • Pastelería Wilma</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/10"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-amber-50/70 p-3 rounded-2xl border border-amber-200/50">
            📍 Te esperamos en cualquiera de nuestros puntos de venta en Tarija para recoger tus pedidos especiales o degustar nuestras tortas frescas del día.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {BRANCHES_DATA.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#93D2C1] text-[#341F14] font-bold text-xs flex items-center justify-center">
                      #{branch.numero}
                    </span>
                    <h4 className="font-bold text-gray-900 text-base">{branch.nombre}</h4>
                  </div>

                  {branch.mapUrl && (
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#E85A8A] hover:underline inline-flex items-center gap-1 bg-pink-50 px-2.5 py-1 rounded-lg"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Cómo llegar</span>
                    </a>
                  )}
                </div>

                <div className="space-y-2 text-xs text-gray-600 mt-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#E85A8A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-800">{branch.ubicacion}</strong>
                      <p className="text-gray-500 text-[11px]">{branch.referencia}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{branch.horario}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <a
                      href={`https://wa.me/${BAKERY_INFO.whatsappPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      {branch.telefono} (WhatsApp y llamadas)
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#341F14] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
          >
            Entendido, volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
