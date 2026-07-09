"use client";

import { ListingFilters } from "@/types/listing";

interface FilterPanelProps {
  filters: ListingFilters;
  zones: string[];
  onChange: (next: ListingFilters) => void;
}

const includes = [
  { key: "parqueadero", label: "Parqueadero" },
  { key: "mascotas", label: "Mascotas permitidas" },
  { key: "amoblado", label: "Amoblado" },
  { key: "serviciosIncluidos", label: "Servicios incluidos" },
  { key: "conjuntoCerrado", label: "Conjunto cerrado" },
  { key: "seguridadPorteria", label: "Seguridad/Portería" },
  { key: "piscinaZonasComunes", label: "Piscina/Zonas comunes" },
] as const;

export default function FilterPanel({ filters, zones, onChange }: FilterPanelProps) {
  return (
    <aside className="space-y-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold">Filtros</h2>

      <div className="grid grid-cols-2 gap-2">
        <label className="text-xs">Precio mínimo</label>
        <label className="text-xs">Precio máximo</label>
        <input
          type="number"
          step={50000}
          min={1300000}
          max={2700000}
          value={filters.minPrice}
          onChange={(event) => onChange({ ...filters, minPrice: Number(event.target.value) })}
          className="rounded border p-2 text-sm"
        />
        <input
          type="number"
          step={50000}
          min={1300000}
          max={2700000}
          value={filters.maxPrice}
          onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })}
          className="rounded border p-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          value={filters.bedrooms}
          onChange={(event) => onChange({ ...filters, bedrooms: event.target.value as ListingFilters["bedrooms"] })}
          className="rounded border p-2 text-sm"
        >
          <option value="todas">Habitaciones</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="3+">3+</option>
        </select>

        <select
          value={filters.bathrooms}
          onChange={(event) => onChange({ ...filters, bathrooms: event.target.value as ListingFilters["bathrooms"] })}
          className="rounded border p-2 text-sm"
        >
          <option value="todas">Baños</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="2+">2+</option>
        </select>
      </div>

      <select
        value={filters.zone}
        onChange={(event) => onChange({ ...filters, zone: event.target.value })}
        className="w-full rounded border p-2 text-sm"
      >
        <option value="todas">Zona/Barrio</option>
        {zones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>

      <div className="space-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.nearMetro}
            onChange={(event) => onChange({ ...filters, nearMetro: event.target.checked })}
          />
          Cerca al metro
        </label>
        <select
          value={filters.metroRadiusKm}
          onChange={(event) => onChange({ ...filters, metroRadiusKm: Number(event.target.value) })}
          className="w-full rounded border p-2 text-sm"
        >
          <option value={0.5}>≤500m</option>
          <option value={1}>≤1km</option>
          <option value={2}>≤2km</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.nearClinic}
            onChange={(event) => onChange({ ...filters, nearClinic: event.target.checked })}
          />
          Cerca a Clínica León XIII
        </label>
        <select
          value={filters.clinicRadiusKm}
          onChange={(event) => onChange({ ...filters, clinicRadiusKm: Number(event.target.value) })}
          className="w-full rounded border p-2 text-sm"
        >
          <option value={0.5}>500m</option>
          <option value={1}>1km</option>
          <option value={2}>2km</option>
          <option value={3}>3km</option>
        </select>
      </div>

      <select
        value={filters.publicationType}
        onChange={(event) =>
          onChange({ ...filters, publicationType: event.target.value as ListingFilters["publicationType"] })
        }
        className="w-full rounded border p-2 text-sm"
      >
        <option value="ambos">Directo/Inmobiliaria</option>
        <option value="directo">Propietario directo</option>
        <option value="inmobiliaria">Inmobiliaria</option>
      </select>

      <select
        value={filters.listingAge}
        onChange={(event) => onChange({ ...filters, listingAge: event.target.value as ListingFilters["listingAge"] })}
        className="w-full rounded border p-2 text-sm"
      >
        <option value="todas">Antigüedad</option>
        <option value="24h">Últimas 24h</option>
        <option value="semana">Última semana</option>
        <option value="mes">Último mes</option>
      </select>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {[1, 2, 3, 4].map((estrato) => (
          <label key={estrato} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.estratos.includes(estrato as 1 | 2 | 3 | 4)}
              onChange={(event) => {
                const next = event.target.checked
                  ? [...filters.estratos, estrato as 1 | 2 | 3 | 4]
                  : filters.estratos.filter((item) => item !== estrato);
                onChange({ ...filters, estratos: next });
              }}
            />
            Estrato {estrato}
          </label>
        ))}
      </div>

      <select
        value={filters.state}
        onChange={(event) => onChange({ ...filters, state: event.target.value as ListingFilters["state"] })}
        className="w-full rounded border p-2 text-sm"
      >
        <option value="todos">Estado</option>
        <option value="nuevo">Nuevo</option>
        <option value="usado">Usado</option>
      </select>

      <div className="space-y-1 text-sm">
        {includes.map((item) => (
          <label key={item.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.includes.includes(item.key)}
              onChange={(event) => {
                const next = event.target.checked
                  ? [...filters.includes, item.key]
                  : filters.includes.filter((entry) => entry !== item.key);
                onChange({ ...filters, includes: next });
              }}
            />
            {item.label}
          </label>
        ))}
      </div>

      <select
        value={filters.sortBy}
        onChange={(event) => onChange({ ...filters, sortBy: event.target.value as ListingFilters["sortBy"] })}
        className="w-full rounded border p-2 text-sm"
      >
        <option value="precio_asc">Precio ascendente</option>
        <option value="precio_desc">Precio descendente</option>
        <option value="reciente">Más reciente</option>
        <option value="metro_cercano">Más cercano a metro</option>
        <option value="clinica_cercana">Más cercano a clínica</option>
      </select>
    </aside>
  );
}
