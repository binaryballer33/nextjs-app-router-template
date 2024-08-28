import type { ReactNode } from "react"

export type NavBarItem = {
    title: string
    route?: string
    icon?: ReactNode
    subMenu?: NavBarItem[]
}
