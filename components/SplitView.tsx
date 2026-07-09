import dynamic from "next/dynamic";
import ListingsGrid from "@/components/ListingsGrid";
import { Listing } from "@/types/listing";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

interface SplitViewProps {
  listings: Listing[];
}

export default function SplitView({ listings }: SplitViewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <MapView listings={listings} />
      <div className="max-h-[500px] overflow-y-auto pr-1">
        <ListingsGrid listings={listings} />
      </div>
    </div>
  );
}
