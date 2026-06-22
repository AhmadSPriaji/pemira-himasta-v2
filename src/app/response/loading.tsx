import HeaderText from "@/components/ui/HeaderText"
import StepProgressBar from "@/components/ui/StepProgress"
import { votingContent } from "@/components/login/LoginLayout"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResponseLoading() {
  return (
    <div className="min-h-screen w-full bg-navy">
      {/* Placeholder navbar */}
      <div className="fixed top-0 z-50 flex h-12 w-full items-center justify-end gap-6 bg-navy px-8 lg:h-16" />

      <div className="container mx-auto py-16 lg:py-32">
        <HeaderText
          text="Success"
          className="mb-12 text-yellow md:mb-16 2xl:mb-24"
        />
        <StepProgressBar items={votingContent} onStep={3} />
        
        {/* Finish content skeleton */}
        <div className="text-center text-white flex flex-col items-center">
          <Skeleton className="mx-auto mb-16 h-12 w-3/4 bg-yellow/20 max-w-xl animate-pulse" />
          <Skeleton className="h-12 w-48 bg-yellow/20 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
