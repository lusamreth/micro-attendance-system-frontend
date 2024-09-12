"use client"
import { useParams } from "next/navigation"
import StudentForm from "./create-form"
import { Case, Default, Switch } from "react-if"
import Text from "@/components/ui/text"
import { IconFileSad } from "@tabler/icons-react"
import StudentLoadingSkeleton from "./skeleton"
import StudentDetail from "./detail"

export default function StudentContent() {
    const { id } = useParams<{ id: string }>()
    const cams = "a"
    const isLoading = false
    const cameraNotFound = id !== "create" && !cams && !isLoading
    const notCreated = id !== "create"
    return (

        <Switch>
            <Case condition={isLoading}>
                <StudentLoadingSkeleton />
            </Case>

            <Case condition={notCreated}>
                <StudentDetail />
            </Case>

            <Default>
                <StudentForm />
            </Default>
        </Switch>
    )
}


export function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <IconFileSad size={38} />
            <Text variant="title">Not Found</Text>
            <Text className="py-3 text-center leading-relaxed">
                Looks like the payment that
                <br />
                you are looking for does not exist.
            </Text>
        </div>
    )
}
