import { useState } from "react"

import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"

import {
    alpha,
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"

import { AvatarState } from "src/components/base/styles/avatar"
import ButtonIcon from "src/components/base/styles/button-icon"

import AlertDialogContent from "./alert-dialog-content"

function BulkDeleteIconDialog() {
    const { t } = useTranslation()
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up("sm"))
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleNotificationClick = () => {
        setOpen(false)

        //  Custom Card Toast Notification
        toast.custom(
            (message) => (
                //  Toast Component
                <Card className={`${message.visible ? "animate-enter" : "animate-leave"}`} elevation={21}>
                    <Box
                        sx={{
                            maxWidth: 340,
                            minWidth: 320,
                            position: "relative",
                        }}
                    >
                        {/* Dismiss The Toast Button */}
                        <IconButton
                            color="primary"
                            onClick={() => toast.dismiss(message.id)}
                            size="small"
                            sx={{
                                p: 0.2,
                                position: "absolute",
                                right: (prTheme) => prTheme.spacing(1),
                                top: (ptTheme) => ptTheme.spacing(1),
                            }}
                        >
                            <CloseRoundedIcon fontSize="inherit" />
                        </IconButton>

                        {/* Toast Content */}
                        <Box
                            sx={{
                                "&:hover": {
                                    backgroundColor: (bgColorTheme) => alpha(bgColorTheme.palette.primary.main, 0.01),
                                },
                                alignItems: "flex-start",
                                display: "flex",
                                px: 2,
                                py: 1.5,
                                transition: "none",
                            }}
                        >
                            {/* Toast Avatar */}
                            <AvatarState
                                state="error"
                                sx={{
                                    height: 40,
                                    mt: 0.4,
                                    width: 40,
                                }}
                                useShadow
                                variant="rounded"
                            >
                                <WarningAmberRoundedIcon fontSize="small" />
                            </AvatarState>

                            {/* Toast Text */}
                            <Box flex={1} ml={1.5} overflow="hidden" pt={0.5}>
                                <Typography sx={{ pb: 1 }} variant="h6">
                                    Items deleted successfully
                                </Typography>
                                <Typography color="text.secondary" variant="subtitle1">
                                    The entries you selected have been removed successfully.
                                </Typography>
                                <Stack direction="row" mb={0.5} mt={1.5} spacing={1}>
                                    <Button
                                        color="secondary"
                                        onClick={() => toast.dismiss(message.id)}
                                        size="small"
                                        startIcon={<ReplayRoundedIcon fontSize="small" />}
                                        sx={{
                                            color: "primary.main",
                                        }}
                                        variant="outlined"
                                    >
                                        Undo
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            ),
            {
                position: "top-right",
            },
        )
    }

    return (
        <>
            {/* Display Delete Button With Text On Tablet And Up Screen Size */}
            {smUp ? (
                <Button
                    color="secondary"
                    onClick={handleClickOpen}
                    size="small"
                    startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}
                    sx={{ color: "error.main" }}
                    variant="outlined"
                >
                    {t("Delete selected")}
                </Button>
            ) : (
                //  Display Delete Icon Button No Text On Mobile Screen Size
                <Tooltip arrow placement="top" title={t("Delete selected")}>
                    <ButtonIcon
                        color="error"
                        onClick={handleClickOpen}
                        size="small"
                        startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}
                        sx={{ color: "error.main" }}
                        variant="outlined"
                    />
                </Tooltip>
            )}

            {/* If Delete Icon Clicked Show Dialog To Confirm Deletion */}
            <Dialog
                aria-labelledby="basic-dialog-title"
                fullWidth
                maxWidth="sm"
                onClose={handleClose}
                open={open}
                sx={{
                    ".MuiDialog-container": {
                        alignItems: { sm: "center", xs: "flex-end" },
                    },
                }}
            >
                <DialogContent>
                    <AlertDialogContent />
                </DialogContent>
                <DialogActions
                    sx={{
                        "& > :not(:first-of-type)": {
                            marginBottom: { sm: 0, xs: theme.spacing(1) },
                            marginLeft: { sm: theme.spacing(1), xs: 0 },
                        },
                        backgroundColor: (bgColorTheme) =>
                            bgColorTheme.palette.mode === "dark"
                                ? alpha(bgColorTheme.palette.neutral[25], 0.02)
                                : "neutral.25",

                        flexDirection: { sm: "row", xs: "column-reverse" },
                    }}
                >
                    <Button autoFocus color="secondary" fullWidth={!smUp} onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        autoFocus
                        color="error"
                        fullWidth={!smUp}
                        onClick={handleNotificationClick}
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BulkDeleteIconDialog
