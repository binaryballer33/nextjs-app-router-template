"use client"

import { useFormContext } from "react-hook-form"

import { LoadingButton } from "@mui/lab"

type FormSubmitButtonProps = {
    color?: "error" | "info" | "inherit" | "primary" | "secondary" | "success" | "warning"
    loadingTitle: string
    size?: "large" | "medium" | "small"
    title: string
    type?: "button" | "reset" | "submit"
    variant?: "contained" | "outlined" | "text"
}

function FormSubmitButton(props: FormSubmitButtonProps) {
    const { color, loadingTitle, size, title, type, variant } = props

    const {
        formState: { isSubmitting },
    } = useFormContext()

    return (
        <LoadingButton
            color={color || "primary"}
            fullWidth
            loading={isSubmitting}
            loadingIndicator={loadingTitle}
            size={size || "large"}
            sx={{ my: 1 }}
            type={type || "submit"}
            variant={variant || "contained"}
        >
            {isSubmitting ? loadingTitle : title}
        </LoadingButton>
    )
}

export default FormSubmitButton
