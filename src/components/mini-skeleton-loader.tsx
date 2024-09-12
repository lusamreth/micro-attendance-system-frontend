// components/MiniSkeletonLoader.tsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

// Reusable Skeleton Component
const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={cn("bg-gray-300 rounded-md", className)} />
    );
};

// Mini Skeleton Loader for individual components
export default function MiniSkeletonLoader() {
    return (
        <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="flex flex-col space-y-3 p-4 border rounded-lg bg-white shadow-sm"
        >
            {/* Skeleton Image */}
            <Skeleton className="h-24 w-full mb-2" />

            {/* Skeleton Title */}
            <Skeleton className="h-6 w-3/4" />

            {/* Skeleton Button */}
            <Skeleton className="h-10 w-1/2" />
        </motion.div>
    );
}
