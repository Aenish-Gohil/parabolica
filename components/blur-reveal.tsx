"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function BlurReveal({
    children,
    className,
    delay = 0,
}: BlurRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(15px)", y: 30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 1.2, 
                delay, 
                ease: [0.22, 1, 0.36, 1] // Cubic bezier for smoothness
            }}
            className={cn("will-change-[opacity,filter,transform]", className)}
        >
            {children}
        </motion.div>
    );
}
