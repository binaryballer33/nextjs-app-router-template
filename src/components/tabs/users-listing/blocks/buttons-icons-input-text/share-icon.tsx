import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded"
import { Tooltip } from "@mui/material"

import ButtonIcon from "src/components/base/styles/button-icon"

type ShareIconProps = {
    t: (token: string) => string
}

export default function ShareIcon(props: ShareIconProps) {
    const { t } = props

    return (
        <Tooltip arrow placement="top" title={t("Export records list")}>
            <ButtonIcon
                variant="outlined"
                color="secondary"
                sx={{ color: "primary.main" }}
                size="small"
                startIcon={<IosShareRoundedIcon fontSize="small" />}
            />
        </Tooltip>
    )
}
