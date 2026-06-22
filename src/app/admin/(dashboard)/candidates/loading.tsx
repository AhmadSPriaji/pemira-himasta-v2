import { Skeleton } from "@/components/ui/skeleton"

export default function CandidatesLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-9 w-36" />
      <div className="border rounded-md p-4 space-y-3">
        <div className="flex gap-8 border-b pb-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-4 w-24" />)}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-8">
            {Array.from({ length: 4 }).map((_, j) => <Skeleton key={j} className="h-4 w-24" />)}
          </div>
        ))}
      </div>
    </div>
  )
}
