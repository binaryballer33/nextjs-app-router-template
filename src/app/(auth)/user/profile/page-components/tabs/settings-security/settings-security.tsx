import { useTranslation } from "react-i18next"

import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone"

import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    Unstable_Grid2 as Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled,
    Switch,
    Typography,
    useTheme,
} from "@mui/material"

import { AvatarState } from "src/components/base/styles/avatar"
import ButtonSoft from "src/components/base/styles/button-soft"

import SecurityLogs from "./security-logs"

const StyledSwitch = styled(Switch)(() => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "white",
    },
}))

export default function SettingsSecurity() {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <Grid
            container
            spacing={{ sm: 3, xs: 2 }}
            sx={{
                "& .MuiListItem-root": {
                    display: { sm: "flex", xs: "block" },
                },
            }}
        >
            <Grid xs={12}>
                <Box pb={2}>
                    <Typography variant="h5">{t("Social Accounts")}</Typography>
                    <Typography color="text.secondary" variant="subtitle1">
                        {t("Manage connected social accounts options")}
                    </Typography>
                </Box>
                <Card>
                    <List disablePadding>
                        <ListItem sx={{ p: 2 }}>
                            <ListItemAvatar
                                sx={{
                                    pr: 2,
                                }}
                            >
                                <Avatar
                                    src="/placeholders/logo/google-icon.svg"
                                    sx={{
                                        height: theme.spacing(5),
                                        width: theme.spacing(5),
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={t("Google")}
                                primaryTypographyProps={{ gutterBottom: true, variant: "h5" }}
                                secondary={t("A Google account hasn’t been yet added to your account")}
                                secondaryTypographyProps={{
                                    variant: "subtitle2",
                                }}
                                sx={{
                                    m: 0,
                                    pr: { sm: 1, xs: 0 },
                                    py: { sm: 0, xs: 2 },
                                }}
                            />
                            <Button color="secondary" size="large" variant="contained">
                                {t("Connect")}
                            </Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Card>
                    <List disablePadding>
                        <ListItem sx={{ p: 2 }}>
                            <ListItemAvatar
                                sx={{
                                    pr: 2,
                                }}
                            >
                                <AvatarState
                                    isSoft
                                    state="success"
                                    sx={{
                                        height: theme.spacing(5),
                                        width: theme.spacing(5),
                                    }}
                                >
                                    <DoneTwoToneIcon />
                                </AvatarState>
                            </ListItemAvatar>
                            <ListItemText
                                primary={t("Facebook")}
                                primaryTypographyProps={{ gutterBottom: true, variant: "h5" }}
                                secondary={t("Your Facebook account has been successfully connected")}
                                secondaryTypographyProps={{
                                    variant: "subtitle2",
                                }}
                                sx={{
                                    m: 0,
                                    pr: { sm: 1, xs: 0 },
                                    py: { sm: 0, xs: 2 },
                                }}
                            />
                            <ButtonSoft
                                color="error"
                                size="large"
                                sx={{
                                    whiteSpace: "nowrap",
                                }}
                                variant="contained"
                            >
                                {t("Revoke access")}
                            </ButtonSoft>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem sx={{ p: 2 }}>
                            <ListItemAvatar
                                sx={{
                                    pr: 2,
                                }}
                            >
                                <AvatarState
                                    isSoft
                                    state="success"
                                    sx={{
                                        height: theme.spacing(5),
                                        width: theme.spacing(5),
                                    }}
                                >
                                    <DoneTwoToneIcon />
                                </AvatarState>
                            </ListItemAvatar>
                            <ListItemText
                                primary={t("Twitter")}
                                primaryTypographyProps={{ gutterBottom: true, variant: "h5" }}
                                secondary={t("Your Twitter account was last syncronized 6 days ago")}
                                secondaryTypographyProps={{
                                    variant: "subtitle2",
                                }}
                                sx={{
                                    m: 0,
                                    pr: { sm: 1, xs: 0 },
                                    py: { sm: 0, xs: 2 },
                                }}
                            />
                            <ButtonSoft
                                color="error"
                                size="large"
                                sx={{
                                    whiteSpace: "nowrap",
                                }}
                                variant="contained"
                            >
                                {t("Revoke access")}
                            </ButtonSoft>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Box pb={2}>
                    <Typography variant="h5">{t("Security")}</Typography>
                    <Typography color="text.secondary" variant="subtitle1">
                        {t("Change your security preferences below")}
                    </Typography>
                </Box>
                <Card>
                    <List disablePadding>
                        <ListItem sx={{ p: 2 }}>
                            <ListItemText
                                primary={t("Change password")}
                                primaryTypographyProps={{
                                    variant: "h5",
                                }}
                                secondary={t("You can change your password here")}
                                secondaryTypographyProps={{
                                    variant: "subtitle2",
                                }}
                                sx={{
                                    m: 0,
                                    pl: 0,
                                    pr: { sm: 1, xs: 0 },
                                }}
                            />
                            <Button
                                size="large"
                                sx={{
                                    whiteSpace: "nowrap",
                                }}
                                variant="outlined"
                            >
                                {t("Change password")}
                            </Button>
                        </ListItem>
                        <Divider component="li" />
                        <ListItem sx={{ p: 2 }}>
                            <ListItemText
                                primary={t("Two-factor authentication")}
                                primaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedD",
                                    variant: "h5",
                                }}
                                secondary={t("Enable PIN verification for all sign in attempts")}
                                secondaryTypographyProps={{
                                    component: "label",
                                    htmlFor: "checkedD",
                                    variant: "subtitle2",
                                }}
                                sx={{
                                    m: 0,
                                    pl: 0,
                                    pr: { sm: 1, xs: 0 },
                                }}
                            />
                            <StyledSwitch color="primary" id="checkedD" name="checkedD" />
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid xs={12}>
                <SecurityLogs />
            </Grid>
        </Grid>
    )
}
