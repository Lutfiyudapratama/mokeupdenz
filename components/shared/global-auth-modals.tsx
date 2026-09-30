"use client"

import { useEffect, useState } from "react"
import { LoginModal } from "./login-modal"
import { ClaimDiscountModal } from "./claim-discount-modal"
import { useAuthFlowStore } from "@/store/auth-flow-store"

export function GlobalAuthModals() {
  const isLoginOpen = useAuthFlowStore((s) => s.isLoginOpen)
  const isDiscountOpen = useAuthFlowStore((s) => s.isDiscountOpen)
  const openInitialLogin = useAuthFlowStore((s) => s.openInitialLogin)
  const resolveGuest = useAuthFlowStore((s) => s.resolveGuest)
  const resolveLoginSuccess = useAuthFlowStore((s) => s.resolveLoginSuccess)
  const closeDiscount = useAuthFlowStore((s) => s.closeDiscount)

  const [loginClosing, setLoginClosing] = useState(false)
  const [discountClosing, setDiscountClosing] = useState(false)

  // Setiap web dimuat / direfresh, tampilkan ajakan login
  useEffect(() => {
    const timer = setTimeout(() => {
      openInitialLogin()
    }, 500)
    return () => clearTimeout(timer)
  }, [openInitialLogin])

  function handleGuest() {
    setLoginClosing(true)
    setTimeout(() => {
      setLoginClosing(false)
      resolveGuest()
    }, 250)
  }

  function handleLoginSuccess() {
    setLoginClosing(true)
    setTimeout(() => {
      setLoginClosing(false)
      resolveLoginSuccess()
    }, 250)
  }

  function handleCloseDiscount() {
    setDiscountClosing(true)
    setTimeout(() => {
      setDiscountClosing(false)
      closeDiscount()
    }, 250)
  }

  return (
    <>
      <LoginModal
        open={isLoginOpen}
        isClosing={loginClosing}
        onGuest={handleGuest}
        onLoginSuccess={handleLoginSuccess}
      />
      <ClaimDiscountModal
        open={isDiscountOpen}
        isClosing={discountClosing}
        onClose={handleCloseDiscount}
      />
    </>
  )
}