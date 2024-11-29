"use client"

import { useCallback, useRef, useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import ProfileIconDropdown from "./profile-icon-dropdown-content"

export default function Profile() {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <div className="flex flex-col items-center sm:flex-row sm:justify-around gap-2 sm:gap-3">
            <Button
                aria-controls={open ? "profile-menu" : undefined}
                aria-expanded={open}
                aria-haspopup="true"
                className="relative h-9 w-9 rounded-full p-0 hover:ring-3 hover:ring-primary"
                onClick={() => setOpen(true)}
                ref={buttonRef}
                size="icon"
                variant="ghost"
            >
                <Avatar className="h-9 w-9">
                    <AvatarFallback>SM</AvatarFallback>
                </Avatar>
            </Button>

            <ProfileIconDropdown
                onClose={handleClose}
                open={open}
            />
        </div>
    )
}
