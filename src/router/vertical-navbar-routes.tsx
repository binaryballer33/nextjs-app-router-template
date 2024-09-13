import type { NavBarItem } from "src/types/navbar-item"

import { useTranslation } from "react-i18next"

import AppsRoundedIcon from "@mui/icons-material/AppsRounded"
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LayersRoundedIcon from "@mui/icons-material/LayersRounded"
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded"
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded"
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded"

import routes from "src/router/routes"

const useVerticalNavBarItems = (): NavBarItem[] => {
    const { t } = useTranslation()

    return [
        {
            subMenu: [
                {
                    icon: <DashboardRoundedIcon />,
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
                    icon: <AppsRoundedIcon />,
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
                    icon: <PeopleRoundedIcon />,
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
                    icon: <FavoriteIcon />,
                    route: routes.dummy,
                    title: t("Favorites"),
                },
                {
                    icon: <ShoppingCartRoundedIcon />,
                    title: t("Cart"),
                },
                {
                    icon: <ReceiptRoundedIcon />,
                    title: t("Orders"),
                },
            ],
            title: t("Management"),
        },
        {
            subMenu: [
                {
                    icon: <LayersRoundedIcon />,
                    route: routes.dummy,
                    title: t("UI Components"),
                },
            ],
            title: t("Foundation"),
        },
    ]
}

export default useVerticalNavBarItems
