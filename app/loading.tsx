export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-pulse">
      {/* Hero Skeleton */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
        <div className="space-y-6">
          <div className="h-4 bg-slate-100 rounded w-1/4"></div>
          <div className="h-16 bg-slate-100 rounded w-full max-w-lg"></div>
          <div className="h-16 bg-slate-100 rounded w-full max-w-md"></div>
          <div className="h-24 bg-slate-50 rounded w-full max-w-lg mt-6"></div>
          <div className="flex gap-4 pt-6">
            <div className="h-12 bg-slate-100 rounded w-40"></div>
            <div className="h-12 bg-slate-100 rounded w-40"></div>
          </div>
        </div>
        <div className="h-[400px] lg:h-[600px] bg-slate-50 rounded-xl w-full"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="mb-16 text-center space-y-4 flex flex-col items-center">
        <div className="h-4 bg-slate-100 rounded w-32"></div>
        <div className="h-10 bg-slate-100 rounded w-64"></div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 rounded-lg bg-slate-50 border border-slate-100 space-y-4">
            <div className="h-12 w-12 bg-slate-100 rounded"></div>
            <div className="h-6 bg-slate-100 rounded w-3/4"></div>
            <div className="h-16 bg-slate-100 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
