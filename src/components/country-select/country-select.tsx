import type {
    AutocompleteProps,
    AutocompleteRenderGetTagProps,
    AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete"
import type { TextFieldProps } from "@mui/material/TextField"

import Autocomplete from "@mui/material/Autocomplete"
import Chip from "@mui/material/Chip"
import { filledInputClasses } from "@mui/material/FilledInput"
import InputAdornment from "@mui/material/InputAdornment"
import { outlinedInputClasses } from "@mui/material/OutlinedInput"
import TextField from "@mui/material/TextField"

import { FlagIcon } from "src/components/country-select/flag-icon"

import countries from "src/mocks/countries"

import { displayValueByCountryCode, getCountry } from "./utils"

export const iconifyClasses = {
    flag: "mnl__icon__flag",
    root: "mnl__icon__root",
}

type Value = string

export type AutocompleteBaseProps = Omit<
    AutocompleteProps<any, boolean, boolean, boolean>,
    "getOptionLabel" | "options" | "renderInput" | "renderOption" | "renderTags"
>

export type CountrySelectProps = {
    error?: boolean
    getValue?: "code" | "label"
    helperText?: React.ReactNode
    hiddenLabel?: boolean
    label?: string
    placeholder?: string
    variant?: TextFieldProps["variant"]
} & AutocompleteBaseProps

export function CountrySelect({
    error,
    getValue = "label",
    helperText,
    hiddenLabel,
    id,
    label,
    multiple,
    placeholder,
    variant,
    ...other
}: CountrySelectProps) {
    const options = countries.map((country) => (getValue === "label" ? country.label : country.code))

    const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Value) => {
        const country = getCountry(option)

        if (!country.label) {
            return null
        }

        return (
            <li {...props} key={country.label}>
                <FlagIcon
                    code={country.code}
                    key={country.label}
                    sx={{ borderRadius: "50%", height: 22, mr: 1, width: 22 }}
                />
                {country.label} ({country.code}) +{country.phone}
            </li>
        )
    }

    const renderInput = (params: AutocompleteRenderInputParams) => {
        const country = getCountry(params.inputProps.value as Value)

        const baseField = {
            ...params,
            error: !!error,
            helperText,
            hiddenLabel,
            inputProps: {
                ...params.inputProps,
                autoComplete: "new-password",
            },
            label,
            placeholder,
            variant,
        }

        if (multiple) {
            return <TextField {...baseField} />
        }

        return (
            <TextField
                {...baseField}
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <InputAdornment position="start" sx={{ ...(!country.code && { display: "none" }) }}>
                            <FlagIcon
                                code={country.code}
                                key={country.label}
                                sx={{ borderRadius: "50%", height: 22, width: 22 }}
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    [`& .${filledInputClasses.root}`]: {
                        [`& .${iconifyClasses.flag}`]: { ml: 0.5, mr: -0.5, mt: hiddenLabel ? 0 : -2 },
                    },
                    [`& .${outlinedInputClasses.root}`]: {
                        [`& .${iconifyClasses.flag}`]: { ml: 0.5, mr: -0.5 },
                    },
                }}
            />
        )
    }

    const renderTags = (selected: Value[], getTagProps: AutocompleteRenderGetTagProps) =>
        selected.map((option, index) => {
            const country = getCountry(option)

            return (
                <Chip
                    {...getTagProps({ index })}
                    icon={
                        <FlagIcon
                            code={country.code}
                            key={country.label}
                            sx={{ borderRadius: "50%", height: 16, width: 16 }}
                        />
                    }
                    key={country.label}
                    label={country.label}
                    size="small"
                    // @ts-ignore
                    variant="soft"
                />
            )
        })

    const getOptionLabel = (option: Value) => (getValue === "label" ? option : displayValueByCountryCode(option))

    return (
        <Autocomplete
            autoHighlight={!multiple}
            disableCloseOnSelect={multiple}
            getOptionLabel={getOptionLabel}
            id={`country-select-${id}`}
            multiple={multiple}
            options={options}
            renderInput={renderInput}
            renderOption={renderOption}
            renderTags={multiple ? renderTags : undefined}
            {...other}
        />
    )
}
