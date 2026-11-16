import React, { useState, useEffect } from 'react';
import { Lock, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { ADMIN_PIN } from '../data/branches';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === ADMIN_PIN) {
      onAuthenticated();
      onClose();
    } else {
      setError('Clave incorrecta. Verifica tu clave de administrador.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-pink-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-auth-title"
      >
        <div className="p-5 bg-[#2B180D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E85A8A] flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 id="admin-auth-title" className="text-base font-bold">
                Acceso Administración
              </h3>
              <p className="text-[11px] text-amber-200/80">Uso interno de Pastelería Wilma</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label
              htmlFor="admin-pin-input"
              className="block text-xs font-bold text-gray-700 mb-1.5"
            >
              Ingresa tu clave de administrador
            </label>
            <input
              id="admin-pin-input"
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••••••"
              autoFocus
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#E85A8A] focus:outline-none"
            />
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#E85A8A] hover:bg-[#C73866] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ingresar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
