"use client"

import { Avatar, IconButton, Stack, useTheme } from "@mui/material"

import usePopover from "src/hooks/use-popover"

import ProfileIconDropdown from "./profile-icon-dropdown-content"

// TODO: make icon button hoverable so that you don't have to click it to see the dropdown
export default function Profile() {
    const popover = usePopover<HTMLButtonElement>()
    const theme = useTheme()

    return (
        <Stack
            alignItems="center"
            direction={{ sm: "row", xs: "column" }}
            justifyContent="space-around"
            spacing={{ sm: 3, xs: 2 }}
        >
            <IconButton
                aria-controls={popover.open ? "profile-menu" : undefined}
                aria-expanded={popover.open ? "true" : undefined}
                aria-haspopup="true"
                color="primary"
                id="profile-button"
                onClick={popover.handleOpen}
                ref={popover.anchorRef}
                sx={{
                    "&:hover": {
                        boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
                    },
                    p: 0,
                }}
            >
                <Avatar
                    alt="Shaquille Mandy"
                    src=""
                    sx={{
                        borderRadius: "inherit",
                        height: 36,
                        width: 36,
                    }}
                />
            </IconButton>
            <ProfileIconDropdown
                anchorEl={popover.anchorRef.current}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                onClose={popover.handleClose}
                open={popover.open}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
            />
        </Stack>
    )
}
