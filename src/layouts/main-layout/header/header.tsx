import AuthIcon from "@/layouts/main-layout/header/auth-icon"
import MobileMenu from "@/layouts/main-layout/header/mobile-menu"
import NavigationMenu from "@/layouts/main-layout/header/navigation-menu"
import ThemeToggle from "@/layouts/main-layout/header/theme-toggle"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <MobileMenu />
                <NavigationMenu />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <AuthIcon />
                </div>
            </div>
        </header>
    )
}
