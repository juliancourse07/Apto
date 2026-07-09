import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apto Mafe",
  description: "Buscador de apartamentos en arriendo en Medellín y municipios cercanos",
  openGraph: {
    title: "Apto Mafe",
    description: "Mapa interactivo, filtros y recomendaciones para encontrar tu apartamento ideal.",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
