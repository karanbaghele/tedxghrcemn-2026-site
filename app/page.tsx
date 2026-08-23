import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "TEDxGHRCEMN 2026 — Beyond the Dots",
  description: "TEDxGHRCEMN — Beyond the Dots, 9 September 2026 at G H Raisoni College of Engineering and Management, Nagpur.",
};

export default function HomePage() { return <SiteShell path="/" />; }
