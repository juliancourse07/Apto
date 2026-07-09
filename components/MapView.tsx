"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Listing } from "@/types/listing";

const CLINICA_POS: [number, number] = [6.2588, -75.574];

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

const PRIORIDAD_COLORS: Record<string, string> = {
  Alta: "#16a34a",
  Media: "#ea580c",
  Baja: "#dc2626",
  Descartar: "#9ca3af",
};

function getMarkerIcon(prioridad: string) {
  const color = PRIORIDAD_COLORS[prioridad] ?? "#6b7280";
  return L.divIcon({
    className: "",
    html: `<div style="background-color:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,.4)"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

const clinicIcon = L.divIcon({
  className: "",
  html: `<div style="background-color:#ef4444;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;font-size:10px">🏥</div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface MapViewProps {
  listings: Listing[];
}

export default function MapView({ listings }: MapViewProps) {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-2xl border border-gray-200">
      <MapContainer center={[6.2442, -75.5812]} zoom={12} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <Marker position={CLINICA_POS} icon={clinicIcon}>
          <Popup>🏥 Clínica León XIII</Popup>
        </Marker>

        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.latitud, listing.longitud]}
            icon={getMarkerIcon(listing.prioridad)}
          >
            <Popup>
              <div className="space-y-1 text-sm" style={{ minWidth: 200 }}>
                <p className="font-semibold">
                  {listing.barrio}, {listing.municipio}
                </p>
                <p className="text-base font-bold">{formatCOP(listing.precio)}</p>
                <p>
                  🛏️ {listing.habitaciones} hab · 🚿 {listing.banos} baños · 📐 {listing.area} m²
                </p>
                <p>⭐ Score: {listing.score} · {listing.prioridad}</p>
                <p>
                  🚇 {listing.estacionMetro} ({listing.distMetroKm.toFixed(2)} km) · 🏥{" "}
                  {listing.distClinicaKm.toFixed(2)} km
                </p>
                <div className="flex gap-2 pt-1">
                  {listing.url && (
                    <a
                      href={listing.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Ver publicación
                    </a>
                  )}
                  <a
                    href={
                      listing.googleMaps ||
                      `https://www.google.com/maps/search/?api=1&query=${listing.latitud},${listing.longitud}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    Maps
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
