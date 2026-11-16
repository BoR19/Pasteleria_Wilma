import Papa from 'papaparse';
import { Product } from '../types/bakery';
import { DEFAULT_PRODUCTS } from '../data/defaultCatalog';

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
  // Strip out "Bs.", "$", spaces, and normalize comma to period
  const cleanNumber = raw.replace(/[^0-9.,]/g, '').replace(',', '.');
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
  const safeImg = rawImg.startsWith('http')
    ? rawImg
    : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';

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
    precio: priceParsed.numberValue || 120,
    precioTexto: priceParsed.textValue,
    descripcion: rawDesc,
    imagen: safeImg,
    porcionesBase: 15,
    tiempoAnticipacion: 'Bajo pedido'
  };
}

/**
 * Builds the optimal real-time fetch URL:
 * - If standard Google Sheets edit/view URL, uses Google Visualizations API (gviz/tq) or export endpoint with zero cache delay.
 * - Adds dynamic cache-busting timestamp `_cb` to completely bypass browser and CDN caches.
 */
export function buildRealtimeSheetUrl(sheetUrl: string): { url: string; mode: string } {
  const trimmed = sheetUrl.trim();
  const timestamp = Date.now();

  // Pattern 1: standard Google Sheets link (e.g. /d/SPREADSHEET_ID/edit#gid=0)
  const match = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const gidMatch = trimmed.match(/gid=([0-9]+)/);
  const gid = gidMatch ? gidMatch[1] : '0';

  if (match && match[1] && !trimmed.includes('/pub?')) {
    const sheetId = match[1];
    // Google Visualization CSV endpoint updates INSTANTLY without the 5-minute publishing cache
    const realtimeUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}&_cb=${timestamp}`;
    return { url: realtimeUrl, mode: 'gviz_instant' };
  }

  // Pattern 2: Published web CSV URL (/pub?output=csv)
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
    // 1. Fetch with explicit cache-busting headers
    const response = await fetch(fetchUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0'
      }
    });

    if (!response.ok) {
      // Fallback: If gviz failed, try direct export
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
    // Try Papa.parse download as secondary fallback
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

  // Detect price changes compared to previous products
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
  return localStorage.getItem(LOCAL_STORAGE_URL_KEY);
}

export function saveSheetUrl(url: string): void {
  localStorage.setItem(LOCAL_STORAGE_URL_KEY, url);
}

export function removeSavedSheetUrl(): void {
  localStorage.removeItem(LOCAL_STORAGE_URL_KEY);
  localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_KEY);
}

export function getCachedProducts(): Product[] {
  try {
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
