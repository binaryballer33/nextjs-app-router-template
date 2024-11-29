"use client"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { toggleTheme } from "@/slices/theme"
import { useDispatch } from "@/store"

export default function ThemeModeToggler() {
    const { theme } = useTheme()
    const dispatch = useDispatch()

    const handleThemeToggle = () => dispatch(toggleTheme())

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        aria-label="Dark/Light Mode Toggler"
                        className="h-9 w-9 rounded-md border-divider/20 p-2"
                        onClick={handleThemeToggle}
                        size="icon"
                        variant="outline"
                    >
                        {theme === "light" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Toggle Dark/Light Mode</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
