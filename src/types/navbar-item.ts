import type { ReactNode } from "react"

export type NavBarItem = {
    icon?: ReactNode
    route?: string
    subMenu?: NavBarItem[]
    title: string
}
