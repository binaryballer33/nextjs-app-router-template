import { useRouter } from "next/navigation"

import { useEffect } from "react"

export default function useRedirectIfStale(redirectTo = "/", timeout = 4000) {
    const router = useRouter()
    const currentPath = typeof window !== "undefined" ? window.location.pathname : ""

    // Set a timer to redirect after a certain time if still on the same page
    useEffect(() => {
        const timer = setTimeout(() => {
            if (window.location.pathname === currentPath) {
                router.push(redirectTo)
            }
        }, timeout)

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timer)
    }, [currentPath, router, timeout, redirectTo])
}
