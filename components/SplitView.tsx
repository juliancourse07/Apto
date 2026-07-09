import dynamic from "next/dynamic";
import ListingsGrid from "@/components/ListingsGrid";
import { Listing } from "@/types/listing";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

interface EnrichedListing extends Listing {
  distanceToMetroKm: number;
  distanceToClinicKm: number;
  matchScore: number;
}

interface SplitViewProps {
  listings: EnrichedListing[];
  clinicRadiusKm: number;
  metroRadiusKm: number;
  showMetroRadius: boolean;
}

export default function SplitView({ listings, clinicRadiusKm, metroRadiusKm, showMetroRadius }: SplitViewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <MapView
        listings={listings}
        clinicRadiusKm={clinicRadiusKm}
        metroRadiusKm={metroRadiusKm}
        showMetroRadius={showMetroRadius}
      />
      <div className="max-h-[560px] overflow-y-auto pr-1">
        <ListingsGrid listings={listings} />
      </div>
    </div>
  );
}
