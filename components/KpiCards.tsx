import { Listing } from "@/types/listing";

interface KpiCardsProps {
  allListings: Listing[];
  filteredListings: Listing[];
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export default function KpiCards({ allListings, filteredListings }: KpiCardsProps) {
  const totalOfertas = allListings.length;
  const dentroPresupuesto = allListings.filter((l) => l.precio <= 2650000).length;
  const precioPromedio =
    filteredListings.length > 0
      ? filteredListings.reduce((acc, l) => acc + l.precio, 0) / filteredListings.length
      : 0;
  const scorePromedio =
    filteredListings.length > 0
      ? filteredListings.reduce((acc, l) => acc + l.score, 0) / filteredListings.length
      : 0;
  const prioridadAlta = allListings.filter((l) => l.prioridad === "Alta").length;

  const cards = [
    { label: "Total Ofertas", value: totalOfertas.toString() },
    { label: "Dentro del Presupuesto", value: dentroPresupuesto.toString() },
    { label: "Precio Promedio", value: precioPromedio > 0 ? formatCOP(precioPromedio) : "—" },
    { label: "Score Promedio", value: scorePromedio > 0 ? scorePromedio.toFixed(1) : "—" },
    { label: "Prioridad Alta", value: prioridadAlta.toString() },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {cards.map((card) => (
        <div
          key={card.label}
          className="min-w-[140px] flex-1 rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
        >
          <p className="text-2xl font-bold text-slate-900">{card.value}</p>
          <p className="mt-1 text-xs text-gray-500">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
