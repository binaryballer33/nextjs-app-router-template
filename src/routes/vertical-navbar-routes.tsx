import type { NavBarItem } from "@/types/navbar-item"

import { useTranslation } from "react-i18next"

import {
    AppWindow,
    Heart,
    Layers,
    LayoutDashboard,
    Receipt,
    ShoppingCart,
    Users
} from "lucide-react"

import routes from "./routes"


export default function useVerticalNavBarItems(): NavBarItem[] {
    const { t } = useTranslation()

    return [
        {
            subMenu: [
                {
                    icon: <LayoutDashboard className="h-5 w-5" />,
                    subMenu: [
                        {
                            route: routes.dummy,
                            title: t("Reports"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Expenses"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Statistics"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Automation"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Analytics"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Hospital"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Helpdesk"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Monitoring"),
                        },
                    ],
                    title: t("Dashboards"),
                },
                {
                    icon: <AppWindow className="h-5 w-5" />,
                    subMenu: [
                        {
                            route: routes.dummy,
                            title: t("Calendar"),
                        },
                        {
                            route: routes.dummy,
                            title: t("File manager"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Jobs platform"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Mailbox"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Messenger"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Projects board"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Tasks"),
                        },
                    ],
                    title: t("Applications"),
                },
            ],
            title: t("General"),
        },
        {
            subMenu: [
                {
                    icon: <Users className="h-5 w-5" />,
                    subMenu: [
                        {
                            route: routes.dummy,
                            title: t("Listing"),
                        },
                        {
                            route: routes.dummy,
                            title: t("User profile"),
                        },
                    ],
                    title: t("Users"),
                },
                {
                    icon: <Heart className="h-5 w-5" />,
                    route: routes.dummy,
                    title: t("Favorites"),
                },
                {
                    icon: <ShoppingCart className="h-5 w-5" />,
                    title: t("Cart"),
                },
                {
                    icon: <Receipt className="h-5 w-5" />,
                    title: t("Orders"),
                },
            ],
            title: t("Management"),
        },
        {
            subMenu: [
                {
                    icon: <Layers className="h-5 w-5" />,
                    route: routes.dummy,
                    title: t("UI Components"),
                },
            ],
            title: t("Foundation"),
        },
    ]
}
