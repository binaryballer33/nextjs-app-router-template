import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useMobileNav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)

  const handlePathnameChange = useCallback((): void => {
    if (open) {
      setOpen(false)
    }
  }, [open])

  useEffect(() => {
    handlePathnameChange()
  }, [handlePathnameChange, pathname])

  const handleOpen = useCallback((): void => {
    setOpen(true)
  }, [])

  const handleClose = useCallback((): void => {
    setOpen(false)
  }, [])

  return {
    handleOpen,
    handleClose,
    open,
  }
}
