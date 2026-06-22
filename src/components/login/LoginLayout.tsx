import HeaderText from "../ui/HeaderText"
import Navbar, { NavbarCandidate } from "../ui/Navbar"
import Login from "./Login"
import StepProgressBar from "../ui/StepProgress"

export const votingContent = [
  {
    id: 1,
    title: "Login",
  },
  {
    id: 2,
    title: "Vote",
  },
  {
    id: 3,
    title: "Success",
  },
]

export default function LoginLayout({
  navbarCandidates,
}: {
  navbarCandidates: NavbarCandidate[]
}) {
  return (
    <div className="min-h-screen w-full  bg-navy">
      <Navbar candidates={navbarCandidates} />
      <div className="container mx-auto py-16 lg:py-32">
        <HeaderText
          text="Login"
          className="mb-12 text-yellow md:mb-16 2xl:mb-24"
        />
        <StepProgressBar items={votingContent} onStep={1} />
        <Login />
      </div>
    </div>
  )
}
