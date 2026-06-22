"use client"
import { useEffect, useState } from "react"
import StepProgressBar from "../ui/StepProgress"
import { votingContent } from "../login/LoginLayout"
import Finish from "./Finish"
import Navbar, { NavbarCandidate } from "../ui/Navbar"
import HeaderText from "../ui/HeaderText"

export default function ResponsePage({
  navbarCandidates,
}: {
  navbarCandidates: NavbarCandidate[]
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className=" min-h-screen w-full bg-navy ">
      <Navbar candidates={navbarCandidates} />
      <div className={`container mx-auto py-16 lg:py-32 transition-all duration-1000 ease-out transform ${
        mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}>
        <HeaderText
          text="Success"
          className="mb-12 text-yellow md:mb-16 2xl:mb-24"
        />
        <StepProgressBar items={votingContent} onStep={3} />
        <Finish />
      </div>
    </main>
  )
}
