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

export const BAKERY_INFO = {
  name: 'Pastelería Wilma',
  slogan: 'Tortas para todo tipo de acontecimientos',
  whatsappPhone: '5917023346',
  displayPhone: '+591 7023346',
  city: 'Tarija, Bolivia',
  events: ['Matrimonios', '15 Años', 'Baby Shower', 'Bautizos', 'Cumpleaños', 'Eventos Corporativos']
};
