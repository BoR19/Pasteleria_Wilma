import React, { useState } from 'react';
import { X, ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, Layers, Cpu, Smartphone, Zap, RefreshCw, Clock } from 'lucide-react';

interface SeniorAnalysisReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeniorAnalysisReportModal: React.FC<SeniorAnalysisReportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'sync' | 'arquitectura' | 'seguridad' | 'negocio' | 'ux'>('sync');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-amber-200 my-auto flex flex-col max-h-[90vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#2B180D] text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E85A8A] flex items-center justify-center text-white shadow-lg">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold">Auditoría Técnica Senior</h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Zero-Cache Sync Fix
                </span>
              </div>
              <p className="text-xs text-amber-200/80">
                Diagnóstico de arquitectura, sincronización en vivo, seguridad y lógica de negocio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/10"
            aria-label="Cerrar reporte"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 px-4 sm:px-6 gap-2 sm:gap-4 overflow-x-auto flex-shrink-0">
          {[
            { id: 'sync', label: '⚡ Fix Sync Google Sheets', icon: Zap },
            { id: 'arquitectura', label: '1. Arquitectura & Código', icon: Layers },
            { id: 'seguridad', label: '2. Seguridad & DOM', icon: ShieldAlert },
            { id: 'negocio', label: '3. Modelo de Negocio', icon: Sparkles },
            { id: 'ux', label: '4. UX & Conversión', icon: Smartphone }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-[#E85A8A] text-[#C73866] bg-white rounded-t-xl'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 flex-grow">
          {activeTab === 'sync' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ¿Por qué no se actualizaban los precios en tiempo real sin recargar?
                </div>
                <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
                  <p>
                    <strong>Causa 1 (Falta de revalidación activa):</strong> En el código original, la función <code>loadFromGoogleSheet()</code> se ejecutaba únicamente una sola vez cuando la página cargaba (<code>DOMContentLoaded</code>). Si tenías la página abierta y cambiabas un precio en el Excel, la aplicación no tenía ningún escucha ni ciclo de refresco.
                  </p>
                  <p>
                    <strong>Causa 2 (Caché del navegador y del CDN de Google):</strong> Las URLs publicadas en Google Sheets (<code>/pub?output=csv</code>) son cacheadas por los servidores de Google y por el navegador web hasta por <strong>5 minutos</strong>. Al no usar headers <code>no-store</code> ni parámetros anti-caché (cache-busting), el navegador devolvía la versión guardada en disco.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Ingeniería de Solución Implementada (Real-Time Zero Cache)
                </div>
                <ul className="space-y-2 text-xs text-gray-700 list-disc list-inside">
                  <li>
                    <strong>Revalidación por Cambio de Pestaña (Focus Revalidation):</strong> Tan pronto como editas el precio en tu pestaña de Google Sheets y vuelves a la pestaña de Pastelería Wilma (evento <code>window.onfocus</code> y <code>visibilitychange</code>), la app detecta tu regreso y sincroniza de inmediato en segundo plano.
                  </li>
                  <li>
                    <strong>Sondeo automático periódico (Auto-polling):</strong> Un temporizador inteligente consulta cambios en segundo plano cada 20 segundos sin interrumpir lo que el cliente esté haciendo ni reiniciar la pantalla.
                  </li>
                  <li>
                    <strong>Bypass de Caché con Timestamps Dinámicos:</strong> Cada petición se envía con <code>&_nocache=${'{Date.now()}'}</code> y cabeceras HTTP <code>'Cache-Control': 'no-cache, no-store, must-revalidate'</code>.
                  </li>
                  <li>
                    <strong>Soporte Directo para Google Visualizations API:</strong> Si pegas el link directo de tu hoja, se consulta a través del endpoint en tiempo real de Google, el cual refleja los cambios con 0 segundos de retraso.
                  </li>
                  <li>
                    <strong>Botón de Sincronización Manual:</strong> Un botón siempre accesible de "Sincronizar Precios" en la barra superior con animación de giro y aviso visual.
                  </li>
                  <li>
                    <strong>Detección de Precios Modificados:</strong> La tarjeta del producto resalta en verde con una insignia <em>"¡Precio Actualizado!"</em> cuando su valor cambia.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'arquitectura' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Problema Original (Monolito Vanilla JS con variables globales)
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Todo el sistema estaba en un archivo HTML único de 479 líneas, usando variables globales mutables (<code className="bg-amber-100 px-1 py-0.5 rounded">products</code>, <code className="bg-amber-100 px-1 py-0.5 rounded">activeProduct</code>), cargando Tailwind y scripts pesados vía CDN público, y renderizando la UI mediante concatenación directa de strings con <code className="bg-amber-100 px-1 py-0.5 rounded">innerHTML</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Solución Senior Aplicada (Arquitectura React 19 + TypeScript Modular)
                </div>
                <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                  <li><strong>Tipado estricto con TypeScript:</strong> Modelos para <code className="bg-emerald-100 px-1 rounded">Product</code>, <code className="bg-emerald-100 px-1 rounded">CartItem</code>, <code className="bg-emerald-100 px-1 rounded">CustomizationOptions</code>, evitando errores en tiempo de ejecución.</li>
                  <li><strong>Separación por capas:</strong> Datos desacoplados (<code className="bg-emerald-100 px-1 rounded">data/</code>), servicios de sincronización (<code className="bg-emerald-100 px-1 rounded">services/sheetsSync.ts</code>) y componentes atómicos reutilizables.</li>
                  <li><strong>Persistencia reactiva:</strong> Hooks dedicados (<code className="bg-emerald-100 px-1 rounded">useCart</code>, <code className="bg-emerald-100 px-1 rounded">useFavorites</code>) sincronizados automáticamente con <code className="bg-emerald-100 px-1 rounded">localStorage</code>.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'seguridad' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <div className="flex items-center gap-2 font-bold text-rose-900 mb-1">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Vulnerabilidad Crítica Detectada: Inyección XSS & Parse Frágil
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-2">
                  En el código original se realizaba:
                </p>
                <code className="block bg-black/90 text-amber-300 font-mono p-2.5 rounded-xl text-[11px] overflow-x-auto mb-2">
                  button onclick='openModal($&#123;JSON.stringify(product).replace(/'/g, "&apos;")&#125;)'
                </code>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Si un usuario en Google Sheets incluía descripciones con saltos de línea, comillas dobles o caracteres de escape, la aplicación arrojaba errores de sintaxis y se congelaba la pantalla. Peor aún, permitía inyección de código script malicioso a través de las celdas del Excel.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Blindaje Implementado
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Se eliminó completamente la generación de HTML por texto plano. El renderizado ahora se realiza mediante el motor VDOM de React, garantizando sanitización automática contra ataques Cross-Site Scripting (XSS) y normalización segura de URLs de imágenes con fallbacks automáticos ante links caídos.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'negocio' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Limitación de Negocio en la Versión Anterior
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  El cliente solo podía pedir 1 torta de tamaño único por mensaje de WhatsApp. No existía la posibilidad de pedir varias tortas, ni elegir porciones, ni personalizar masa/relleno, ni coordinar entre las 3 sucursales físicas (Mercado Campesino, Mercado Central, Moto Méndez) o pedir delivery a domicilio con fecha de entrega.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Nuevas Funcionalidades de Alto Valor
                </div>
                <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                  <li><strong>Carrito Multi-item:</strong> Permite sumar varias tortas y postres con total consolidado en Bolivianos (Bs.).</li>
                  <li><strong>Personalización de Porciones:</strong> Selector de tamaño (Mediana, Estándar, Familiar, 3 Pisos) con ajuste automático de precio.</li>
                  <li><strong>Sabores y Rellenos artesanales:</strong> Bizcochos (Vainilla, Chocolate, Tres Leches, Red Velvet) y rellenos (Manjar con nueces, Frutillas, etc.).</li>
                  <li><strong>Logística de Entrega:</strong> Retiro en sucursal específica (#1, #2 o #3) o envío a domicilio con fecha/hora y método de pago (Efectivo, QR, En tienda).</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ux' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Mejoras de Experiencia de Usuario & Anti-Slop Design
                </div>
                <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                  <li><strong>Búsqueda en tiempo real & Filtro por Categorías dinámico:</strong> Búsqueda instantánea con conteo de resultados y reseteo suave.</li>
                  <li><strong>Lista de Favoritos (Wishlist):</strong> Para guardar las tortas preferidas del cliente durante la planificación de un evento.</li>
                  <li><strong>Mensajes de WhatsApp perfectamente estructurados:</strong> Formato enriquecido con negritas, viñetas y emojis que le ahorran tiempo al pastelero al recepcionar el pedido.</li>
                  <li><strong>Resiliencia Offline y Caché:</strong> Si el enlace de Google Sheets no responde o no tiene internet, la app utiliza el catálogo en caché local sin mostrar errores feos o alertas nativas intrusivas.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="text-[11px] text-gray-500">
            Pastelería Wilma • Ingeniería de Software Web
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#E85A8A] hover:bg-[#C73866] text-white text-xs font-bold rounded-xl shadow transition-colors"
          >
            Cerrar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};
