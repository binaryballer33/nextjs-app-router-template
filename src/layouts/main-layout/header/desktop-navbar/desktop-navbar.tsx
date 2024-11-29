import { type NavBarItem } from "@/types/navbar-item"

import { type FC } from "react"

import DesktopNavBarItem from "./desktop-navbar-item"

type DesktopNavBarProps = {
    navbarItems?: NavBarItem[]
}

const DesktopNavBar: FC<DesktopNavBarProps> = ({ navbarItems }) => {
    if (!navbarItems) return null

    return (
        <div className="relative">
            <div className="sticky top-0 flex items-center">
                {navbarItems.map((item) => (
                    <DesktopNavBarItem key={item.title} navbarItem={item} />
                ))}
            </div>
        </div>
    )
}

export default DesktopNavBar
