import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"

type FormReturnLinkProps = {
    className?: string
    href: string
    icon?: LucideIcon | ReactNode
    size?: ButtonProps["size"]
    title: string
    variant?: ButtonProps["variant"]
}

export default function FormReturnLink(props: FormReturnLinkProps) {
    const { className,href,icon,size = "sm",title,variant = "ghost" } = props

    return (
        <Button
            asChild
            className={cn(
                "mt-6 gap-2",
                className
            )}
            size={size}
            variant={variant}
        >
            <Link href={href}>
                {icon || <ArrowLeft className="h-4 w-4" />}
                {title}
            </Link>
        </Button>
    )
}
