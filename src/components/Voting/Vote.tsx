"use client"
import Image from "next/image"
import { RadioGroup } from "@headlessui/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
        className={"mb-8 flex flex-col items-center justify-center md:flex-row"}
      >
        <RadioGroup.Label></RadioGroup.Label>
        {candidates.map((candidate, idx) => (
          <RadioGroup.Option
            key={idx}
            value={candidate.id}
            className={`relative  flex cursor-pointer `}
          >
            {({ checked }) => (
              <>
                <div className="flex flex-col items-center justify-center transition duration-200 hover:scale-110 ">
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
