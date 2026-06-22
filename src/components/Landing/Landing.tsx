"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import HeaderText from "../ui/HeaderText"
import { useRouter } from "next/navigation"

type Candidate = {
  id: string
  candidateNumber: number
  name: string
  photoUrl: string | null
}

type TimelineEvent = {
  eventName: string
  displayDate: string
}

type LandingProps = {
  content: {
    year: string
    about: string
    voteDate: string
    timeLine: TimelineEvent[]
    candidates: Candidate[]
    instagramUrl: string
    address: string
  }
}

export default function Landing({ content }: LandingProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="text-yellow">
      {/* Hero */}
      <section className="h-screen bg-red font-head text-yellow">
        <div className="container flex h-full items-end ">
          <div className="flex h-[60%] w-full items-end px-[12%] lg:h-[70%] ">
            <Image
              className={`mr-8 h-full w-auto lg:mr-12 2xl:mr-16 transition-all duration-1000 ease-out transform ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              alt="hero"
              src="/landing/hero-img.svg"
              width={500}
              height={500}
            />
            <div className="flex h-full items-center justify-center">
              <p className={`text-5xl font-thin lg:text-7xl 2xl:text-9xl transition-all duration-1000 ease-out transform ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                {/* GANTI TAHUN */}
                Pemilihan <br /> Raya <br /> Himasta <br /> {content.year}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="h-full bg-yellow p-8 lg:p-12 2xl:p-24">
        <div className=" mx-auto h-full bg-navy ">
          <div className="flex h-full flex-col items-center justify-between lg:flex-row">
            <div className="flex w-full items-center justify-center px-10 py-8 lg:w-1/2 lg:px-[72px] lg:py-14 2xl:px-[135px] 2xl:py-[103px]">
              <Image
                className="h-auto w-[40%] md:w-[20%] lg:w-[70%]"
                alt="pemira 2023"
                src="/landing/Himasta Warna.png"
                width={500}
                height={500}
              />
            </div>
            <div className="w-full p-8 lg:w-1/2 lg:p-12 2xl:p-24">
              <HeaderText
                text="About Pemira"
                className="mb-6 lg:mb-8 2xl:mb-16"
              />
              <p className="text-justify text-sm text-white lg:text-base 2xl:text-2xl">
                {content.about}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Timeline */}
      <section className="bg-navy px-8 py-16 lg:px-12 lg:py-24 2xl:px-24 2xl:py-[138px]">
        <div className=" relative mx-auto h-full">
          <HeaderText text="Timeline" className="mb-10 lg:mb-24 2xl:mb-32" />
          <div className="relative h-full py-10 md:py-0">
            <div className=" absolute inset-0 flex h-full w-full flex-col items-center md:flex-row">
              <div className="aspect-square h-5 rounded-full bg-yellow md:-mr-[12.5px] md:h-[25px]"></div>
              <div className="h-full w-1 bg-yellow md:h-[5px] md:w-full "></div>
              <Image
                className="-mt-3 h-5 w-auto rotate-90 md:-ml-[12.5px] md:-mt-0 md:h-[25px] md:rotate-0"
                alt="triangle"
                src="/landing/triangle.svg"
                width={500}
                height={500}
              />
            </div>
            <div className="flex flex-col items-center justify-around gap-7 md:flex-row ">
              {content.timeLine.map((item, idx) => (
                <div key={idx} className="group w-full  font-head">
                  <div className=" flex w-full flex-row items-center justify-center gap-2 group-even:flex-row-reverse md:flex-col md:gap-0 md:group-even:flex-col-reverse">
                    <div className="w-[88px] md:h-9 2xl:h-[44px]"></div>
                    <Image
                      className="z-10 -mb-[5.33px] h-8 w-auto 2xl:-mb-[8px] 2xl:h-10 "
                      alt="star"
                      src="/landing/star-simetris.svg"
                      width={500}
                      height={500}
                    />
                    <div className=" text-center text-lg md:text-base lg:text-xl 2xl:text-2xl">
                      <p className=" text-yellow ">{item.displayDate}</p>
                      <span className=" text-yellow">{item.eventName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Candidates */}
      <section className="bg-navy px-8 lg:px-12 2xl:px-24 ">
        <div className="relative overflow-hidden border-2 border-yellow bg-navy py-6 md:bg-red md:py-16 ">
          <div className="container mx-auto flex aspect-square w-full items-center justify-center rounded-full border-yellow bg-navy md:-my-[132px] md:w-[80%] md:border-2  md:py-16 lg:-my-[190px] lg:w-[1000px]  2xl:-my-[132px] 2xl:w-[1320px] ">
            <div className="py-12 md:py-20  2xl:py-[88px]">
              <HeaderText text="Candidate" className="mb-0 md:mb-4 2xl:mb-5" />
              <div className="flex flex-col items-center justify-center gap-4 md:gap-0 lg:flex-row">
                {content.candidates.map((candidate, idx) => (
                  <div
                    key={idx}
                    onClick={() => router.push("/candidate/" + candidate.candidateNumber)}
                    className="flex flex-col items-center transition duration-500 ease-in-out hover:scale-110 2xl:hover:scale-[1.2]"
                  >
                    <div className="relative">
                      <div className="relative  h-fit">
                        <Image
                          className="absolute inset-0 m-auto h-auto w-[146px] md:w-[174px] 2xl:w-[231px] "
                          alt={candidate.name}
                          src={candidate.photoUrl || ""}
                          width={500}
                          height={500}
                        />
                        <Image
                          className="relative z-20 -mb-6 h-auto w-[300px] md:-mb-8 md:w-[360px] 2xl:w-[480px] "
                          alt="frame"
                          src="/landing/frame.png"
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>
                    <div className="flex w-fit gap-2 bg-yellow p-2 font-head 2xl:gap-4 2xl:p-4">
                      <p className="aspect-[12/16] h-10 w-auto bg-navy pt-[2px] text-center text-4xl leading-none text-yellow md:h-12 md:text-5xl 2xl:h-16 2xl:text-[64px] ">
                        {candidate.candidateNumber}
                      </p>

                      <p className="w-[132px] text-xl leading-none text-navy md:w-40 md:text-2xl md:leading-none 2xl:w-[200px] 2xl:text-[32px]">
                        {candidate.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Vote Now */}
      <section className="border-b-2 border-yellow bg-navy px-12 pb-0 pt-20 lg:p-12 lg:pb-0 2xl:p-24 2xl:pb-0">
        <div className="flex items-end justify-around ">
          <Image
            src={"/landing/star-nofill.svg"}
            alt="star"
            width={500}
            height={500}
            className="mb-[132px] mr-8 hidden h-auto w-24 md:block 2xl:w-40"
          />
          <div className="rounded-t-full border-2 border-b-0 border-yellow bg-navy p-5 pb-0 lg:p-8 lg:pb-0 2xl:p-10 2xl:pb-0">
            <div className="rounded-t-full border-2 border-b-0 border-yellow bg-red pb-12 pt-44 md:pt-52 lg:pt-64 2xl:pb-14 2xl:pt-[332px]">
              <p className="-mx-6 mb-8 text-center font-head text-5xl text-white lg:text-7xl 2xl:-mx-8 2xl:mb-12 2xl:text-8xl ">
                Pledge Your Allegiance!
              </p>
              <div className="mb-6 text-center font-head text-3xl text-yellow lg:text-4xl lg:leading-snug 2xl:mb-10 2xl:text-5xl 2xl:leading-[64px]">
                <p>Temukan Pilihanmu pada</p>
                <p>{content.voteDate}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("/login")}
                  className="rounded-full bg-yellow px-3 py-1 text-lg font-bold text-navy transition duration-300 ease-in-out hover:scale-110 active:scale-100 active:brightness-75 lg:px-4 lg:py-[6px] lg:text-xl 2xl:px-[23px] 2xl:py-[11px] 2xl:text-[32px] 2xl:leading-[38px]"
                >
                  Vote Now
                </button>
              </div>
            </div>
          </div>
          <Image
            src={"/landing/star-nofill.svg"}
            alt="star"
            width={500}
            height={500}
            className="mb-[132px] ml-8 hidden h-auto w-24 md:block 2xl:w-40"
          />
        </div>
      </section>

      {/* footer */}
      <footer className="bg-navy px-8 py-11">
        <div className="items-center justify-between text-white md:flex">
          <div className="mb-8 text-[14px] md:mb-0">
            <Image
              src={"/landing/logo-himasta.png"}
              alt={"Logo Himasta"}
              height={500}
              width={500}
              className="mb-[14px] h-[54px] w-auto"
            />
            <p className="mb-[14px] text-xl font-bold">HIMASTA UGM</p>
            <p className="mb-7 max-w-[333px]">
              {content.address}
            </p>
            <p>© HIMASTA UGM - All rights reserved</p>
          </div>
          <a
            href={content.instagramUrl}
            className="transition ease-in-out hover:text-yellow"
          >
            <div className="flex gap-2 text-xl">
              <Image
                src={"/landing/icon-instagram.svg"}
                alt={"Logo Instagram"}
                height={500}
                width={500}
                className="h-[30px] w-auto "
              />
              <p>@himastaugm</p>
            </div>
          </a>
        </div>
      </footer>
    </main>
  )
}
