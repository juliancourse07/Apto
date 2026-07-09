export const PRICE_RANGE_MARGIN = 200000;
export const MOCK_PHONE_PREFIX = "300555";

const CITY_SLUGS: Record<string, string> = {
  Medellín: "medellin",
  Sabaneta: "sabaneta",
  Envigado: "envigado",
  Itagüí: "itagui",
  Bello: "bello",
  "La Estrella": "la-estrella",
};

export const getCitySlug = (city: string) => CITY_SLUGS[city] ?? "medellin";

export const getPriceRange = (price: number) => ({
  min: Math.max(0, price - PRICE_RANGE_MARGIN),
  max: price + PRICE_RANGE_MARGIN,
});

export const getFincaRaizUrl = (city: string, bedrooms: number, price: number) => {
  const citySlug = getCitySlug(city);
  const { min, max } = getPriceRange(price);
  return `https://www.fincaraiz.com.co/apartamentos/arriendo/${citySlug}/${bedrooms}-habitaciones/?precio_desde=${min}&precio_hasta=${max}`;
};

export const getMetrocuadradoUrl = (city: string, bedrooms: number, price: number) => {
  const citySlug = getCitySlug(city);
  const { min, max } = getPriceRange(price);
  return `https://www.metrocuadrado.com/apartamentos/arriendo/${citySlug}/?preciomin=${min}&preciomax=${max}&numhabitaciones=${bedrooms}`;
};

export const getCienCuadrasUrl = (city: string, bedrooms: number, price: number) => {
  const citySlug = getCitySlug(city);
  const { min, max } = getPriceRange(price);
  return `https://www.ciencuadras.com/arriendo/${citySlug}/apartamento?habitaciones=${bedrooms}&precio_min=${min}&precio_max=${max}`;
};
