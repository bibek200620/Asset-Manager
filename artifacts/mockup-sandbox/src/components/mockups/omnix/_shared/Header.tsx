import React, { useState } from "react";
import { Bell, Plus, FileText, Globe, Zap } from "lucide-react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = "AI Chat", subtitle }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { text: "Sarah shared a new document", time: "2m ago", Icon: FileText, color: "var(--omnix-blue)" },
    { text: "AI completed your research task", time: "5m ago", Icon: Zap, color: "var(--omnix-cyan)" },
    { text: "3 new members joined workspace", time: "1h ago", Icon: Globe, color: "var(--omnix-green)" },
  ];

  return (
    <header style={{
      height: "var(--omnix-header-h)",
      background: "rgba(5,12,23,0.96)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--omnix-border)",
      display: "flex", alignItems: "center",
      padding: "0 20px", gap: 12,
      position: "relative", zIndex: 10, flexShrink: 0,
    }}>
      {/* Title */}
      <div style={{ flex: 1 }}>
        <div style={{ color: "var(--omnix-text)", fontFamily: "var(--omnix-font-display)", fontWeight: 600, fontSize: 15, letterSpacing: "0.01em" }}>{title}</div>
        {subtitle && <div style={{ color: "var(--omnix-text-3)", fontSize: 10, letterSpacing: "0.03em", marginTop: 1 }}>{subtitle}</div>}
      </div>

      {/* Right side actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

        {/* Notification Bell */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              width: 34, height: 34, borderRadius: 9,
              background: notifOpen ? "var(--omnix-surface-2)" : "var(--omnix-surface)",
              border: `1px solid ${notifOpen ? "var(--omnix-border-2)" : "var(--omnix-border)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative", transition: "all 0.15s",
              color: "var(--omnix-text-2)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-active)"; e.currentTarget.style.boxShadow = "var(--omnix-glow-xs)"; }}
            onMouseLeave={e => { if (!notifOpen) { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.boxShadow = "none"; } }}
          >
            <Bell size={15} />
            <div style={{
              position: "absolute", top: 7, right: 7, width: 6, height: 6, borderRadius: "50%",
              background: "var(--omnix-cyan)", border: "1.5px solid #050c17",
              boxShadow: "0 0 6px rgba(0,255,255,0.8)",
            }} />
          </button>

          {notifOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0, width: 290,
              background: "#07131f",
              border: "1px solid var(--omnix-border-2)",
              borderRadius: "var(--omnix-radius)",
              boxShadow: "0 24px 48px rgba(0,0,0,0.7), var(--omnix-glow-xs)",
              overflow: "hidden", animation: "omnix-slide-in 0.15s ease", zIndex: 100,
            }}>
              <div style={{ padding: "11px 14px", borderBottom: "1px solid var(--omnix-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 13, fontFamily: "var(--omnix-font-display)" }}>Notifications</span>
                <span style={{ color: "var(--omnix-cyan)", fontSize: 11, cursor: "pointer", letterSpacing: "0.02em" }}>Mark all read</span>
              </div>
              {notifications.map((n, i) => (
                <div key={i} style={{
                  padding: "10px 14px", borderBottom: i < notifications.length - 1 ? "1px solid var(--omnix-border)" : "none",
                  display: "flex", gap: 10, cursor: "pointer", alignItems: "flex-start", transition: "background 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                    background: `${n.color}18`, border: `1px solid ${n.color}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <n.Icon size={13} color={n.color} />
                  </div>
                  <div>
                    <div style={{ color: "var(--omnix-text)", fontSize: 12, lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 10, marginTop: 3 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "var(--omnix-border)" }} />

        {/* New Chat */}
        <button style={{
          height: 34, padding: "0 14px", borderRadius: 9,
          background: "transparent",
          border: "1px solid var(--omnix-cyan)",
          color: "var(--omnix-cyan)",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          transition: "all 0.2s", fontFamily: "var(--omnix-font)",
          boxShadow: "var(--omnix-glow-xs)", letterSpacing: "0.02em",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.1)"; e.currentTarget.style.boxShadow = "var(--omnix-glow-sm)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "var(--omnix-glow-xs)"; e.currentTarget.style.transform = ""; }}
        >
          <Plus size={14} strokeWidth={2.5} />
          New Chat
        </button>

        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#050c17",
          cursor: "pointer",
          border: "1.5px solid rgba(0,255,255,0.4)",
          boxShadow: "0 0 12px rgba(0,255,255,0.25)",
          userSelect: "none",
        }}>A</div>
      </div>
    </header>
  );
}
