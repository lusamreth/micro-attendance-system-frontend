import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontalIcon } from "lucide-react"

export default function ActionDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 hover:text-red-700">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
