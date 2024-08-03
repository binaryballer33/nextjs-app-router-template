import { Dispatch, MouseEvent, SetStateAction } from "react"

import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone"
import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"

type ToggleViewIconsProps = {
    toggleView: string | null
    setToggleView: Dispatch<SetStateAction<string | null>>
}

function ToggleViewIcons(props: ToggleViewIconsProps) {
    const { toggleView, setToggleView } = props

    const handleViewOrientation = (_event: MouseEvent<HTMLElement>, newValue: string | null) => {
        setToggleView(newValue)
    }

    return (
        <ToggleButtonGroup
            sx={{ ml: 1 }}
            size="large"
            color="primary"
            value={toggleView}
            exclusive
            onChange={handleViewOrientation}
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
