import type { TextFieldProps } from "@mui/material/TextField"

import { Controller, useFormContext } from "react-hook-form"

import TextField from "@mui/material/TextField"

type Props = {
    name: string
} & TextFieldProps

export default function RHFTextField({ helperText, name, type, ...other }: Props) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    error={!!error}
                    fullWidth
                    helperText={error?.message ?? helperText}
                    inputProps={{
                        autoComplete: "off",
                    }}
                    onChange={(event) => {
                        if (type === "number") {
                            field.onChange(Number(event.target.value))
                        } else {
                            field.onChange(event.target.value)
                        }
                    }}
                    type={type}
                    value={type === "number" && field.value === 0 ? "" : field.value}
                    {...other}
                />
            )}
        />
    )
}
