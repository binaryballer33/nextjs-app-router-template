import { Box, styled } from "@mui/material"

const InlineBadge = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  "& .MuiBadge-badge": {
    position: "static",
    transform: "none",
  },
}))

export default InlineBadge
