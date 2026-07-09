"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import FilterPanel from "@/components/FilterPanel";
import Header from "@/components/Header";
import ListingsGrid from "@/components/ListingsGrid";
import SkeletonCard from "@/components/SkeletonCard";
import SplitView from "@/components/SplitView";
import { haversineDistanceInKm } from "@/lib/haversine";
import { getMafeMatchScore } from "@/lib/match-score";
import { CLINICA_LEON_XIII, METRO_STATIONS } from "@/lib/metro-stations";
import { Listing, ListingFilters } from "@/types/listing";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

interface EnrichedListing extends Listing {
  distanceToMetroKm: number;
  distanceToClinicKm: number;
  matchScore: number;
}

const initialFilters: ListingFilters = {
  minPrice: 1300000,
  maxPrice: 2700000,
  bedrooms: "todas",
  bathrooms: "todas",
  zone: "todas",
  nearMetro: false,
  metroRadiusKm: 1,
  nearClinic: false,
  clinicRadiusKm: 2,
  publicationType: "ambos",
  listingAge: "todas",
  includes: [],
  estratos: [],
  state: "todos",
  sortBy: "precio_asc",
};

const ageInDays = (dateString: string) =>
  Math.floor((Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<"tarjetas" | "mapa" | "split">("split");
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState<ListingFilters>(initialFilters);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const response = await fetch("/api/listings", { cache: "no-store" });
      const payload = await response.json();
      setListings(payload.listings || []);
      setLoading(false);
    };

    load().catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const enrichedListings = useMemo<EnrichedListing[]>(() => {
    const withDistances = listings.map((listing) => {
      const distanceToClinicKm = haversineDistanceInKm(
        listing.latitude,
        listing.longitude,
        CLINICA_LEON_XIII.latitude,
        CLINICA_LEON_XIII.longitude,
      );

      const distanceToMetroKm = Math.min(
        ...METRO_STATIONS.map((station) =>
          haversineDistanceInKm(listing.latitude, listing.longitude, station.latitude, station.longitude),
        ),
      );

      const matchScore = getMafeMatchScore({
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        price: listing.price,
        distanceToMetroKm,
        distanceToClinicKm,
      });

      return { ...listing, distanceToClinicKm, distanceToMetroKm, matchScore };
    });

    const filtered = withDistances.filter((listing) => {
      if (listing.price < filters.minPrice || listing.price > filters.maxPrice) return false;

      if (filters.bedrooms === "1" && listing.bedrooms !== 1) return false;
      if (filters.bedrooms === "2" && listing.bedrooms !== 2) return false;
      if (filters.bedrooms === "3" && listing.bedrooms !== 3) return false;
      if (filters.bedrooms === "3+" && listing.bedrooms < 3) return false;

      if (filters.bathrooms === "1" && listing.bathrooms !== 1) return false;
      if (filters.bathrooms === "2" && listing.bathrooms !== 2) return false;
      if (filters.bathrooms === "2+" && listing.bathrooms < 2) return false;

      if (filters.zone !== "todas" && `${listing.neighborhood} - ${listing.city}` !== filters.zone) return false;

      if (filters.nearMetro && listing.distanceToMetroKm > filters.metroRadiusKm) return false;
      if (filters.nearClinic && listing.distanceToClinicKm > filters.clinicRadiusKm) return false;

      if (filters.publicationType !== "ambos" && listing.source !== filters.publicationType) return false;

      if (filters.listingAge === "24h" && ageInDays(listing.postedAt) > 1) return false;
      if (filters.listingAge === "semana" && ageInDays(listing.postedAt) > 7) return false;
      if (filters.listingAge === "mes" && ageInDays(listing.postedAt) > 30) return false;

      if (filters.estratos.length > 0 && !filters.estratos.includes(listing.estrato)) return false;
      if (filters.state !== "todos" && listing.state !== filters.state) return false;

      for (const includeKey of filters.includes) {
        if (!listing.includes[includeKey]) return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      if (filters.sortBy === "precio_asc") return a.price - b.price;
      if (filters.sortBy === "precio_desc") return b.price - a.price;
      if (filters.sortBy === "reciente") return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      if (filters.sortBy === "metro_cercano") return a.distanceToMetroKm - b.distanceToMetroKm;
      return a.distanceToClinicKm - b.distanceToClinicKm;
    });
  }, [filters, listings]);

  const zones = useMemo(
    () => Array.from(new Set(listings.map((listing) => `${listing.neighborhood} - ${listing.city}`))).sort(),
    [listings],
  );

  return (
    <main className="min-h-screen bg-warm text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header
        resultCount={enrichedListings.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-6 lg:grid-cols-[320px_1fr]">
        <FilterPanel filters={filters} zones={zones} onChange={setFilters} />

        <div className="space-y-4">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : viewMode === "tarjetas" ? (
            <ListingsGrid listings={enrichedListings} />
          ) : viewMode === "mapa" ? (
            <MapView
              listings={enrichedListings}
              clinicRadiusKm={filters.clinicRadiusKm}
              metroRadiusKm={filters.metroRadiusKm}
              showMetroRadius={filters.nearMetro}
            />
          ) : (
            <SplitView
              listings={enrichedListings}
              clinicRadiusKm={filters.clinicRadiusKm}
              metroRadiusKm={filters.metroRadiusKm}
              showMetroRadius={filters.nearMetro}
            />
          )}
        </div>
      </section>
    </main>
  );
}
