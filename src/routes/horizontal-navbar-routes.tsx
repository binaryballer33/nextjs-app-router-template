import type { NavBarItem } from "@/types/navbar-item"

import { useTranslation } from "react-i18next"

import {
    AppWindow,
    Briefcase,
    LayoutDashboard,
    Settings
} from "lucide-react"

import routes from "@/routes/routes"


export default function useHorizontalNavBarItems(): NavBarItem[] {
    const { t } = useTranslation()

    return [
        {
            icon: <LayoutDashboard className="h-5 w-5" />,
            route: routes.dummy,
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
            route: routes.dummy,
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
        {
            icon: <Briefcase className="h-5 w-5" />,
            route: routes.dummy,
            subMenu: [
                {
                    route: routes.dummy,
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
                    route: routes.dummy,
                    title: t("Projects"),
                },
                {
                    route: routes.dummy,
                    subMenu: [
                        {
                            route: routes.dummy,
                            title: t("Shop front"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Shop listing"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Product details"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Create product"),
                        },
                    ],
                    title: t("Commerce"),
                },
                {
                    route: routes.dummy,
                    subMenu: [
                        {
                            route: routes.dummy,
                            title: t("Listing"),
                        },
                        {
                            route: routes.dummy,
                            title: t("Invoice details"),
                        },
                    ],
                    title: t("Invoices"),
                },
            ],
            title: t("Management"),
        },
        {
            icon: <Settings className="h-5 w-5" />,
            route: routes.dummy,
            title: t("Settings"),
        },
    ]
}
