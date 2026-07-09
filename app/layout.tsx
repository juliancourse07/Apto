import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AptaMafe - Encuentra tu apartamento en Medellín",
  description:
    "Buscador de apartamentos en Medellín y municipios cercanos con mapa interactivo, filtros completos y recomendaciones para Mafe.",
  openGraph: {
    title: "AptaMafe - Encuentra tu apartamento en Medellín",
    description:
      "Mapa, filtros avanzados y recomendaciones para encontrar apartamento cerca del metro y la Clínica León XIII.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
