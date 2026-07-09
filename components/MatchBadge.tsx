interface MatchBadgeProps {
  score: number;
}

const getColor = (score: number) => {
  if (score > 75) return "bg-green-100 text-green-700";
  if (score >= 50) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

export default function MatchBadge({ score }: MatchBadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getColor(score)}`}>
      ⭐ Match Mafe {score}%
    </span>
  );
}
