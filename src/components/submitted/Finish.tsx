"use client"
import { useRouter } from "next/navigation"

export default function Finish() {
  const router = useRouter()
  return (
    <div className=" bg-navy text-center text-white">
      <p className="mb-16 px-12 text-lg lg:text-xl 2xl:text-3xl">
        Terima kasih sudah berpartisipasi dalam rangkaian Pemilihan Raya Himasta
        2024. <br />
        Ditunggu kedatanganmu di Pemilihan Raya Himasta 2025.
      </p>
      <button
        onClick={() => router.push("/")}
        className="w-48 rounded-md bg-yellow px-[10px] py-3 text-xl text-black transition ease-in-out hover:scale-105 active:scale-100 active:brightness-75 2xl:w-[216px] 2xl:text-2xl"
      >
        Kembali ke Home
      </button>
    </div>
  )
}
