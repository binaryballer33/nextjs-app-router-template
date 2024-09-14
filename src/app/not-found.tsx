"use client"

import { useTranslation } from "react-i18next"

import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone"
import WestRoundedIcon from "@mui/icons-material/WestRounded"

import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material"

import RouterLink from "src/components/base/router-link"
import { AvatarState } from "src/components/base/styles/avatar"

import routes from "src/routes/routes"

function Page() {
    const { t } = useTranslation()

    return (
        <Container maxWidth="sm">
            <Stack
                alignItems="center"
                direction="column"
                height="100dvh"
                justifyContent="center"
                spacing={2}
                textAlign="center"
            >
                <AvatarState
                    isSoft
                    state="warning"
                    sx={{
                        height: 84,
                        width: 84,
                    }}
                >
                    <WarningTwoToneIcon fontSize="large" />
                </AvatarState>
                <Stack spacing={{ sm: 3, xs: 2 }} width="100%">
                    <Box>
                        <Typography
                            color="text.primary"
                            fontWeight={700}
                            gutterBottom
                            sx={{
                                px: { md: 3, sm: 2, xs: 0 },
                            }}
                            variant="h2"
                        >
                            {t("Page not found")}
                        </Typography>
                        <Typography color="text.secondary" fontWeight={500} variant="h4">
                            {t("We moved the content to a different page")}
                        </Typography>
                    </Box>
                    <Divider>
                        <Divider
                            sx={{
                                borderColor: "primary.main",
                                borderRadius: 22,
                                borderWidth: 4,
                                width: 60,
                            }}
                        />
                    </Divider>
                    <Box>
                        <Button
                            color="secondary"
                            component={RouterLink}
                            href={routes.index}
                            startIcon={<WestRoundedIcon />}
                            variant="outlined"
                        >
                            {t("Go to homepage")}
                        </Button>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Page
