import NotLoggedInAuthIcons from "../navbar-icons/auth-icons/not-logged-in-auth-icons"
import ThemeToggle from "../navbar-icons/theme-toggle"

export default function NavbarIcons() {
    return (
        <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <NotLoggedInAuthIcons />
        </div>
    )
}
