"use client"

import type { ReactNode } from "react"
import type { RegisterRequest } from "src/types/forms/register"

import EditIcon from "@mui/icons-material/Edit"
import KeyIcon from "@mui/icons-material/Key"
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"

import { InputAdornment } from "@mui/material"

import Field from "src/components/react-hook-form/fields"

type AuthFormInputProps = {
    inputName: keyof RegisterRequest
    label: string
    padding?: number
    showVisibilityButtons?: boolean
    startAdornment?: ReactNode
}

export default function AuthFormInput(props: AuthFormInputProps) {
    const { inputName, label, padding, showVisibilityButtons = false, startAdornment = null } = props

    const adornment = startAdornment || getStartAdornment(inputName)
    const placeholder = getPlaceholder(inputName, label)

    return (
        <Field.FilledInput
            label={label}
            name={inputName}
            padding={padding || undefined}
            placeholder={placeholder}
            showVisibilityButtons={showVisibilityButtons}
            startAdornment={adornment}
        />
    )
}

function getStartAdornment(inputName: keyof RegisterRequest) {
    switch (inputName) {
        case "email":
            return (
                <InputAdornment position="start">
                    <MailOutlineRoundedIcon fontSize="small" />
                </InputAdornment>
            )
        case "password":
        case "confirmPassword":
            return (
                <InputAdornment position="start">
                    <KeyIcon fontSize="small" />
                </InputAdornment>
            )
        default:
            return (
                <InputAdornment position="start">
                    <EditIcon fontSize="small" />
                </InputAdornment>
            )
    }
}

function getPlaceholder(inputName: keyof RegisterRequest, label: string) {
    if (label === "Confirm New Password") return "Write Your New Password Again"
    if (label === "Confirm Password" || inputName === "confirmPassword") return "Write Your Password Again"
    return `Write Your ${label}`
}
