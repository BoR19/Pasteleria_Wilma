import { Product } from '../types/bakery';

export const DEFAULT_PRODUCTS: Product[] = [
  // --- MATRIMONIOS (3 alternativas) ---
  {
    id: 'mat-01',
    nombre: 'Torta de Bodas Clásica Imperial',
    categoria: 'Matrimonios',
    precio: 280,
    precioTexto: '280 Bs.',
    descripcion: 'Torta de 3 pisos con delicado decorado en crema suave, flores naturales, bizcocho esponjoso de vainilla y doble capa de relleno de manjar blanco con nueces selectas.',
    imagen: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 35,
    tiempoAnticipacion: '48 horas de anticipación',
    destacado: true
  },
  {
    id: 'mat-02',
    nombre: 'Torta Nupcial Minimalista Perlada',
    categoria: 'Matrimonios',
    precio: 310,
    precioTexto: '310 Bs.',
    descripcion: 'Elegante diseño blanco satinado con detalles en perlas comestibles y rosas de azúcar. Bizcocho húmedo de almendras con crema diplomática y duraznos.',
    imagen: 'https://images.unsplash.com/photo-1522767131594-6b7e96848fba?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 40,
    tiempoAnticipacion: '48 horas de anticipación',
    destacado: true
  },
  {
    id: 'mat-03',
    nombre: 'Torta Semi-Naked Floral de Bodas',
    categoria: 'Matrimonios',
    precio: 260,
    precioTexto: '260 Bs.',
    descripcion: 'Estilo rústico romántico con cobertura ligera de buttercream, decorada con frutos rojos y flores frescas de temporada sobre bizcochuelo de vainilla.',
    imagen: 'https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 30,
    tiempoAnticipacion: '48 horas de anticipación',
    destacado: false
  },

  // --- 15 AÑOS (3 alternativas) ---
  {
    id: 'xv-01',
    nombre: 'Torta 15 Años Elegance Rose',
    categoria: '15 años',
    precio: 220,
    precioTexto: '220 Bs.',
    descripcion: 'Diseño vanguardista con detalles en degrade rosa pastel y toques perlados. Bizcocho de chocolate húmedo suizo con relleno de mousse de frutilla y ganache.',
    imagen: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 25,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: true
  },
  {
    id: 'xv-02',
    nombre: 'Torta Princesa Macarons & Flores',
    categoria: '15 años',
    precio: 245,
    precioTexto: '245 Bs.',
    descripcion: 'Corona de macarons artesanales y suspiros en tonos rosados sobre suave crema chantilly. Relleno doble de dulce de leche y frutillas frescas.',
    imagen: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 25,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'xv-03',
    nombre: 'Torta Quinceañera Berry Velvet',
    categoria: '15 años',
    precio: 210,
    precioTexto: '210 Bs.',
    descripcion: 'Bizcocho Red Velvet suave con frosting de queso crema y cascada de fresas y frambuesas glaseadas ideal para mesa principal.',
    imagen: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 20,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },

  // --- BABY SHOWER (3 alternativas) ---
  {
    id: 'baby-01',
    nombre: 'Torta Baby Shower Osito Tierno',
    categoria: 'Baby shower',
    precio: 150,
    precioTexto: '150 Bs.',
    descripcion: 'Decorado tierno en tonos pasteles ideal para dar la bienvenida al nuevo bebé. Suave relleno cremoso de tres leches y canela sutil.',
    imagen: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 15,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'baby-02',
    nombre: 'Torta Dulce Bienvenida Nubes Pastel',
    categoria: 'Baby shower',
    precio: 165,
    precioTexto: '165 Bs.',
    descripcion: 'Cobertura suave de merengue italiano en tonos celeste o rosa bebé con perlitas dulces y relleno de manjar casero.',
    imagen: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 18,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'baby-03',
    nombre: 'Torta Revelación de Género Sorpresa',
    categoria: 'Baby shower',
    precio: 175,
    precioTexto: '175 Bs.',
    descripcion: 'Exterior blanco neutro con decorado delicado; al cortarla revela crema interior rosa o celeste con chispas de colores.',
    imagen: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 18,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: true
  },

  // --- BAUTIZOS (3 alternativas) ---
  {
    id: 'bau-01',
    nombre: 'Torta Bautizo Angelical Dorada',
    categoria: 'Bautizos',
    precio: 180,
    precioTexto: '180 Bs.',
    descripcion: 'Elegante torta blanca inmaculada con detalles dorados y motivo angelical. Bizcocho de vainilla bourbon con mermelada artesanal de frutos del bosque.',
    imagen: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 20,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'bau-02',
    nombre: 'Torta Bautizo Corona Blanca & Flores',
    categoria: 'Bautizos',
    precio: 195,
    precioTexto: '195 Bs.',
    descripcion: 'Delicada cobertura lisa de buttercream marfil con ramillete floral blanco y relleno cremoso de leche condensada con durazno.',
    imagen: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 22,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'bau-03',
    nombre: 'Torta Bautizo Clásica de Vainilla & Almendras',
    categoria: 'Bautizos',
    precio: 170,
    precioTexto: '170 Bs.',
    descripcion: 'Esponjoso bizcochuelo aromatizado con vainilla natural, cubierto con merengue suizo blanco y láminas de almendra tostada.',
    imagen: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 16,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },

  // --- ESPECIALES (3 alternativas) ---
  {
    id: 'esp-01',
    nombre: 'Torta Selva Negra Premium Artesanal',
    categoria: 'Especiales',
    precio: 130,
    precioTexto: '130 Bs.',
    descripcion: 'Tradicional bizcocho de cacao fino, bañado en almíbar de cerezas, abundante crema chantilly batida, guindas al jugo y virutas de chocolate negro puro.',
    imagen: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 12,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: true
  },
  {
    id: 'esp-02',
    nombre: 'Torta de Frutillas con Crema Diplomática',
    categoria: 'Especiales',
    precio: 110,
    precioTexto: '110 Bs.',
    descripcion: 'Cosecha de frutillas frescas seleccionadas sobre capas sedosas de crema diplomática y bizcochuelo esponjoso empapado en almíbar cítrico ligero.',
    imagen: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 12,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },
  {
    id: 'esp-03',
    nombre: 'Torta Moka & Avellanas Especial Wilma',
    categoria: 'Especiales',
    precio: 145,
    precioTexto: '145 Bs.',
    descripcion: 'Fusión aromática de bizcocho de café expreso con ganache de chocolate semiamargo y praliné crocante de avellanas.',
    imagen: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 14,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },

  // --- CUMPLEAÑOS (3 alternativas) ---
  {
    id: 'cum-01',
    nombre: 'Torta Tres Leches Tradicional Wilma',
    categoria: 'Cumpleaños',
    precio: 125,
    precioTexto: '125 Bs.',
    descripcion: 'Nuestra receta secreta y más pedida: bizcocho ultra húmedo bañado en la perfecta mezcla de tres leches, coronado con merengue italiano tostado y canela.',
    imagen: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 15,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: true
  },
  {
    id: 'cum-02',
    nombre: 'Torta Drip de Chocolate y Trufas',
    categoria: 'Cumpleaños',
    precio: 140,
    precioTexto: '140 Bs.',
    descripcion: 'Para los verdaderos amantes del cacao: cobertura con drip de chocolate amargo, decorada con trufas caseras y galletas artesanales sobre bizcocho marmoleado.',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 14,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },
  {
    id: 'cum-03',
    nombre: 'Torta Cumpleaños Confeti & Vainilla',
    categoria: 'Cumpleaños',
    precio: 120,
    precioTexto: '120 Bs.',
    descripcion: 'Alegre torta festiva con chispas de colores en la masa, cobertura de crema dulce de mantequilla y relleno de dulce de leche.',
    imagen: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 12,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },

  // --- POSTRES (3 alternativas) ---
  {
    id: 'pos-01',
    nombre: 'Cheesecake de Frutos Rojos',
    categoria: 'Postres',
    precio: 95,
    precioTexto: '95 Bs.',
    descripcion: 'Base crocante de galletas de canela y mantequilla, cuerpo de queso crema horneado al estilo New York con coulis casero de frambuesas y moras.',
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 10,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },
  {
    id: 'pos-02',
    nombre: 'Tiramisú Italiano Clásico',
    categoria: 'Postres',
    precio: 90,
    precioTexto: '90 Bs.',
    descripcion: 'Capas de bizcotelas empapadas en café recién pasado con suave crema mascarpone y espolvoreado de cacao puro.',
    imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 10,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },
  {
    id: 'pos-03',
    nombre: 'Pie de Limón & Merengue Tostado',
    categoria: 'Postres',
    precio: 85,
    precioTexto: '85 Bs.',
    descripcion: 'Masa sablée crocante rellena con crema cítrica de limón fresco y cubierta con altos picos de merengue flambeado.',
    imagen: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 10,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  }
];

export const SIZES_OPTIONS = [
  { id: 'pequena', label: 'Mediana (10-12 porciones)', multiplicador: 0.85, baseExtraText: '-15% precio' },
  { id: 'mediana', label: 'Estándar (15-20 porciones)', multiplicador: 1.0, baseExtraText: 'Precio Base' },
  { id: 'grande', label: 'Familiar (25-30 porciones)', multiplicador: 1.45, baseExtraText: '+45% precio' },
  { id: 'tres_pisos', label: 'Especial 3 Pisos (45-50 porciones)', multiplicador: 2.1, baseExtraText: 'Doble tamaño' },
] as const;

export const SPONGE_OPTIONS = [
  'Bizcochuelo Clásico de Vainilla',
  'Bizcocho de Chocolate Húmedo',
  'Marmoleado (Vainilla & Cacao)',
  'Tres Leches Húmedo Especial',
  'Red Velvet Suave'
];

export const FILLING_OPTIONS = [
  'Dulce de Leche / Manjar con Nueces',
  'Frutillas Frescas con Crema Chantilly',
  'Mousse de Chocolate Semiamargo',
  'Crema Diplomática con Duraznos al Jugo',
  'Nutella con Trozos de Galleta'
];
