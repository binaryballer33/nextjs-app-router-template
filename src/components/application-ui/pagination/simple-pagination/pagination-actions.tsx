import { MouseEvent } from "react"

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import { Button, Stack, Theme, useMediaQuery } from "@mui/material"

import ButtonIcon from "src/components/base/styles/button-icon"

type PaginationActionsProps = {
    count: number
    page: number
    onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void
}

export default function PaginationActions({ count, page, onPageChange }: PaginationActionsProps) {
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"))

    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => onPageChange(event, page - 1)
    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => onPageChange(event, page + 1)

    return (
        <Stack direction="row" spacing={1}>
            {smUp ? (
                <>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleBackButtonClick}
                        disabled={page === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleNextButtonClick}
                        disabled={page >= Math.ceil(count / 10) - 1}
                    >
                        Next
                    </Button>
                </>
            ) : (
                <>
                    <ButtonIcon
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleBackButtonClick}
                        disabled={page === 0}
                        startIcon={<ChevronLeftRoundedIcon />}
                    />
                    <ButtonIcon
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handleNextButtonClick}
                        disabled={page >= Math.ceil(count / 10) - 1}
                        startIcon={<ChevronRightRoundedIcon />}
                    />
                </>
            )}
        </Stack>
    )
}
