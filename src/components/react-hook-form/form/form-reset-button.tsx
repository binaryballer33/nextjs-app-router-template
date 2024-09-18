"use client"

import { useFormContext } from "react-hook-form"

import { Button } from "@mui/material"

type ClearFormProps = {
    title: string
}

export default function ClearFormButton(props: ClearFormProps) {
    const { title } = props

    const {
        formState: { isSubmitting },
        reset,
    } = useFormContext()

    return (
        <Button
            disabled={isSubmitting}
            onClick={() => reset()}
            size="small"
            sx={{ mt: 1, px: 2, textWrap: "nowrap" }}
            variant="outlined"
        >
            {title}
        </Button>
    )
}
