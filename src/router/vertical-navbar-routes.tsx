import AppsRoundedIcon from "@mui/icons-material/AppsRounded"
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LayersRoundedIcon from "@mui/icons-material/LayersRounded"
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded"
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded"
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded"
import { useTranslation } from "react-i18next"

import { NavBarItem } from "src/models/navbar-item"
import routes from "src/router/navigation-routes"

const useVerticalNavBarItems = (): NavBarItem[] => {
  const { t } = useTranslation()

  return [
    {
      title: t("General"),
      subMenu: [
        {
          title: t("Dashboards"),
          icon: <DashboardRoundedIcon />,
          subMenu: [
            {
              title: t("Reports"),
              route: routes.dummy,
            },
            {
              title: t("Expenses"),
              route: routes.dummy,
            },
            {
              title: t("Statistics"),
              route: routes.dummy,
            },
            {
              title: t("Automation"),
              route: routes.dummy,
            },
            {
              title: t("Analytics"),
              route: routes.dummy,
            },
            {
              title: t("Hospital"),
              route: routes.dummy,
            },
            {
              title: t("Helpdesk"),
              route: routes.dummy,
            },
            {
              title: t("Monitoring"),
              route: routes.dummy,
            },
          ],
        },
        {
          title: t("Applications"),
          icon: <AppsRoundedIcon />,
          subMenu: [
            {
              title: t("Calendar"),
              route: routes.dummy,
            },
            {
              title: t("File manager"),
              route: routes.dummy,
            },
            {
              title: t("Jobs platform"),
              route: routes.dummy,
            },
            {
              title: t("Mailbox"),
              route: routes.dummy,
            },
            {
              title: t("Messenger"),
              route: routes.dummy,
            },
            {
              title: t("Projects board"),
              route: routes.dummy,
            },
            {
              title: t("Tasks"),
              route: routes.dummy,
            },
          ],
        },
      ],
    },
    {
      title: t("Management"),
      subMenu: [
        {
          title: t("Users"),
          icon: <PeopleRoundedIcon />,
          subMenu: [
            {
              title: t("Listing"),
              route: routes.dummy,
            },
            {
              title: t("User profile"),
              route: routes.dummy,
            },
          ],
        },
        {
          title: t("Favorites"),
          icon: <FavoriteIcon />,
          route: routes.dummy,
        },
        {
          title: t("Cart"),
          icon: <ShoppingCartRoundedIcon />,
        },
        {
          title: t("Orders"),
          icon: <ReceiptRoundedIcon />,
        },
      ],
    },
    {
      title: t("Foundation"),
      subMenu: [
        {
          title: t("UI Components"),
          icon: <LayersRoundedIcon />,
          route: routes.dummy,
        },
      ],
    },
  ]
}

export default useVerticalNavBarItems
