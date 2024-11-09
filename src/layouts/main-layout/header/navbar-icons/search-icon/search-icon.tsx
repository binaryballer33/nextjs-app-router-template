import type { SvgIconTypeMap } from "@mui/material"
import type { OverridableComponent } from "@mui/material/OverridableComponent"
import type { ChangeEvent } from "react"
import type { Category, Item } from "src/mocks/search-icon-mock-search-data"
import type { PaletteColorKey } from "src/theme/theme"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import PropTypes from "prop-types"

import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone"
import CloseIcon from "@mui/icons-material/Close"
import QueryStatsTwoToneIcon from "@mui/icons-material/QueryStatsTwoTone"
import SearchOffTwoToneIcon from "@mui/icons-material/SearchOffTwoTone"
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone"

import Masonry from "@mui/lab/Masonry"
import {
    Box,
    Card,
    CardActionArea,
    Chip,
    CircularProgress,
    Collapse,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"

import { AvatarState } from "src/components/base/styles/avatar"

import { dummyData, iconMapping } from "src/mocks/search-icon-mock-search-data"
import { neutral } from "src/theme/theme"

type BasicSpotlightSearchProps = {
    onClose?: () => void
    open?: boolean
}

export default function BasicSpotlightSearch(props: BasicSpotlightSearchProps) {
    const { onClose, open = false, ...other } = props
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredItems, setFilteredItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(false)
    const [searchInitiated, setSearchInitiated] = useState(false)
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value
        setSearchTerm(newSearchTerm)

        if (newSearchTerm.length < 1) {
            setFilteredItems([])
            setSearchInitiated(false)
            setLoading(false)
            return
        }

        setSearchInitiated(true)

        const randomLoadingTime = Math.round(Math.random() * 3500)

        setLoading(true)
        setTimeout(() => {
            const filtered = dummyData.filter((item) => item.title.toLowerCase().includes(newSearchTerm.toLowerCase()))
            setFilteredItems(filtered)
            setLoading(false)
        }, randomLoadingTime)
    }

    const groupedItems = filteredItems.reduce(
        (groups, item) => {
            if (!groups[item.category]) groups[item.category] = []

            groups[item.category].push(item)
            return groups
        },
        {} as Record<Category, Item[]>,
    )

    const handleToggleCategory = (category: string) => {
        setExpandedCategories((prevExpanded) => ({
            ...prevExpanded,
            [category]: !prevExpanded[category],
        }))
    }

    const getAvatarContent = (item: Item) => {
        let IconComponent:
            | ({ muiName: string } & OverridableComponent<SvgIconTypeMap<{}, "svg">>)
            | React.JSX.IntrinsicAttributes
        switch (item.category) {
            case "folders":
            case "files":
            case "applications":
                IconComponent = iconMapping[item.avatar]

                let state: PaletteColorKey | undefined
                let isSoft: boolean | undefined
                let variant: "circular" | "rounded" | "square" | undefined

                if (item.category === "folders") {
                    state = "warning"
                    isSoft = true
                    variant = "rounded"
                } else if (item.category === "files") {
                    state = "info"
                    isSoft = false
                    variant = undefined
                } else {
                    state = "primary"
                    isSoft = true
                    variant = "rounded"
                }

                return (
                    <AvatarState
                        isSoft={isSoft}
                        state={state}
                        sx={{
                            height: 48,
                            width: 48,
                        }}
                        variant={variant!}
                    >
                        <IconComponent fontSize="small" />
                    </AvatarState>
                )
            case "users":
                return (
                    <AvatarState
                        src={item.avatar}
                        state="secondary"
                        sx={{
                            height: 48,
                            width: 48,
                        }}
                        useShadow
                    />
                )
            default:
                return null
        }
    }

    const renderItem = (item: Item, index: number, _array: Item[], category: string) => {
        if (item.category !== "images" && index > 4 && !expandedCategories[category]) return null
        return (
            <>
                <Divider />
                <ListItemButton
                    sx={{
                        "&:hover": {
                            ".MuiSvgIcon-root": {
                                opacity: 1,
                            },

                            ".MuiTypography-subtitle2": {
                                color: "text.primary",
                            },
                        },
                        py: 1.5,
                    }}
                >
                    <ListItemAvatar
                        sx={{
                            minWidth: 38,
                            mr: 1.5,
                        }}
                    >
                        {getAvatarContent(item)}
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{ noWrap: true, variant: "h6" }}
                        secondary={item.description}
                        secondaryTypographyProps={{ noWrap: true, variant: "subtitle2" }}
                    />
                    <ChevronRightTwoToneIcon
                        sx={{
                            opacity: 0.5,
                        }}
                    />
                </ListItemButton>
            </>
        )
    }

    const heights = [150, 75, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80]

    const renderImages = (items: Item[]) => (
        <Box display="flex" justifyContent="center" px={0.5}>
            <Masonry columns={{ sm: 3, xs: 1 }} spacing={{ sm: 2, xs: 1 }}>
                {items.map((item, index) => (
                    <Card
                        key={item.id}
                        sx={{
                            height: heights[index % heights.length],
                        }}
                    >
                        <CardActionArea
                            sx={{
                                "&:hover": {
                                    filter: "grayscale(0%)",
                                },
                                backgroundImage: `url("${item.avatar}")`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                filter: "grayscale(60%)",
                                height: "100%",

                                width: "100%",
                            }}
                        />
                    </Card>
                ))}
            </Masonry>
        </Box>
    )

    const renderShowMoreButton = (category: string, items: Item[]) => {
        const isExpanded = expandedCategories[category]
        const numberOfItemsToShow = isExpanded ? items.length - 3 : 3
        const remainingItemsCount = items.length - numberOfItemsToShow

        if (items.length > 3 && category !== "images")
            return (
                <Box pt={2} textAlign="center">
                    <Chip
                        color={isExpanded ? "secondary" : "primary"}
                        label={isExpanded ? `Show less` : `Show ${remainingItemsCount} more`}
                        onClick={() => handleToggleCategory(category)}
                        variant="outlined"
                    />
                </Box>
            )

        return <Divider />
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
            scroll="paper"
            sx={{
                ".MuiDialog-container": {
                    alignItems: "flex-start",
                    height: { md: "80%", xs: "100%" },
                    maxHeight: { md: 736, xs: "unset" },
                    pt: { lg: 6, md: 4, xs: 0 },
                },
            }}
            {...other}
        >
            <DialogTitle sx={{ p: 0 }}>
                <OutlinedInput
                    autoComplete="off"
                    autoFocus
                    endAdornment={
                        <InputAdornment position="end">
                            {searchTerm ? (
                                <IconButton
                                    aria-label="clear search"
                                    onClick={() => {
                                        setSearchTerm("")
                                        setFilteredItems([])
                                        setSearchInitiated(false)
                                    }}
                                    size="small"
                                    sx={{ mr: 0.5 }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="close search dialog"
                                    color="primary"
                                    onClick={onClose}
                                    size="small"
                                    sx={{ mr: 0.5 }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            )}
                        </InputAdornment>
                    }
                    fullWidth
                    id="search"
                    margin="none"
                    onChange={handleSearch}
                    placeholder={t("Search")}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchTwoToneIcon fontSize="small" />
                        </InputAdornment>
                    }
                    sx={{
                        ".MuiOutlinedInput-input": {
                            height: "40px",
                        },
                        ".MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        fontSize: 16,
                    }}
                    type="text"
                    value={searchTerm}
                />
            </DialogTitle>
            {!searchInitiated && filteredItems.length === 0 && fullScreen && (
                <>
                    <Divider />
                    <Stack
                        alignItems="center"
                        direction="column"
                        justifyContent="center"
                        minHeight={164}
                        pt={3}
                        spacing={2}
                    >
                        <QueryStatsTwoToneIcon sx={{ color: neutral[500], fontSize: 42 }} />
                        <Box textAlign="center">
                            <Typography
                                sx={{
                                    pb: 2,
                                    px: 6,
                                }}
                                variant="h5"
                            >
                                Explore Your Digital Workspace
                            </Typography>
                            <Typography color="text.secondary" variant="subtitle1">
                                Instantly navigate to any folder, user profile, document, or app with ease.
                            </Typography>
                        </Box>
                    </Stack>
                </>
            )}
            {loading ? (
                <>
                    <Divider />
                    <Box alignItems="center" display="flex" height={164} justifyContent="center">
                        <CircularProgress size={36} />
                    </Box>
                </>
            ) : (
                <>
                    {searchInitiated && filteredItems.length === 0 && (
                        <>
                            <Divider />
                            <Stack alignItems="center" direction="column" justifyContent="center" minHeight={164}>
                                <SearchOffTwoToneIcon sx={{ color: neutral[500], fontSize: 42 }} />
                                <Box textAlign="center">
                                    <Typography variant="h5">No search results</Typography>
                                    <Typography color="text.secondary" variant="subtitle1">
                                        Try a different search term
                                    </Typography>
                                </Box>
                            </Stack>
                        </>
                    )}
                    <DialogContent sx={{ overflowX: "hidden", p: 0 }}>
                        {Object.entries(groupedItems).map(([category, items]) => (
                            <List
                                component="div"
                                disablePadding
                                key={category}
                                subheader={
                                    <ListSubheader component="div">{`${category.toUpperCase()} (${items.length})`}</ListSubheader>
                                }
                            >
                                {category === "images" ? (
                                    renderImages(items)
                                ) : (
                                    <>
                                        {items
                                            .slice(0, 3)
                                            .map((item, index, array) => renderItem(item, index, array, category))}
                                        <Collapse
                                            in={expandedCategories[category] || items.length <= 3}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            {items
                                                .slice(3)
                                                .map((item, index) => renderItem(item, index + 3, items, category))}
                                        </Collapse>
                                    </>
                                )}
                                {renderShowMoreButton(category, items)}
                            </List>
                        ))}
                    </DialogContent>
                </>
            )}
        </Dialog>
    )
}

BasicSpotlightSearch.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
}
