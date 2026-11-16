import Papa from 'papaparse';
import { Product } from '../types/bakery';
import { DEFAULT_PRODUCTS } from '../data/defaultCatalog';
import { FALLBACK_CAKE_IMAGE } from '../utils/bakeryHelpers';

const LOCAL_STORAGE_URL_KEY = 'wilma_sheet_url';
const LOCAL_STORAGE_PRODUCTS_KEY = 'wilma_cached_products';

export interface ParseResult {
  success: boolean;
  products: Product[];
  error?: string;
  rowCount?: number;
  changedPricesCount?: number;
}

export function parsePrice(val: unknown): { numberValue: number; textValue: string } {
  if (typeof val === 'number') {
    return { numberValue: val, textValue: `${val} Bs.` };
  }
  if (!val || typeof val !== 'string') {
    return { numberValue: 0, textValue: 'A convenir' };
  }

  const raw = val.trim();
  // Keep digits, dots and commas
  let cleanNumber = raw.replace(/[^0-9.,]/g, '');

  // Handle thousand separators like "1.200" or "1,200" vs decimal "120,50"
  if (/^\d{1,3}([.,]\d{3})+$/.test(cleanNumber)) {
    cleanNumber = cleanNumber.replace(/[.,]/g, '');
  } else {
    cleanNumber = cleanNumber.replace(',', '.');
  }

  const parsed = parseFloat(cleanNumber);

  if (isNaN(parsed)) {
    return { numberValue: 0, textValue: raw || 'Consultar' };
  }

  return { numberValue: parsed, textValue: `${parsed} Bs.` };
}

export function normalizeRow(row: Record<string, unknown>, index: number): Product | null {
  const keys = Object.keys(row);
  const findKey = (candidates: string[]): string | undefined => {
    return keys.find((k) => {
      const lower = k.trim().toLowerCase();
      return candidates.some((c) => lower === c || lower.includes(c));
    });
  };

  const nameKey = findKey(['nombre', 'torta', 'producto', 'title', 'name']);
  const catKey = findKey(['categoria', 'categoría', 'seccion', 'tipo', 'category']);
  const priceKey = findKey(['precio', 'costo', 'valor', 'price']);
  const descKey = findKey(['descripcion', 'descripción', 'detalle', 'ingredientes', 'description']);
  const imgKey = findKey(['imagen', 'foto', 'image', 'url', 'pic']);

  const rawName = nameKey ? String(row[nameKey] ?? '').trim() : '';
  if (!rawName) return null; // Skip empty rows

  const rawCat = catKey ? String(row[catKey] ?? '').trim() : 'Especiales';
  const rawDesc = descKey
    ? String(row[descKey] ?? '').trim()
    : 'Elaborada artesanalmente con ingredientes frescos y selectos.';
  const rawImg = imgKey ? String(row[imgKey] ?? '').trim() : '';
  const priceParsed = parsePrice(priceKey ? row[priceKey] : undefined);

  // Safe fallback image for bakery
  const safeImg = rawImg.startsWith('http') ? rawImg : FALLBACK_CAKE_IMAGE;

  // Stable ID based on normalized name and index so favorites & cart links persist
  const slug = rawName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-');
  const stableId = `sheet-${index}-${slug}`;

  return {
    id: stableId,
    nombre: rawName,
    categoria: rawCat || 'Especiales',
    precio: priceParsed.numberValue > 0 ? priceParsed.numberValue : 120,
    precioTexto: priceParsed.textValue,
    descripcion: rawDesc,
    imagen: safeImg,
    porcionesBase: 15,
    tiempoAnticipacion: 'Bajo pedido'
  };
}

/**
 * Builds the optimal real-time fetch URL:
 * - If standard Google Sheets edit/view URL, uses Google Visualizations API (gviz/tq) with zero cache delay.
 * - Adds dynamic cache-busting timestamp `_cb` to bypass browser and CDN caches without triggering CORS preflight.
 */
export function buildRealtimeSheetUrl(sheetUrl: string): { url: string; mode: string } {
  const trimmed = sheetUrl.trim();
  const timestamp = Date.now();

  const match = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const gidMatch = trimmed.match(/gid=([0-9]+)/);
  const gid = gidMatch ? gidMatch[1] : '0';

  if (match && match[1] && !trimmed.includes('/pub?')) {
    const sheetId = match[1];
    const realtimeUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}&_cb=${timestamp}`;
    return { url: realtimeUrl, mode: 'gviz_instant' };
  }

  const separator = trimmed.includes('?') ? '&' : '?';
  const realtimeUrl = `${trimmed}${separator}_nocache=${timestamp}&_t=${timestamp}`;
  return { url: realtimeUrl, mode: 'published_cachebusted' };
}

export async function fetchAndParseGoogleSheet(
  sheetUrl: string,
  existingProducts?: Product[]
): Promise<ParseResult> {
  const trimmed = sheetUrl.trim();
  if (!trimmed) {
    return { success: false, products: [], error: 'La URL ingresada está vacía.' };
  }

  const { url: fetchUrl } = buildRealtimeSheetUrl(trimmed);

  try {
    // Use cache: 'no-store' WITHOUT custom headers so cross-origin CORS preflight
    // never fails on mobile Safari/Chrome or Google redirects.
    const response = await fetch(fetchUrl, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      if (fetchUrl.includes('/gviz/tq')) {
        const idMatch = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (idMatch && idMatch[1]) {
          const exportUrl = `https://docs.google.com/spreadsheets/d/${idMatch[1]}/export?format=csv&_cb=${Date.now()}`;
          const exportResp = await fetch(exportUrl, { cache: 'no-store' });
          if (exportResp.ok) {
            const csvText = await exportResp.text();
            return parseCsvString(csvText, existingProducts);
          }
        }
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const csvText = await response.text();
    return parseCsvString(csvText, existingProducts);
  } catch (err: unknown) {
    // Secondary fallback using Papa.parse downloader
    return new Promise((resolve) => {
      Papa.parse(fetchUrl, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (!results.data || results.data.length === 0) {
            resolve({
              success: false,
              products: [],
              error: 'La hoja de cálculo no contiene filas válidas o no está publicada en la web.'
            });
            return;
          }

          const parsedProducts: Product[] = [];
          (results.data as Record<string, unknown>[]).forEach((row, i) => {
            const item = normalizeRow(row, i);
            if (item) parsedProducts.push(item);
          });

          if (parsedProducts.length === 0) {
            resolve({
              success: false,
              products: [],
              error: 'No se encontraron columnas reconocibles (nombre, categoria, precio, etc.).'
            });
            return;
          }

          cacheProductsLocally(parsedProducts);
          resolve({
            success: true,
            products: parsedProducts,
            rowCount: parsedProducts.length
          });
        },
        error: (papaErr) => {
          const errMsg = err instanceof Error ? err.message : String(err);
          resolve({
            success: false,
            products: [],
            error: `Error al conectar con Google Sheets: ${papaErr.message || errMsg}. Verifica que la hoja sea pública o esté publicada en la web.`
          });
        }
      });
    });
  }
}

function parseCsvString(csvText: string, existingProducts?: Product[]): ParseResult {
  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });

  if (!parsed.data || parsed.data.length === 0) {
    return {
      success: false,
      products: [],
      error: 'La hoja no contiene datos o filas legibles.'
    };
  }

  const newProducts: Product[] = [];
  (parsed.data as Record<string, unknown>[]).forEach((row, i) => {
    const item = normalizeRow(row, i);
    if (item) newProducts.push(item);
  });

  if (newProducts.length === 0) {
    return {
      success: false,
      products: [],
      error: 'No se detectaron columnas válidas (nombre, categoria, precio, descripcion, imagen).'
    };
  }

  let changedPrices = 0;
  if (existingProducts && existingProducts.length > 0) {
    newProducts.forEach((newP) => {
      const match = existingProducts.find(
        (oldP) => oldP.nombre.trim().toLowerCase() === newP.nombre.trim().toLowerCase()
      );
      if (match && match.precio !== newP.precio) {
        newP.precioActualizado = true;
        changedPrices++;
      }
    });
  }

  cacheProductsLocally(newProducts);

  return {
    success: true,
    products: newProducts,
    rowCount: newProducts.length,
    changedPricesCount: changedPrices
  };
}

function cacheProductsLocally(products: Product[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    // ignore quota issues
  }
}

export function getSavedSheetUrl(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('sheet');
    if (urlParam && urlParam.trim().startsWith('http')) {
      const clean = urlParam.trim();
      localStorage.setItem(LOCAL_STORAGE_URL_KEY, clean);
      return clean;
    }
  } catch {
    // ignore URL parsing error
  }
  return localStorage.getItem(LOCAL_STORAGE_URL_KEY);
}

export function buildShareableSheetLink(sheetUrl: string): string {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}?sheet=${encodeURIComponent(sheetUrl.trim())}`;
}

export function saveSheetUrl(url: string): void {
  localStorage.setItem(LOCAL_STORAGE_URL_KEY, url);
}

export function removeSavedSheetUrl(): void {
  localStorage.removeItem(LOCAL_STORAGE_URL_KEY);
  localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_KEY);
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('sheet')) {
      url.searchParams.delete('sheet');
      window.history.replaceState({}, '', url.toString());
    }
  } catch {
    // ignore
  }
}

export function getCachedProducts(): Product[] {
  try {
    if (!getSavedSheetUrl()) {
      return DEFAULT_PRODUCTS;
    }
    const cached = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_PRODUCTS;
}
