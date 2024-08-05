import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material"

type TableColumnsProps = {
    selectedSomeRecords: boolean
    selectedAllRecords: boolean
    handleSelectAllRecords: (event: any) => void
    t: (token: string) => string
}

export default function TableColumns(props: TableColumnsProps) {
    const { selectedSomeRecords, selectedAllRecords, handleSelectAllRecords, t } = props
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={selectedAllRecords}
                        indeterminate={selectedSomeRecords}
                        onChange={handleSelectAllRecords}
                    />
                </TableCell>
                <TableCell>{t("Image")}</TableCell>
                <TableCell>{t("Name")}</TableCell>
                <TableCell>{t("Frame")}</TableCell>
                <TableCell>{t("Effect")}</TableCell>
                <TableCell>{t("Archetype")}</TableCell>
                <TableCell>{t("Price")}</TableCell>
                <TableCell align="center">{t("Card #")}</TableCell>
                <TableCell align="center">{t("Actions")}</TableCell>
            </TableRow>
        </TableHead>
    )
}
