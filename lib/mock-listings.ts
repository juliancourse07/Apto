import { Listing } from "@/types/listing";

const photos = [
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
];

const seeds = [
  ["El Poblado", "Medellín", "Comuna 14", 6.208, -75.567, 2500000, 2, 2],
  ["Laureles", "Medellín", "Comuna 11", 6.246, -75.594, 2200000, 2, 1],
  ["Belén", "Medellín", "Comuna 16", 6.2306, -75.6012, 1750000, 2, 1],
  ["Estadio", "Medellín", "Comuna 11", 6.2573, -75.588, 1950000, 2, 1],
  ["Sabaneta", "Sabaneta", "Sabaneta", 6.1519, -75.6152, 1800000, 2, 2],
  ["Envigado Centro", "Envigado", "Envigado", 6.171, -75.5879, 2100000, 2, 1],
  ["Itagüí Centro", "Itagüí", "Itagüí", 6.1681, -75.6143, 1600000, 2, 1],
  ["Niquía", "Bello", "Bello", 6.3349, -75.5458, 1450000, 2, 1],
  ["La Estrella", "La Estrella", "La Estrella", 6.1571, -75.6434, 1700000, 2, 1],
  ["Robledo", "Medellín", "Comuna 7", 6.2753, -75.5975, 1500000, 3, 2],
  ["Manrique", "Medellín", "Comuna 3", 6.2792, -75.5562, 1350000, 2, 1],
  ["Aranjuez", "Medellín", "Comuna 4", 6.2745, -75.5655, 1400000, 2, 1],
  ["Buenos Aires", "Medellín", "Comuna 9", 6.2443, -75.5562, 1650000, 2, 1],
  ["Castropol", "Medellín", "Comuna 14", 6.2176, -75.5674, 2600000, 2, 2],
  ["La América", "Medellín", "Comuna 12", 6.2488, -75.6088, 1550000, 2, 1],
  ["San Javier", "Medellín", "Comuna 13", 6.2569, -75.6107, 1380000, 2, 1],
  ["Santa Mónica", "Medellín", "Comuna 12", 6.253, -75.6061, 1520000, 2, 1],
  ["Los Colores", "Medellín", "Comuna 11", 6.2627, -75.5881, 1820000, 2, 1],
  ["Conquistadores", "Medellín", "Comuna 11", 6.2444, -75.5854, 2350000, 2, 2],
  ["Guayabal", "Medellín", "Comuna 15", 6.2233, -75.5906, 1680000, 2, 1],
  ["El Dorado", "Envigado", "Envigado", 6.1718, -75.5804, 2200000, 2, 2],
  ["Las Antillas", "Envigado", "Envigado", 6.1703, -75.5942, 1950000, 2, 1],
  ["Ditaires", "Itagüí", "Itagüí", 6.1735, -75.6237, 1500000, 2, 1],
  ["Niquía Cabañas", "Bello", "Bello", 6.3255, -75.5529, 1420000, 2, 1],
  ["Madera", "Bello", "Bello", 6.3135, -75.5558, 1480000, 2, 1],
  ["Prado Centro", "Medellín", "Comuna 10", 6.2531, -75.5639, 1720000, 2, 1],
  ["Parque Berrío", "Medellín", "Comuna 10", 6.2496, -75.5705, 1780000, 2, 1],
  ["Bomboná", "Medellín", "Comuna 10", 6.2448, -75.5652, 1690000, 1, 1],
  ["La Floresta", "Medellín", "Comuna 12", 6.2592, -75.597, 1850000, 2, 2],
  ["Santa Lucía", "Medellín", "Comuna 12", 6.2575, -75.6042, 1760000, 2, 1],
  ["Sotavento", "Sabaneta", "Sabaneta", 6.1543, -75.6158, 2050000, 2, 2],
  ["Aves María", "Sabaneta", "Sabaneta", 6.1533, -75.6079, 2300000, 3, 2],
] as const;

const CITY_SLUGS: Record<string, string> = {
  Medellín: "medellin",
  Sabaneta: "sabaneta",
  Envigado: "envigado",
  Itagüí: "itagui",
  Bello: "bello",
  "La Estrella": "la-estrella",
};

const getFincaRaizSearchUrl = (city: string, bedrooms: number, price: number) => {
  const citySlug = CITY_SLUGS[city] ?? "medellin";
  const min = Math.max(0, price - 200000);
  const max = price + 200000;
  return `https://www.fincaraiz.com.co/apartamentos/arriendo/${citySlug}/${bedrooms}-habitaciones/?precio_desde=${min}&precio_hasta=${max}`;
};

export const MOCK_LISTINGS: Listing[] = seeds.map((seed, index) => {
  const [neighborhood, city, comuna, latitude, longitude, price, bedrooms, bathrooms] = seed;
  const postedOffsetDays = index % 28;
  const source = index % 3 === 0 ? "directo" : "inmobiliaria";

  return {
    id: `mock-${index + 1}`,
    title: `Apartamento en arriendo - ${neighborhood}`,
    neighborhood,
    city,
    comuna,
    latitude,
    longitude,
    price,
    bedrooms,
    bathrooms,
    photos: [photos[index % photos.length], photos[(index + 1) % photos.length]],
    source,
    postedAt: new Date(Date.now() - postedOffsetDays * 24 * 60 * 60 * 1000).toISOString(),
    url: getFincaRaizSearchUrl(city, bedrooms, price),
    contactName: source === "directo" ? "Propietario" : "Asesor Inmobiliario",
    estrato: ((index % 4) + 1) as 1 | 2 | 3 | 4,
    state: index % 5 === 0 ? "nuevo" : "usado",
    includes: {
      parqueadero: index % 2 === 0,
      mascotas: index % 3 === 0,
      amoblado: index % 4 === 0,
      serviciosIncluidos: index % 6 === 0,
      conjuntoCerrado: index % 2 !== 0,
      seguridadPorteria: index % 2 === 0,
      piscinaZonasComunes: index % 5 === 0,
    },
  };
});
