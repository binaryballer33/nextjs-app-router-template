"use client"

import Link from "next/link"

import { useRef, useState } from "react"

import { Lock } from "lucide-react"

import routes from "@/routes/routes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AuthIcon() {
    const [isOpen, setIsOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 300)
    }

    return (
        <div className="relative ml-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
                <DropdownMenuTrigger asChild>
                    <Button className="ml-auto" size="icon" variant="ghost">
                        <Lock className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={routes.auth.login}>Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={routes.auth.register}>Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={routes.auth.forgotPassword}>Forgot Password</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
