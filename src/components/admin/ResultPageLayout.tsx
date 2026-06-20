"use client"
import useCandidates from "@/hooks/candidate/useCandidates"
import HeaderText from "../ui/HeaderText"
import Navbar from "../ui/Navbar"
import ProgressBar from "@ramonak/react-progress-bar"
import { Candidate } from "@/models/candidate"
import useFetchVotes from "@/hooks/admin/useFetchVoteCount"
import { useEffect } from "react"
import useStudentCount from "@/hooks/admin/useStudentCount"

export default function ResultPageLayout({
  candidates,
}: {
  candidates: { id: string; name: string }[]
}) {
  const { votes, error, votesCount, fetchVotes } = useFetchVotes()
  const { studentCount } = useStudentCount()

  useEffect(() => {
    fetchVotes()
  }, [])

  // GANTI TOTAL STUDENTS
  const totalVotes = studentCount // jumlah colection students

  const suaraMasuk = votes.length
  const yetVotes = totalVotes - suaraMasuk
  return (
    <div className="min-h-screen w-full bg-navy ">
      <Navbar />
      <div className="container mx-auto px-8 py-24 text-sm text-white md:px-16 lg:py-32 lg:text-lg 2xl:py-40 2xl:text-2xl">
        <h2 className=" mb-12 text-center font-head text-4xl text-white lg:mb-16 lg:text-6xl 2xl:mb-20 2xl:text-7xl">
          Admin Page
        </h2>
        <HeaderText text="Result" className="mb-12 lg:mb-16 2xl:mb-20" />
        <div className="flex flex-col gap-8">
          <div className="mb-4 flex justify-center text-center">
            <div className="w-1/3">
              <p className="font-head text-lg text-yellow lg:text-2xl 2xl:text-4xl">
                Jumlah Pemilih
              </p>

              <p className="text-lg lg:text-xl 2xl:text-3xl">{totalVotes}</p>
            </div>
            <div className="w-1/3">
              <p className="font-head text-lg text-yellow lg:text-2xl 2xl:text-4xl">
                Jumlah Suara Masuk
              </p>

              <p className="text-lg lg:text-xl 2xl:text-3xl">{suaraMasuk}</p>
            </div>
            <div className="w-1/3">
              <p className="font-head text-lg text-yellow lg:text-2xl 2xl:text-4xl">
                Jumlah Belum Voting
              </p>

              <p className="text-lg lg:text-xl 2xl:text-3xl">{yetVotes}</p>
            </div>
          </div>
          {candidates.map((candidate, index) => (
            <div key={index}>
              <p className="font-head text-lg text-yellow lg:text-2xl 2xl:text-4xl">
                {index + 1}. {candidate.name}
              </p>
              <ProgressBar
                completed={votesCount[candidate.id] || 0}
                maxCompleted={suaraMasuk}
                bgColor="#FBBF24"
                baseBgColor="#FDE68A"
                labelColor="#000000"
                height="20px"
                isLabelVisible={true}
                animateOnRender
                customLabel={`${Math.round(
                  ((votesCount[candidate.id] || 0) / suaraMasuk) * 100
                )}%`}
              />
              <p>Jumlah: {votesCount[candidate.id] || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
