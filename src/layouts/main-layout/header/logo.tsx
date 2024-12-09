import Link from "next/link"

import { cn } from "@/lib/utils"

import routes from "@/routes/routes"

type LogoProps = {
    className?: string
    src?: string
}

export default function Logo(props: LogoProps) {
    const { className, src } = props
    return (
        <Link className="mr-6" href={routes.home}>
            <img
                alt="Logo"
                className={cn("h-6 w-6 rounded-full", className)}
                src={src || "https://placehold.co/600x600"}
            />
        </Link>
    )
}
