import React from 'react';
import { Store, Phone, Clock, MessageCircle, Lock } from 'lucide-react';
import { BRANCHES_DATA, BAKERY_INFO } from '../data/branches';

interface FooterProps {
  onOpenBranches: () => void;
  onOpenAdminAccess: () => void;
  isAdminMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBranches,
  onOpenAdminAccess,
  isAdminMode
}) => {
  return (
    <footer className="bg-[#2B180D] text-amber-100/90 mt-16 border-t-4 border-[#E85A8A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Top grid: 3 Branches info */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#93D2C1]">
                Nuestros Locales en Tarija
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-title mt-0.5">
                Visítanos en cualquiera de nuestras 3 sucursales
              </h3>
            </div>
            <button
              type="button"
              onClick={onOpenBranches}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Store className="w-4 h-4 text-pink-400" />
              <span>Ver mapa de sucursales</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BRANCHES_DATA.map((b) => (
              <div
                key={b.id}
                className="bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#E85A8A] text-white text-xs font-bold flex items-center justify-center">
                    #{b.numero}
                  </span>
                  <h4 className="font-bold text-white text-sm">{b.nombre}</h4>
                </div>
                <p className="text-xs text-amber-200/80 leading-relaxed mb-3">
                  {b.ubicacion}
                  <span className="block text-[11px] text-amber-100/60 mt-0.5">{b.referencia}</span>
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{b.horario}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle row: Brand narrative, specialties & customer ordering */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-cursive text-3xl font-bold text-[#E85A8A] mb-2">
              {BAKERY_INFO.name}
            </h4>
            <p className="text-xs text-amber-200/80 leading-relaxed max-w-sm mb-4">
              Dedicados con amor y pasión a la elaboración de tortas para acontecimientos inolvidables: matrimonios, 15 años, baby showers, bautizos y momentos dulces en familia.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Phone className="w-4 h-4" />
              <a
                href={`https://wa.me/${BAKERY_INFO.whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Atención y Pedidos: {BAKERY_INFO.displayPhone}
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Especialidades para eventos
            </h5>
            <ul className="text-xs text-amber-200/70 space-y-1.5">
              <li>Tortas de Bodas de 3 a 5 pisos</li>
              <li>Diseños temáticos para 15 Años</li>
              <li>Tortas tiernas para Baby Shower y Bautizo</li>
              <li>Tres Leches y Selva Negra Artesanal</li>
              <li>Diseños personalizados con dedicatoria</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Pedidos y Entregas
            </h5>
            <p className="text-xs text-amber-200/75 leading-relaxed mb-4">
              Elige tu torta favorita, personaliza el tamaño, bizcocho, relleno y dedicatoria, y envíanos tu pedido directo por WhatsApp para coordinar el recojo en sucursal o envío a domicilio.
            </p>
            <a
              href={`https://wa.me/${BAKERY_INFO.whatsappPhone}?text=${encodeURIComponent(
                'Hola Pastelería Wilma, quiero consultar sobre un pedido personalizado.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright + discreet Admin entry */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-amber-200/60">
          <p>
            © {new Date().getFullYear()} {BAKERY_INFO.name} · {BAKERY_INFO.city}. Todos los derechos reservados.
          </p>
          <button
            type="button"
            onClick={onOpenAdminAccess}
            className="inline-flex items-center gap-1.5 text-[11px] text-amber-200/50 hover:text-amber-100 transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>{isAdminMode ? 'Panel Administración Activo' : 'Administración'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
