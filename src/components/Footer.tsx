import React from 'react';
import { Store, Phone, Sheet, Code2, Clock } from 'lucide-react';
import { BRANCHES_DATA, BAKERY_INFO } from '../data/branches';

interface FooterProps {
  onOpenBranches: () => void;
  onOpenSheetsModal: () => void;
  onOpenSeniorReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBranches,
  onOpenSheetsModal,
  onOpenSeniorReport
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
              onClick={onOpenBranches}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5"
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
                  <Clock className="w-3.5 h-3.5" />
                  <span>{b.horario}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle row: Brand narrative & Quick tools */}
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
              <li>✨ Tortas de Bodas de 3 a 5 pisos</li>
              <li>✨ Diseños temáticos para 15 Años</li>
              <li>✨ Tortas tiernas para Baby Shower & Bautizo</li>
              <li>✨ Tres Leches y Selva Negra Artesanal</li>
              <li>✨ Diseños personalizados con dedicatoria</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Herramientas de Administración
            </h5>
            <div className="space-y-2.5">
              <button
                onClick={onOpenSheetsModal}
                className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between text-xs text-amber-100"
              >
                <span className="flex items-center gap-2">
                  <Sheet className="w-4 h-4 text-emerald-400" />
                  Conectar / Actualizar Google Sheets
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  Configurar
                </span>
              </button>

              <button
                onClick={onOpenSeniorReport}
                className="w-full text-left p-3 rounded-xl bg-pink-950/40 hover:bg-pink-950/70 border border-pink-700/40 transition-colors flex items-center justify-between text-xs text-pink-200"
              >
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-pink-400" />
                  Ver Auditoría Técnica Senior
                </span>
                <span className="text-[10px] text-pink-300 bg-pink-900 px-2 py-0.5 rounded">
                  Reporte
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-amber-200/60">
          <p>© {new Date().getFullYear()} {BAKERY_INFO.name} — Tarija, Bolivia. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Hecho con dedicación artesanal y arquitectura web de alto rendimiento.
          </p>
        </div>
      </div>
    </footer>
  );
};
