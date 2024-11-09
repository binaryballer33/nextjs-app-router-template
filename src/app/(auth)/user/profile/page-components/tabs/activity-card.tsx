import { useTranslation } from "react-i18next"

import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone"
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone"
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone"
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone"

import {
    alpha,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material"

export default function ActivityTab() {
    const { t } = useTranslation()

    return (
        <Card>
            <CardHeader
                action={
                    <IconButton color="primary">
                        <MoreHorizTwoToneIcon />
                    </IconButton>
                }
                avatar={
                    <Avatar
                        src="/avatars/5.png"
                        sx={{
                            height: 54,
                            mb: {
                                sm: 0,
                                xs: 1,
                            },
                            width: 54,
                        }}
                    />
                }
                subheader={
                    <>
                        Managing Partner,{" "}
                        <Link href="" onClick={(e) => e.preventDefault()} underline="hover">
                            #software
                        </Link>
                        ,{" "}
                        <Link href="" onClick={(e) => e.preventDefault()} underline="hover">
                            #managers
                        </Link>
                        , Google Inc.
                    </>
                }
                subheaderTypographyProps={{ variant: "subtitle2" }}
                sx={{
                    "& .MuiCardHeader-action": {
                        display: { sm: "flex", xs: "none" },
                    },
                }}
                title="Allison Lipshutz"
                titleTypographyProps={{ variant: "h6" }}
            />
            <Divider />
            <Box
                p={2}
                py={{ sm: 3, xs: 2 }}
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? alpha(theme.palette.neutral[25], 0.02) : "neutral.25",
                }}
            >
                <Typography fontWeight={500} variant="h6">
                    Welcome to organizing your remote office for maximum productivity.
                </Typography>
            </Box>
            <CardMedia
                image="/placeholders/covers/1.jpg"
                sx={{
                    minHeight: 284,
                }}
                title="Card Cover"
            />
            <Box p={2} py={{ sm: 3, xs: 2 }}>
                <Link color="text.primary" href="" onClick={(e) => e.preventDefault()} underline="hover" variant="h6">
                    Organizing Your Remote Office for Maximum Productivity
                </Link>
                <Typography sx={{ pt: 0.5 }} variant="subtitle1">
                    <Link href="" onClick={(e) => e.preventDefault()} underline="hover" variant="subtitle1">
                        example.com
                    </Link>{" "}
                    • 4 {t("mins read")}
                </Typography>
            </Box>
            <Divider />
            <CardActions
                sx={{
                    alignItems: "center",
                    display: { md: "flex", xs: "block" },
                    justifyContent: "space-between",
                }}
            >
                <Stack
                    direction="row"
                    flexWrap={{ md: "nowrap", xs: "wrap" }}
                    gap={1}
                    justifyContent={{ md: "center", xs: "flex-start" }}
                >
                    <Button startIcon={<ThumbUpAltTwoToneIcon />} variant="contained">
                        {t("Like")}
                    </Button>
                    <Button startIcon={<CommentTwoToneIcon />} variant="outlined">
                        {t("Comment")}
                    </Button>
                    <Button startIcon={<ShareTwoToneIcon />} variant="outlined">
                        {t("Share")}
                    </Button>
                </Stack>
                <Box
                    sx={{
                        mt: { md: 0, xs: 2 },
                    }}
                >
                    <Typography component="span" variant="subtitle2">
                        <b>485</b> {t("reactions")} • <b>63</b> {t("comments")}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    )
}
