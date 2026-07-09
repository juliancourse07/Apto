export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="h-44 rounded-xl bg-gray-200" />
      <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
      <div className="mt-4 h-8 w-full rounded bg-gray-200" />
    </div>
  );
}
