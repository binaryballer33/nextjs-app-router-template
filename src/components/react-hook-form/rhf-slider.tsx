import type { SliderProps } from "@mui/material/Slider"
import type { ReactNode } from "react"

import { Controller, useFormContext } from "react-hook-form"

import FormHelperText from "@mui/material/FormHelperText"
import Slider from "@mui/material/Slider"

type Props = {
    helperText?: ReactNode
    name: string
} & SliderProps

export default function RHFSlider({ helperText, name, ...other }: Props) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Slider {...field} valueLabelDisplay="auto" {...other} />

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
                    )}
                </>
            )}
        />
    )
}
