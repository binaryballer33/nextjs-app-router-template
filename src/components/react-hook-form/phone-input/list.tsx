import type { Country } from "react-phone-number-input/input"

import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SearchIcon from "@mui/icons-material/Search"

import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import Popover from "@mui/material/Popover"
import TextField from "@mui/material/TextField"

import usePopover from "src/hooks/use-popover"

import { FlagIcon } from "src/components/country-select/flag-icon"
import SearchNotFound from "src/components/react-hook-form/phone-input/search-not-found/search-not-found"

import countries from "src/mocks/countries"

import type { CountryListProps } from "./types"

import { applyFilter, getCountry } from "./utils"

export default function CountryListPopover({
    countryCode,
    onClickCountry,
    onSearchCountry,
    searchCountry,
    sx,
}: CountryListProps) {
    const popover = usePopover()

    const selectedCountry = getCountry(countryCode)

    const dataFiltered = applyFilter({ inputData: countries, query: searchCountry })

    const notFound = dataFiltered.length === 0 && !!searchCountry

    const renderButton = (
        <ButtonBase
            disableRipple
            onClick={popover.handleOpen}
            sx={{
                display: "flex",
                height: "var(--popover-button-height)",
                justifyContent: "flex-start",
                position: "absolute",
                width: "var(--popover-button-width)",
                zIndex: 9,
                ...sx,
            }}
        >
            <FlagIcon
                code={selectedCountry?.code}
                sx={{
                    borderRadius: "50%",
                    height: "var(--popover-button-height)",
                    width: "var(--popover-button-height)",
                }}
            />

            {/*  <Iconify icon="eva:chevron-down-fill" sx={{ ml: 0.25, flexShrink: 0, color: "text.disabled" }} />  */}
            <ExpandMoreIcon sx={{ color: "text.disabled", flexShrink: 0, ml: 0.25 }} />

            <Box
                component="span"
                sx={{
                    bgcolor: (theme) => theme.palette.divider,
                    height: 20,
                    ml: "auto",
                    width: "1px",
                }}
            />
        </ButtonBase>
    )

    const renderList = (
        <MenuList>
            {dataFiltered.map((country) => {
                if (!country.code) {
                    return null
                }

                return (
                    <MenuItem
                        key={country.code}
                        onClick={() => {
                            popover.handleClose()
                            onSearchCountry("")
                            onClickCountry(country.code as Country)
                        }}
                        selected={countryCode === country.code}
                    >
                        <FlagIcon code={country.code} sx={{ borderRadius: "50%", height: 22, mr: 1, width: 22 }} />

                        <ListItemText
                            primary={country.label}
                            primaryTypographyProps={{ noWrap: true, typography: "body2" }}
                            secondary={`${country.code} (+${country.phone})`}
                            secondaryTypographyProps={{ typography: "caption" }}
                        />
                    </MenuItem>
                )
            })}
        </MenuList>
    )

    return (
        <>
            {renderButton}

            <Popover
                anchorEl={popover.anchorRef.current}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                disableRestoreFocus
                onClose={() => {
                    popover.handleClose()
                    onSearchCountry("")
                }}
                open={popover.open}
                slotProps={{
                    paper: {
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            height: 320,
                            maxWidth: 320,
                            width: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
            >
                <Box sx={{ px: 1, py: 1.5 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        InputProps={{
                            endAdornment: searchCountry && (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => onSearchCountry("")} size="small">
                                        {/* <Iconify width={16} icon="mingcute:close-line" /> */}
                                        <CloseIcon sx={{ width: 16 }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    {/*  <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />  */}
                                    <SearchIcon sx={{ color: "text.disabled" }} />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) => onSearchCountry(event.target.value)}
                        placeholder="Search..."
                        value={searchCountry}
                    />
                </Box>

                <Box sx={{ flex: "1 1 auto", overflowX: "hidden" }}>
                    {notFound ? <SearchNotFound query={searchCountry} sx={{ pt: 5, px: 2 }} /> : renderList}
                </Box>
            </Popover>
        </>
    )
}
