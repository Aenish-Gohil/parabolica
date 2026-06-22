import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F1 Live Hub & Technical Blog | Parabolica Studio",
  description: "Get real-time Formula 1 race updates, technical analysis of ground-effect aerodynamics, and the latest sim-racing news from Parabolica Terminal.",
  keywords: ["F1 Live", "Formula 1 Blogs", "Sim Racing Mumbai", "VR Gaming Surat", "Parabolica F1", "Ground Effect Physics"],
  openGraph: {
    title: "Parabolica F1 Intel & Blog",
    description: "The core of high-speed digital engineering. Stay synchronized with the grid.",
    images: ["/blog-hero.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
