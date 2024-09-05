import type { ReactNode } from "react"

import type { AutocompleteProps } from "@mui/material/Autocomplete"
import Autocomplete from "@mui/material/Autocomplete"
import type { TextFieldProps } from "@mui/material/TextField"
import TextField from "@mui/material/TextField"
import { Controller, useFormContext } from "react-hook-form"

export type AutocompleteBaseProps = Omit<AutocompleteProps<any, boolean, boolean, boolean>, "renderInput">

export type RHFAutocompleteProps = AutocompleteBaseProps & {
    name: string
    label?: string
    placeholder?: string
    helperText?: ReactNode
    variant?: TextFieldProps["variant"]
}

export default function RHFAutocomplete({
    name,
    label,
    variant,
    helperText,
    placeholder,
    ...other
}: RHFAutocompleteProps) {
    const { control, setValue } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    id={`rhf-autocomplete-${name}`}
                    onChange={(_event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            variant={variant}
                            error={!!error}
                            helperText={error ? error?.message : helperText}
                            inputProps={{ ...params.inputProps, autoComplete: "new-password" }}
                        />
                    )}
                    {...other}
                />
            )}
        />
    )
}
