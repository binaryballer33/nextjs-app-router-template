import type { SxProps, Theme } from "@mui/material/styles"
import type { TextFieldProps } from "@mui/material/TextField"
import type { Country, Value } from "react-phone-number-input/input"

export type PhoneInputProps = {
    country?: Country
    disableSelect?: boolean
    onChange: (newValue: Value) => void
    value: string
} & Omit<TextFieldProps, "onChange" | "ref">

export type CountryListProps = {
    countryCode?: Country
    onClickCountry: (inputValue: Country) => void
    onSearchCountry: (inputValue: string) => void
    searchCountry: string
    sx?: SxProps<Theme>
}
