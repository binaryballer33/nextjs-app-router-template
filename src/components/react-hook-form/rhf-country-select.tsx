import type { CountrySelectProps } from "src/components/country-select/country-select"

import { Controller, useFormContext } from "react-hook-form"

import { CountrySelect } from "src/components/country-select/country-select"

export default function RHFCountrySelect({
    helperText,
    name,
    ...other
}: {
    name: string
} & CountrySelectProps) {
    const { control, setValue } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <CountrySelect
                    error={!!error}
                    helperText={error?.message ?? helperText}
                    id={`rhf-country-select-${name}`}
                    onChange={(_event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                    value={field.value}
                    {...other}
                />
            )}
        />
    )
}
