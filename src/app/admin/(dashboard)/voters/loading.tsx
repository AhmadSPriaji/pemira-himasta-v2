import { Skeleton } from "@/components/ui/skeleton"

export default function VotersLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="border rounded-md p-4 space-y-3">
        <div className="flex gap-8 border-b pb-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-20" />)}
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex gap-8">
            {Array.from({ length: 6 }).map((_, j) => <Skeleton key={j} className="h-4 w-20" />)}
          </div>
        ))}
      </div>
    </div>
  )
}
