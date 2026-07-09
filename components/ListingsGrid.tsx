import ListingCard from "@/components/ListingCard";
import { Listing } from "@/types/listing";

interface ListingsGridProps {
  listings: Listing[];
}

export default function ListingsGrid({ listings }: ListingsGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500">
        No se encontraron ofertas con estos filtros.
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-500">
        Mostrando {listings.length} oferta{listings.length !== 1 ? "s" : ""} ordenadas por Score
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
