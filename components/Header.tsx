interface HeaderProps {
  totalCount: number;
  filteredCount: number;
}

export default function Header({ totalCount, filteredCount }: HeaderProps) {
  return (
    <header className="bg-slate-900 px-4 py-4 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">🏠 Apto Mafe</h1>
            <p className="text-sm text-slate-300">
              Buscador inteligente de apartamentos en Medellín y municipios cercanos
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-medium">
              $1.300.000 – $2.650.000 COP
            </span>
            <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium">
              2 hab · 1+ baño · cerca Metro y Clínica León XIII
            </span>
            <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-medium">
              {filteredCount} / {totalCount} ofertas encontradas
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
