"use client"

import Link from "next/link"

import { Lock } from "lucide-react"

import routes from "@/routes/routes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AuthIcon() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Lock className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
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
    )
}
