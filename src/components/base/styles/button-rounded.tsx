import { Button, styled } from "@mui/material"

const ButtonRounded = styled(Button)(() => ({
    "& .MuiBadge-badge": {
        position: "static",
        transform: "none",
    },
    alignItems: "center",
    display: "flex",
}))

export default ButtonRounded
