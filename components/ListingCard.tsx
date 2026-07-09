"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import MatchBadge from "@/components/MatchBadge";
import { MOCK_PHONE_PREFIX, getCitySlug, getPriceRange } from "@/lib/portal-search";
import { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
  distanceToMetroKm: number;
  distanceToClinicKm: number;
  matchScore: number;
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

const getAgeBadge = (postedAt: string) => {
  const days = Math.floor((Date.now() - new Date(postedAt).getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  return `${days} días`;
};

export default function ListingCard({
  listing,
  distanceToMetroKm,
  distanceToClinicKm,
  matchScore,
}: ListingCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const badge = useMemo(() => getAgeBadge(listing.postedAt), [listing.postedAt]);
  const citySlug = getCitySlug(listing.city);
  const { min, max } = getPriceRange(listing.price);
  const fincaRaizUrl = `https://www.fincaraiz.com.co/apartamentos/arriendo/${citySlug}/${listing.bedrooms}-habitaciones/?precio_desde=${min}&precio_hasta=${max}`;
  const metrocuadradoUrl = `https://www.metrocuadrado.com/apartamentos/arriendo/${citySlug}/?preciomin=${min}&preciomax=${max}&numhabitaciones=${listing.bedrooms}`;
  const cienCuadrasUrl = `https://www.ciencuadras.com/arriendo/${citySlug}/apartamento?habitaciones=${listing.bedrooms}&precio_min=${min}&precio_max=${max}`;
  const showRealContact = Boolean(listing.contactPhone && !listing.contactPhone.includes(MOCK_PHONE_PREFIX));

  return (
    <article className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative">
        <Image
          src={listing.photos[photoIndex]}
          alt={listing.title}
          width={1200}
          height={700}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        {listing.photos.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => setPhotoIndex((prev) => (prev - 1 + listing.photos.length) % listing.photos.length)}
              className="rounded-full bg-black/50 px-2 py-1 text-xs text-white"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => setPhotoIndex((prev) => (prev + 1) % listing.photos.length)}
              className="rounded-full bg-black/50 px-2 py-1 text-xs text-white"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold">{listing.title}</h3>
          <MatchBadge score={matchScore} />
        </div>

        <p className="text-xl font-bold text-coral">{formatCOP(listing.price)}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          🛏️ {listing.bedrooms} habitaciones · 🚿 {listing.bathrooms} baños
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {listing.neighborhood}, {listing.city}
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-700 dark:bg-zinc-800 dark:text-zinc-200">
            {listing.source === "directo" ? "Propietario directo" : "Inmobiliaria"}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700 dark:bg-zinc-800 dark:text-zinc-200">{badge}</span>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          🚇 {distanceToMetroKm.toFixed(2)} km al metro · 🏥 {distanceToClinicKm.toFixed(2)} km a la clínica
        </p>

        {showRealContact && (
          <div className="flex flex-wrap gap-2 text-sm">
            <span>📞 {listing.contactPhone}</span>
            {listing.whatsapp && (
              <a
                className="text-green-600 underline"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${listing.whatsapp}`}
              >
                WhatsApp
              </a>
            )}
          </div>
        )}

        <a
          href={listing.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-lg bg-coral px-3 py-2 text-sm font-medium text-white"
        >
          Ver publicación
        </a>

        <div className="space-y-2 pt-1">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Buscar similares en:</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={fincaRaizUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white"
            >
              🔍 Finca Raíz
            </a>
            <a
              href={metrocuadradoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-md bg-green-600 px-2.5 py-1.5 text-xs font-semibold text-white"
            >
              Metrocuadrado
            </a>
            <a
              href={cienCuadrasUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-md bg-orange-700 px-2.5 py-1.5 text-xs font-semibold text-white"
            >
              CienCuadras
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
