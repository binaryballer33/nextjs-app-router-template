import { Divider, Typography } from "@mui/material"

type FormDividerProps = {
    title: string
    width?: string
}

export default function FormDivider(props: FormDividerProps) {
    const { title, width } = props

    return (
        <Divider sx={{ width: width || "75%" }}>
            <Typography variant="subtitle1">{title}</Typography>
        </Divider>
    )
}
