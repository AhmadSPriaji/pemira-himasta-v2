"use client"
import HeaderText from "../ui/HeaderText"
import Vote from "./Vote"
import Navbar from "../ui/Navbar"
import { votingContent } from "../login/LoginLayout"
import StepProgressBar from "../ui/StepProgress"

type Candidate = {
  id: string
  name: string
  photoUrl: string | null
}

export default function VotingPage({ candidates }: { candidates: Candidate[] }) {
  return (
    <div className="min-h-screen w-full bg-navy">
      <Navbar />
      <div className="container mx-auto bg-navy py-16 lg:py-32 ">
        <HeaderText text="Voting" className="mb-12 md:mb-16 2xl:mb-24" />
        <StepProgressBar items={votingContent} onStep={2} />
        <Vote candidates={candidates} />
      </div>
    </div>
  )
}
