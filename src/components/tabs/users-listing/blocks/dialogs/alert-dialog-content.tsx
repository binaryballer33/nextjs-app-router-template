import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone"

import { Box, Stack, Typography } from "@mui/material"

import { AvatarState } from "src/components/base/styles/avatar"

function AlertDialogContent() {
    return (
        <Stack
            alignItems={{ sm: "flex-start", xs: "center" }}
            direction={{ sm: "row", xs: "column" }}
            justifyContent="center"
            p={{ sm: 2, xs: 0 }}
            spacing={2}
        >
            <AvatarState
                isSoft
                state="error"
                sx={{
                    height: 54,
                    width: 54,
                }}
            >
                <WarningTwoToneIcon sx={{ fontSize: 24 }} />
            </AvatarState>
            <Box pt={{ sm: 0.5, xs: 0 }} textAlign={{ sm: "left", xs: "center" }}>
                <Typography gutterBottom variant="h3">
                    You are about to permanently delete selected items
                </Typography>
                <Typography fontWeight={500} sx={{ pb: 2 }} variant="h5">
                    Deleting these items will also remove all associated data.
                </Typography>
                <Typography color="text.secondary" fontWeight={400} variant="subtitle1">
                    Please ensure you have backed up any necessary information before proceeding.
                </Typography>
            </Box>
        </Stack>
    )
}

export default AlertDialogContent
