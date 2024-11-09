import { Stack } from "@mui/material"

import LanguageDropdown from "./language-icon-dropdown"

export default function LanguageIcon() {
    return (
        <Stack
            alignItems="center"
            direction={{ sm: "row", xs: "column" }}
            justifyContent="space-around"
            spacing={{ md: 3, sm: 0, xs: 3 }}
        >
            <LanguageDropdown />
        </Stack>
    )
}
