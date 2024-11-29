// my background color
// #14191e

// my primary dark color
// #009688


export type PaletteColorKey = "error" | "info" | "primary" | "secondary" | "success" | "warning"

const common = {
    black: "#151821",
    neutral: "#14191e",
    white: "#ffffff",
}

export const neutral = {
    100: "#ebeced", // lighten(#14191e, 0.93)
    200: "#e6e7e9", // lighten(#14191e, 0.9)
    25: "#f7f8f8", // lighten(#14191e, 0.98)
    300: "#d9dbde", // lighten(#14191e, 0.85)
    400: "#c2c5c9", // lighten(#14191e, 0.77)
    50: "#f2f3f4", // lighten(#14191e, 0.96)
    500: "#a8adb3", // lighten(#14191e, 0.68)
    600: "#898f97", // lighten(#14191e, 0.5)
    700: "#6b737c", // lighten(#14191e, 0.4)
    800: "#3d454d", // lighten(#14191e, 0.2)
    900: "#14191e", // base neutral
}
