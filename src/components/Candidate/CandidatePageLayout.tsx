"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import HeaderText from "../ui/HeaderText"
import Navbar, { NavbarCandidate } from "../ui/Navbar"
import { Candidate as PrismaCandidate } from "@prisma/client"

type CandidateProps = PrismaCandidate & {
  innovations: { name: string; explanation: string[] }[]
  missions: string[]
}

function formatGDriveUrl(url: string | null) {
  if (!url) return ""
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/)
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`
  }
  return url
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    const currentRef = domRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function CandidatePageLayout({
  candidate,
  index,
  navbarCandidates,
}: {
  index: string
  candidate: CandidateProps
  navbarCandidates: NavbarCandidate[]
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="bg-navy pt-32">
      <Navbar candidates={navbarCandidates} />
      <div className={`transition-all duration-1000 ease-out transform ${
        mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}>
        <section className="flex items-end justify-center">
          <div className="relative flex h-fit w-fit">
            <div className="flex justify-center">
              <Image
                src={"/landing/frame.png"}
                width={500}
                height={500}
                alt="frame"
                className="relative z-20 h-auto w-[200px] md:w-[300px] lg:w-[400px] 2xl:w-[500px]"
              />

              <Image
                src={candidate.photoUrl || ""}
                width={300}
                height={350}
                alt="Candidate"
                className="absolute inset-0 m-auto h-auto w-[90px] md:w-[144px] lg:w-[194px] 2xl:w-[240px]"
              />
            </div>

            <h1
              className={`absolute -bottom-6 z-30 font-head text-[100px] text-white md:text-[160px] lg:-bottom-12 lg:text-[216px] 2xl:text-[256px] ${
                index == "1" ? "right-6 lg:right-10" : "right-3 lg:right-5"
              }`}
            >
              {index}
            </h1>
          </div>
          <h1 className="w-1/3 break-keep pb-4 font-head text-3xl text-white md:pb-14 md:text-5xl lg:text-7xl 2xl:text-8xl">
            {candidate.name}
          </h1>
        </section>
      </div>

      {candidate.cvUrl && (
        <FadeIn className="mx-48 hidden flex-col items-center py-32 md:flex">
          <HeaderText text="Curricculum Vitae" className="py-10" />
          <div className="h-[538px]  w-full bg-red">
            <iframe
              id="frame"
              src={formatGDriveUrl(candidate.cvUrl)}
              className="h-full w-full overflow-x-hidden"
              title="Curriculum Vitae"
            ></iframe>
          </div>
        </FadeIn>
      )}

      {candidate.grandDesignUrl && (
        <FadeIn className="mx-48 hidden flex-col items-center py-32 md:flex">
          <HeaderText text="Grand Design" className="py-10" />
          <div className="h-[538px]  w-full bg-red">
            <iframe
              id="frame-grand-design"
              src={formatGDriveUrl(candidate.grandDesignUrl)}
              className="h-full w-full overflow-x-hidden"
              title="Grand Design"
            ></iframe>
          </div>
        </FadeIn>
      )}

      <FadeIn className="candidates-bg candidates-bg flex h-fit w-full justify-center bg-red p-8 text-white lg:p-16 2xl:p-24">
        <div className="flex h-fit w-full flex-col lg:flex-row">
          <div className=" flex flex-col bg-navy p-8 py-16 lg:w-[50%] lg:p-16 lg:py-20 2xl:p-24 2xl:py-36   ">
            <div className="flex justify-center pb-6 text-3xl text-yellow lg:pb-8 lg:text-5xl 2xl:pb-12 2xl:text-[64px]">
              <h1 className="font-head  ">Visi</h1>
            </div>

            <div className=" text-justify text-base text-white lg:text-lg 2xl:text-2xl ">
              <h1>{candidate.vision}</h1>
            </div>
          </div>

          <div className="flex flex-col bg-navy/50 p-8 py-16 lg:w-[50%] lg:p-16 lg:py-20 2xl:p-24 2xl:py-36 ">
            <div className="flex justify-center pb-6 text-3xl text-yellow lg:pb-8 lg:text-5xl 2xl:pb-12 2xl:text-[64px]">
              <h1 className="font-head">Misi</h1>
            </div>

            <div className="text-justify  text-base text-white lg:text-lg 2xl:text-2xl">
              <ul className="w-full list-decimal space-y-3.5">
                {candidate.missions?.map((mission, index) => (
                  <li
                    key={index}
                    className="flex w-full justify-start gap-4 overflow-auto leading-[1.2] text-white"
                  >
                    <div className="flex aspect-square h-4 w-auto items-center justify-center rounded-full bg-white 2xl:h-6">
                      <p className="text-center leading-none text-black">
                        {index + 1}
                      </p>
                    </div>
                    <h1 className=" overflow-auto leading-[1.2] text-white">
                      {mission}
                    </h1>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-max-full mt-12 flex h-fit flex-col justify-center bg-[#21201da4] py-5 text-[#21201D] md:hidden">
            <h1 className=" mb-3 text-center text-[20px] text-white">
              Unduh Disini
            </h1>
            <div className="m-auto flex h-fit flex-col justify-center gap-7 text-[25px]">
              {candidate.cvUrl && (
                <a
                  href={candidate.cvUrl}
                  download
                  className="m-auto transition-all duration-200 ease-in active:scale-125"
                >
                  <span className="rounded-md bg-[#D4A976] px-6 py-2">CV</span>
                </a>
              )}
              {candidate.grandDesignUrl && (
                <a
                  href={candidate.grandDesignUrl}
                  download
                  className="m-auto transition-all duration-200 ease-in active:scale-125"
                >
                  <span className="m-auto rounded-md  bg-[#D4A976] px-6 py-2">
                    Grand Design
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      {candidate.innovations.length != 0 && (
        <FadeIn className="mx-3 flex flex-col space-y-5 pb-20 pt-16 text-base lg:text-lg xl:mx-24 2xl:text-2xl">
          <HeaderText text="Inovasi" className="py-4 " />
          {candidate.innovations?.map((innovation, index) => (
            <div
              key={index}
              className="w-full rounded-2xl bg-yellow px-11 py-6 text-center"
            >
              <h5 className="pb-4 font-sans text-lg font-bold lg:text-xl 2xl:pb-7 2xl:text-3xl">
                {innovation.name}
              </h5>
              <ul
                className={`text-left ${
                  innovation.explanation?.length === 1
                    ? "list-none"
                    : "ml-4 list-disc"
                }`}
              >
                {innovation.explanation?.map((expl, index) => (
                  <li key={index}>{expl}</li>
                ))}
              </ul>
            </div>
          ))}
        </FadeIn>
      )}
    </main>
  )
}
