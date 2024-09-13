import { alpha, MenuList, styled } from "@mui/material"

type Variant = "indicator" | "pills" | "rounded" | "square"
type Color = "error" | "primary" | "secondary" | "success"

const generateBaseStyles = (theme: any, color: Color, variant: Variant) => {
    const commonStyles = {
        "&:last-child": {
            marginBottom: 0,
        },
        "&.Mui-selected, &.Mui-selected:hover, &:hover, &.MuiButtonBase-root:active": {
            background: alpha(theme.palette[color].main, 0.06),
            color: theme.palette[color].main,
        },
        color: theme.palette.mode === "dark" ? theme.palette.neutral[700] : theme.palette.neutral[600],
        marginBottom: "1px",
        minWidth: 240,
        padding: theme.spacing(1, 1, 1, 2),

        position: "relative",
    }

    switch (variant) {
        case "pills":
            return {
                ...commonStyles,
                borderRadius: "50px",
            }
        case "rounded":
            return {
                ...commonStyles,
                borderRadius: theme.shape.borderRadius,
            }
        case "square":
            return {
                ...commonStyles,
                borderRadius: 0,
            }
        case "indicator":
            return {
                ...commonStyles,
                "&::before": {
                    background: theme.palette[color].main,
                    borderBottomRightRadius: theme.shape.borderRadius,
                    borderTopRightRadius: theme.shape.borderRadius,
                    content: '" "',
                    height: 0,
                    left: 0,
                    marginTop: "-10px",
                    opacity: 0,
                    position: "absolute",
                    top: "50%",
                    transition: theme.transitions.create(["all"]),
                    width: 0,
                },
                "&.Mui-selected, &:hover, &.MuiButtonBase-root:active": {
                    "&::before": {
                        height: "100%",
                        margin: 0,
                        opacity: 1,
                        top: 0,
                        width: "4px",
                    },
                    background: alpha(theme.palette[color].main, 0.06),
                    color: theme.palette[color].main,
                },
                borderBottomLeftRadius: 0,
                borderRadius: theme.shape.borderRadius,
                borderTopLeftRadius: 0,
            }
        default:
            return {
                ...commonStyles,
                borderRadius: "50px",
            }
    }
}

export const MenuListWrapperPillsSecondary = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "secondary", "pills"),
}))

export const MenuListWrapperPillsPrimary = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "primary", "pills"),
}))

export const MenuListWrapperRoundedSecondary = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "secondary", "rounded"),
}))

export const MenuListWrapperRoundedPrimary = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "primary", "rounded"),
}))

export const MenuListWrapperSquareSecondary = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "secondary", "square"),
}))

export const MenuListWrapperSquarePrimary = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "primary", "square"),
}))

export const MenuListWrapperIndicatorPrimary = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "primary", "indicator"),
}))

export const MenuListWrapperIndicatorSecondary = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "secondary", "indicator"),
}))

export const MenuListWrapperIndicatorSuccess = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "success", "indicator"),
}))

export const MenuListWrapperIndicatorError = styled(MenuList)(({ theme }) => ({
    "& .MuiMenuItem-root": generateBaseStyles(theme, "error", "indicator"),
}))
