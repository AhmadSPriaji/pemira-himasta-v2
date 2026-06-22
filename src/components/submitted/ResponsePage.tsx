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
  return (
    <main className=" min-h-screen w-full bg-navy ">
      <Navbar candidates={navbarCandidates} />
      <div className="container mx-auto py-16 lg:py-32">
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
