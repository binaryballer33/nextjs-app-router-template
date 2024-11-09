import type { FormHelperTextProps } from "@mui/material/FormHelperText"
import type { FormLabelProps } from "@mui/material/FormLabel"
import type { RadioProps } from "@mui/material/Radio"
import type { RadioGroupProps } from "@mui/material/RadioGroup"
import type { SxProps, Theme } from "@mui/material/styles"
import type { ReactNode } from "react"

import { Controller, useFormContext } from "react-hook-form"

import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormHelperText from "@mui/material/FormHelperText"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"

type Props = {
    helperText?: ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
    slotProps?: {
        formHelperText: FormHelperTextProps
        formLabel: FormLabelProps
        radio: RadioProps
        wrap?: SxProps<Theme>
    }
} & RadioGroupProps

export default function RHFRadioGroup({ helperText, label, name, options, slotProps, ...other }: Props) {
    const { control } = useFormContext()

    const labelledby = `${name}-radio-buttons-group-label`
    const ariaLabel = (val: string) => `Radio ${val}`

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset" sx={slotProps?.wrap}>
                    {label && (
                        <FormLabel
                            component="legend"
                            id={labelledby}
                            {...slotProps?.formLabel}
                            sx={{ mb: 1, typography: "body2", ...slotProps?.formLabel.sx }}
                        >
                            {label}
                        </FormLabel>
                    )}

                    <RadioGroup {...field} aria-labelledby={labelledby} {...other}>
                        {options.map((option) => (
                            <FormControlLabel
                                control={
                                    <Radio
                                        {...slotProps?.radio}
                                        inputProps={{
                                            ...(!option.label && { "aria-label": ariaLabel(option.label) }),
                                            ...slotProps?.radio?.inputProps,
                                        }}
                                    />
                                }
                                key={option.value}
                                label={option.label}
                                value={option.value}
                            />
                        ))}
                    </RadioGroup>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} sx={{ mx: 0 }} {...slotProps?.formHelperText}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    )
}
