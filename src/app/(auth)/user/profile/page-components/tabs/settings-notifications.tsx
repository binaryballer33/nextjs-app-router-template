import type { ChangeEvent } from "react"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import {
    Box,
    Card,
    Divider,
    Unstable_Grid2 as Grid,
    List,
    ListItem,
    ListItemText,
    styled,
    Switch,
    Typography,
} from "@mui/material"

const StyledSwitch = styled(Switch)(() => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "white",
    },
}))

export default function SettingsNotifications() {
    const { t } = useTranslation()

    const [state, setState] = useState({
        checkedA: true,
        checkedB: false,
        checkedC: true,
        checkedD: false,
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        })
    }

    return (
        <Grid container spacing={{ sm: 3, xs: 2 }}>
            <Grid xs={12}>
                <Box pb={2}>
                    <Typography variant="h5">{t("Account")}</Typography>
                    <Typography color="text.secondary" variant="subtitle1">
                        {t("Choose what notifications you want to receive")}
                    </Typography>
                </Box>
                <Card>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={t("Widthdraw Activity")}
                                primaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedA",
                                    variant: "h6",
                                }}
                                secondary={t("Receive an email when a widthdrawal is made")}
                                secondaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedA",
                                    variant: "subtitle2",
                                }}
                            />
                            <StyledSwitch
                                checked={state.checkedA}
                                color="primary"
                                id="checkedA"
                                name="checkedA"
                                onChange={handleChange}
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary={t("Weekly Report")}
                                primaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedB",
                                    variant: "h6",
                                }}
                                secondary={t("Receive account status weekly report in your inbox")}
                                secondaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedB",
                                    variant: "subtitle2",
                                }}
                            />
                            <StyledSwitch
                                checked={state.checkedB}
                                color="primary"
                                id="checkedB"
                                name="checkedB"
                                onChange={handleChange}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Box pb={2}>
                    <Typography variant="h5">{t("Orders")}</Typography>
                    <Typography color="text.secondary" variant="subtitle1">
                        {t("Receive email notifications related to your orders activity")}
                    </Typography>
                </Box>
                <Card>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={t("Failed Payment")}
                                primaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedC",
                                    variant: "h6",
                                }}
                                secondary={t("Get a message when a payment fails")}
                                secondaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedC",
                                    variant: "subtitle2",
                                }}
                            />
                            <StyledSwitch
                                checked={state.checkedC}
                                color="primary"
                                name="checkedC"
                                onChange={handleChange}
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary={t("Order Status Update")}
                                primaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedD",
                                    variant: "h6",
                                }}
                                secondary={t("Whenever an order is updated, get a notification on your phone")}
                                secondaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedD",
                                    variant: "subtitle2",
                                }}
                            />
                            <StyledSwitch
                                checked={state.checkedD}
                                color="primary"
                                name="checkedD"
                                onChange={handleChange}
                            />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    )
}
