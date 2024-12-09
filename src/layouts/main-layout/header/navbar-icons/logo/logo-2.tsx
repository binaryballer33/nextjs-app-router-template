import Link from "next/link"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"

const Logo = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative flex scale-100 transform items-center transition-transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link className="flex items-center justify-center text-primary" href="/">
                <div className="relative">
                    <Badge
                        className={`
                            absolute -right-1 -top-1 scale-90 px-[5px] py-[3px] text-[10px] font-bold
                            tracking-tighter transition-opacity duration-200
                            ${isHovered ? "visible opacity-100" : "invisible opacity-0"}
                        `}
                        variant="secondary"
                    >
                        1.0
                    </Badge>
                    <div
                        className="h-8 w-8 rounded-lg border-2 border-primary"
                        style={{
                            background: "linear-gradient(198deg, rgba(var(--primary) / 0.32) 18%, transparent 100%)",
                        }}
                    />
                </div>
                <span className="-ml-6 -mt-[1px] mr-[34px] text-[18px] font-bold leading-[18px] text-foreground">
                    M
                </span>
                <span className="-ml-[23px] -mt-[1px] text-[18px] font-medium leading-[18px] tracking-tighter text-foreground">
                    TEC
                </span>
            </Link>
        </div>
    )
}

export default Logo
