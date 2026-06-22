import HeaderText from "@/components/ui/HeaderText"
import StepProgressBar from "@/components/ui/StepProgress"
import { votingContent } from "@/components/login/LoginLayout"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoginLoading() {
  return (
    <div className="min-h-screen w-full bg-navy">
      {/* Placeholder navbar */}
      <div className="fixed top-0 z-50 flex h-12 w-full items-center justify-end gap-6 bg-navy px-8 lg:h-16" />

      <div className="container mx-auto py-16 lg:py-32">
        <HeaderText
          text="Login"
          className="mb-12 text-yellow md:mb-16 2xl:mb-24"
        />
        <StepProgressBar items={votingContent} onStep={1} />
        
        {/* Login form skeleton */}
        <div className="flex justify-center">
          <div className="w-fit rounded-2xl bg-yellow px-8 py-6 md:px-12 md:py-8 2xl:px-[54px] 2xl:py-[42px] flex flex-col gap-5 md:gap-6 2xl:gap-10">
            {/* Input Username */}
            <Skeleton className="h-8 w-56 bg-navy/20 md:h-10 md:w-80 2xl:h-[54px] 2xl:w-[432px]" />
            {/* Input Password */}
            <Skeleton className="h-8 w-56 bg-navy/20 md:h-10 md:w-80 2xl:h-[54px] 2xl:w-[432px]" />
            {/* Button Login */}
            <Skeleton className="h-8 w-56 bg-navy/40 md:h-10 md:w-80 2xl:h-[54px] 2xl:w-[432px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
