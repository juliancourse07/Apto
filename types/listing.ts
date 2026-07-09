export interface Listing {
  id: number;
  fechaConsulta: string;
  fuente: string;
  municipio: string;
  barrio: string;
  precio: number;
  habitaciones: number;
  banos: number;
  area: number;
  tipoArrendador: string;
  arrendador: string;
  url: string;
  latitud: number;
  longitud: number;
  distClinicaKm: number;
  estacionMetro: string;
  lineaMetro: string;
  distMetroKm: number;
  dentroPresupuesto: boolean;
  score: number;
  prioridad: "Alta" | "Media" | "Baja" | "Descartar" | string;
  recomendacion: string;
  googleMaps: string;
  notas: string;
}

export interface ListingFilters {
  search: string;
  minPrice: number;
  maxPrice: number;
  municipio: string;
  prioridad: string;
  minHabitaciones: number;
  minBanos: number;
  maxDistMetroKm: number;
  maxDistClinicaKm: number;
  fuente: string;
  sortBy: "score_desc" | "precio_asc" | "precio_desc" | "distMetro_asc" | "distClinica_asc";
}
