"use client"
import { useEffect, useState } from "react"
import HeaderText from "../ui/HeaderText"
import Vote from "./Vote"
import Navbar, { NavbarCandidate } from "../ui/Navbar"
import { votingContent } from "../login/LoginLayout"
import StepProgressBar from "../ui/StepProgress"

type Candidate = {
  id: string
  name: string
  photoUrl: string | null
}

export default function VotingPage({
  candidates,
  navbarCandidates,
}: {
  candidates: Candidate[]
  navbarCandidates: NavbarCandidate[]
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen w-full bg-navy">
      <Navbar candidates={navbarCandidates} />
      <div className={`container mx-auto bg-navy py-16 lg:py-32 transition-all duration-1000 ease-out transform ${
        mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}>
        <HeaderText text="Voting" className="mb-12 md:mb-16 2xl:mb-24" />
        <StepProgressBar items={votingContent} onStep={2} />
        <Vote candidates={candidates} />
      </div>
    </div>
  )
}
