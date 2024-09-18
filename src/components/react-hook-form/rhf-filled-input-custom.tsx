"use client"

import type { RegisterRequest } from "src/types/forms/register"

import EditIcon from "@mui/icons-material/Edit"
import KeyIcon from "@mui/icons-material/Key"
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded"

import { InputAdornment } from "@mui/material"

import Field from "src/components/react-hook-form/fields"

type AuthFormInputProps = {
    inputName: keyof RegisterRequest
    label: string
    showVisibilityButtons?: boolean
}

export default function AuthFormInput(props: AuthFormInputProps) {
    const { inputName, label, showVisibilityButtons = false } = props

    const startAdornment = getStartAdornment(inputName)
    const placeholder = getPlaceholder(label)

    return (
        <Field.FilledInput
            label={label}
            name={inputName}
            placeholder={placeholder}
            showVisibilityButtons={showVisibilityButtons}
            startAdornment={startAdornment}
        />
    )
}

// show email icon for email, key icon for password fields and edit icon for name fields
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

function getPlaceholder(label: string) {
    if (label === "Confirm Password") return "Write Your Password Again"
    return `Write Your ${label}`
}
