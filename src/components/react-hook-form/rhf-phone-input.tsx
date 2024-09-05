import { Controller, useFormContext } from "react-hook-form"

import PhoneInput from "src/components/react-hook-form/phone-input/phone-input"
import type { PhoneInputProps } from "src/components/react-hook-form/phone-input/types"

type Props = Omit<PhoneInputProps, "value" | "onChange"> & {
    name: string
}

export default function RHFPhoneInput({ name, helperText, ...other }: Props) {
    const { control, setValue } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <PhoneInput
                    {...field}
                    fullWidth
                    value={field.value}
                    onChange={(newValue) => setValue(name, newValue, { shouldValidate: true })}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                />
            )}
        />
    )
}
