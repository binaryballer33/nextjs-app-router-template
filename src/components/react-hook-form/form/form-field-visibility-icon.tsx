import type { RegisterRequest } from "src/types/forms/register"

import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Tooltip } from "@mui/material"

import ButtonIcon from "src/components/base/styles/button-icon"

type FormFieldVisibilityIconProps = {
    iconFontSize?: number
    inputName: keyof RegisterRequest | string
    isFieldVisible: boolean
    isFieldVisibleToggle: () => void
}

export default function FormFieldVisibilityIcon(props: FormFieldVisibilityIconProps) {
    const { iconFontSize, inputName, isFieldVisible, isFieldVisibleToggle } = props

    return (
        <ButtonIcon color="secondary" onClick={isFieldVisibleToggle} variant="outlined">
            {isFieldVisible ? (
                <Tooltip title={`hide ${inputName}`}>
                    <VisibilityOff sx={{ fontSize: iconFontSize || 14 }} />
                </Tooltip>
            ) : (
                <Tooltip title={`show ${inputName}`}>
                    <Visibility sx={{ fontSize: iconFontSize || 14 }} />
                </Tooltip>
            )}
        </ButtonIcon>
    )
}
