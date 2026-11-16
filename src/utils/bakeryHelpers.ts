import { BAKERY_INFO } from '../data/branches';
import { CustomizationOptions } from '../types/bakery';

export const FALLBACK_CAKE_IMAGE =
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';

export const CANDLE_TOPPER_PRICE = 10;

export function calculateUnitPrice(
  basePrice: number,
  customization: Pick<CustomizationOptions, 'multiplicadorPrecio' | 'velasOTop'>
): number {
  const baseWithSize = Math.round(basePrice * customization.multiplicadorPrecio);
  const extras = customization.velasOTop ? CANDLE_TOPPER_PRICE : 0;
  return baseWithSize + extras;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BAKERY_INFO.whatsappPhone}?text=${encodeURIComponent(message)}`;
}
