"use client";

import { Marker, Popup } from "react-leaflet";
import Image from "next/image";
import { Listing } from "@/types/listing";

interface MapMarkerProps {
  listing: Listing;
  distanceToMetroKm: number;
  distanceToClinicKm: number;
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export default function MapMarker({ listing, distanceToMetroKm, distanceToClinicKm }: MapMarkerProps) {
  return (
    <Marker position={[listing.latitude, listing.longitude]}>
      <Popup>
        <div className="space-y-2 text-sm">
          <Image
            src={listing.photos[0]}
            alt={listing.title}
            width={320}
            height={180}
            className="h-24 w-full rounded object-cover"
          />
          <p className="font-semibold">{listing.title}</p>
          <p>{formatCOP(listing.price)}</p>
          <p>
            🛏️ {listing.bedrooms} · 🚿 {listing.bathrooms}
          </p>
          <p>🚇 {distanceToMetroKm.toFixed(2)} km · 🏥 {distanceToClinicKm.toFixed(2)} km</p>
          <a href={listing.url} target="_blank" rel="noreferrer" className="text-coral underline">
            Ver publicación
          </a>
        </div>
      </Popup>
    </Marker>
  );
}
