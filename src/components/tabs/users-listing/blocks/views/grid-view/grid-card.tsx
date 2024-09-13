import type { Theme } from "@mui/material"
import type { YuGiOhCard } from "src/types/yu-gi-oh/yu-gi-oh"

import Image from "next/image"

import clsx from "clsx"

import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone"

import {
    Box,
    Card,
    Checkbox,
    Chip,
    Divider,
    IconButton,
    Link,
    Stack,
    styled,
    Typography,
    useMediaQuery,
} from "@mui/material"

import getYugiohFrameTypeColor from "src/utils/helper-functions/getYuGiOhFrameTypeColor"

import FlexCenter from "src/components/base/flex-box/flex-center"

export const CardWrapper = styled(Card)(
    ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
  }

    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.palette.primary.main};
    }
  `,
)

type GridCard2Props = {
    card: YuGiOhCard
    handleSelectOneRecord: (event: any, id: string) => void
    selectedRecords: string[]
    t: (token: string) => string
}

export default function GridCard(props: GridCard2Props) {
    const { card, handleSelectOneRecord, selectedRecords, t } = props
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))

    const isRecordSelected = selectedRecords.includes(card.id.toString())

    return (
        <CardWrapper
            className={clsx({
                "Mui-selected": isRecordSelected,
            })}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: "2",
                }}
            >
                {/* Create The Label Icon Button */}
                <Box alignItems="flex-start" display="flex" justifyContent="space-between" pt={2} px={2}>
                    <Link
                        href={card.ygoprodeck_url}
                        sx={{
                            //  keep the name on only one line to maintain card height consistency
                            // TODO: steal ellipses code from other app I think its blazar
                            display: "-webkit-box",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                        }}
                        underline="hover"
                    >
                        {card.name}
                    </Link>

                    <IconButton
                        color="primary"
                        sx={{
                            p: 0.5,
                        }}
                    >
                        <MoreVertTwoToneIcon />
                    </IconButton>
                </Box>

                {/* Create The Card Image, Record Type, Description, Archetype, Price */}
                <Box alignItems="flex-start" display="flex" flexDirection={{ md: "row", xs: "column" }} p={2}>
                    {/* Create The Image */}
                    <Box
                        sx={{
                            mb: { md: 0, xs: 2 },
                            mr: 1.5,
                        }}
                    >
                        <Image alt="image" height={250} priority src={card.imageUrl} width={mdUp ? 180 : 250} />
                    </Box>

                    {/* Record Type, Description, Archetype, Price */}
                    <Box>
                        {/* Record Description */}
                        <Stack gap={1} height={250} justifyContent="space-around">
                            <Chip
                                label={t(card.type)}
                                sx={{ bgcolor: getYugiohFrameTypeColor(card.frameType), maxWidth: "50%", mb: 2 }}
                            />

                            <Card elevation={1} sx={{ height: 150, overflow: "scroll", p: 1 }}>
                                <Typography
                                    color="text.secondary"
                                    component="span"
                                    sx={{
                                        height: 150,
                                        overflow: "scroll",
                                    }}
                                    variant="body2"
                                >
                                    {card.desc}
                                </Typography>
                            </Card>

                            {/* Record Archetype Title */}
                            <Typography
                                sx={{
                                    pt: 0.3,
                                }}
                                variant="subtitle2"
                            >
                                {t(`Archetype: ${(card.archetype as string) ?? ("None" as string)}`)}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Divider />
                {/* Record Id And Card Check Box */}
                <Box alignItems="center" display="flex" justifyContent="space-between" pl={2} pr={1} py={1}>
                    <Typography>
                        {t("Card #")} <b>{card.id}</b>
                    </Typography>

                    <FlexCenter>
                        {/* Record Price */}
                        <Typography fontWeight={500} variant="h6">
                            ${card.price}
                        </Typography>

                        <Checkbox
                            checked={isRecordSelected}
                            onChange={(event) => handleSelectOneRecord(event, card.id.toString())}
                            value={isRecordSelected}
                        />
                    </FlexCenter>
                </Box>
            </Box>
        </CardWrapper>
    )
}
