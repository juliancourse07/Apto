"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { CLINICA_LEON_XIII, METRO_LINE_A, METRO_LINE_B, METRO_STATIONS } from "@/lib/metro-stations";
import { Listing } from "@/types/listing";
import MapMarker from "@/components/MapMarker";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface EnrichedListing extends Listing {
  distanceToMetroKm: number;
  distanceToClinicKm: number;
}

interface MapViewProps {
  listings: EnrichedListing[];
  clinicRadiusKm: number;
  metroRadiusKm: number;
  showMetroRadius: boolean;
}

export default function MapView({ listings, clinicRadiusKm, metroRadiusKm, showMetroRadius }: MapViewProps) {
  return (
    <div className="h-[560px] w-full overflow-hidden rounded-2xl border border-orange-100">
      <MapContainer center={[6.2442, -75.5812]} zoom={12} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />

        <Polyline positions={METRO_LINE_A.map((s) => [s.latitude, s.longitude])} pathOptions={{ color: "#0ea5e9", weight: 4 }} />
        <Polyline positions={METRO_LINE_B.map((s) => [s.latitude, s.longitude])} pathOptions={{ color: "#f97316", weight: 4 }} />

        <Marker position={[CLINICA_LEON_XIII.latitude, CLINICA_LEON_XIII.longitude]}>
          <Popup>🏥 Clínica León XIII</Popup>
        </Marker>

        <Circle
          center={[CLINICA_LEON_XIII.latitude, CLINICA_LEON_XIII.longitude]}
          radius={clinicRadiusKm * 1000}
          pathOptions={{ color: "#ef4444", fillOpacity: 0.05 }}
        />

        {showMetroRadius &&
          METRO_STATIONS.map((station) => (
            <Circle
              key={`${station.line}-${station.name}`}
              center={[station.latitude, station.longitude]}
              radius={metroRadiusKm * 1000}
              pathOptions={{ color: "#22c55e", fillOpacity: 0.02 }}
            />
          ))}

        {METRO_STATIONS.map((station) => (
          <Marker key={`${station.line}-${station.name}-marker`} position={[station.latitude, station.longitude]}>
            <Popup>
              🚇 {station.name} (Línea {station.line})
            </Popup>
          </Marker>
        ))}

        {listings.map((listing) => (
          <MapMarker
            key={listing.id}
            listing={listing}
            distanceToMetroKm={listing.distanceToMetroKm}
            distanceToClinicKm={listing.distanceToClinicKm}
          />
        ))}
      </MapContainer>
    </div>
  );
}
