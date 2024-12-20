import type { FilterOperation } from "@/types/table/filters"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type FilterOperationsProps = {
    onOperationChange: (operation: FilterOperation) => void
    operations: { label: string; value: FilterOperation }[]
    selectedOperation: FilterOperation
}

export default function FilterOperations({ onOperationChange, operations, selectedOperation }: FilterOperationsProps) {
    return (
        <RadioGroup
            className="grid grid-cols-2 gap-2"
            onValueChange={(valueChange) => onOperationChange(valueChange as FilterOperation)}
            value={selectedOperation}
        >
            {operations.map((op) => (
                <div className="flex items-center space-x-2" key={op.value}>
                    <RadioGroupItem id={op.value} value={op.value} />
                    <Label htmlFor={op.value}>{op.label}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}
