"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icon, IconArrowLeft } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import Text from "./ui/text"

export type MainLayoutProps = {
    children: React.ReactNode
    className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
    return (
        <main
            className={cn(
                "mx-auto flex min-h-dvh w-full flex-col items-center gap-4 p-4 py-12 md:p-5",
                className
            )}
        >
            {children}
        </main>
    )
}

export function MainLayoutContent({ children, className }: MainLayoutProps) {
    return (
        <div
            className={cn(
                "flex w-full max-w-7xl flex-col gap-4 rounded-xl bg-white p-5 2xl:p-7",
                className
            )}
        >
            {children}
        </div>
    )
}

type MainLayoutHeaderProps = {
    title: string
    button?: {
        label: string
        href: string
        icon: Icon
    }
    className?: string
    back?: boolean
    backUrl?: string
}

export function MainLayoutHeader({
    title,
    button,
    className,
    back,
    ...props
}: MainLayoutHeaderProps) {
    const router = useRouter()

    return (
        <header
            className={cn(
                "flex w-full max-w-7xl items-center justify-between pt-5",
                className
            )}
        >
            <div className="flex items-center gap-2 text-gray-600">
                {back && (
                    <Button
                        onClick={() => props.backUrl ? router.push(props.backUrl) : router.back()}
                        variant="ghost"
                        size="sm"
                        className="hover:brightness-125"
                    >
                        <IconArrowLeft />
                    </Button>
                )}
                <Text variant="smallheading" className="text-center">
                    {title}
                </Text>
            </div>
            {button && (
                <Button asChild className="gap-2">
                    <Link href={button.href}>
                        <span>{button.label}</span>
                        <button.icon size={18} />
                    </Link>
                </Button>
            )}
        </header>
    )
}
