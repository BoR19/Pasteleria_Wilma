export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio: number; // In Bolivianos (Bs.)
  precioTexto?: string;
  descripcion: string;
  imagen: string;
  porcionesBase?: number; // e.g. 15-20 personas
  tiempoAnticipacion?: string; // e.g. "24h de anticipación" o "Disponible hoy"
  destacado?: boolean;
  precioActualizado?: boolean; // For animation feedback when price changes
}

export interface CustomizationOptions {
  tamano: 'pequena' | 'mediana' | 'grande' | 'tres_pisos';
  tamanoTexto: string;
  multiplicadorPrecio: number;
  saborBizcocho: string;
  relleno: string;
  dedicatoria: string;
  velasOTop: boolean;
  notaEspecial: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  customization: CustomizationOptions;
  unitPrice: number;
  subtotal: number;
}

export interface Branch {
  id: string;
  numero: number;
  nombre: string;
  ubicacion: string;
  referencia: string;
  horario: string;
  telefono: string;
  mapUrl?: string;
}

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  deliveryType: 'pickup' | 'delivery';
  branchId?: string;
  deliveryAddress?: string;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: 'efectivo' | 'transferencia_qr' | 'en_tienda';
  generalNotes?: string;
}

export interface SheetsSyncState {
  url: string;
  status: 'idle' | 'syncing' | 'connected' | 'error';
  lastSyncedAt?: string;
  errorMessage?: string;
  productCount: number;
  autoSyncEnabled?: boolean;
  pollingIntervalSeconds?: number;
  lastSyncDurationMs?: number;
}
