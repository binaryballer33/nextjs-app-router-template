
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from 'lucide-react';


type ColumnDropdownMenuProps = {
    column: any
}

export default function ColumnDropdownMenu(props: ColumnDropdownMenuProps) {
    const { column } = props

    return  (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={column.getIsSorted() === "asc" ? "bg-primary text-primary-foreground" : ""}
                onClick={() => column.toggleSorting("asc")}
              >
                Sort Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                className={column.getIsSorted() === "desc" ? "bg-primary text-primary-foreground" : ""}
                onClick={() => column.toggleSorting("desc")}
              >
                Sort Descending
              </DropdownMenuItem>
              <DropdownMenuItem
                className={!column.getIsSorted() ? "bg-primary text-primary-foreground" : ""}
                onClick={() => column.toggleSorting(false)}
              >
                Clear Sorting
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}


