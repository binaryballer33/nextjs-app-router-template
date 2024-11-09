import type { ChangeEvent, Dispatch, SetStateAction } from "react"

import ClearRoundedIcon from "@mui/icons-material/ClearRounded"
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone"

import { IconButton, InputAdornment, TextField } from "@mui/material"

type PaginationQuerySearchBoxProps = {
    query: string
    setQuery: Dispatch<SetStateAction<string>>
    t: (token: string) => string
}

// TODO: fix issue where when i search on a page that is not page 1, I get no data even if that record exits
export default function PaginationQuerySearchBox(props: PaginationQuerySearchBoxProps) {
    const { query, setQuery, t } = props

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.persist()
        setQuery(event.target.value)
    }

    return (
        <TextField
            InputProps={{
                //  Only Display Clear Icon If There Is Text In The Search Box
                endAdornment: query && (
                    <InputAdornment
                        position="end"
                        sx={{
                            mr: -0.7,
                        }}
                    >
                        {/* Clear The Search Box */}
                        <IconButton
                            aria-label="clear input"
                            color="error"
                            edge="end"
                            onClick={() => setQuery("")}
                            size="small"
                            sx={{
                                color: "error.main",
                            }}
                        >
                            <ClearRoundedIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchTwoToneIcon />
                    </InputAdornment>
                ),
            }}
            margin="none"
            onChange={handleQueryChange}
            placeholder={t("Filter results")}
            size="small"
            value={query}
            variant="outlined"
        />
    )
}
