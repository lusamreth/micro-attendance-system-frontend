import { cn } from "@/lib/utils"

export function SkeletonInput({
    className,
    inputClassName,
    hideLabel,
}: {
    className?: string
    inputClassName?: string
    hideLabel?: boolean
}) {
    return (
        <div className={cn("flex flex-col gap-2.5", className)}>
            {!hideLabel && (
                <div
                    className="skeleton h-3"
                    style={{
                        width: `${Math.floor(Math.random() * 100) + 50}px`,
                    }}
                ></div>
            )}
            <div className={cn("skeleton h-10", inputClassName)}></div>
        </div>
    )
}

export function SkeletonButton({ className }: { className?: string }) {
    return <div className={cn("skeleton h-10 w-full", className)}></div>
}

export const Skeleton = {
    Input: SkeletonInput,
    Button: SkeletonButton,
}
