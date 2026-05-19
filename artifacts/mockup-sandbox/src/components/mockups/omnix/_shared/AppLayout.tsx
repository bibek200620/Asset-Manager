import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import "../_group.css";

interface AppLayoutProps {
  children: React.ReactNode;
  activePage?: string;
  headerTitle?: string;
  headerSubtitle?: string;
}

export function AppLayout({ children, activePage, headerTitle, headerSubtitle }: AppLayoutProps) {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "var(--omnix-bg)",
      backgroundImage: "var(--omnix-grad-bg)",
      display: "flex",
      fontFamily: "var(--omnix-font)",
      color: "var(--omnix-text)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Deep background grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <Sidebar activePage={activePage} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <Header title={headerTitle} subtitle={headerSubtitle} />
        <main style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
