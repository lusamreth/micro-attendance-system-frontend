import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentPageSkeleton() {
    return (
        <div className="grid w-full grid-cols-2 gap-x-5 gap-y-7">
            <Skeleton.Input />
            <Skeleton.Input />
            <Skeleton.Input />
            <Skeleton.Input />

            <Skeleton.Input className="col-span-full" />
            <Skeleton.Input className="col-span-full" inputClassName="h-20" />

            <div className="col-span-full flex gap-5">
                <Skeleton.Button className="bg-rose-100" />
                <Skeleton.Button className="bg-primary/20" />
            </div>
        </div>
    )
}
