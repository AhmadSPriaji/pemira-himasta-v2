"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginStudent } from "@/app/actions/auth"

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [username, setUsername] = useState("")
  const [password, setPasword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const res = await loginStudent(username, password)
    if (res.success) {
      router.push("/voting")
    } else {
      setError(res.error || "Login gagal")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center font-sans">
      <div className="w-fit rounded-2xl bg-yellow px-8 py-6 md:px-12 md:py-8 2xl:px-[54px] 2xl:py-[42px]">
        {error && (
          <div className="mb-5 w-56 rounded-md border border-navy bg-red px-2 py-1 text-center text-sm text-white md:w-80 md:text-base 2xl:w-[432px] 2xl:px-3 2xl:py-2 2xl:text-xl  ">
            <p className=" break-words">{error}</p>
          </div>
        )}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 text-lg font-normal leading-none md:gap-6 md:text-xl 2xl:gap-10 2xl:text-[32px]"
        >
          <input
            required
            type="text"
            name="username"
            id="username"
            className="h-8 w-56 rounded-md border border-navy bg-yellow px-[14px] py-2 text-left placeholder-black/50 md:h-10 md:w-80 2xl:h-[54px] 2xl:w-[432px]"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            required
            type="password"
            name="password"
            id="password"
            className="h-8 w-56 rounded-md border border-navy bg-yellow px-[14px] py-2 text-left placeholder-black/50 md:h-10 md:w-80 2xl:h-[54px] 2xl:w-[432px]"
            placeholder="Password"
            onChange={(e) => setPasword(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`h-8 w-56 rounded-md border bg-navy p-1 px-[14px] text-center text-white placeholder-black/50 transition ease-in-out ${
              isLoading
                ? "brightness-75"
                : "hover:scale-105 active:scale-100 active:brightness-75"
            }  md:h-10  md:w-80 2xl:h-[54px] 2xl:w-[432px] 2xl:py-[10px]`}
          >
            {isLoading ? <p>Loading...</p> : <p>Login</p>}
          </button>
        </form>
      </div>
    </div>
  )
}
