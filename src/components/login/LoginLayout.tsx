"use client"
import { useEffect, useState } from "react"
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen w-full  bg-navy">
      <Navbar candidates={navbarCandidates} />
      <div className={`container mx-auto py-16 lg:py-32 transition-all duration-1000 ease-out transform ${
        mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}>
        <HeaderText
          text="Login"
          as="h1"
          className="mb-12 text-yellow md:mb-16 2xl:mb-24"
        />
        <StepProgressBar items={votingContent} onStep={1} />
        <Login />
      </div>
    </div>
  )
}
