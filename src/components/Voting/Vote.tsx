"use client"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { RadioGroup } from "@headlessui/react"
import { submitVote } from "@/app/actions/vote"


type Candidate = {
  id: string
  name: string
  photoUrl: string | null
}

export default function Vote({ candidates }: { candidates: Candidate[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chosenID, setChosenID] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const setShifts = (activeIdx: number | null, phase: "in" | "out") => {
    if (!rootRef.current) return
    const cs = getComputedStyle(document.documentElement)
    const num = (name: string, fb: number) => {
      const v = parseFloat(cs.getPropertyValue(name))
      return Number.isFinite(v) ? v : fb
    }
    const ease = (name: string, fb: string) =>
      cs.getPropertyValue(name).trim() || fb

    const lift    = num("--avatar-lift", -8)
    const falloff = num("--avatar-falloff", 0.45)
    const scale   = num("--avatar-scale", 1.05)
    const tf      = phase === "out"
      ? ease("--avatar-ease-out", "cubic-bezier(0.34, 3.85, 0.64, 1)")
      : ease("--avatar-ease-in",  "cubic-bezier(0.22, 1, 0.36, 1)")

    rootRef.current.querySelectorAll(".t-avatar").forEach((el, i) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.transitionTimingFunction = tf
      if (activeIdx == null) {
        htmlEl.style.setProperty("--shift", "0px")
        htmlEl.style.setProperty("--scale-active", "1")
        return
      }
      const d = Math.abs(i - activeIdx)
      htmlEl.style.setProperty(
        "--shift",
        (lift * Math.pow(falloff, d)).toFixed(3) + "px"
      )
      htmlEl.style.setProperty(
        "--scale-active",
        i === activeIdx ? String(scale) : "1"
      )
    })
  }

  const handleVote = async () => {
    if (!chosenID) return
    setIsLoading(true)
    setError(null)
    
    const res = await submitVote(chosenID)
    if (res.success) {
      router.push("/response")
    } else {
      setError(res.error || "Gagal menyimpan suara")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col justify-center bg-navy text-2xl text-white">
      {error && (
        <div className="mx-auto mb-5 w-fit rounded-md border border-navy bg-red px-4 py-2 text-center text-sm text-white md:text-base 2xl:px-6 2xl:py-3 2xl:text-xl">
          <p className=" break-words">{error}</p>
        </div>
      )}
      <RadioGroup
        value={chosenID}
        onChange={setChosenID}
      >
        <RadioGroup.Label></RadioGroup.Label>
        <div
          ref={rootRef}
          onMouseLeave={() => setShifts(null, "out")}
          className="mb-8 flex flex-col items-center justify-center md:flex-row t-avatar-group"
        >
          {candidates.map((candidate, idx) => (
            <RadioGroup.Option
              key={idx}
              value={candidate.id}
              className="relative flex cursor-pointer t-avatar"
              onMouseEnter={() => setShifts(idx, "in")}
            >
              {({ checked }) => (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-fit ">
                      <Image
                        className="absolute inset-0 m-auto h-auto w-[146px] md:w-[174px] 2xl:w-[231px] "
                        alt={candidate.name}
                        src={candidate.photoUrl || ""}
                        width={500}
                        height={500}
                      />
                      <Image
                        className="relative z-20 -mb-[6px] h-auto w-[300px]  md:w-[360px] 2xl:w-[480px] "
                        src={"/landing/frame.png"}
                        width={300}
                        height={300}
                        alt="frame"
                      />
                    </div>
                    <div className="mx-11 -mt-4 mb-8 flex items-center justify-center text-xl 2xl:text-2xl">
                      <span
                        className={`${
                          checked ? "bg-yellow" : "bg-transparent"
                        } mr-[10px] aspect-square h-auto  w-6 rounded-full border-[3px] border-yellow`}
                      ></span>
                      <p>{candidate.name}</p>
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="flex w-full justify-center">
        <button
          disabled={chosenID === null || isLoading}
          onClick={handleVote}
          className={`w-48 rounded-md bg-yellow px-4 py-3 text-xl text-black transition ease-in-out ${
            isLoading
              ? "brightness-75"
              : "hover:scale-105 active:scale-100 active:brightness-75"
          } 2xl:w-[216px]  2xl:text-2xl `}
        >
          {isLoading ? <p>Loading...</p> : <p>Simpan & Kirim</p>}
        </button>
      </div>
    </div>
  )
}
