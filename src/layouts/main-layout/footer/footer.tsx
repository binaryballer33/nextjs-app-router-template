import Image from "next/image"

import { useTranslation } from "react-i18next"

import FacebookIcon from "@mui/icons-material/Facebook"
import GitHubIcon from "@mui/icons-material/GitHub"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import YouTubeIcon from "@mui/icons-material/YouTube"

import { Box, Button, Divider, Grid, IconButton, Link, TextField, Typography, useTheme } from "@mui/material"

import { neutral } from "src/theme/theme"

export default function Footer() {
    const theme = useTheme()
    const { t } = useTranslation()

    const navigation = {
        company: [
            { href: "#", name: t("About") },
            { href: "#", name: t("Blog") },
            { href: "#", name: t("Jobs") },
            { href: "#", name: t("Press") },
            { href: "#", name: t("Partners") },
        ],
        legal: [
            { href: "#", name: t("Claim") },
            { href: "#", name: t("Privacy") },
            { href: "#", name: t("Terms") },
        ],
        social: [
            { href: "#", icon: FacebookIcon, name: t("Facebook") },
            { href: "#", icon: InstagramIcon, name: t("Instagram") },
            { href: "#", icon: TwitterIcon, name: t("Twitter") },
            { href: "#", icon: GitHubIcon, name: t("GitHub") },
            { href: "#", icon: YouTubeIcon, name: t("YouTube") },
        ],
        solutions: [
            { href: "#", name: t("Marketing") },
            { href: "#", name: t("Analytics") },
            { href: "#", name: t("Commerce") },
            { href: "#", name: t("Insights") },
        ],
        support: [
            { href: "#", name: t("Pricing") },
            { href: "#", name: t("Documentation") },
            { href: "#", name: t("Guides") },
            { href: "#", name: t("API Status") },
        ],
    }

    return (
        <footer>
            <Box py={4}>
                <Box m="auto" width="95%">
                    <Divider sx={{ border: "1", mb: 6 }} />
                    <Grid alignItems="center" container justifyContent="space-between" sx={{ mb: 10, mt: 2, pt: 4 }}>
                        <Grid item md={6} xs={12}>
                            <Typography variant="subtitle1">{t("Subscribe to our newsletter")}</Typography>
                            <Typography sx={{ mt: 1 }} variant="body2">
                                {t("The latest news, articles, and resources, sent to your inbox weekly.")}
                            </Typography>
                            <Box component="form" sx={{ alignItems: "center", display: "flex", mt: 2 }}>
                                <TextField
                                    placeholder={t("Enter your email")}
                                    required
                                    sx={{
                                        ".MuiInputBase-input": {
                                            paddingTop: 1,
                                        },
                                        flexGrow: 1,
                                        mr: 1,
                                    }}
                                    type="email"
                                    variant="filled"
                                />
                                <Button sx={{ flexShrink: 0 }} type="submit" variant="contained">
                                    {t("Subscribe")}
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item md={6} sx={{ textAlign: { md: "right", xs: "center" } }} xs={12}>
                            <Box>
                                {navigation.social.map((item) => (
                                    <IconButton
                                        href={item.href}
                                        key={item.name}
                                        sx={{ "&:hover": { color: "primary.dark" }, color: "primary.main" }}
                                    >
                                        <item.icon />
                                    </IconButton>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" spacing={4}>
                        <Grid item sm={3} xs={12}>
                            <Typography mb={1} variant="h5">
                                {t("MANDYTEC LLC")}
                            </Typography>
                            <Image
                                alt={t("Company name")}
                                height={28}
                                src="/placeholders/logo/react-logo.svg"
                                width={28}
                            />
                        </Grid>
                        <Grid container item sm={9} spacing={4} xs={12}>
                            <Grid item sm={3} sx={{ paddingLeft: `${theme.spacing(7)} !important` }} xs={6}>
                                <Typography gutterBottom variant="subtitle1">
                                    {t("Solutions")}
                                </Typography>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {navigation.solutions.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                color={theme.palette.mode === "dark" ? neutral[400] : neutral[900]}
                                                href={item.href}
                                                underline="hover"
                                                variant="body2"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                            <Grid item sm={3} sx={{ paddingLeft: `${theme.spacing(7)} !important` }} xs={6}>
                                <Typography gutterBottom variant="body2">
                                    {t("Support")}
                                </Typography>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                color={theme.palette.mode === "dark" ? neutral[400] : neutral[900]}
                                                href={item.href}
                                                underline="hover"
                                                variant="body2"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                            <Grid item sm={3} sx={{ paddingLeft: `${theme.spacing(7)} !important` }} xs={6}>
                                <Typography gutterBottom variant="subtitle1">
                                    {t("Company")}
                                </Typography>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                color={theme.palette.mode === "dark" ? neutral[400] : neutral[900]}
                                                href={item.href}
                                                underline="hover"
                                                variant="body2"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                            <Grid item sm={3} sx={{ paddingLeft: `${theme.spacing(7)} !important` }} xs={6}>
                                <Typography gutterBottom variant="subtitle1">
                                    {t("Legal")}
                                </Typography>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                color={theme.palette.mode === "dark" ? neutral[400] : neutral[900]}
                                                href={item.href}
                                                underline="hover"
                                                variant="body2"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography align="center" sx={{ mt: 4 }} variant="body2">
                        &copy; {t("2023 MANDYTEC LLC, Inc. All rights reserved.")}
                    </Typography>
                </Box>
            </Box>
        </footer>
    )
}
