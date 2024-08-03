import { ChangeEvent, Dispatch, SetStateAction } from "react"

import ClearRoundedIcon from "@mui/icons-material/ClearRounded"
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone"
import { IconButton, InputAdornment, TextField } from "@mui/material"

type PaginationQuerySearchBoxProps = {
    query: string
    setQuery: Dispatch<SetStateAction<string>>
    t: (token: string) => string
}

export default function PaginationQuerySearchBox(props: PaginationQuerySearchBoxProps) {
    const { query, setQuery, t } = props

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.persist()
        setQuery(event.target.value)
    }

    return (
        <TextField
            margin="none"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchTwoToneIcon />
                    </InputAdornment>
                ),
                //  Only Display Clear Icon If There Is Text In The Search Box
                endAdornment: query && (
                    <InputAdornment
                        sx={{
                            mr: -0.7,
                        }}
                        position="end"
                    >
                        {/* Clear The Search Box */}
                        <IconButton
                            color="error"
                            aria-label="clear input"
                            onClick={() => setQuery("")}
                            edge="end"
                            size="small"
                            sx={{
                                color: "error.main",
                            }}
                        >
                            <ClearRoundedIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            onChange={handleQueryChange}
            placeholder={t("Filter results")}
            value={query}
            size="small"
            variant="outlined"
        />
    )
}
