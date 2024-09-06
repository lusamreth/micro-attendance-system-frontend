"use client"

import { SWRConfig } from "swr"

export function SWRProvider({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                keepPreviousData: true,
                shouldRetryOnError: false,
            }}
        >
            {children}
        </SWRConfig>
    )
}
