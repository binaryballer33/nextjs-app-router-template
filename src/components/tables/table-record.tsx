import { flexRender } from "@tanstack/react-table";
import { TableCell, TableRow } from "../ui/table";

interface TableRecordProps {
  table: any;
}

export default function TableRecord({ table }: TableRecordProps) {
  return (
    <>
      {table.getRowModel().rows.map((row: any) => (
        <TableRow
          data-state={row.getIsSelected() && "selected"}
          key={row.id}
        >
          {row.getVisibleCells().map((cell: any) => (
            <TableCell key={cell.id}>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
