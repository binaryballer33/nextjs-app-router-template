import { colors, darken, lighten, NeutralColors, PaletteColorOptions, PaletteMode } from "@mui/material"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"

import { modifiedComponents } from "./modified-components"

declare module "@mui/material/styles" {
    export interface NeutralColors {
        25: string
        50: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
    }

    //  for theme.palette
    interface Palette {
        neutral: NeutralColors
        normal: PaletteColorOptions
        effect: PaletteColorOptions
        fusion: PaletteColorOptions
        ritual: PaletteColorOptions
        link: PaletteColorOptions
        xyz: PaletteColorOptions
        synchro: PaletteColorOptions
        spell: PaletteColorOptions
        trap: PaletteColorOptions
    }

    // for creating colors in the theme.palette
    interface PaletteOptions {
        neutral?: NeutralColors
        normal?: PaletteColorOptions
        effect?: PaletteColorOptions
        fusion?: PaletteColorOptions
        ritual?: PaletteColorOptions
        link?: PaletteColorOptions
        xyz?: PaletteColorOptions
        synchro?: PaletteColorOptions
        spell?: PaletteColorOptions
        trap?: PaletteColorOptions
    }
}

export type PaletteColorKey = "success" | "error" | "warning" | "info" | "primary" | "secondary"

const common = {
    white: "#ffffff",
    black: "#151821",
    neutral: "#14191e",
}

export const neutral: NeutralColors = {
    25: lighten(common.neutral, 0.98),
    50: lighten(common.neutral, 0.96),
    100: lighten(common.neutral, 0.93),
    200: lighten(common.neutral, 0.9),
    300: lighten(common.neutral, 0.85),
    400: lighten(common.neutral, 0.77),
    500: lighten(common.neutral, 0.68),
    600: lighten(common.neutral, 0.5),
    700: lighten(common.neutral, 0.4),
    800: lighten(common.neutral, 0.2),
    900: common.neutral,
}

const lightTheme = responsiveFontSizes(
    createTheme({
        // typography: modified_typography(),
        components: modifiedComponents(),
        palette: {
            mode: "light" as PaletteMode,
            primary: {
                main: colors.blue[700],
                light: colors.blue[400],
                dark: colors.blue[900],
            },
            secondary: {
                main: colors.teal[600],
                light: colors.teal[400],
                dark: colors.teal[800],
            },
            info: {
                main: colors.deepPurple[700],
                light: colors.deepPurple[400],
                dark: colors.deepPurple[900],
            },
            fusion: {
                main: colors.purple[400],
                light: colors.purple[300],
                dark: colors.purple[600],
            },
            ritual: {
                main: colors.blueGrey[400],
                light: colors.blueGrey[300],
                dark: colors.blueGrey[600],
            },
            link: {
                main: colors.lightBlue[400],
                light: colors.lightBlue[300],
                dark: colors.lightBlue[600],
            },
            normal: {
                main: colors.grey[400],
                light: colors.grey[300],
                dark: colors.grey[600],
            },
            effect: {
                main: colors.orange[400],
                light: colors.orange[300],
                dark: colors.orange[600],
            },
            spell: {
                main: colors.blue[400],
                light: colors.blue[300],
                dark: colors.blue[600],
            },
            trap: {
                main: colors.purple["400"],
                light: colors.purple["300"],
                dark: colors.purple["600"],
            },
            xyz: {
                main: colors.common.black,
                light: lighten(colors.common.black, 0.2),
                dark: colors.common.black,
            },
            synchro: {
                main: darken(colors.grey["400"], 0.15),
                light: darken(colors.grey["400"], 0.1),
                dark: darken(colors.grey["400"], 0.2),
            },
            neutral,
            background: {
                default: colors.grey[300], // Light grey
                paper: lighten(colors.grey[200], 0.01),
            },
            text: {
                primary: colors.common.black,
                secondary: colors.grey[800],
            },
            divider: colors.grey[400],
        },
    }),
)

const darkTheme = responsiveFontSizes(
    createTheme({
        // typography: modified_typography(),
        components: modifiedComponents(),
        palette: {
            mode: "dark" as PaletteMode,
            primary: {
                main: colors.teal[300],
                light: colors.teal[100],
                dark: colors.teal[500],
            },
            secondary: {
                main: colors.blue[700],
                light: colors.blue[500],
                dark: colors.blue[900],
            },
            info: {
                main: colors.deepPurple[300],
                light: colors.deepPurple[100],
                dark: colors.deepPurple[500],
            },
            fusion: {
                main: colors.purple[300],
                light: colors.purple[100],
                dark: colors.purple[500],
            },
            ritual: {
                main: colors.blueGrey[300],
                light: colors.blueGrey[100],
                dark: colors.blueGrey[500],
            },
            link: {
                main: colors.lightBlue[300],
                light: colors.lightBlue[100],
                dark: colors.lightBlue[500],
            },
            normal: {
                main: colors.grey[300],
                light: colors.grey[100],
                dark: colors.grey[500],
            },
            effect: {
                main: colors.orange[300],
                light: colors.orange[100],
                dark: colors.orange[500],
            },
            spell: {
                main: colors.blue[300],
                light: colors.blue[100],
                dark: colors.blue[500],
            },
            trap: {
                main: colors.purple["300"],
                light: colors.purple["100"],
                dark: colors.purple["500"],
            },
            xyz: {
                main: colors.common.black,
                light: lighten(colors.common.black, 0.2),
                dark: colors.common.black,
            },
            synchro: {
                main: darken(colors.common.white, 0.4),
                light: darken(colors.common.white, 0.3),
                dark: darken(colors.common.white, 0.5),
            },
            neutral,
            background: {
                default: neutral[900],
                paper: lighten(neutral[900], 0.033),
            },
            text: {
                primary: colors.common.white,
                secondary: colors.grey[400],
            },
            divider: colors.grey[700],
        },
    }),
)

export { lightTheme, darkTheme }
