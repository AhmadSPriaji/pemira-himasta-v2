import Image from "next/image"
import HeaderText from "@/components/ui/HeaderText"
import StepProgressBar from "@/components/ui/StepProgress"
import { votingContent } from "@/components/login/LoginLayout"
import { Skeleton } from "@/components/ui/skeleton"

export default function VotingLoading() {
  return (
    <div className="min-h-screen w-full bg-navy">
      {/* Placeholder navbar */}
      <div className="fixed top-0 z-50 flex h-12 w-full items-center justify-end gap-6 bg-navy px-8 lg:h-16" />

      <div className="container mx-auto bg-navy py-16 lg:py-32">
        {/* Judul "Voting" */}
        <HeaderText text="Voting" className="mb-12 md:mb-16 2xl:mb-24" />

        {/* Step progress bar */}
        <StepProgressBar items={votingContent} onStep={2} />

        {/* Kandidat cards skeleton */}
        <div className="flex w-full flex-col justify-center bg-navy text-2xl text-white">
          <div className="mb-8 flex flex-col items-center justify-center md:flex-row">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center justify-center">
                {/* Frame foto kandidat */}
                <div className="relative w-fit">
                  <Skeleton className="absolute inset-0 m-auto h-[170px] w-[146px] bg-yellow/20 md:h-[200px] md:w-[174px] 2xl:h-[268px] 2xl:w-[231px]" />
                  <Image
                    className="relative z-20 -mb-[6px] h-auto w-[300px] md:w-[360px] 2xl:w-[480px]"
                    src="/landing/frame.png"
                    width={300}
                    height={300}
                    alt="frame"
                  />
                </div>
                {/* Selector radio bullet + nama kandidat */}
                <div className="mx-11 -mt-4 mb-8 flex items-center justify-center text-xl 2xl:text-2xl">
                  <span className="mr-[10px] aspect-square h-auto w-6 rounded-full border-[3px] border-yellow bg-transparent"></span>
                  <Skeleton className="h-6 w-32 bg-yellow/20" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Tombol submit placeholder */}
          <div className="flex w-full justify-center">
            <button
              disabled
              className="w-48 rounded-md bg-yellow px-4 py-3 text-xl text-black brightness-75 2xl:w-[216px] 2xl:text-2xl"
            >
              Simpan & Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
