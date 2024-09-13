import type { MouseEvent } from "react"

import { useCallback, useState } from "react"

import ReactCountryFlag from "react-country-flag"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material"

type Language = "ae" | "br" | "cn" | "de" | "en" | "es" | "fr" | "pt"

type LanguageOptions = {
    [key in Language]: {
        icon: string
        label: string
    }
}

const languages: Record<Language, string> = {
    ae: "AE",
    br: "BR",
    cn: "CN",
    de: "DE",
    en: "US",
    es: "ES",
    fr: "FR",
    pt: "PT",
}

const languageOptions: LanguageOptions = {
    ae: {
        icon: "AE",
        label: "Arabic",
    },
    br: {
        icon: "BR",
        label: "Brazil",
    },
    cn: {
        icon: "CN",
        label: "Chinese",
    },
    de: {
        icon: "DE",
        label: "German",
    },
    en: {
        icon: "US",
        label: "English",
    },
    es: {
        icon: "ES",
        label: "Spanish",
    },
    fr: {
        icon: "FR",
        label: "French",
    },
    pt: {
        icon: "PT",
        label: "Portuguese",
    },
}

type LanguageDropdownProps = {
    color?: "error" | "info" | "inherit" | "primary" | "secondary" | "success" | "warning"
    sx?: object
}

export default function LanguageDropdown({ color = "inherit", sx = {} }: LanguageDropdownProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const { t } = useTranslation()
    const { i18n } = useTranslation()

    const flag = languages[i18n.language as Language]

    const handleChange = useCallback(
        async (language: Language): Promise<void> => {
            await i18n.changeLanguage(language)
            const message = t("Language changed to English")
            toast.success(message, {
                position: "bottom-center",
            })
            handleClose()
        },
        [i18n, t],
    )

    return (
        <>
            <Tooltip arrow title={t("Switch Language")}>
                <IconButton
                    aria-controls={open ? "language-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    color={color}
                    id="language-button"
                    onClick={handleClick}
                    sx={{
                        ...sx,
                    }}
                >
                    <ReactCountryFlag countryCode={flag} svg />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                }}
                id="language-menu"
                MenuListProps={{
                    "aria-labelledby": "language-button",
                }}
                onClose={handleClose}
                open={open}
                transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}
            >
                {(Object.keys(languageOptions) as Language[]).map((language) => {
                    const option = languageOptions[language]
                    return (
                        <MenuItem
                            key={language}
                            onClick={() => handleChange(language)}
                            selected={i18n.language === language}
                        >
                            <ListItemIcon>
                                <ReactCountryFlag
                                    countryCode={option.icon}
                                    style={{
                                        height: "2em",
                                        width: "2em",
                                    }}
                                    svg
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={option.label}
                                sx={{
                                    pl: 1,
                                }}
                            />
                        </MenuItem>
                    )
                })}
            </Menu>
        </>
    )
}
