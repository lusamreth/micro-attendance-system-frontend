"use client"

import { useParams } from "next/navigation"
import PaymentForm from "./camera-create-form"
import { Case, Default, Switch } from "react-if"
import Text from "@/components/ui/text"
import { IconFileSad } from "@tabler/icons-react"
import PaymentPageSkeleton from "./skeleton"

export default function CameraContent() {
    const { id } = useParams<{ id: string }>()
    const payment = "a"
    const isLoading = false
    const paymentNotFound = id !== "create" && !payment && !isLoading
    return (

        <Switch>
            <Case condition={isLoading}>
                <PaymentPageSkeleton />
            </Case>
            <Case condition={paymentNotFound}>
                <NotFound />
            </Case>

            <Default>
                <PaymentForm />
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
