"use client"

import { ArrowLeft, LockKeyhole, Mail, UserRound } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthStore } from "@/store/auth-store"

export default function LoginPage() {
  const router = useRouter()

  const login = useAuthStore((state) => state.login)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !password) return

    login({
      id: "user-001",
      name: "Pengguna",
      email,
    })

    router.back()
  }

  return (
    <main className="min-h-screen bg-primary-light/30">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center p-4">

        <div className="w-full rounded-2xl bg-white p-6 shadow-xl sm:p-8">

          {/* Back */}
          <button
            type="button"
            onClick={() => router.back()}
            className="
              mb-6 flex items-center gap-2
              text-sm font-semibold
              text-gray-500
              transition-colors
              hover:text-primary-dark
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </button>

          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
            <UserRound className="h-6 w-6 text-primary-dark" />
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-primary-dark">
              Masuk
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Masuk untuk melanjutkan ke akun kamu.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-primary-dark"
              >
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  className="
                    w-full rounded-lg
                    border-2 border-primary-light
                    py-3 pl-10 pr-3
                    text-sm
                    outline-none
                    transition
                    focus:border-primary-dark
                  "
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-primary-dark"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="
                    w-full rounded-lg
                    border-2 border-primary-light
                    py-3 pl-10 pr-3
                    text-sm
                    outline-none
                    transition
                    focus:border-primary-dark
                  "
                  required
                />
              </div>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="
                mt-2 w-full
                rounded-lg
                bg-primary-dark
                py-3
                text-sm font-bold
                text-white
                transition-all
                hover:bg-primary
                active:scale-[0.98]
              "
            >
              Masuk
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-400">
            Belum memiliki akun? Daftar akan tersedia pada tahap
            berikutnya.
          </p>
        </div>
      </div>
    </main>
  )
}