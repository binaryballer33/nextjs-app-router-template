import { useFormContext } from "react-hook-form"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


type Props = {
    className?: string
    name: string
    type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function RHFInput({ className, name, type = "text", ...other }: Props) {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            {...field}
                            autoComplete="off"
                            className={className}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
