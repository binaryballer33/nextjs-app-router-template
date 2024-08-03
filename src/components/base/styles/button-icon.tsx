import { Button, styled } from "@mui/material"

const ButtonIcon = styled(Button)(({ theme }) => ({
    minWidth: 0,
    padding: theme.spacing(1),

    ".MuiButton-startIcon": {
        margin: 0,
    },

    "&.MuiButton-sizeSmall": {
        padding: theme.spacing(0.638),
    },
}))

export default ButtonIcon
