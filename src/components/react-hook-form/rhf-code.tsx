import type { MuiOtpInputProps } from "mui-one-time-password-input"

import { Controller, useFormContext } from "react-hook-form"

import { MuiOtpInput } from "mui-one-time-password-input"

import FormHelperText from "@mui/material/FormHelperText"

type RHFCodesProps = {
    name: string
} & MuiOtpInputProps

export default function RHFCode({ name, ...other }: RHFCodesProps) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <MuiOtpInput
                        {...field}
                        autoFocus
                        gap={1.5}
                        length={6}
                        TextFieldsProps={{ error: !!error, placeholder: "-" }}
                        {...other}
                    />

                    {error && (
                        <FormHelperText error sx={{ px: 2 }}>
                            {error.message}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    )
}
