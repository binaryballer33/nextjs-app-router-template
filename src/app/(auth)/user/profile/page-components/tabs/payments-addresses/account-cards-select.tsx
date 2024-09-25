import type { ChangeEvent } from "react"

import Image from "next/image"

import { useState } from "react"

import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import AddRoundedIcon from "@mui/icons-material/AddRounded"
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"

import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Unstable_Grid2 as Grid,
    ListItemButton,
    Radio,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material"

import ButtonIcon from "src/components/base/styles/button-icon"
import { CardAddActionDashed } from "src/components/base/styles/card"

type Item = {
    cc: string
    expires: string
    id: number
    image: string
    title: string
}

export default function MyCardsSelect() {
    const theme = useTheme()
    const { t } = useTranslation()

    const items: Item[] = [
        {
            cc: "6979",
            expires: "12/25",
            id: 1,
            image: "/placeholders/logo/visa.png",
            title: t("Visa"),
        },
        {
            cc: "5724",
            expires: "06/26",
            id: 2,
            image: "/placeholders/logo/mastercard.png",
            title: t("Mastercard"),
        },
    ]

    const [selectedValue, setSelectedValue] = useState<number>(items[0].id)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(parseInt(event.target.value, 10))
    }

    const handleDelete = () => {
        toast.success("Card Has Been Removed Successfully")
    }

    return (
        <Grid columns={24} container spacing={2}>
            {items.map((item) => (
                <Grid key={item.id} lg={9} md={12} xs={24}>
                    <Card
                        elevation={0}
                        sx={{
                            border: 0,
                            position: "relative",
                        }}
                    >
                        <ListItemButton
                            onClick={() => setSelectedValue(item.id)}
                            selected={selectedValue === item.id}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "background.paper",
                                    boxShadow: `0 0 0 1px ${theme.palette.primary.main} inset`,
                                },
                                "&.Mui-selected": {
                                    "&:hover": {
                                        backgroundColor: "background.paper",
                                    },
                                    backgroundColor: "background.paper",

                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main} inset`,
                                },
                                background:
                                    theme.palette.mode === "dark"
                                        ? theme.palette.neutral[900]
                                        : theme.palette.neutral[50],
                                borderRadius: "inherit",
                                boxShadow: `0 0 0 1px ${theme.palette.divider} inset`,

                                flexDirection: "column",

                                p: "1px",
                            }}
                        >
                            <Box alignItems="center" display="flex" pb={1} pt={2} px={2} width="100%">
                                <Card
                                    elevation={8}
                                    sx={{
                                        display: "flex",
                                        img: {
                                            height: 28,
                                            width: "auto",
                                        },
                                        mr: 2,
                                        px: item.id === 2 ? 2 : 1,
                                        py: 1.5,
                                    }}
                                >
                                    <Image alt={item.title} height={24} src={item.image} width={24} />
                                </Card>
                                <Box flex={1}>
                                    <Typography fontWeight={500} gutterBottom lineHeight={1} variant="h4">
                                        •••• {item.cc}
                                    </Typography>
                                    <Typography color="text.secondary" fontWeight={500} variant="h6">
                                        {t("Expires")}:{" "}
                                        <Typography color="text.primary" component="span" variant="h6">
                                            {item.expires}
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Box>
                            <Stack alignItems="center" direction="row" px={2} py={1} width="100%">
                                <Radio
                                    checked={selectedValue === item.id}
                                    color="primary"
                                    edge="start"
                                    inputProps={{ "aria-label": `Set${item.title}as primary card` }}
                                    name="radio-buttons"
                                    onChange={handleChange}
                                    size="small"
                                    value={item.id}
                                />
                                <Typography noWrap variant="h6">
                                    {t("Primary")}
                                </Typography>
                            </Stack>
                            <Tooltip arrow title={t("Remove this card")}>
                                <ButtonIcon
                                    color="error"
                                    onClick={() => handleDelete()}
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        right: theme.spacing(1),
                                        top: theme.spacing(1),
                                    }}
                                    variant="outlined"
                                >
                                    <DeleteTwoToneIcon fontSize="small" />
                                </ButtonIcon>
                            </Tooltip>
                        </ListItemButton>
                    </Card>
                </Grid>
            ))}
            <Grid lg={6} xs={24}>
                <CardAddActionDashed elevation={0} sx={{ flex: 1, minWidth: 160 }} variant="outlined">
                    <CardActionArea>
                        <CardContent>
                            <Stack alignItems="center" direction="column" justifyContent="center" spacing={0.5}>
                                <AddRoundedIcon
                                    sx={{
                                        color: "primary.main",
                                    }}
                                />
                                <Box>
                                    <Typography textAlign="center" variant="h5">
                                        Add new card
                                    </Typography>
                                    <Typography color="text.secondary" textAlign="center" variant="subtitle1">
                                        Click to add a new card
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </CardAddActionDashed>
            </Grid>
        </Grid>
    )
}
