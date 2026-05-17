export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-20" role="status" aria-label="Loading page content">
      {/* Skeleton pulse animation */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          {/* Spinning ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-surface-container-high border-t-secondary" />
          <span
            className="material-symbols-outlined text-3xl text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            medical_services
          </span>
        </div>
        <p className="text-body-md text-on-surface-variant">Loading...</p>
      </div>

      {/* Content skeleton */}
      <div className="w-full max-w-[1280px] space-y-6 px-4 md:px-12">
        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-surface-container-high" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-surface-container" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4 rounded-xl border border-outline-variant/50 p-6">
              <div className="h-12 w-12 animate-pulse rounded-lg bg-surface-container-high" />
              <div className="h-5 w-32 animate-pulse rounded bg-surface-container-high" />
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-surface-container" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-surface-container" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading page content, please wait...</span>
    </div>
  );
}
