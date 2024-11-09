import type { Components } from "@mui/material/styles/components"
import type { HTMLAttributes } from "react"

import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded"
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded"
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"

import { backdropClasses, createTheme, inputLabelClasses, SliderThumb, tableCellClasses } from "@mui/material"

// Common For Modified Components MUI Theme
export const BORDER_RADIUS = 6
export const SPACING_UNIT = 10

const theme = createTheme()

type ThumbComponentProps = HTMLAttributes<unknown>

function ThumbComponent(props: ThumbComponentProps) {
    const { children, ...other } = props
    return (
        <SliderThumb {...other}>
            {children}
            <i />
        </SliderThumb>
    )
}

// alot of modifications to the default components, use if you want to customize the default components
export const modifiedComponents = (): Components => {
    return {
        MuiAccordion: {
            defaultProps: {
                disableGutters: true,
                elevation: 8,
            },
        },
        MuiAutocomplete: {
            defaultProps: {
                popupIcon: <KeyboardArrowDownRoundedIcon />,
            },
            styleOverrides: {
                clearIndicator: { marginRight: 0 },
                listbox: {
                    "& .MuiAutocomplete-option": {
                        borderRadius: BORDER_RADIUS,
                        fontWeight: 500,
                    },

                    padding: SPACING_UNIT,
                },
                root: {
                    "& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment": {
                        right: 14,
                    },

                    "& .MuiOutlinedInput-root .MuiInputBase-inputSizeSmall + .MuiAutocomplete-endAdornment": {
                        right: 7,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 600,
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    [`&:not(.${backdropClasses.invisible})`]: {
                        backdropFilter: "blur(5px)",
                    },
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                standard: {
                    fontWeight: 600,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    textTransform: "none",
                    transition: "none",
                },
                sizeLarge: {
                    padding: "10px 20px",
                },
                sizeMedium: {
                    padding: "8px 16px",
                },
                sizeSmall: {
                    fontSize: 13,
                    padding: "4px 12px",
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
        },
        MuiButtonGroup: {
            defaultProps: {
                disableElevation: true,
                disableFocusRipple: true,
                disableRipple: true,
            },
        },
        MuiCard: {
            defaultProps: {
                elevation: 8,
            },
        },
        MuiCardActionArea: {
            styleOverrides: {
                focusHighlight: {
                    transition: "none",
                },
                root: {
                    transition: "none !important",
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    alignSelf: "flex-start",
                    paddingBottom: SPACING_UNIT * 1.5,
                    paddingLeft: SPACING_UNIT * 2,
                    paddingRight: SPACING_UNIT * 2,
                    paddingTop: SPACING_UNIT * 1.5,
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    "&:last-child": {
                        paddingBottom: SPACING_UNIT * 2,
                    },

                    padding: SPACING_UNIT * 2,
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                action: {
                    alignSelf: "center",
                    display: "flex",
                    gap: SPACING_UNIT,
                    marginRight: 0,
                    [theme.breakpoints.down("sm")]: {
                        alignSelf: "flex-start",
                        marginTop: SPACING_UNIT * 1.5,
                    },
                },
                content: {
                    overflow: "hidden",
                    width: "100%",
                },
                root: {
                    padding: SPACING_UNIT * 2,
                    [theme.breakpoints.down("sm")]: {
                        alignItems: "flex-start",
                        flexDirection: "column",
                    },
                },
            },
        },
        MuiChartsLegend: {
            styleOverrides: {
                root: {
                    "& .MuiChartsLegend-mark": {
                        rx: BORDER_RADIUS / 2,
                    },
                },
            },
        },
        MuiCheckbox: {
            defaultProps: {
                checkedIcon: <CheckBoxRoundedIcon />,
                icon: <CheckBoxOutlineBlankRoundedIcon />,
                indeterminateIcon: <IndeterminateCheckBoxRoundedIcon />,
            },
            styleOverrides: {
                root: {
                    borderRadius: BORDER_RADIUS,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                avatar: {
                    backgroundColor: "inherit",

                    borderRadius: "inherit",
                    color: "inherit",
                },
                avatarMedium: {
                    marginLeft: SPACING_UNIT / 3,
                    marginRight: -SPACING_UNIT / 1.5,
                },
                avatarSmall: {
                    marginLeft: 0,
                    marginRight: 0,
                },
                deleteIcon: {
                    "&:hover": {
                        color: "inherit",
                        opacity: 1,
                    },
                    color: "inherit",
                    fontSize: 16,
                    opacity: 0.8,
                },
                icon: {
                    marginLeft: SPACING_UNIT,
                    marginRight: -SPACING_UNIT / 2,
                },
                labelMedium: {
                    paddingLeft: SPACING_UNIT * 1.5,
                    paddingRight: SPACING_UNIT * 1.5,
                },
                labelSmall: {
                    fontWeight: 500,
                    paddingLeft: SPACING_UNIT,
                    paddingRight: SPACING_UNIT,
                },
                // @ts-ignore
                outlinedDefault: {
                    borderColor: theme.palette.divider,
                    borderRadius: 50,
                },
                root: {
                    "&:active": {
                        boxShadow: "none",
                    },
                    borderRadius: theme.shape.borderRadius,
                    fontSize: 12,
                    fontWeight: 600,
                    transition: "none",
                },
                sizeMedium: {
                    height: SPACING_UNIT * 3,
                },
                sizeSmall: {
                    height: SPACING_UNIT * 2.5,
                },
            },
        },
        MuiCircularProgress: {
            styleOverrides: {
                circle: {
                    strokeLinecap: "round",
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    boxSizing: "border-box",
                },
                "#__next": {
                    display: "flex",
                    minHeight: "100vh",
                },

                "#nprogress": {
                    pointerEvents: "none",
                },

                "#nprogress .bar": {
                    height: 4,
                    left: 0,
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 2000,
                },
                html: {
                    MozOsxFontSmoothing: "grayscale",
                    WebkitFontSmoothing: "antialiased",
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: SPACING_UNIT * 2,
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: SPACING_UNIT * 2,
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    padding: SPACING_UNIT * 2,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                wrapper: {
                    display: "flex",
                },
            },
        },
        MuiDrawer: {
            defaultProps: {
                elevation: 24,
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    "&:before, &:after": {
                        display: "none",
                    },
                    borderRadius: BORDER_RADIUS,
                    borderStyle: "solid",
                    borderWidth: 1,
                    overflow: "hidden",
                    transition: "none",
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    "& > label.MuiTypography-gutterBottom": {
                        marginBottom: SPACING_UNIT,
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontWeight: 500,
                },
                root: {
                    paddingRight: 0,
                },
            },
        },
        MuiFormHelperText: {
            defaultProps: {
                variant: "standard",
            },
            styleOverrides: {
                root: {
                    marginTop: "5px",
                    textTransform: "initial",
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    [`&.${inputLabelClasses.shrink}`]: {
                        [`&.${inputLabelClasses.filled}`]: {
                            "&.MuiInputLabel-sizeMedium + .MuiOutlinedInput-root > .MuiOutlinedInput-input": {
                                paddingBottom: 8,
                                paddingLeft: 12,
                                paddingTop: 24,
                            },

                            "&.MuiInputLabel-sizeSmall": {
                                fontSize: 15,
                            },

                            "&.MuiInputLabel-sizeSmall + .MuiOutlinedInput-root .MuiOutlinedInput-input": {
                                paddingBottom: 6,
                                paddingLeft: 12,
                                paddingTop: 20,
                            },

                            fontSize: 17,
                        },
                    },
                    fontSize: 14,

                    fontWeight: 500,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    ".MuiTouchRipple-root > *": {
                        display: "none",
                    },
                    borderRadius: "50%",
                    transition: "none",
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    "&:before, &:after": {
                        display: "none",
                    },
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    ".MuiInputBase-root": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                bar: {
                    borderRadius: BORDER_RADIUS,
                },
                dashed: {
                    backgroundSize: "8px 8px",
                },
                root: {
                    borderRadius: BORDER_RADIUS,
                    height: 10,
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: "none",
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    ".MuiListItem-root, .MuiListItemButton-root": {
                        "&:last-of-type + .MuiDivider-root": {
                            display: "none",
                        },
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    transition: "none",
                },
            },
        },
        MuiListSubheader: {
            styleOverrides: {
                root: {
                    fontSize: 13,
                    fontWeight: 600,
                    lineHeight: "36px",
                    textTransform: "uppercase",
                },
            },
        },
        MuiMenu: {
            defaultProps: {
                elevation: 16,
            },
            styleOverrides: {
                list: {
                    minWidth: 240,
                    padding: SPACING_UNIT,
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&:hover .MuiListItemIcon-root, &.Mui-selected .MuiListItemIcon-root": {
                        color: "inherit",
                    },
                    borderRadius: theme.shape.borderRadius,
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: "1px",
                    marginTop: "1px",
                    paddingBottom: `calc(${SPACING_UNIT / 1.2}px - 1px)`,

                    paddingTop: `calc(${SPACING_UNIT / 1.2}px - 1px)`,
                },
            },
        },
        MuiMobileStepper: {
            styleOverrides: {
                root: {
                    justifyContent: "center",
                    paddingBottom: SPACING_UNIT,
                    paddingTop: SPACING_UNIT,
                },
            },
        },
        MuiNativeSelect: {
            defaultProps: {
                IconComponent: KeyboardArrowDownRoundedIcon,
            },
            styleOverrides: {
                outlined: {
                    "&.MuiInput-input": {
                        "&.MuiInputBase-inputSizeSmall": {
                            paddingBottom: 8,
                            paddingLeft: 14,
                            paddingRight: 14,
                            paddingTop: 8,
                        },
                        borderRadius: BORDER_RADIUS,
                        borderStyle: "solid",
                        borderWidth: 1,
                        fontWeight: 500,
                        overflow: "hidden",
                        paddingBottom: 16,
                        paddingLeft: 14,
                        paddingRight: 14,
                        paddingTop: 16,
                        transition: "none",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    fontWeight: 500,
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    transition: "none",
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 21,
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    borderRadius: BORDER_RADIUS,
                },
            },
        },
        MuiPickersYear: {
            styleOverrides: {
                yearButton: {
                    borderRadius: BORDER_RADIUS,
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        "& > span": {
                            borderRadius: 24,
                        },

                        backgroundColor: "transparent",
                    },
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                IconComponent: KeyboardArrowDownRoundedIcon,
            },
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        zIndex: 1,
                    },
                },
                select: {
                    fontWeight: 500,
                },
            },
        },
        MuiSlider: {
            defaultProps: {
                slots: {
                    thumb: ThumbComponent,
                },
            },
            styleOverrides: {
                root: {
                    "& .MuiSlider-mark": {
                        height: 2,
                        width: 2,
                    },
                    "& .MuiSlider-markActive": {
                        height: 4,
                        width: 2,
                    },

                    "& .MuiSlider-rail": {
                        height: 3,
                        opacity: 1,
                    },

                    "& .MuiSlider-thumb": {
                        "& .MuiSlider-valueLabel": {
                            borderRadius: BORDER_RADIUS,
                            fontWeight: 500,
                            minWidth: 38,
                            padding: "4px 6px",
                        },
                        "& i": {
                            borderRadius: BORDER_RADIUS,
                            height: 6,
                            marginLeft: 1,
                            marginRight: 1,
                            opacity: 0.6,
                            transition: theme.transitions.create(["opacity"], {
                                duration: 150,
                            }),
                            width: 6,
                        },

                        "&:after": {
                            display: "none",
                        },

                        "&:hover, &.Mui-focusVisible": {
                            "& i": {
                                opacity: 1,
                            },
                        },

                        height: 27,

                        width: 27,
                    },

                    "& .MuiSlider-track": {
                        height: 6,
                    },
                    height: 6,
                    padding: "13px 0",
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    fontSize: 14,
                    fontWeight: 600,
                    marginTop: `12px !important`,
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    "& .MuiSwitch-switchBase": {
                        "&.Mui-checked": {
                            "& + .MuiSwitch-track": {
                                opacity: 1,
                            },

                            transform: "translateX(20px)",
                        },
                        padding: 3,
                    },
                    "& .MuiSwitch-thumb": {
                        borderRadius: 32,
                        height: 18,
                        transition: theme.transitions.create(["width", "translateX"], {
                            duration: 150,
                        }),
                        width: 18,
                    },
                    "& .MuiSwitch-track": {
                        borderRadius: 32,
                        boxSizing: "border-box",
                        opacity: 1,
                        transition: theme.transitions.create(["background-color"], {
                            duration: 150,
                        }),
                    },
                    "&:active": {
                        "& .MuiSwitch-switchBase.Mui-checked:not(.Mui-disabled)": {
                            transform: "translateX(16px)",
                        },
                        "& .MuiSwitch-switchBase.Mui-disabled .MuiSwitch-thumb": {
                            width: 18,
                        },
                        "& .MuiSwitch-thumb": {
                            width: 22,
                        },
                    },
                    display: "flex",

                    height: 24,
                    margin: SPACING_UNIT / 2,
                    padding: 0,
                    width: 44,
                },
                sizeSmall: {
                    "& .MuiSwitch-switchBase": {
                        "&.Mui-checked": {
                            transform: "translateX(12px)",
                        },
                        padding: 2,
                    },
                    "& .MuiSwitch-thumb": {
                        height: 14,
                        width: 14,
                    },

                    "&:active": {
                        "& .MuiSwitch-switchBase.Mui-checked": {
                            transform: "translateX(10px)",
                        },
                        "& .MuiSwitch-thumb": {
                            width: 16,
                        },
                    },
                    height: 18,

                    width: 30,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    "&:first-of-type": {
                        marginLeft: 0,
                    },
                    "&:last-of-type": {
                        marginRight: 0,
                    },
                    fontWeight: 500,
                    marginLeft: SPACING_UNIT * 1.5,
                    marginRight: SPACING_UNIT * 1.5,
                    minWidth: 0,

                    padding: 0,

                    textTransform: "none",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: "18px 14px",
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    [`& .${tableCellClasses.paddingCheckbox}`]: {
                        paddingBottom: 4,
                        paddingTop: 4,
                    },
                    [`& .${tableCellClasses.root}`]: {
                        fontSize: 13,
                        lineHeight: 1,
                        paddingBottom: 16,
                        paddingTop: 16,
                        textTransform: "uppercase",
                    },
                    borderBottom: "none",
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                actions: {
                    ".MuiButtonBase-root": {
                        padding: SPACING_UNIT / 2,
                    },
                },

                root: {
                    ".MuiTablePagination-toolbar": {
                        margin: 0,
                        minHeight: 0,
                        padding: 0,
                    },

                    flex: 1,

                    p: {
                        margin: 0,
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    borderRadius: 12,
                },

                root: {
                    "& + .MuiDivider-root": {
                        marginTop: "-1px",
                    },
                },
            },
        },
        MuiTimeline: {
            styleOverrides: {
                root: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: 0,
                    borderRadius: theme.shape.borderRadius,
                    fontWeight: 600,
                    margin: SPACING_UNIT / 3,
                    paddingBottom: SPACING_UNIT / 2,
                    paddingLeft: SPACING_UNIT,
                    paddingRight: SPACING_UNIT,
                    paddingTop: SPACING_UNIT / 2,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                grouped: {
                    "&:first-of-type": {
                        borderRadius: theme.shape.borderRadius,
                    },
                    "&:not(:first-of-type)": {
                        borderRadius: theme.shape.borderRadius,
                    },
                    "&.Mui-disabled": {
                        border: 0,
                    },
                    border: 0,
                },
                root: {
                    border: "1px solid",
                    borderColor: theme.palette.divider,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: "none",
                },
            },
        },
    }
}
