import { alpha, MenuItem, styled } from "@mui/material"

const menuItemStyles =
    (color) =>
    ({ theme }) => ({
        ".MuiListItemAvatar-root": {
            display: "flex",
        },
        "& > div > .MuiSvgIcon-root": {
            color: theme.palette.mode === "dark" ? theme.palette.neutral[600] : theme.palette.neutral[500],
        },
        "&:hover, &.MuiMenuItem-root.Mui-selected": {
            "& > div > .MuiSvgIcon-root": {
                color: theme.palette[color].main,
            },
            backgroundColor: alpha(theme.palette[color].main, 0.08),
            borderColor: alpha(theme.palette[color].main, 0.3),

            color: theme.palette[color].main,
        },
        "&:last-child": {
            marginBottom: 0,
        },
        "&.MuiButtonBase-root": {
            padding: theme.spacing(1, 1, 1, 1.5),
        },

        alignItems: "center",

        backgroundColor: theme.palette.mode === "dark" ? theme.palette.neutral[900] : theme.palette.neutral[50],
        border: `${theme.palette.divider} solid 1px`,
        borderRadius: theme.shape.borderRadius,
        cursor: "pointer",

        display: "flex",

        justifyContent: "space-between",
        margin: theme.spacing(0, 0, 1),
    })

export const MenuItemPrimary = styled(MenuItem)(menuItemStyles("primary"))
export const MenuItemSecondary = styled(MenuItem)(menuItemStyles("secondary"))
export const MenuItemError = styled(MenuItem)(menuItemStyles("error"))
export const MenuItemSuccess = styled(MenuItem)(menuItemStyles("success"))
export const MenuItemWarning = styled(MenuItem)(menuItemStyles("warning"))
export const MenuItemInfo = styled(MenuItem)(menuItemStyles("info"))

export const MenuItemPrimaryAccent = styled(MenuItem)(({ theme }) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
        ".MuiTypography-root": {
            color: "inherit",
        },
        "&.Mui-focusVisible": {
            backgroundColor: theme.palette.primary.dark,
        },

        background: theme.palette.primary.main,

        color: theme.palette.primary.contrastText,
    },
    margin: theme.spacing(0, 0, 0.5),
}))
