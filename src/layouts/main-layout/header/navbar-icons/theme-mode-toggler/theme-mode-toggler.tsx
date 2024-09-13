import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone"
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone"

import { alpha, Button, Tooltip, useTheme } from "@mui/material"

import { toggleTheme } from "src/slices/theme"
import { useDispatch } from "src/store"

function ThemeModeToggler() {
    const theme = useTheme()
    const dispatch = useDispatch()
    const handleThemeToggle = () => dispatch(toggleTheme())

    return (
        <Tooltip arrow title="Toggle Dark/Light Mode">
            <Button
                aria-label="Dark/Light Mode Toggler"
                onClick={handleThemeToggle}
                sx={{
                    borderColor: alpha(theme.palette.divider, 0.2),
                    borderRadius: 2,
                    minWidth: "auto",
                    padding: 0.5,
                }}
                variant="outlined"
            >
                {theme.palette.mode === "light" ? <LightModeTwoToneIcon /> : <DarkModeTwoToneIcon />}
            </Button>
        </Tooltip>
    )
}

export default ThemeModeToggler
