import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Listing } from "@/types/listing";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const DEFAULT_LAT = 6.2442;
const DEFAULT_LNG = -75.5812;

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), "public", "Apto_Ofertas.csv");
    let csvText = fs.readFileSync(csvPath, "utf-8");

    // Remove BOM if present
    if (csvText.charCodeAt(0) === 0xfeff) {
      csvText = csvText.slice(1);
    }

    const lines = csvText.split(/\r?\n/).filter((l) => l.trim() !== "");
    const listings: Listing[] = [];

    // Skip header row (index 0)
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i]);
      if (cols.length < 20) continue;

      const lat = parseFloat(cols[14]);
      const lng = parseFloat(cols[15]);

      const listing: Listing = {
        id: parseInt(cols[0]) || i,
        fechaConsulta: cols[1] || "",
        fuente: cols[2] || "",
        municipio: cols[4] || "",
        barrio: cols[5] || "",
        precio: parseInt(cols[6]) || 0,
        habitaciones: parseInt(cols[7]) || 0,
        banos: parseInt(cols[8]) || 0,
        area: parseFloat(cols[9]) || 0,
        tipoArrendador: cols[10] || "",
        arrendador: cols[11] || "",
        url: cols[13] || "",
        latitud: !isNaN(lat) ? lat : DEFAULT_LAT,
        longitud: !isNaN(lng) ? lng : DEFAULT_LNG,
        distClinicaKm: parseFloat(cols[16]) || 0,
        estacionMetro: cols[17] || "",
        lineaMetro: cols[18] || "",
        distMetroKm: parseFloat(cols[19]) || 0,
        dentroPresupuesto: (cols[20] || "").trim().toLowerCase() === "si",
        score: parseFloat(cols[22]) || 0,
        prioridad: (cols[23] || "").trim(),
        recomendacion: cols[24] || "",
        googleMaps: cols[25] || "",
        notas: cols[26] || "",
      };

      listings.push(listing);
    }

    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Error reading CSV:", error);
    return NextResponse.json({ listings: [], error: "Failed to read listings" }, { status: 500 });
  }
}
