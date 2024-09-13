import type { TextFieldProps } from "@mui/material/TextField"
import type { DatePickerProps } from "@mui/x-date-pickers/DatePicker"
import type { MobileDateTimePickerProps } from "@mui/x-date-pickers/MobileDateTimePicker"
import type { Dayjs } from "dayjs"

import { Controller, useFormContext } from "react-hook-form"

import dayjs from "dayjs"

import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker"

import { formatStr } from "src/utils/helper-functions/format-time"

type RHFDatePickerProps = {
    name: string
} & DatePickerProps<Dayjs>

// TODO: get rid of type errors
export default function RHFDatePicker({ name, slotProps, ...other }: RHFDatePickerProps) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    {...field}
                    format={formatStr.split.date}
                    onChange={(newValue) => field.onChange(dayjs(newValue).format())}
                    slotProps={{
                        ...slotProps,
                        textField: {
                            error: !!error,
                            fullWidth: true,
                            helperText: error?.message ?? (slotProps?.textField as TextFieldProps)?.helperText,
                            ...slotProps?.textField,
                        },
                    }}
                    value={dayjs(field.value)}
                    {...other}
                />
            )}
        />
    )
}

type RHFMobileDateTimePickerProps = {
    name: string
} & MobileDateTimePickerProps<Dayjs>

export function RHFMobileDateTimePicker({ name, slotProps, ...other }: RHFMobileDateTimePickerProps) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <MobileDateTimePicker
                    {...field}
                    format={formatStr.split.dateTime}
                    onChange={(newValue) => field.onChange(dayjs(newValue).format())}
                    slotProps={{
                        textField: {
                            error: !!error,
                            fullWidth: true,
                            helperText: error?.message ?? (slotProps?.textField as TextFieldProps)?.helperText,
                            ...slotProps?.textField,
                        },
                        ...slotProps,
                    }}
                    value={dayjs(field.value)}
                    {...other}
                />
            )}
        />
    )
}
