import { Product } from '../types/bakery';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'mat-01',
    nombre: 'Torta de Bodas Clásica Imperial',
    categoria: 'Matrimonios',
    precio: 280,
    precioTexto: '280 Bs.',
    descripcion: 'Torta de 3 pisos con delicado decorado en crema suave, flores artesanales, bizcocho esponjoso de vainilla y doble capa de relleno de manjar blanco con nueces selectas.',
    imagen: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 35,
    tiempoAnticipacion: '48 horas de anticipación',
    destacado: true
  },
  {
    id: 'xv-01',
    nombre: 'Torta 15 Años Elegance Rose',
    categoria: '15 años',
    precio: 220,
    precioTexto: '220 Bs.',
    descripcion: 'Diseño vanguardista con detalles en degrade rosa pastel y toques perlados. Bizcocho de chocolate húmedo suizo con relleno de mousse de frutilla y ganache.',
    imagen: 'https://images.unsplash.com/photo-1562772186-36894546526c?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 25,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: true
  },
  {
    id: 'baby-01',
    nombre: 'Torta Baby Shower Osito Tierno',
    categoria: 'Baby shower',
    precio: 150,
    precioTexto: '150 Bs.',
    descripcion: 'Decorado tierno en tonos celestes y pasteles ideal para dar la bienvenida al nuevo bebé. Suave relleno cremoso de tres leches y canela sutil.',
    imagen: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 15,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
  {
    id: 'bau-01',
    nombre: 'Torta Bautizo Angelical con Detalles Dorados',
    categoria: 'Bautizos',
    precio: 180,
    precioTexto: '180 Bs.',
    descripcion: 'Elegante torta blanca inmaculada con detalles en pan de oro comestible y motivo angelical. Bizcocho de vainilla bourbon con mermelada artesanal de frutos del bosque.',
    imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    porcionesBase: 20,
    tiempoAnticipacion: '24 horas de anticipación',
    destacado: false
  },
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
    id: 'cum-01',
    nombre: 'Torta Tres Leches Tradicional Wilma',
    categoria: 'Cumpleaños',
    precio: 125,
    precioTexto: '125 Bs.',
    descripcion: 'Nuestra receta secreta y más pedida: bizcocho ultra húmedo bañado en la perfecta mezcla de tres leches, coronado con merengue italiano tostado y canela en polvo.',
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
