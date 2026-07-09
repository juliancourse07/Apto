export interface MetroStation {
  name: string;
  line: "A" | "B";
  latitude: number;
  longitude: number;
}

export const CLINICA_LEON_XIII = {
  name: "Clínica León XIII",
  latitude: 6.2518,
  longitude: -75.5636,
};

export const METRO_STATIONS: MetroStation[] = [
  { name: "Niquía", line: "A", latitude: 6.3387, longitude: -75.5452 },
  { name: "Bello", line: "A", latitude: 6.3308, longitude: -75.5536 },
  { name: "Madera", line: "A", latitude: 6.3168, longitude: -75.5549 },
  { name: "Acevedo", line: "A", latitude: 6.3009, longitude: -75.5572 },
  { name: "Tricentenario", line: "A", latitude: 6.2871, longitude: -75.5656 },
  { name: "Caribe", line: "A", latitude: 6.2783, longitude: -75.5696 },
  { name: "Universidad", line: "A", latitude: 6.2703, longitude: -75.5667 },
  { name: "Hospital", line: "A", latitude: 6.2624, longitude: -75.5644 },
  { name: "Prado", line: "A", latitude: 6.2521, longitude: -75.5664 },
  { name: "Parque Berrío", line: "A", latitude: 6.2492, longitude: -75.5708 },
  { name: "San Antonio", line: "A", latitude: 6.2462, longitude: -75.5733 },
  { name: "Alpujarra", line: "A", latitude: 6.2419, longitude: -75.5762 },
  { name: "Exposiciones", line: "A", latitude: 6.2368, longitude: -75.5784 },
  { name: "Industriales", line: "A", latitude: 6.2281, longitude: -75.5859 },
  { name: "Poblado", line: "A", latitude: 6.2121, longitude: -75.5751 },
  { name: "Aguacatala", line: "A", latitude: 6.2001, longitude: -75.5796 },
  { name: "Ayurá", line: "A", latitude: 6.1849, longitude: -75.587 },
  { name: "Envigado", line: "A", latitude: 6.1756, longitude: -75.5924 },
  { name: "Itagüí", line: "A", latitude: 6.1683, longitude: -75.6011 },
  { name: "Sabaneta", line: "A", latitude: 6.1582, longitude: -75.6086 },
  { name: "La Estrella", line: "A", latitude: 6.1483, longitude: -75.6157 },
  { name: "San Antonio", line: "B", latitude: 6.2462, longitude: -75.5733 },
  { name: "Cisneros", line: "B", latitude: 6.2448, longitude: -75.5798 },
  { name: "Suramericana", line: "B", latitude: 6.2523, longitude: -75.5857 },
  { name: "Estadio", line: "B", latitude: 6.2583, longitude: -75.5889 },
  { name: "Floresta", line: "B", latitude: 6.2589, longitude: -75.5969 },
  { name: "Santa Lucía", line: "B", latitude: 6.2576, longitude: -75.6036 },
  { name: "San Javier", line: "B", latitude: 6.2532, longitude: -75.6118 },
];

export const METRO_LINE_A = METRO_STATIONS.filter((station) => station.line === "A");
export const METRO_LINE_B = METRO_STATIONS.filter((station) => station.line === "B");
