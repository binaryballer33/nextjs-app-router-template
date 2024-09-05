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
import type { Country } from "react-phone-number-input/input"

import { FlagIcon } from "src/components/country-select/flag-icon"
import SearchNotFound from "src/components/react-hook-form/phone-input/search-not-found/search-not-found"
import usePopover from "src/hooks/use-popover"
import countries from "src/mocks/countries"

import type { CountryListProps } from "./types"
import { applyFilter, getCountry } from "./utils"

export default function CountryListPopover({
    sx,
    countryCode,
    searchCountry,
    onClickCountry,
    onSearchCountry,
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
                zIndex: 9,
                display: "flex",
                position: "absolute",
                justifyContent: "flex-start",
                width: "var(--popover-button-width)",
                height: "var(--popover-button-height)",
                ...sx,
            }}
        >
            <FlagIcon
                code={selectedCountry?.code}
                sx={{
                    borderRadius: "50%",
                    width: "var(--popover-button-height)",
                    height: "var(--popover-button-height)",
                }}
            />

            {/*  <Iconify icon="eva:chevron-down-fill" sx={{ ml: 0.25, flexShrink: 0, color: "text.disabled" }} />  */}
            <ExpandMoreIcon sx={{ ml: 0.25, flexShrink: 0, color: "text.disabled" }} />

            <Box
                component="span"
                sx={{
                    height: 20,
                    ml: "auto",
                    width: "1px",
                    bgcolor: (theme) => theme.palette.divider,
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
                        selected={countryCode === country.code}
                        onClick={() => {
                            popover.handleClose()
                            onSearchCountry("")
                            onClickCountry(country.code as Country)
                        }}
                    >
                        <FlagIcon code={country.code} sx={{ mr: 1, width: 22, height: 22, borderRadius: "50%" }} />

                        <ListItemText
                            primary={country.label}
                            secondary={`${country.code} (+${country.phone})`}
                            primaryTypographyProps={{ noWrap: true, typography: "body2" }}
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
                disableRestoreFocus
                open={popover.open}
                anchorEl={popover.anchorRef.current}
                onClose={() => {
                    popover.handleClose()
                    onSearchCountry("")
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 1,
                            height: 320,
                            maxWidth: 320,
                            display: "flex",
                            flexDirection: "column",
                        },
                    },
                }}
            >
                <Box sx={{ px: 1, py: 1.5 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        value={searchCountry}
                        onChange={(event) => onSearchCountry(event.target.value)}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {/*  <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />  */}
                                    <SearchIcon sx={{ color: "text.disabled" }} />
                                </InputAdornment>
                            ),
                            endAdornment: searchCountry && (
                                <InputAdornment position="end">
                                    <IconButton size="small" edge="end" onClick={() => onSearchCountry("")}>
                                        {/* <Iconify width={16} icon="mingcute:close-line" /> */}
                                        <CloseIcon sx={{ width: 16 }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box sx={{ flex: "1 1 auto", overflowX: "hidden" }}>
                    {notFound ? <SearchNotFound query={searchCountry} sx={{ px: 2, pt: 5 }} /> : renderList}
                </Box>
            </Popover>
        </>
    )
}
