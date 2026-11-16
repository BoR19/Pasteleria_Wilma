import { Branch } from '../types/bakery';

export const BRANCHES_DATA: Branch[] = [
  {
    id: 'sucursal-1',
    numero: 1,
    nombre: 'Sucursal Mercado Campesino',
    ubicacion: 'Calle Comercio 2° Piso, Edificio El Crama',
    referencia: 'Frente a la pasarela peatonal, sector comercial',
    horario: 'Lunes a Domingo: 07:30 - 20:00',
    telefono: '+591 7023346',
    mapUrl: 'https://maps.google.com/?q=Mercado+Campesino+Tarija'
  },
  {
    id: 'sucursal-2',
    numero: 2,
    nombre: 'Sucursal Mercado Central',
    ubicacion: 'Puesto #29, Sección Especial Tortas',
    referencia: 'Ingreso principal por calle Sucre, planta baja',
    horario: 'Lunes a Sábado: 08:00 - 19:30 | Domingo: 08:00 - 15:00',
    telefono: '+591 7023346',
    mapUrl: 'https://maps.google.com/?q=Mercado+Central+Tarija'
  },
  {
    id: 'sucursal-3',
    numero: 3,
    nombre: 'Sucursal Barrio Moto Méndez',
    ubicacion: 'Avenida Javier Castellanos',
    referencia: 'A media cuadra de la rotonda principal',
    horario: 'Lunes a Domingo: 08:30 - 21:00',
    telefono: '+591 7023346',
    mapUrl: 'https://maps.google.com/?q=Barrio+Moto+Mendez+Tarija'
  }
];

// ============================================================================
// 📌 PEGA AQUÍ EL LINK DE TU GOOGLE SHEETS OFICIAL (entre las comillas '')
// Al pegarlo aquí (o en Vercel como VITE_GOOGLE_SHEET_URL), TODOS tus clientes
// en PC y celular verán los precios, productos e imágenes actualizados en vivo.
// Ejemplo: 'https://docs.google.com/spreadsheets/d/1ABC.../edit?usp=sharing'
// ============================================================================
export const GOOGLE_SHEETS_OFICIAL_URL = 'https://docs.google.com/spreadsheets/d/1a_xTP5aurhovxrhkxjC_5vp4QoSjQSJfjGjBgKsjKjQ/edit?usp=sharing';

// Clave privada para acceder al Modo Administrador (puedes cambiarla aquí o en Vercel con VITE_ADMIN_PIN)
export const ADMIN_PIN = (import.meta.env?.VITE_ADMIN_PIN || 'wilma2026').trim();

export const BAKERY_INFO = {
  name: 'Pastelería Wilma',
  slogan: 'Tortas para todo tipo de acontecimientos',
  whatsappPhone: '5917023346',
  displayPhone: '+591 7023346',
  city: 'Tarija, Bolivia',
  events: ['Matrimonios', '15 Años', 'Baby Shower', 'Bautizos', 'Cumpleaños', 'Eventos Corporativos'],
  officialSheetUrl: (GOOGLE_SHEETS_OFICIAL_URL || import.meta.env?.VITE_GOOGLE_SHEET_URL || '').trim()
};
