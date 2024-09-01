import Image from "next/image"

import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone"
import type { Theme } from "@mui/material"
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
import clsx from "clsx"

import FlexCenter from "src/components/base/flex-box/flex-center"
import type { YuGiOhCard } from "src/models/yu-gi-oh/yu-gi-oh"
import getYugiohFrameTypeColor from "src/utils/helper-functions/getYuGiOhFrameTypeColor"

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
    selectedRecords: string[]
    handleSelectOneRecord: (event: any, id: string) => void
    t: (token: string) => string
}

export default function GridCard(props: GridCard2Props) {
    const { card, selectedRecords, handleSelectOneRecord, t } = props
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
                <Box px={2} pt={2} display="flex" alignItems="flex-start" justifyContent="space-between">
                    <Link
                        href={card.ygoprodeck_url}
                        underline="hover"
                        sx={{
                            //  keep the name on only one line to maintain card height consistency
                            // TODO: steal ellipses code from other app I think its blazar
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
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
                <Box p={2} display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="flex-start">
                    {/* Create The Image */}
                    <Box
                        sx={{
                            mr: 1.5,
                            mb: { xs: 2, md: 0 },
                        }}
                    >
                        <Image src={card.imageUrl} alt="image" width={mdUp ? 180 : 250} height={250} priority />
                    </Box>

                    {/* Record Type, Description, Archetype, Price */}
                    <Box>
                        {/* Record Description */}
                        <Stack gap={1} justifyContent="space-around" height={250}>
                            <Chip
                                label={t(card.type)}
                                sx={{ mb: 2, maxWidth: "50%", bgcolor: getYugiohFrameTypeColor(card.frameType) }}
                            />

                            <Card elevation={1} sx={{ p: 1, height: 150, overflow: "scroll" }}>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: "scroll",
                                        height: 150,
                                    }}
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
                <Box pl={2} py={1} pr={1} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>
                        {t("Card #")} <b>{card.id}</b>
                    </Typography>

                    <FlexCenter>
                        {/* Record Price */}
                        <Typography variant="h6" fontWeight={500}>
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
