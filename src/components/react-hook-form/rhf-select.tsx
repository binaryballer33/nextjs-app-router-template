import type { CheckboxProps } from "@mui/material/Checkbox"
import type { ChipProps } from "@mui/material/Chip"
import type { FormControlProps } from "@mui/material/FormControl"
import type { FormHelperTextProps } from "@mui/material/FormHelperText"
import type { InputLabelProps } from "@mui/material/InputLabel"
import type { SelectProps } from "@mui/material/Select"
import type { SxProps, Theme } from "@mui/material/styles"
import type { TextFieldProps } from "@mui/material/TextField"
import type { ReactNode } from "react"

import { Controller, useFormContext } from "react-hook-form"

import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"

type RHFSelectProps = {
    children: ReactNode
    name: string
    native?: boolean
    slotProps?: {
        paper?: SxProps<Theme>
    }
} & TextFieldProps

export default function RHFSelect({
    children,
    helperText,
    InputLabelProps,
    inputProps,
    name,
    native,
    slotProps,
    ...other
}: RHFSelectProps) {
    const { control } = useFormContext()

    const labelId = `${name}-select-label`

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    error={!!error}
                    fullWidth
                    helperText={error ? error?.message : helperText}
                    InputLabelProps={{ htmlFor: labelId, ...InputLabelProps }}
                    inputProps={{ id: labelId, ...inputProps }}
                    select
                    SelectProps={{
                        MenuProps: { PaperProps: { sx: { maxHeight: 220, ...slotProps?.paper } } },
                        native,
                        sx: { textTransform: "capitalize" },
                    }}
                    {...other}
                >
                    {children}
                </TextField>
            )}
        />
    )
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = {
    checkbox?: boolean
    chip?: boolean
    helperText?: ReactNode
    label?: string
    name: string
    options: {
        label: string
        value: string
    }[]
    placeholder?: string
    slotProps?: {
        checkbox?: CheckboxProps
        chip?: ChipProps
        formHelperText?: FormHelperTextProps
        inputLabel?: InputLabelProps
        select: SelectProps
    }
} & FormControlProps

export function RHFMultiSelect({
    checkbox,
    chip,
    helperText,
    label,
    name,
    options,
    placeholder,
    slotProps,
    ...other
}: RHFMultiSelectProps) {
    const { control } = useFormContext()

    const labelId = `${name}-select-label`

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error} {...other}>
                    {label && (
                        <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
                            {label}
                        </InputLabel>
                    )}

                    <Select
                        {...field}
                        displayEmpty={!!placeholder}
                        label={label}
                        multiple
                        renderValue={(selected) => {
                            const selectedItems = options.filter((item) => (selected as string[]).includes(item.value))

                            if (!selectedItems.length && placeholder) {
                                return <Box sx={{ color: "text.disabled" }}>{placeholder}</Box>
                            }

                            if (chip) {
                                return (
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        {selectedItems.map((item) => (
                                            <Chip
                                                key={item.value}
                                                label={item.label}
                                                size="small"
                                                // @ts-ignore
                                                variant="soft"
                                                {...slotProps?.chip}
                                            />
                                        ))}
                                    </Box>
                                )
                            }

                            return selectedItems.map((item) => item.label).join(", ")
                        }}
                        {...slotProps?.select}
                        inputProps={{ id: labelId, ...slotProps?.select?.inputProps }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {checkbox && (
                                    <Checkbox
                                        checked={field.value.includes(option.value)}
                                        disableRipple
                                        size="small"
                                        {...slotProps?.checkbox}
                                    />
                                )}

                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} {...slotProps?.formHelperText}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    )
}
