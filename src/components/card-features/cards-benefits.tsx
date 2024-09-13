"use client"

import { useTranslation } from "react-i18next"

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

import mockBenefits from "src/mocks/card-benefits"

export default function CardsBenefits() {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Grid container spacing={4}>
            {mockBenefits.map((item, i) => (
                <Grid item key={item.title} md={4} sm={6} xs={12}>
                    <Box
                        component={Card}
                        data-aos="fade-up"
                        data-aos-delay={i * 100}
                        data-aos-duration={600}
                        data-aos-offset={100}
                        height={1}
                        padding={4}
                        sx={{ ":hover": { color: "primary.main" } }}
                        width={1}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            sx={{
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                                transition: "opacity, transform ease 0.3s !important",
                            }}
                        >
                            <Box
                                bgcolor={theme.palette.primary.main}
                                color={theme.palette.background.paper}
                                component={Avatar}
                                height={50}
                                marginBottom={2}
                                sx={{ ":hover": { color: "secondary.dark" } }}
                                width={50}
                            >
                                {item.icon}
                            </Box>
                            <Typography gutterBottom sx={{ fontWeight: 500 }} variant="h6">
                                {t(item.title)}
                            </Typography>
                            <Typography color="text.secondary">{t(item.subtitle)}</Typography>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}
