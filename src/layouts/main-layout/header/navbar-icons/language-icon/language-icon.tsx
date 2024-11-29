import LanguageDropdown from "./language-icon-dropdown"

export default function LanguageIcon() {
    return (
        <div className="flex items-center flex-col sm:flex-row justify-around gap-3 sm:gap-0 md:gap-3">
            <LanguageDropdown />
        </div>
    )
}
