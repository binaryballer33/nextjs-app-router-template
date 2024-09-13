import type { PhoneInputProps } from "src/components/react-hook-form/phone-input/types"

import { Controller, useFormContext } from "react-hook-form"

import PhoneInput from "src/components/react-hook-form/phone-input/phone-input"

type Props = {
    name: string
} & Omit<PhoneInputProps, "onChange" | "value">

export default function RHFPhoneInput({ helperText, name, ...other }: Props) {
    const { control, setValue } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <PhoneInput
                    {...field}
                    error={!!error}
                    fullWidth
                    helperText={error ? error?.message : helperText}
                    onChange={(newValue) => setValue(name, newValue, { shouldValidate: true })}
                    value={field.value}
                    {...other}
                />
            )}
        />
    )
}
