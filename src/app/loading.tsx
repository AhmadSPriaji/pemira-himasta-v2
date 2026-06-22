import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
  return (
    <main className="text-yellow">
      {/* Hero placeholder */}
      <section className="flex h-screen items-end bg-red px-[12%] pb-16">
        <Skeleton className="h-[60%] w-32 bg-yellow/20" />
        <div className="ml-8 space-y-4">
          <Skeleton className="h-12 w-64 bg-yellow/30" />
          <Skeleton className="h-12 w-48 bg-yellow/30" />
          <Skeleton className="h-12 w-56 bg-yellow/30" />
        </div>
      </section>

      {/* About placeholder */}
      <section className="h-64 bg-yellow p-8">
        <Skeleton className="h-full w-full" />
      </section>
    </main>
  )
}
