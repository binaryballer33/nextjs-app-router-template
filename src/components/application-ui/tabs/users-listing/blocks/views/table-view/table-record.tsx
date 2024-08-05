import Image from "next/image"

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone"
import { Box, Card, Checkbox, Chip, IconButton, Link, TableCell, TableRow, Tooltip, Typography } from "@mui/material"

import { YuGiOhCard } from "src/models/cards/yu-gi-oh"

type TableRowProps = {
    record: YuGiOhCard
    selectedRecords: string[]
    handleSelectOneRecord: (event: any, id: string) => void
    t: (token: string) => string
}

export default function TableRecord(props: TableRowProps) {
    const { record, selectedRecords, handleSelectOneRecord, t } = props
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
            <TableCell>
                <Box display="flex" alignItems="center">
                    <div
                        style={{
                            height: "50px !important",
                            width: "50px !important",
                            objectFit: "cover",
                        }}
                    >
                        <Image
                            alt={record.name}
                            src={record.card_images[0].image_url}
                            height={50}
                            width={50}
                            priority
                        />
                    </div>
                </Box>
            </TableCell>

            {/* Record Name Column */}
            <TableCell>
                <Box>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link variant="subtitle2" fontWeight={500} href={record.ygoprodeck_url} underline="hover">
                        {record.name}
                    </Link>
                </Box>
            </TableCell>

            {/* Record Card Frame Type Column */}
            <TableCell>
                <Typography fontWeight={400}>{record.frameType}</Typography>
            </TableCell>

            {/* Record Description Column */}
            <TableCell sx={{ maxHeight: 50, overflow: "scroll" }}>
                <Card elevation={1} sx={{ p: 1 }}>
                    <Typography
                        sx={{
                            maxHeight: 50,
                            display: "block",
                            overflow: "scroll",
                        }}
                    >
                        {record.desc}
                    </Typography>
                </Card>
            </TableCell>

            {/* Record Archetype Column */}
            <TableCell>
                <Typography>{t(` ${(record.archetype as string) ?? "None"}`)}</Typography>
            </TableCell>

            {/* Record Price Column */}
            <TableCell>
                <Chip color="primary" label={t(`$${record.card_prices[0].tcgplayer_price}`)} />
            </TableCell>

            {/* Record Number Column */}
            <TableCell align="center">
                <Typography fontWeight={600}>{record.id}</Typography>
            </TableCell>

            {/* Record Actions Column */}
            <TableCell align="center">
                <Typography noWrap>
                    {/* Open Action Icon */}
                    <Tooltip title={t("View")} arrow>
                        <IconButton color="secondary">
                            <LaunchTwoToneIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    {/* Edit Record Action Icon */}
                    <Tooltip title={t("Delete")} arrow>
                        <IconButton color="secondary">
                            <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </TableCell>
        </TableRow>
    )
}
