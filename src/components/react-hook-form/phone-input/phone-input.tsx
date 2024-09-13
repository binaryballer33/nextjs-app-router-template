import type { TextFieldProps } from "@mui/material/TextField"
import type { Country, Value } from "react-phone-number-input/input"

import { forwardRef, useCallback, useState } from "react"

import PhoneNumberInput from "react-phone-number-input/input"

import CloseIcon from "@mui/icons-material/Close"

import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import { inputBaseClasses } from "@mui/material/InputBase"
import TextField from "@mui/material/TextField"

import type { PhoneInputProps } from "./types"

import CountryListPopover from "./list"
import { getCountryCode } from "./utils"

const PhoneInput = forwardRef<HTMLDivElement, PhoneInputProps>(
    (
        {
            country: inputCountryCode,
            disableSelect,
            label,
            onChange,
            placeholder,
            size,
            sx,
            value,
            variant = "outlined",
            ...other
        },
        ref,
    ) => {
        const defaultCountryCode = getCountryCode(value, inputCountryCode)

        const [searchCountry, setSearchCountry] = useState("")

        const [selectedCountry, setSelectedCountry] = useState(defaultCountryCode)

        const hasLabel = !!label

        const cleanValue = value.replace(/[\s-]+/g, "")

        const handleClear = useCallback(() => {
            onChange("" as Value)
        }, [onChange])

        return (
            <Box
                sx={{
                    "--popover-button-height": "22px",
                    "--popover-button-mr": "12px",
                    "--popover-button-width": variant === "standard" ? "48px" : "60px",
                    [`& .${inputBaseClasses.input}`]: {
                        pl: "calc(var(--popover-button-width) + var(--popover-button-mr))",
                    },
                    position: "relative",
                    ...sx,
                }}
            >
                {!disableSelect && (
                    <CountryListPopover
                        countryCode={selectedCountry}
                        onClickCountry={(inputValue: Country) => setSelectedCountry(inputValue)}
                        onSearchCountry={(inputValue: string) => setSearchCountry(inputValue)}
                        searchCountry={searchCountry}
                        sx={{
                            pl: variant === "standard" ? 0 : 1.5,
                            ...(variant === "standard" &&
                                hasLabel && {
                                    mt: size === "small" ? "16px" : "20px",
                                }),
                            ...((variant === "filled" || variant === "outlined") && {
                                mt: size === "small" ? "8px" : "16px",
                            }),
                            ...(variant === "filled" &&
                                hasLabel && {
                                    mt: size === "small" ? "21px" : "25px",
                                }),
                        }}
                    />
                )}

                <PhoneNumberInput
                    country={selectedCountry}
                    hiddenLabel={!label}
                    inputComponent={CustomInput}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        endAdornment: cleanValue && (
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={handleClear} size="small">
                                    {/* <Iconify width={16} icon="mingcute:close-line" /> */}
                                    <CloseIcon sx={{ width: 16 }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label={label}
                    onChange={onChange}
                    placeholder={placeholder ?? "Enter phone number"}
                    ref={ref}
                    size={size}
                    value={cleanValue}
                    variant={variant}
                    {...other}
                />
            </Box>
        )
    },
)

export default PhoneInput

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>(({ ...props }, ref) => (
    <TextField inputRef={ref} {...props} />
))
