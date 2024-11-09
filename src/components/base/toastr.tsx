import { Toaster } from "react-hot-toast"

import { alpha, useTheme } from "@mui/material/styles"

export default function Toastr() {
    const theme = useTheme()

    return (
        <Toaster
            containerStyle={{
                bottom: 24,
                left: 24,
                right: 24,
                top: 24,
            }}
            gutter={24}
            position="top-right"
            reverseOrder
            toastOptions={{
                style: {
                    backdropFilter: "blur(3px)",
                    background: alpha(theme.palette.background.paper, 0.9),
                    border: 0,
                    boxShadow: theme.shadows[21],
                    color: theme.palette.mode === "dark" ? theme.palette.neutral[100] : theme.palette.neutral[900],
                    fontWeight: 500,
                    padding: theme.spacing(2),
                },
            }}
        />
    )
}
