import { useContext } from "react"

import { UserContext } from "src/contexts/auth-context"

export default function useAuth() {
  const context = useContext(UserContext)

  if (!context) throw new Error("useAuth must be used within a AuthProvider")

  return context
}
