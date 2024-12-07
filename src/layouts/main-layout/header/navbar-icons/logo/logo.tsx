import Link from "next/link"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"

const Logo = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative flex items-center transform scale-100 transition-transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link
                className="flex items-center justify-center text-primary"
                href="/"
            >
                <div className="relative">
                    <Badge
                        className={`
                            absolute -right-1 -top-1 px-[5px] py-[3px] text-[10px] font-bold tracking-tighter
                            transition-opacity duration-200 scale-90
                            ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}
                        `}
                        variant="secondary"
                    >
                        1.0
                    </Badge>
                    <div
                        className="w-8 h-8 rounded-lg border-2 border-primary"
                        style={{
                            background: 'linear-gradient(198deg, rgba(var(--primary) / 0.32) 18%, transparent 100%)'
                        }}
                    />
                </div>
                <span className="text-[18px] leading-[18px] font-bold text-foreground -ml-6 mr-[34px] -mt-[1px]">
                    M
                </span>
                <span className="text-[18px] leading-[18px] font-medium text-foreground -ml-[23px] -mt-[1px] tracking-tighter">
                    TEC
                </span>
            </Link>
        </div>
    )
}

export default Logo
