import ListingCard from "@/components/ListingCard";
import { Listing } from "@/types/listing";

interface EnrichedListing extends Listing {
  distanceToMetroKm: number;
  distanceToClinicKm: number;
  matchScore: number;
}

interface ListingsGridProps {
  listings: EnrichedListing[];
}

export default function ListingsGrid({ listings }: ListingsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          distanceToMetroKm={listing.distanceToMetroKm}
          distanceToClinicKm={listing.distanceToClinicKm}
          matchScore={listing.matchScore}
        />
      ))}
    </div>
  );
}
