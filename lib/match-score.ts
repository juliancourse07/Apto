interface MatchParams {
  bedrooms: number;
  bathrooms: number;
  price: number;
  distanceToMetroKm: number;
  distanceToClinicKm: number;
}

export const getMafeMatchScore = ({
  bedrooms,
  bathrooms,
  price,
  distanceToMetroKm,
  distanceToClinicKm,
}: MatchParams) => {
  let score = 0;

  if (bedrooms === 2) score += 30;
  if (bathrooms >= 1) score += 20;
  if (price >= 1_300_000 && price <= 2_700_000) score += 20;
  if (distanceToMetroKm <= 1) score += 15;
  if (distanceToClinicKm <= 2) score += 15;

  return Math.min(100, score);
};
