import type { Country } from "react-phone-number-input"

import { parsePhoneNumber } from "react-phone-number-input"

import countries from "src/mocks/countries"

export function getCountryCode(inputValue: string, countryCode?: Country) {
    if (inputValue) {
        const phoneNumber = parsePhoneNumber(inputValue)

        if (phoneNumber) {
            return phoneNumber?.country
        }
    }

    return countryCode ?? "US"
}

// ----------------------------------------------------------------------

export function getCountry(countryCode?: Country) {
    return countries.filter((country) => country.code === countryCode)[0]
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
    inputData: typeof countries
    query: string
}

export function applyFilter({ inputData, query }: ApplyFilterProps) {
    if (!query) return inputData

    const lowerCaseQuery = query.toLowerCase()

    return inputData.filter(({ code, label, phone }) =>
        [label, code, phone].some((field) => field.toLowerCase().includes(lowerCaseQuery)),
    )
}
