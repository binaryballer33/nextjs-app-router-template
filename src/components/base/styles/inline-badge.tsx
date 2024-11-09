import { Box, styled } from "@mui/material"

const InlineBadge = styled(Box)(() => ({
    "& .MuiBadge-badge": {
        position: "static",
        transform: "none",
    },
    alignItems: "center",
    display: "flex",
}))

export default InlineBadge
