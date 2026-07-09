export type ListingSourceType = "directo" | "inmobiliaria";

export type ListingIncludes = {
  parqueadero: boolean;
  mascotas: boolean;
  amoblado: boolean;
  serviciosIncluidos: boolean;
  conjuntoCerrado: boolean;
  seguridadPorteria: boolean;
  piscinaZonasComunes: boolean;
};

export type ListingState = "nuevo" | "usado";

export type ListingAgeFilter = "24h" | "semana" | "mes" | "todas";

export type SortingOption =
  | "precio_asc"
  | "precio_desc"
  | "reciente"
  | "metro_cercano"
  | "clinica_cercana";

export interface Listing {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  neighborhood: string;
  city: string;
  comuna: string;
  latitude: number;
  longitude: number;
  photos: string[];
  url: string;
  source: ListingSourceType;
  postedAt: string;
  contactName?: string;
  contactPhone?: string;
  whatsapp?: string;
  estrato: 1 | 2 | 3 | 4;
  state: ListingState;
  includes: ListingIncludes;
}

export interface ListingFilters {
  minPrice: number;
  maxPrice: number;
  bedrooms: "1" | "2" | "3" | "3+" | "todas";
  bathrooms: "1" | "2" | "2+" | "todas";
  zone: string;
  nearMetro: boolean;
  metroRadiusKm: number;
  nearClinic: boolean;
  clinicRadiusKm: number;
  publicationType: "directo" | "inmobiliaria" | "ambos";
  listingAge: ListingAgeFilter;
  includes: Array<keyof ListingIncludes>;
  estratos: Array<1 | 2 | 3 | 4>;
  state: "nuevo" | "usado" | "todos";
  sortBy: SortingOption;
}
