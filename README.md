# AptaMafe - Buscador de Apartamentos en Medellín 🏠

Aplicación web con Next.js 14 + TypeScript para encontrar apartamentos en Medellín y municipios cercanos, con mapa interactivo, filtros avanzados y recomendaciones para el perfil de Mafe.

## Screenshot

> Placeholder: agrega aquí una captura (`/public/screenshot.png`) después de desplegar.

## Instalación local

```bash
npm install
npm run dev
```

Abrir en `http://localhost:3000`.

## Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Pasos:
1. Importar el repositorio en Vercel.
2. Framework detectado: **Next.js**.
3. Build command: `npm run build`
4. Output: `.next`

## Variables de entorno

Opcionales para conectar fuentes externas reales:

- `FINCARAIZ_PUBLIC_API_URL`
- `METROCUADRADO_PUBLIC_API_URL`

Si no están configuradas, la app usa automáticamente un dataset mock realista (30+ listings).

## Fuentes de datos reales (futuro)

La API route `/api/listings` ya soporta intentar fuentes JSON externas mediante variables de entorno.
Para integrar scraping/feed real:

1. Crear un endpoint backend propio que normalice datos de Finca Raíz/Metrocuadrado/OLX.
2. Apuntar `FINCARAIZ_PUBLIC_API_URL` o `METROCUADRADO_PUBLIC_API_URL` a ese endpoint.
3. Mantener el formato de respuesta:
   - `{ listings: [{ id, title, price, bedrooms, bathrooms, latitude, longitude, ... }] }`

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run start`

