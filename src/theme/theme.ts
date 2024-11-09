import type { NeutralColors, PaletteColorOptions, PaletteMode } from "@mui/material"

import { colors, darken, lighten } from "@mui/material"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"

import { modifiedComponents } from "./modified-components"

declare module "@mui/material/styles" {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface NeutralColors {
        100: string
        200: string
        25: string
        300: string
        400: string
        50: string
        500: string
        600: string
        700: string
        800: string
        900: string
    }

    //  for theme.palette
    interface Palette {
        effect: PaletteColorOptions
        fusion: PaletteColorOptions
        link: PaletteColorOptions
        neutral: NeutralColors
        normal: PaletteColorOptions
        ritual: PaletteColorOptions
        spell: PaletteColorOptions
        synchro: PaletteColorOptions
        trap: PaletteColorOptions
        xyz: PaletteColorOptions
    }

    // for creating colors in the theme.palette
    interface PaletteOptions {
        effect?: PaletteColorOptions
        fusion?: PaletteColorOptions
        link?: PaletteColorOptions
        neutral?: NeutralColors
        normal?: PaletteColorOptions
        ritual?: PaletteColorOptions
        spell?: PaletteColorOptions
        synchro?: PaletteColorOptions
        trap?: PaletteColorOptions
        xyz?: PaletteColorOptions
    }
}

export type PaletteColorKey = "error" | "info" | "primary" | "secondary" | "success" | "warning"

const common = {
    black: "#151821",
    neutral: "#14191e",
    white: "#ffffff",
}

export const neutral: NeutralColors = {
    100: lighten(common.neutral, 0.93),
    200: lighten(common.neutral, 0.9),
    25: lighten(common.neutral, 0.98),
    300: lighten(common.neutral, 0.85),
    400: lighten(common.neutral, 0.77),
    50: lighten(common.neutral, 0.96),
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
            background: {
                default: colors.grey[300], // Light grey
                paper: lighten(colors.grey[200], 0.01),
            },
            divider: colors.grey[400],
            effect: {
                dark: colors.orange[600],
                light: colors.orange[300],
                main: colors.orange[400],
            },
            fusion: {
                dark: colors.purple[600],
                light: colors.purple[300],
                main: colors.purple[400],
            },
            info: {
                dark: colors.deepPurple[900],
                light: colors.deepPurple[400],
                main: colors.deepPurple[700],
            },
            link: {
                dark: colors.lightBlue[600],
                light: colors.lightBlue[300],
                main: colors.lightBlue[400],
            },
            mode: "light" as PaletteMode,
            neutral,
            normal: {
                dark: colors.grey[600],
                light: colors.grey[300],
                main: colors.grey[400],
            },
            primary: {
                dark: colors.blue[900],
                light: colors.blue[400],
                main: colors.blue[700],
            },
            ritual: {
                dark: colors.blueGrey[600],
                light: colors.blueGrey[300],
                main: colors.blueGrey[400],
            },
            secondary: {
                dark: colors.teal[800],
                light: colors.teal[400],
                main: colors.teal[600],
            },
            spell: {
                dark: colors.blue[600],
                light: colors.blue[300],
                main: colors.blue[400],
            },
            synchro: {
                dark: darken(colors.grey["400"], 0.2),
                light: darken(colors.grey["400"], 0.1),
                main: darken(colors.grey["400"], 0.15),
            },
            text: {
                primary: colors.common.black,
                secondary: colors.grey[800],
            },
            trap: {
                dark: colors.purple["600"],
                light: colors.purple["300"],
                main: colors.purple["400"],
            },
            xyz: {
                dark: colors.common.black,
                light: lighten(colors.common.black, 0.2),
                main: colors.common.black,
            },
        },
    }),
)

const darkTheme = responsiveFontSizes(
    createTheme({
        // typography: modified_typography(),
        components: modifiedComponents(),
        palette: {
            background: {
                default: neutral[900],
                paper: lighten(neutral[900], 0.033),
            },
            divider: colors.grey[700],
            effect: {
                dark: colors.orange[500],
                light: colors.orange[100],
                main: colors.orange[300],
            },
            fusion: {
                dark: colors.purple[500],
                light: colors.purple[100],
                main: colors.purple[300],
            },
            info: {
                dark: colors.deepPurple[500],
                light: colors.deepPurple[100],
                main: colors.deepPurple[300],
            },
            link: {
                dark: colors.lightBlue[500],
                light: colors.lightBlue[100],
                main: colors.lightBlue[300],
            },
            mode: "dark" as PaletteMode,
            neutral,
            normal: {
                dark: colors.grey[500],
                light: colors.grey[100],
                main: colors.grey[300],
            },
            primary: {
                dark: colors.teal[500],
                light: colors.teal[100],
                main: colors.teal[300],
            },
            ritual: {
                dark: colors.blueGrey[500],
                light: colors.blueGrey[100],
                main: colors.blueGrey[300],
            },
            secondary: {
                dark: colors.blue[900],
                light: colors.blue[500],
                main: colors.blue[700],
            },
            spell: {
                dark: colors.blue[500],
                light: colors.blue[100],
                main: colors.blue[300],
            },
            synchro: {
                dark: darken(colors.common.white, 0.5),
                light: darken(colors.common.white, 0.3),
                main: darken(colors.common.white, 0.4),
            },
            text: {
                primary: colors.common.white,
                secondary: colors.grey[400],
            },
            trap: {
                dark: colors.purple["500"],
                light: colors.purple["100"],
                main: colors.purple["300"],
            },
            xyz: {
                dark: colors.common.black,
                light: lighten(colors.common.black, 0.2),
                main: colors.common.black,
            },
        },
    }),
)

export { darkTheme, lightTheme }
