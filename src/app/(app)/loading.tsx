"use client"
// components/SkeletonLoader.tsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

// Skeleton Component
const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={cn("bg-gray-300 rounded-md", className)} />
    );
};

// Page Skeleton Loader Component
export default function SkeletonLoader() {
    return (
        <div className="space-y-6 p-4 max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.8, 0.4, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity }}
            >
                <Skeleton className="h-10 w-1/2 mb-6" />
            </motion.div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: [0.8, 0.4, 0.8] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    >
                        <div className="p-4 border rounded-lg bg-white shadow-sm">
                            <Skeleton className="h-40 w-full mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Table Skeleton */}
            <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.8, 0.4, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity }}
            >
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center bg-gray-100 p-3">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-6 w-1/6" />
                    </div>
                    <div className="p-4 space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-4 w-1/4" />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
