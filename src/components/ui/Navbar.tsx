"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, Transition } from "@headlessui/react"

// GANTI CANDIDATE DI NAVBAR
const candidates = [
  { name: "Daffa Athatara" },
  {
    name: "Fadhil Zaidan Mumtaz",
  },
  {
    name: "Nasadi Akbar Nugraha",
  },
]

function Navbar() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isOffset, setIsOffset] = useState(false)

  const [isOpened, setIsOpened] = useState(false)
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
      <div
        onClick={() => {
          router.push("/")
        }}
        className="flex cursor-pointer items-center justify-center transition ease-in-out hover:text-white"
      >
        <p className="">Home</p>
      </div>
      <div
        onClick={() => {
          router.push("/login")
        }}
        className="flex cursor-pointer items-center justify-center transition ease-in-out hover:text-white"
      >
        <p className="">Voting</p>
      </div>

      <div
        onClick={() => {
          setIsOpened(!isOpened)
        }}
        onMouseOver={() => {
          setIsOpened(true)
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsOpened(false)
          setIsHovered(false)
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
        <Transition
          as="div"
          show={isOpened}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className={`${
            isOpened ? "block" : "hidden"
          }  absolute top-12 flex flex-col gap-2 bg-navy px-8 py-4 text-left text-base drop-shadow-md lg:top-16 lg:gap-4 lg:px-10 lg:py-5 lg:text-xl 2xl:top-[108px] 2xl:gap-5 2xl:px-12 2xl:py-6 2xl:text-2xl`}
        >
          {candidates.map((candidate, index) => (
            <p
              key={index}
              onClick={() => {
                router.push("/candidate/" + (index + 1))
              }}
              className="w-24 text-yellow transition-all duration-200 ease-out hover:text-white lg:w-32 2xl:w-36"
            >
              {candidate.name}
            </p>
          ))}
        </Transition>
      </div>
    </div>
  )
}

export default Navbar
