import type { ReactNode } from "react"

import Box from "@mui/material/Box"
import type { FormHelperTextProps } from "@mui/material/FormHelperText"
import FormHelperText from "@mui/material/FormHelperText"
import type { RatingProps } from "@mui/material/Rating"
import Rating from "@mui/material/Rating"
import type { SxProps, Theme } from "@mui/material/styles"
import { Controller, useFormContext } from "react-hook-form"

type Props = RatingProps & {
    name: string
    helperText?: ReactNode
    slotProps?: {
        wrap?: SxProps<Theme>
        formHelperText?: FormHelperTextProps
    }
}

export default function RHFRating({ name, helperText, slotProps, ...other }: Props) {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
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
