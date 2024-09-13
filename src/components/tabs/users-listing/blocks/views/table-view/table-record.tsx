import type { YuGiOhCard } from "src/types/yu-gi-oh/yu-gi-oh"

import Image from "next/image"

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone"

import {
    Box,
    Card,
    Checkbox,
    Chip,
    IconButton,
    Link,
    styled,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material"

import getYugiohFrameTypeColor from "src/utils/helper-functions/getYuGiOhFrameTypeColor"

import FlexCenter from "src/components/base/flex-box/flex-center"

const TableCellWrapper = styled(TableCell)(
    () => `
    padding: 8px
    `,
)

type TableRowProps = {
    handleSelectOneRecord: (event: any, id: string) => void
    record: YuGiOhCard
    selectedRecords: string[]
    t: (token: string) => string
}

export default function TableRecord(props: TableRowProps) {
    const { handleSelectOneRecord, record, selectedRecords, t } = props
    const isRecordSelected = selectedRecords.includes(record.id.toString())

    return (
        //  Create The Table Row For Each Record
        <TableRow hover key={record.id} selected={isRecordSelected}>
            <TableCell padding="checkbox">
                {/* Checkbox For Each Record */}
                <Checkbox
                    checked={isRecordSelected}
                    onChange={(event) => handleSelectOneRecord(event, record.id.toString())}
                    value={isRecordSelected}
                />
            </TableCell>

            {/* Record Image Column  */}
            <TableCellWrapper>
                <Box alignItems="center" display="flex">
                    <div
                        style={{
                            height: "50px !important",
                            objectFit: "cover",
                            width: "50px !important",
                        }}
                    >
                        <Image alt={record.name} height={50} priority src={record.imageUrl} width={50} />
                    </div>
                </Box>
            </TableCellWrapper>

            {/* Record Name Column */}
            <TableCellWrapper>
                <Box>
                    <Link fontWeight={500} href={record.ygoprodeck_url} underline="hover" variant="subtitle2">
                        {record.name}
                    </Link>
                </Box>
            </TableCellWrapper>

            {/* Record Card Frame Type Column */}
            <TableCellWrapper>
                <FlexCenter justifyContent="start">
                    <Chip
                        // TODO: put these colors into your light and dark theme later
                        // color={getYugiohFrameTypeColor(card.frameType)}
                        label={t(record.frameType)}
                        sx={{ bgcolor: getYugiohFrameTypeColor(record.frameType) }}
                    />
                </FlexCenter>
            </TableCellWrapper>

            {/* Record Description Column */}
            <TableCellWrapper sx={{ maxHeight: 50, overflow: "scroll", padding: 0 }}>
                <Card elevation={1} sx={{ p: 1 }}>
                    <Typography
                        sx={{
                            display: "block",
                            maxHeight: 50,
                            overflow: "scroll",
                        }}
                    >
                        {record.desc}
                    </Typography>
                </Card>
            </TableCellWrapper>

            {/* Record Archetype Column */}
            <TableCellWrapper>
                <Typography>{t(` ${(record.archetype as string) ?? "None"}`)}</Typography>
            </TableCellWrapper>

            {/* Record Price Column */}
            <TableCellWrapper>
                <Chip color="primary" label={t(`$${record.price}`)} />
            </TableCellWrapper>

            {/* Record Number Column */}
            <TableCellWrapper align="center">
                <Typography fontWeight={600}>{record.id}</Typography>
            </TableCellWrapper>

            {/* Record Actions Column */}
            <TableCellWrapper align="center">
                <Typography noWrap>
                    {/* Open Action Icon */}
                    <Tooltip arrow title={t("View")}>
                        <IconButton color="secondary">
                            <LaunchTwoToneIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    {/* Edit Record Action Icon */}
                    <Tooltip arrow title={t("Delete")}>
                        <IconButton color="secondary">
                            <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </TableCellWrapper>
        </TableRow>
    )
}
