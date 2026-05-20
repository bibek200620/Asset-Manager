import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
}

export function AppLayout({ children, headerTitle, headerSubtitle }: AppLayoutProps) {
  return (
    <div style={{
      width: "100%", height: "100vh",
      background: "var(--omnix-bg)",
      backgroundImage: "var(--omnix-grad-bg)",
      display: "flex",
      fontFamily: "var(--omnix-font)",
      color: "var(--omnix-text)",
      overflow: "hidden", position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(0,255,255,0.08) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        pointerEvents: "none", zIndex: 0, opacity: 0.5,
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, width: 400, height: 400,
        background: "radial-gradient(circle at top right, rgba(0,0,255,0.07) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <Header title={headerTitle} subtitle={headerSubtitle} />
        <main style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
