"use client";

import { ListingFilters } from "@/types/listing";

interface FilterPanelProps {
  filters: ListingFilters;
  municipios: string[];
  fuentes: string[];
  onChange: (f: ListingFilters) => void;
  onReset: () => void;
}

export default function FilterPanel({ filters, municipios, fuentes, onChange, onReset }: FilterPanelProps) {
  return (
    <aside className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Filtros</h2>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Buscar por barrio o municipio</label>
        <input
          type="text"
          placeholder="Ej: Niquia, Bello..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs text-gray-600">Precio mínimo</label>
          <input
            type="number"
            step={50000}
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">Precio máximo</label>
          <input
            type="number"
            step={50000}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Municipio</label>
        <select
          value={filters.municipio}
          onChange={(e) => onChange({ ...filters, municipio: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">Todos</option>
          {municipios.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Prioridad</label>
        <select
          value={filters.prioridad}
          onChange={(e) => onChange({ ...filters, prioridad: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
          <option value="Descartar">Descartar</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="mb-1 block text-xs text-gray-600">Habitaciones mín.</label>
          <select
            value={filters.minHabitaciones}
            onChange={(e) => onChange({ ...filters, minHabitaciones: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value={0}>Cualquiera</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">Baños mín.</label>
          <select
            value={filters.minBanos}
            onChange={(e) => onChange({ ...filters, minBanos: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value={0}>Cualquiera</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Dist. máx. al Metro (km)</label>
        <select
          value={filters.maxDistMetroKm}
          onChange={(e) => onChange({ ...filters, maxDistMetroKm: Number(e.target.value) })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value={0}>Sin límite</option>
          <option value={0.5}>≤ 0.5 km</option>
          <option value={1}>≤ 1 km</option>
          <option value={2}>≤ 2 km</option>
          <option value={3}>≤ 3 km</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Dist. máx. a Clínica León XIII (km)</label>
        <select
          value={filters.maxDistClinicaKm}
          onChange={(e) => onChange({ ...filters, maxDistClinicaKm: Number(e.target.value) })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value={0}>Sin límite</option>
          <option value={5}>≤ 5 km</option>
          <option value={10}>≤ 10 km</option>
          <option value={15}>≤ 15 km</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Fuente / Portal</label>
        <select
          value={filters.fuente}
          onChange={(e) => onChange({ ...filters, fuente: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">Todas</option>
          {fuentes.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-600">Ordenar por</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as ListingFilters["sortBy"] })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="score_desc">Score descendente</option>
          <option value="precio_asc">Precio ↑</option>
          <option value="precio_desc">Precio ↓</option>
          <option value="distMetro_asc">Metro cercano</option>
          <option value="distClinica_asc">Clínica cercana</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
      >
        Limpiar filtros
      </button>
    </aside>
  );
}
