"use client"

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"

import mockBenefits from "src/mocks/card-benefits"

export default function CardsBenefits() {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Grid container spacing={4}>
            {mockBenefits.map((item, i) => (
                <Grid item xs={12} sm={6} md={4} key={item.title}>
                    <Box
                        component={Card}
                        padding={4}
                        width={1}
                        height={1}
                        data-aos="fade-up"
                        data-aos-delay={i * 100}
                        data-aos-offset={100}
                        data-aos-duration={600}
                        sx={{ ":hover": { color: "primary.main" } }}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            sx={{
                                transition: "opacity, transform ease 0.3s !important",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <Box
                                component={Avatar}
                                width={50}
                                height={50}
                                marginBottom={2}
                                bgcolor={theme.palette.primary.main}
                                color={theme.palette.background.paper}
                                sx={{ ":hover": { color: "secondary.dark" } }}
                            >
                                {item.icon}
                            </Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
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
