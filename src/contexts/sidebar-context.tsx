import { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { usePathname } from "next/navigation"

// Context structure
type SidebarContextType = {
  isSidebarCollapsed: boolean
  isSidebarHovered: boolean
  toggleSidebarCollapsed: () => void
  toggleSidebarHover: (hovered: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>(null!)

type SidebarProviderProps = {
  children: ReactNode
}

export default function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const pathname = usePathname()

  // Toggle the sidebar collapsed state
  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  // Handle hover state persistence on route changes
  useEffect(() => {
    if (isSidebarCollapsed) setIsSidebarHovered(false)
  }, [pathname, isSidebarCollapsed])

  // Toggle hover state
  const toggleSidebarHover = (hovered: boolean) => {
    if (isSidebarCollapsed) setIsSidebarHovered(hovered)
  }

  return (
    <SidebarContext.Provider
      // TODO: come back and fix this
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ isSidebarCollapsed, isSidebarHovered, toggleSidebarCollapsed, toggleSidebarHover }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

// Custom hook for easy access to the context
export const useSidebarContext = () => useContext(SidebarContext)
