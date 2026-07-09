import { NextResponse } from "next/server";
import { MOCK_LISTINGS } from "@/lib/mock-listings";
import { Listing } from "@/types/listing";

const safeFetchJson = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

const extractListings = (payload: any): Listing[] => {
  if (!payload || !Array.isArray(payload.listings)) return [];

  return payload.listings
    .map((item: any, index: number) => ({
      id: item.id ? String(item.id) : `remote-${index}`,
      title: item.title ?? "Apartamento en arriendo",
      price: Number(item.price ?? 0),
      bedrooms: Number(item.bedrooms ?? 0),
      bathrooms: Number(item.bathrooms ?? 0),
      neighborhood: item.neighborhood ?? "Medellín",
      city: item.city ?? "Medellín",
      comuna: item.comuna ?? "Comuna 10",
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      photos: Array.isArray(item.photos) && item.photos.length > 0 ? item.photos : [MOCK_LISTINGS[0].photos[0]],
      url: item.url ?? "https://www.fincaraiz.com.co",
      source: item.source === "directo" ? "directo" : "inmobiliaria",
      postedAt: item.postedAt ?? new Date().toISOString(),
      contactName: item.contactName,
      contactPhone: item.contactPhone,
      whatsapp: item.whatsapp,
      estrato: [1, 2, 3, 4].includes(Number(item.estrato)) ? Number(item.estrato) : 3,
      state: item.state === "nuevo" ? "nuevo" : "usado",
      includes: {
        parqueadero: Boolean(item.includes?.parqueadero),
        mascotas: Boolean(item.includes?.mascotas),
        amoblado: Boolean(item.includes?.amoblado),
        serviciosIncluidos: Boolean(item.includes?.serviciosIncluidos),
        conjuntoCerrado: Boolean(item.includes?.conjuntoCerrado),
        seguridadPorteria: Boolean(item.includes?.seguridadPorteria),
        piscinaZonasComunes: Boolean(item.includes?.piscinaZonasComunes),
      },
    }))
    .filter((item: Listing) => Number.isFinite(item.latitude) && Number.isFinite(item.longitude));
};

const fetchExternalListings = async () => {
  const sources = [process.env.FINCARAIZ_PUBLIC_API_URL, process.env.METROCUADRADO_PUBLIC_API_URL].filter(
    Boolean,
  ) as string[];

  if (sources.length === 0) return [];

  const settled = await Promise.all(sources.map((sourceUrl) => safeFetchJson(sourceUrl)));
  return settled.flatMap((payload) => extractListings(payload));
};

export async function GET() {
  const external = await fetchExternalListings();

  if (external.length > 0) {
    return NextResponse.json({ source: "externo", listings: external });
  }

  return NextResponse.json({
    source: "mock",
    notice:
      "Sin API pública estable para scraping directo. Conecta FINCARAIZ_PUBLIC_API_URL y/o METROCUADRADO_PUBLIC_API_URL para usar fuentes reales.",
    listings: MOCK_LISTINGS,
  });
}
