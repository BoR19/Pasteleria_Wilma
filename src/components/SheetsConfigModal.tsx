import React, { useState } from 'react';
import { X, Sheet, CheckCircle2, AlertCircle, RefreshCw, RotateCcw, Zap, Clock, Info } from 'lucide-react';
import { SheetsSyncState } from '../types/bakery';

interface SheetsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncState: SheetsSyncState;
  onSaveSheetUrl: (url: string) => Promise<void>;
  onRestoreDefaults: () => void;
  autoSyncEnabled: boolean;
  onToggleAutoSync: (enabled: boolean) => void;
  pollingInterval: number;
  onChangePollingInterval: (seconds: number) => void;
}

export const SheetsConfigModal: React.FC<SheetsConfigModalProps> = ({
  isOpen,
  onClose,
  syncState,
  onSaveSheetUrl,
  onRestoreDefaults,
  autoSyncEnabled,
  onToggleAutoSync,
  pollingInterval,
  onChangePollingInterval
}) => {
  const [urlInput, setUrlInput] = useState(syncState.url || '');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!urlInput.trim()) {
      setFeedback({ type: 'error', message: 'Por favor ingresa la URL de tu Google Sheet.' });
      return;
    }

    setLoading(true);
    try {
      await onSaveSheetUrl(urlInput.trim());
      setFeedback({
        type: 'success',
        message: '¡Conexión y sincronización en tiempo real configurada con éxito!'
      });
      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (err: unknown) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Error al conectar con la hoja.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = () => {
    onRestoreDefaults();
    setUrlInput('');
    setFeedback({
      type: 'success',
      message: 'Se restableció el catálogo a los datos demostrativos locales.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-amber-100 my-auto"
        role="dialog"
      >
        <div className="p-5 sm:p-6 bg-[#341F14] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Sheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Vincular con Google Sheets</h3>
              <p className="text-xs text-emerald-200">Sincronización en tiempo real sin caché</p>
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

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Real-time explanation banner */}
          <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block text-amber-950">
                Solución al retardo de precios de Google Sheets:
              </strong>
              Ahora la aplicación usa <em>bypass de caché con timestamps dinámicos</em> y sincronización automática al cambiar de pestaña. Puedes pegar el enlace de tu hoja normal o el enlace publicado.
            </div>
          </div>

          {/* Instructions Step-by-Step */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/60 text-xs text-gray-700 space-y-2">
            <span className="font-bold text-emerald-900 block text-xs uppercase tracking-wider">
              Estructura de la hoja:
            </span>
            <p className="text-gray-600">
              Asegúrate de que la primera fila contenga:
              <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300 ml-1">
                nombre, categoria, precio, descripcion, imagen
              </span>
            </p>
            <p className="text-[11px] text-gray-500">
              💡 <em>Tip Senior:</em> Puedes pegar directamente la URL de tu hoja de Google Sheets (ejemplo: <code>https://docs.google.com/spreadsheets/d/.../edit</code>) o la publicada en formato CSV.
            </p>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-xs font-bold uppercase mb-1.5 text-gray-700">
              Enlace de tu Google Sheet:
            </label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../edit o /pub?output=csv"
              className="w-full p-3 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
            />
          </div>

          {/* Real-time Auto-Sync Configuration Controls */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-gray-800">
                  Sincronización en segundo plano (Auto-Sync)
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSyncEnabled}
                  onChange={(e) => onToggleAutoSync(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {autoSyncEnabled && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  Intervalo de sondeo:
                </span>
                <select
                  value={pollingInterval}
                  onChange={(e) => onChangePollingInterval(Number(e.target.value))}
                  className="bg-white border border-gray-300 rounded-lg p-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value={15}>Cada 15 segundos (Instantáneo)</option>
                  <option value={30}>Cada 30 segundos (Recomendado)</option>
                  <option value={60}>Cada 1 minuto</option>
                </select>
              </div>
            )}
          </div>

          {/* Status / Feedback message */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 justify-between pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleRestore}
              className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Usar Datos Locales Demo</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#E85A8A] hover:bg-[#C73866] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sincronizando en vivo...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guardar y Sincronizar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
