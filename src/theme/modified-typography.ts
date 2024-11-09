import type { TypographyOptions } from "@mui/material/styles/createTypography"

export default function modifiedTypography(): TypographyOptions {
    return {
        body1: {
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: 1.5,
        },
        body2: {
            fontSize: "0.8rem",
            fontWeight: 500,
            lineHeight: 1.5,
        },
        button: {
            fontWeight: 500,
        },
        caption: {
            fontSize: "0.85rem",
            fontWeight: 500,
            lineHeight: 1.5,
            textTransform: "uppercase",
        },
        fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        h1: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "2.6rem",
            fontWeight: 700,
            letterSpacing: "-0.05rem",
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.9rem",
            fontWeight: 600,
            letterSpacing: "-0.04rem",
            lineHeight: 1.3,
        },
        h3: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 600,
            letterSpacing: "-0.03rem",
            lineHeight: 1.4,
        },
        h4: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.2rem",
            fontWeight: 600,
            lineHeight: 1.6,
        },
        h5: {
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontFamily: "'Inter', sans-serif",
            fontSize: ".92rem",
            fontWeight: 600,
            lineHeight: 1.5,
        },
        overline: {
            fontSize: "0.75rem",
            fontWeight: 700,
            lineHeight: 2,
            textTransform: "uppercase",
        },
        subtitle1: {
            fontSize: ".915rem",
            fontWeight: 400,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: 1.5,
        },
    }
}
