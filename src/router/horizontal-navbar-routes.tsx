import AppsTwoToneIcon from "@mui/icons-material/AppsTwoTone"
import BusinessCenterTwoToneIcon from "@mui/icons-material/BusinessCenterTwoTone"
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone"
import SettingsIcon from "@mui/icons-material/Settings"
import { useTranslation } from "react-i18next"

import { NavBarItem } from "src/models/navbar-item"
import routes from "src/router/navigation-routes"

// manage the navbar items, their title, icons and routes from here. This is for both desktop and mobile navbars
const useHorizontalNavBarItems = (): NavBarItem[] => {
  const { t } = useTranslation()

  return [
    {
      title: t("Dashboards"),
      icon: <DashboardTwoToneIcon />,
      route: routes.dummy,
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
      icon: <AppsTwoToneIcon />,
      route: routes.dummy,
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
    {
      title: t("Management"),
      icon: <BusinessCenterTwoToneIcon />,
      route: routes.dummy,
      subMenu: [
        {
          title: t("Users"),
          route: routes.dummy,
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
          title: t("Projects"),
          route: routes.dummy,
        },
        {
          title: t("Commerce"),
          route: routes.dummy,
          subMenu: [
            {
              title: t("Shop front"),
              route: routes.dummy,
            },
            {
              title: t("Shop listing"),
              route: routes.dummy,
            },
            {
              title: t("Product details"),
              route: routes.dummy,
            },
            {
              title: t("Create product"),
              route: routes.dummy,
            },
          ],
        },
        {
          title: t("Invoices"),
          route: routes.dummy,
          subMenu: [
            {
              title: t("Listing"),
              route: routes.dummy,
            },
            {
              title: t("Invoice details"),
              route: routes.dummy,
            },
          ],
        },
      ],
    },
    {
      title: t("Settings"),
      icon: <SettingsIcon />,
      route: routes.dummy,
    },
  ]
}

export default useHorizontalNavBarItems
