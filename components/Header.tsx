interface HeaderProps {
  resultCount: number;
  viewMode: "tarjetas" | "mapa" | "split";
  onViewModeChange: (mode: "tarjetas" | "mapa" | "split") => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const modes: HeaderProps["viewMode"][] = ["tarjetas", "mapa", "split"];

export default function Header({
  resultCount,
  viewMode,
  onViewModeChange,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-coral">AptaMafe 🏠</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Encuentra apartamentos cerca al metro y a la Clínica León XIII.
          </p>
          <p className="mt-1 text-sm font-semibold text-orange-600 dark:text-orange-300">
            {resultCount} apartamentos encontrados
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {modes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onViewModeChange(mode)}
              className={`rounded-full px-3 py-1 text-sm ${
                viewMode === mode
                  ? "bg-coral text-white"
                  : "bg-orange-50 text-orange-700 dark:bg-zinc-800 dark:text-zinc-200"
              }`}
            >
              {mode[0].toUpperCase() + mode.slice(1)}
            </button>
          ))}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </div>
      </div>
    </header>
  );
}
