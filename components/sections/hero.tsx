"use client";

import { useRef, useState, useCallback } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { ArrowRight, Mouse } from "lucide-react";
import { ContactModal } from "@/components/contact-modal";
import { HeroScrollSlider } from "@/components/3d/hero-scroll-slider";

export default function Hero() {
    const [contactOpen, setContactOpen] = useState(false);

    return (
        <section
            className="relative w-full"
            id="home"
        >
            {/* The Multi-Pair Scroll Slider (Pinned) - Text is now inside here! */}
            <HeroScrollSlider />

            <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
        </section>
    );
}