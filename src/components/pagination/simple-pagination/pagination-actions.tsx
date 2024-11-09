import type { Theme } from "@mui/material"
import type { MouseEvent } from "react"

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"

import { Button, Stack, useMediaQuery } from "@mui/material"

import ButtonIcon from "src/components/base/styles/button-icon"

type PaginationActionsProps = {
    count: number
    onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void
    page: number
}

export default function PaginationActions({ count, onPageChange, page }: PaginationActionsProps) {
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"))

    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => onPageChange(event, page - 1)
    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => onPageChange(event, page + 1)

    return (
        <Stack direction="row" spacing={1}>
            {smUp ? (
                <>
                    <Button
                        color="secondary"
                        disabled={page === 0}
                        onClick={handleBackButtonClick}
                        size="small"
                        variant="outlined"
                    >
                        Previous
                    </Button>
                    <Button
                        color="secondary"
                        disabled={page >= Math.ceil(count / 10) - 1}
                        onClick={handleNextButtonClick}
                        size="small"
                        variant="outlined"
                    >
                        Next
                    </Button>
                </>
            ) : (
                <>
                    <ButtonIcon
                        color="secondary"
                        disabled={page === 0}
                        onClick={handleBackButtonClick}
                        size="small"
                        startIcon={<ChevronLeftRoundedIcon />}
                        variant="outlined"
                    />
                    <ButtonIcon
                        color="secondary"
                        disabled={page >= Math.ceil(count / 10) - 1}
                        onClick={handleNextButtonClick}
                        size="small"
                        startIcon={<ChevronRightRoundedIcon />}
                        variant="outlined"
                    />
                </>
            )}
        </Stack>
    )
}
