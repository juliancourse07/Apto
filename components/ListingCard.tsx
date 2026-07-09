"use client";

import { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

const prioridadStyles: Record<string, string> = {
  Alta: "bg-green-100 text-green-800",
  Media: "bg-orange-100 text-orange-800",
  Baja: "bg-red-100 text-red-700",
  Descartar: "bg-gray-100 text-gray-500",
};

export default function ListingCard({ listing }: ListingCardProps) {
  const prioridadClass = prioridadStyles[listing.prioridad] ?? "bg-gray-100 text-gray-500";

  const mapsUrl =
    listing.googleMaps ||
    `https://www.google.com/maps/search/?api=1&query=${listing.latitud},${listing.longitud}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-2xl font-bold text-slate-900">{formatCOP(listing.precio)}</p>
            <p className="text-sm text-gray-600">
              {listing.barrio}, {listing.municipio}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${prioridadClass}`}>
            {listing.prioridad}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">
            🛏️ {listing.habitaciones} hab
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">
            🚿 {listing.banos} baños
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">
            📐 {listing.area} m²
          </span>
          <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">
            {listing.fuente}
          </span>
        </div>

        <p className="text-sm font-medium text-slate-700">⭐ {listing.score}/100</p>

        <div className="text-xs text-gray-600">
          <p>🚇 {listing.estacionMetro} (Línea {listing.lineaMetro}) — {listing.distMetroKm.toFixed(2)} km</p>
          <p>🏥 Clínica León XIII — {listing.distClinicaKm.toFixed(2)} km</p>
        </div>

        {listing.recomendacion && (
          <p className="line-clamp-2 text-xs text-gray-500 italic">{listing.recomendacion}</p>
        )}

        <div className="flex gap-2 pt-1">
          {listing.url ? (
            <a
              href={listing.url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-center text-xs font-medium text-white hover:bg-slate-700"
            >
              Ver publicación
            </a>
          ) : (
            <button
              disabled
              className="flex-1 cursor-not-allowed rounded-lg bg-gray-200 px-3 py-2 text-xs font-medium text-gray-400"
            >
              Sin enlace
            </button>
          )}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-center text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            📍 Abrir Maps
          </a>
        </div>
      </div>
    </article>
  );
}
