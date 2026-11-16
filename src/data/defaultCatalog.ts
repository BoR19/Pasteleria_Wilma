import { Product } from '../types/bakery';

export const DEFAULT_PRODUCTS: Product[] = [
  // --- MATRIMONIOS (3 alternativas) ---
  {
    id: 'TORT-001',
    nombre: 'Torta Elegante de Bodas (3 Pisos)',
    categoria: 'Matrimonios',
    precio: 350,
    precioTexto: '350 Bs.',
    descripcion: 'Bizcocho de vainilla y chocolate con relleno de manjar y crema pastelera, decorado con flores finas.',
    imagen: 'https://images.unsplash.com/photo-1522767131594-6b7e96848fba?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 40,
    tiempoAnticipacion: '48 horas de anticipación',
    destacado: true
  },
  {
    id: 'TORT-001-B',
    nombre: 'Torta Bodas Clásica Blanca',
    categoria: 'Matrimonios',
    precio: 280,
    precioTexto: '280 Bs.',
    descripcion: 'Bizcocho de vainilla con relleno de crema de mantequilla y decoración elegante en blanco y perlas comestibles.',
    imagen: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 30,
    tiempoAnticipacion: '48 horas de anticipación',
    destacado: true
  },
  {
    id: 'TORT-001-C',
    nombre: 'Torta Bodas Rústica con Frutas',
    categoria: 'Matrimonios',
    precio: 300,
    precioTexto: '300 Bs.',
    descripcion: 'Bizcocho semi-desnudo de vainilla y limón, con crema chantilly y frutas frescas de temporada.',
    imagen: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 35,
    tiempoAnticipacion: '48 horas de anticipación',
    destacado: false
  },

  // --- 15 AÑOS (3 alternativas) ---
  {
    id: 'TORT-002',
    nombre: 'Torta XV Años Fantasía',
    categoria: '15 Años',
    precio: 150,
    precioTexto: '150 Bs.',
    descripcion: 'Diseño personalizado en fondant con acabados dorados/plateados y sabor a elección.',
    imagen: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 20,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: true
  },
  {
    id: 'TORT-002-B',
    nombre: 'Torta XV Años Princesa Rosa',
    categoria: '15 Años',
    precio: 170,
    precioTexto: '170 Bs.',
    descripcion: 'Bizcocho de fresa y vainilla con crema rosada, corona dorada y detalles en fondant.',
    imagen: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 25,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'TORT-002-C',
    nombre: 'Torta XV Años Brillante Dorada',
    categoria: '15 Años',
    precio: 190,
    precioTexto: '190 Bs.',
    descripcion: 'Bizcocho de chocolate y vainilla con brillo dorado comestible, flores y topper de XV.',
    imagen: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 25,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },

  // --- BABY SHOWER (3 alternativas) ---
  {
    id: 'TORT-003',
    nombre: 'Torta Bienvenida Bebé',
    categoria: 'Baby Shower',
    precio: 180,
    precioTexto: '180 Bs.',
    descripcion: 'Bizcocho esponjoso con crema chantilly y adorno temático en azúcar.',
    imagen: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 18,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'TORT-003-B',
    nombre: 'Torta Baby Shower Celeste / Rosado',
    categoria: 'Baby Shower',
    precio: 160,
    precioTexto: '160 Bs.',
    descripcion: 'Bizcocho de vainilla con relleno de manjar, decoración en celeste o rosado a elección con osito en fondant.',
    imagen: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 15,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'TORT-003-C',
    nombre: 'Torta Revelación de Género',
    categoria: 'Baby Shower',
    precio: 175,
    precioTexto: '175 Bs.',
    descripcion: 'Bizcocho con centro de color sorpresa, crema blanca y decoración neutra para la revelación.',
    imagen: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 18,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: true
  },

  // --- BAUTIZOS (3 alternativas) ---
  {
    id: 'TORT-004',
    nombre: 'Torta Bautizo Santo Angelito',
    categoria: 'Bautizos',
    precio: 200,
    precioTexto: '200 Bs.',
    descripcion: 'Torta de 2 pisos suave con glaseado real y detalles delicados.',
    imagen: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 22,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'TORT-004-B',
    nombre: 'Torta Bautizo Angelito Blanco',
    categoria: 'Bautizos',
    precio: 185,
    precioTexto: '185 Bs.',
    descripcion: 'Bizcocho de vainilla con crema blanca, angelito en azúcar y detalles en dorado suave.',
    imagen: 'https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 20,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'TORT-004-C',
    nombre: 'Torta Bautizo Cielo y Nubes',
    categoria: 'Bautizos',
    precio: 195,
    precioTexto: '195 Bs.',
    descripcion: 'Bizcocho de limón con crema chantilly, decoración de nubes y estrellitas en fondant.',
    imagen: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 20,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },

  // --- CUMPLEAÑOS (3 alternativas) ---
  {
    id: 'TORT-005',
    nombre: 'Torta Selva Negra Premium',
    categoria: 'Cumpleaños',
    precio: 110,
    precioTexto: '110 Bs.',
    descripcion: 'Bizcocho de chocolate húmedo, cerezas al marrasquino y abundante viruta de chocolate.',
    imagen: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 12,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: true
  },
  {
    id: 'TORT-005-B',
    nombre: 'Torta Cumpleaños Chocolate y Manjar',
    categoria: 'Cumpleaños',
    precio: 120,
    precioTexto: '120 Bs.',
    descripcion: 'Bizcocho de chocolate con doble relleno de manjar y crema de chocolate, con chispas y velas decorativas.',
    imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 14,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },
  {
    id: 'TORT-005-C',
    nombre: 'Torta Cumpleaños Personalizada Temática',
    categoria: 'Cumpleaños',
    precio: 140,
    precioTexto: '140 Bs.',
    descripcion: 'Bizcocho a elección con diseño personalizado según temática, nombre y edad en fondant.',
    imagen: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 15,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },

  // --- POSTRES (3 alternativas) ---
  {
    id: 'TORT-006',
    nombre: 'Torta Especial de Frutillas con Crema',
    categoria: 'Postres',
    precio: 130,
    precioTexto: '130 Bs.',
    descripcion: 'Relleno de mermelada artesanal y frutillas frescas de temporada.',
    imagen: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 12,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: true
  },
  {
    id: 'TORT-006-B',
    nombre: 'Torta Tres Leches Clásica',
    categoria: 'Postres',
    precio: 115,
    precioTexto: '115 Bs.',
    descripcion: 'Bizcocho esponjoso bañado en tres leches con canela y crema chantilly.',
    imagen: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 12,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },
  {
    id: 'TORT-006-C',
    nombre: 'Torta de Maracuyá con Merengue',
    categoria: 'Postres',
    precio: 125,
    precioTexto: '125 Bs.',
    descripcion: 'Bizcocho de vainilla con crema de maracuyá y merengue dorado, toque ácido-dulce.',
    imagen: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 12,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: false
  },

  // --- ESPECIALES (3 alternativas) ---
  {
    id: 'TORT-007',
    nombre: 'Torta Aniversario Especial',
    categoria: 'Especiales',
    precio: 160,
    precioTexto: '160 Bs.',
    descripcion: 'Torta decorada con drips de chocolate y toppings variados.',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 15,
    tiempoAnticipacion: 'Disponible hoy',
    destacado: true
  },
  {
    id: 'TORT-007-B',
    nombre: 'Torta Aniversario Corazón Rojo',
    categoria: 'Especiales',
    precio: 165,
    precioTexto: '165 Bs.',
    descripcion: 'Bizcocho red velvet con crema de queso, decoración de corazones y rosas rojas.',
    imagen: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 15,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'TORT-007-C',
    nombre: 'Torta Graduación y Logros',
    categoria: 'Especiales',
    precio: 155,
    precioTexto: '155 Bs.',
    descripcion: 'Bizcocho a elección con birrete y diploma en fondant, ideal para graduaciones y celebraciones especiales.',
    imagen: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 15,
    tiempoAnticipacion: '24 horas de anticipación',
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
