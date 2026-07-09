"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import FilterPanel from "@/components/FilterPanel";
import Header from "@/components/Header";
import KpiCards from "@/components/KpiCards";
import ListingsGrid from "@/components/ListingsGrid";
import { Listing, ListingFilters } from "@/types/listing";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const DEFAULT_FILTERS: ListingFilters = {
  search: "",
  minPrice: 1300000,
  maxPrice: 2650000,
  municipio: "",
  prioridad: "",
  minHabitaciones: 0,
  minBanos: 0,
  maxDistMetroKm: 0,
  maxDistClinicaKm: 0,
  fuente: "",
  sortBy: "score_desc",
};

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ListingFilters>(DEFAULT_FILTERS);
  const [view, setView] = useState<"mapa" | "tarjetas">("tarjetas");

  useEffect(() => {
    fetch("/api/listings")
      .then((r) => r.json())
      .then((data) => setListings(data.listings ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const municipios = useMemo(
    () => Array.from(new Set(listings.map((l) => l.municipio))).sort(),
    [listings],
  );

  const fuentes = useMemo(
    () => Array.from(new Set(listings.map((l) => l.fuente))).sort(),
    [listings],
  );

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      if (l.precio < filters.minPrice || l.precio > filters.maxPrice) return false;
      if (filters.municipio && l.municipio !== filters.municipio) return false;
      if (filters.prioridad && l.prioridad !== filters.prioridad) return false;
      if (filters.minHabitaciones > 0 && l.habitaciones < filters.minHabitaciones) return false;
      if (filters.minBanos > 0 && l.banos < filters.minBanos) return false;
      if (filters.maxDistMetroKm > 0 && l.distMetroKm > filters.maxDistMetroKm) return false;
      if (filters.maxDistClinicaKm > 0 && l.distClinicaKm > filters.maxDistClinicaKm) return false;
      if (filters.fuente && l.fuente !== filters.fuente) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!l.barrio.toLowerCase().includes(q) && !l.municipio.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    result = result.sort((a, b) => {
      if (filters.sortBy === "score_desc") return b.score - a.score;
      if (filters.sortBy === "precio_asc") return a.precio - b.precio;
      if (filters.sortBy === "precio_desc") return b.precio - a.precio;
      if (filters.sortBy === "distMetro_asc") return a.distMetroKm - b.distMetroKm;
      if (filters.sortBy === "distClinica_asc") return a.distClinicaKm - b.distClinicaKm;
      return 0;
    });

    return result;
  }, [listings, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalCount={listings.length} filteredCount={filtered.length} />

      <main className="mx-auto max-w-7xl px-4 py-4">
        <div className="mb-4">
          <KpiCards allListings={listings} filteredListings={filtered} />
        </div>

        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => setView("tarjetas")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              view === "tarjetas" ? "bg-slate-800 text-white" : "bg-white text-slate-700 border border-gray-200"
            }`}
          >
            🗂️ Tarjetas
          </button>
          <button
            type="button"
            onClick={() => setView("mapa")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              view === "mapa" ? "bg-slate-800 text-white" : "bg-white text-slate-700 border border-gray-200"
            }`}
          >
            🗺️ Mapa
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <FilterPanel
            filters={filters}
            municipios={municipios}
            fuentes={fuentes}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />

          <div>
            {loading ? (
              <div className="flex h-40 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400">
                Cargando ofertas…
              </div>
            ) : view === "mapa" ? (
              <MapView listings={filtered} />
            ) : (
              <ListingsGrid listings={filtered} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
