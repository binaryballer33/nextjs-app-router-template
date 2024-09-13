import type { Dispatch, MouseEvent, SetStateAction } from "react"

import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone"
import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone"

import { ToggleButton, ToggleButtonGroup } from "@mui/material"

type ToggleViewIconsProps = {
    setToggleView: Dispatch<SetStateAction<null | string>>
    toggleView: null | string
}

function ToggleViewIcons(props: ToggleViewIconsProps) {
    const { setToggleView, toggleView } = props

    const handleViewOrientation = (_event: MouseEvent<HTMLElement>, newValue: null | string) => {
        setToggleView(newValue)
    }

    return (
        <ToggleButtonGroup
            color="primary"
            exclusive
            onChange={handleViewOrientation}
            size="large"
            sx={{ ml: 1 }}
            value={toggleView}
        >
            <ToggleButton value="table_view">
                <TableRowsTwoToneIcon />
            </ToggleButton>
            <ToggleButton value="grid_view">
                <GridViewTwoToneIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default ToggleViewIcons
