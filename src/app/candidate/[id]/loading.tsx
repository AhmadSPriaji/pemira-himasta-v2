import { Skeleton } from "@/components/ui/skeleton"

export default function CandidateLoading() {
  return (
    <main className="bg-navy pt-32">
      {/* Placeholder navbar */}
      <div className="fixed top-0 z-50 flex h-12 w-full items-center justify-end gap-6 bg-navy px-8 lg:h-16" />

      {/* Hero section: foto + nama */}
      <section className="flex items-end justify-center gap-8 px-8">
        {/* Placeholder frame foto */}
        <Skeleton className="h-[300px] w-[200px] bg-yellow/10 md:h-[450px] md:w-[300px]" />
        {/* Placeholder nama kandidat */}
        <Skeleton className="mb-8 h-16 w-48 bg-yellow/20 md:h-24 md:w-64" />
      </section>

      {/* Section visi misi */}
      <div className="mt-16 flex flex-col lg:flex-row">
        <div className="flex flex-col gap-4 bg-navy p-8 lg:w-1/2 lg:p-16">
          <Skeleton className="mx-auto mb-6 h-10 w-20 bg-yellow/20" />
          <Skeleton className="h-4 w-full bg-white/10" />
          <Skeleton className="h-4 w-full bg-white/10" />
          <Skeleton className="h-4 w-3/4 bg-white/10" />
        </div>
        <div className="flex flex-col gap-4 bg-navy/50 p-8 lg:w-1/2 lg:p-16">
          <Skeleton className="mx-auto mb-6 h-10 w-20 bg-yellow/20" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full bg-white/10" />
          ))}
        </div>
      </div>
    </main>
  )
}
