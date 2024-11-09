import type { FormControlLabelProps } from "@mui/material/FormControlLabel"
import type { FormGroupProps } from "@mui/material/FormGroup"
import type { FormHelperTextProps } from "@mui/material/FormHelperText"
import type { FormLabelProps } from "@mui/material/FormLabel"
import type { SxProps, Theme } from "@mui/material/styles"
import type { SwitchProps } from "@mui/material/Switch"
import type { ReactNode } from "react"

import { Controller, useFormContext } from "react-hook-form"

import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormHelperText from "@mui/material/FormHelperText"
import FormLabel from "@mui/material/FormLabel"
import Switch from "@mui/material/Switch"

export type RHFSwitchProps = {
    helperText?: ReactNode
    name: string
    slotProps?: {
        formHelperText?: FormHelperTextProps
        switch: SwitchProps
        wrap?: SxProps<Theme>
    }
} & Omit<FormControlLabelProps, "control">

export default function RHFSwitch({ helperText, label, name, slotProps, ...other }: RHFSwitchProps) {
    const { control } = useFormContext()

    const ariaLabel = `Switch ${name}`

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Box sx={slotProps?.wrap}>
                    <FormControlLabel
                        control={
                            <Switch
                                {...field}
                                checked={field.value}
                                {...slotProps?.switch}
                                inputProps={{
                                    ...(!label && { "aria-label": ariaLabel }),
                                    ...slotProps?.switch?.inputProps,
                                }}
                            />
                        }
                        label={label}
                        {...other}
                    />

                    {(!!error || helperText) && (
                        <FormHelperText
                            error={!!error}
                            {...slotProps?.formHelperText}
                            sx={slotProps?.formHelperText?.sx}
                        >
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    )
}

// ----------------------------------------------------------------------

type RHFMultiSwitchProps = {
    helperText?: React.ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
    slotProps?: {
        formHelperText?: FormHelperTextProps
        formLabel?: FormLabelProps
        switch: SwitchProps
        wrap?: SxProps<Theme>
    }
} & FormGroupProps

export function RHFMultiSwitch({ helperText, label, name, options, slotProps, ...other }: RHFMultiSwitchProps) {
    const { control } = useFormContext()

    const getSelected = (selectedItems: string[], item: string) =>
        selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item]

    const accessibility = (val: string) => val
    const ariaLabel = (val: string) => `Switch ${val}`

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset" sx={slotProps?.wrap}>
                    {label && (
                        <FormLabel
                            component="legend"
                            {...slotProps?.formLabel}
                            sx={{ mb: 1, typography: "body2", ...slotProps?.formLabel?.sx }}
                        >
                            {label}
                        </FormLabel>
                    )}

                    <FormGroup {...other}>
                        {options.map((option) => (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={field.value.includes(option.value)}
                                        name={accessibility(option.label)}
                                        onChange={() => field.onChange(getSelected(field.value, option.value))}
                                        {...slotProps?.switch}
                                        inputProps={{
                                            ...(!option.label && { "aria-label": ariaLabel(option.label) }),
                                            ...slotProps?.switch?.inputProps,
                                        }}
                                    />
                                }
                                key={option.value}
                                label={option.label}
                            />
                        ))}
                    </FormGroup>

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
