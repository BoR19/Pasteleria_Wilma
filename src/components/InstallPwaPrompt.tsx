import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Only show if not dismissed recently
      const dismissed = localStorage.getItem('wilma_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('wilma_pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="bg-gradient-to-r from-pink-500 to-[#E85A8A] text-white py-2 px-3 text-xs flex items-center justify-between gap-2 shadow-sm animate-in slide-in-from-top duration-300">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse flex-shrink-0" />
        <span className="font-medium text-[11px] sm:text-xs">
          ¡Instala la App de Pastelería Wilma en tu celular para pedir más rápido!
        </span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleInstallClick}
          className="bg-white text-[#C73866] font-bold px-2.5 py-1 rounded-full text-[11px] shadow-xs hover:bg-pink-50 transition-colors flex items-center gap-1"
        >
          <Download className="w-3 h-3" />
          <span>Instalar</span>
        </button>
        <button
          onClick={handleDismiss}
          className="text-white/80 hover:text-white p-1"
          aria-label="Cerrar aviso"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
