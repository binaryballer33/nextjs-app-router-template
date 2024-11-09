import type { FormHelperTextProps } from "@mui/material/FormHelperText"
import type { RatingProps } from "@mui/material/Rating"
import type { SxProps, Theme } from "@mui/material/styles"
import type { ReactNode } from "react"

import { Controller, useFormContext } from "react-hook-form"

import Box from "@mui/material/Box"
import FormHelperText from "@mui/material/FormHelperText"
import Rating from "@mui/material/Rating"

type Props = {
    helperText?: ReactNode
    name: string
    slotProps?: {
        formHelperText?: FormHelperTextProps
        wrap?: SxProps<Theme>
    }
} & RatingProps

export default function RHFRating({ helperText, name, slotProps, ...other }: Props) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Box sx={slotProps?.wrap}>
                    <Rating
                        {...field}
                        onChange={(_event, newValue) => {
                            field.onChange(Number(newValue))
                        }}
                        {...other}
                    />

                    {(error?.message || helperText) && (
                        <FormHelperText error={!!error} {...slotProps?.formHelperText}>
                            {error?.message ?? helperText}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    )
}
