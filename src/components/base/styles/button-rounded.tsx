import { Button, styled } from "@mui/material"

const ButtonRounded = styled(Button)(() => ({
  display: "flex",
  alignItems: "center",
  "& .MuiBadge-badge": {
    position: "static",
    transform: "none",
  },
}))

export default ButtonRounded
