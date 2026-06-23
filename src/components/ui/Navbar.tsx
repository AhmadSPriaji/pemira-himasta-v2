"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export type NavbarCandidate = {
  candidateNumber: number
  name: string
}

function Navbar({ candidates = [] }: { candidates?: NavbarCandidate[] }) {
  const router = useRouter()
  const [isOffset, setIsOffset] = useState(false)
  const [dropdownState, setDropdownState] = useState<"closed" | "open" | "closing">("closed")
  const isOpened = dropdownState === "open"

  const handleScroll = () => {
    setIsOffset(window.scrollY > 0)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`${
        isOffset ? "drop-shadow-lg" : ""
      } fixed top-0 z-50 flex h-12 w-full items-center justify-end gap-6 bg-navy px-8 text-center font-head text-[20px] text-yellow lg:h-16 lg:gap-10 lg:px-[72px] lg:text-[28px] 2xl:h-[108px] 2xl:gap-[59px] 2xl:px-24 2xl:text-[40px]`}
    >
      <Link
        href="/"
        className="flex cursor-pointer items-center justify-center transition ease-in-out hover:text-white"
      >
        Home
      </Link>
      <Link
        href="/login"
        className="flex cursor-pointer items-center justify-center transition ease-in-out hover:text-white"
      >
        Voting
      </Link>

      <div
        onClick={() => {
          if (dropdownState === "open") {
            setDropdownState("closing")
            const closeMs = parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue("--dropdown-close-dur")
            ) || 150
            setTimeout(() => {
              setDropdownState((current) => (current === "closing" ? "closed" : current))
            }, closeMs)
          } else {
            setDropdownState("open")
          }
        }}
        onMouseOver={() => {
          setDropdownState("open")
        }}
        onMouseLeave={() => {
          setDropdownState("closing")
          const closeMs = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--dropdown-close-dur")
          ) || 150
          setTimeout(() => {
            setDropdownState((current) => (current === "closing" ? "closed" : current))
          }, closeMs)
        }}
        className="flex h-full cursor-pointer flex-col items-center justify-center transition ease-in-out hover:text-white"
      >
        <div className="z-10 flex items-center justify-center gap-3">
          <p className="">Candidates</p>
          <span
            className={`aspect-square w-[10px] md:w-[15px] ${
              isOpened ? "mt-2 rotate-[225deg]" : "-mt-2 rotate-45 "
            } border-b-2 border-r-2 border-yellow transition duration-300 ease-in-out`}
          ></span>
        </div>
        <div
          data-origin="top-center"
          className={`${
            dropdownState !== "closed" ? "block" : "hidden"
          } t-dropdown ${
            dropdownState === "open" ? "is-open" : dropdownState === "closing" ? "is-closing" : ""
          } absolute top-12 flex flex-col gap-2 bg-navy px-8 py-4 text-left text-base drop-shadow-md lg:top-16 lg:gap-4 lg:px-10 lg:py-5 lg:text-xl 2xl:top-[108px] 2xl:gap-5 2xl:px-12 2xl:py-6 2xl:text-2xl`}
        >
          {candidates.map((candidate, index) => (
            <Link
              key={index}
              href={"/candidate/" + candidate.candidateNumber}
              className="block w-24 text-yellow transition-all duration-200 ease-out hover:text-white lg:w-32 2xl:w-36"
            >
              {candidate.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
