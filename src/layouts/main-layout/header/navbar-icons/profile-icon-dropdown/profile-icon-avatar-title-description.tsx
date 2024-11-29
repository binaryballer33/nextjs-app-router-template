import { useTranslation } from "react-i18next"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const user = {
    name: "Shaquille Mandy",
    role: "Software Engineer",
}


export default function ProfileIconDropdownAvatar() {
    const { t } = useTranslation()
    return (
        <div className="flex items-center">
            <div className="relative">
                <Badge
                    className="absolute -left-2 -top-2 h-6 w-6 justify-center rounded-full bg-secondary text-secondary-foreground"
                >
                    12
                </Badge>
                <Avatar className="h-12 w-12 bg-primary text-primary-foreground">
                    <AvatarFallback>SM</AvatarFallback>
                </Avatar>
            </div>
            <div className="mx-4 overflow-hidden">
                <div className="text-xl font-semibold">
                    Shaquille Mandy
                </div>
                <div className="truncate text-sm text-muted-foreground">
                    {t(user.role)}
                </div>
            </div>
        </div>
    )
}
