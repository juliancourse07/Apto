"use client";

import { Marker, Popup } from "react-leaflet";
import { Listing } from "@/types/listing";

interface MapMarkerProps {
  listing: Listing;
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export default function MapMarker({ listing }: MapMarkerProps) {
  return (
    <Marker position={[listing.latitud, listing.longitud]}>
      <Popup>
        <div className="space-y-1 text-sm">
          <p className="font-semibold">
            {listing.barrio}, {listing.municipio}
          </p>
          <p>{formatCOP(listing.precio)}</p>
          <p>
            🛏️ {listing.habitaciones} · 🚿 {listing.banos}
          </p>
          {listing.url && (
            <a href={listing.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              Ver publicación
            </a>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
