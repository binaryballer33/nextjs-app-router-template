import type { AutocompleteProps } from "@mui/material/Autocomplete"
import type { TextFieldProps } from "@mui/material/TextField"
import type { ReactNode } from "react"

import { Controller, useFormContext } from "react-hook-form"

import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

export type AutocompleteBaseProps = Omit<AutocompleteProps<any, boolean, boolean, boolean>, "renderInput">

export type RHFAutocompleteProps = {
    helperText?: ReactNode
    label?: string
    name: string
    placeholder?: string
    variant?: TextFieldProps["variant"]
} & AutocompleteBaseProps

export default function RHFAutocomplete({
    helperText,
    label,
    name,
    placeholder,
    variant,
    ...other
}: RHFAutocompleteProps) {
    const { control, setValue } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    id={`rhf-autocomplete-${name}`}
                    onChange={(_event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!error}
                            helperText={error ? error?.message : helperText}
                            inputProps={{ ...params.inputProps, autoComplete: "new-password" }}
                            label={label}
                            placeholder={placeholder}
                            variant={variant}
                        />
                    )}
                    {...other}
                />
            )}
        />
    )
}
