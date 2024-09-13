import { alpha, Badge, Box, Link, Typography, useTheme } from "@mui/material"

import RouterLink from "src/components/base/router-link"

type LogoProps = {
    dark?: boolean
    isLinkStatic?: boolean
}

export default function Logo({ dark = false, isLinkStatic = false }: LogoProps) {
    const theme = useTheme()

    const getColor = (): string => {
        if (dark) return theme.palette.common.white
        if (theme.palette.mode === "dark") return theme.palette.common.white

        return theme.palette.common.black
    }

    const linkProps = isLinkStatic
        ? {
              href: "",
              onClick: (e: { preventDefault: () => any }) => e.preventDefault(),
          }
        : { href: "/" }

    return (
        <Box
            sx={{
                "&:hover": {
                    transform: "scale(1.05)",
                },

                alignItems: "center",
                display: "flex",
                position: "relative",
                transform: "scale(1)",
                transition: (transitionTheme) => transitionTheme.transitions.create(["transform"]),
            }}
        >
            <Link
                component={RouterLink}
                {...linkProps}
                sx={{
                    "&:hover .MuiBadge-badge": {
                        opacity: 1,
                        visibility: "initial",
                    },
                    alignItems: "center",
                    color: getColor(),
                    display: "flex",

                    justifyContent: "center",
                }}
            >
                <Badge
                    badgeContent="1.0"
                    color={dark ? "success" : "info"}
                    overlap="circular"
                    sx={{
                        ".MuiBadge-badge": {
                            fontSize: theme.typography.pxToRem(10),
                            fontWeight: 700,
                            letterSpacing: "-.45px",
                            opacity: 0,
                            p: "3px 5px 5px",
                            right: -5,
                            top: -5,
                            transform: "scale(.9)",
                            transition: (transitionTheme) =>
                                transitionTheme.transitions.create(["opacity", "visibility"]),
                            visibility: "hidden",
                        },
                    }}
                >
                    <Box
                        sx={{
                            background: `linear-gradient(198deg, ${alpha(theme.palette.primary.main, 0.32)} 18%, transparent 100%)`,
                            border: `2px solid ${theme.palette.primary.main}`,
                            borderRadius: `${theme.shape.borderRadius * 2}px`,
                            height: 32,
                            width: 32,
                        }}
                    />
                </Badge>
                <Typography
                    color={theme.palette.mode === "light" ? "black" : "gray"}
                    component="span"
                    fontWeight={700}
                    sx={{
                        fontSize: "18px",
                        lineHeight: "18px",
                        ml: "-24px",
                        mr: "34px",
                        mt: "-1px",
                    }}
                >
                    M
                </Typography>
                <Typography
                    color={theme.palette.mode === "light" ? "black" : "gray"}
                    component="span"
                    fontWeight={500}
                    sx={{
                        fontSize: "18px",
                        letterSpacing: "-.45px",
                        lineHeight: "18px",
                        ml: "-23px",
                        mt: "-1px",
                    }}
                >
                    TEC
                </Typography>
            </Link>
        </Box>
    )
}
