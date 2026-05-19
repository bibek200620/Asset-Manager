import React, { useState } from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const aiModes = [
  { id: "deep", label: "Deep Think", icon: "◈", color: "#6366f1" },
  { id: "fast", label: "Fast", icon: "⚡", color: "#f59e0b" },
  { id: "web", label: "Web Search", icon: "⊙", color: "#22c55e" },
];

export function Header({ title = "AI Chat", subtitle }: HeaderProps) {
  const [activeMode, setActiveMode] = useState("fast");
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header style={{
      height: "var(--omnix-header-h)",
      background: "rgba(6,8,16,0.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--omnix-border)",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      gap: 16,
      position: "relative",
      zIndex: 10,
      flexShrink: 0,
    }}>
      {/* Title area */}
      <div style={{ flex: 1 }}>
        <div style={{ color: "var(--omnix-text)", fontFamily: "var(--omnix-font-display)", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>{title}</div>
        {subtitle && <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{subtitle}</div>}
      </div>

      {/* AI Mode Selector */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: "var(--omnix-surface)",
        border: "1px solid var(--omnix-border)",
        borderRadius: 20,
        padding: "3px",
      }}>
        {aiModes.map((mode) => {
          const isActive = mode.id === activeMode;
          return (
            <button key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              style={{
                padding: "4px 10px",
                borderRadius: 16,
                border: "none",
                background: isActive ? `${mode.color}22` : "transparent",
                display: "flex",
                alignItems: "center",
                gap: 5,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: isActive ? `0 0 8px ${mode.color}44` : "none",
                outline: isActive ? `1px solid ${mode.color}44` : "none",
              }}
            >
              <span style={{ fontSize: 11, color: isActive ? mode.color : "var(--omnix-text-3)" }}>{mode.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? mode.color : "var(--omnix-text-3)", fontFamily: "var(--omnix-font)" }}>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Notification bell */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "var(--omnix-surface)",
              border: "1px solid var(--omnix-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 14,
              color: "var(--omnix-text-2)",
              position: "relative",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-hover)"; e.currentTarget.style.borderColor = "var(--omnix-border-active)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.borderColor = "var(--omnix-border)"; }}
          >
            🔔
            <div style={{
              position: "absolute",
              top: 6,
              right: 7,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#ec4899",
              border: "1.5px solid var(--omnix-bg)",
              boxShadow: "0 0 6px #ec489988",
            }} />
          </button>

          {notifOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              width: 280,
              background: "#0a0e1a",
              border: "1px solid var(--omnix-border)",
              borderRadius: "var(--omnix-radius)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6), var(--omnix-glow-sm)",
              overflow: "hidden",
              animation: "omnix-slide-in 0.15s ease",
              zIndex: 100,
            }}>
              <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--omnix-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 13 }}>Notifications</span>
                <span style={{ color: "var(--omnix-purple)", fontSize: 11, cursor: "pointer" }}>Mark all read</span>
              </div>
              {[
                { text: "Sarah shared a new document", time: "2m ago", color: "#6366f1", icon: "📄" },
                { text: "AI completed your research task", time: "5m ago", color: "#22c55e", icon: "✦" },
                { text: "3 new members joined workspace", time: "1h ago", color: "#f59e0b", icon: "👥" },
              ].map((n, i) => (
                <div key={i} style={{
                  padding: "10px 14px",
                  borderBottom: i < 2 ? "1px solid var(--omnix-border)" : "none",
                  display: "flex",
                  gap: 10,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{n.icon}</span>
                  <div>
                    <div style={{ color: "var(--omnix-text)", fontSize: 12 }}>{n.text}</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New Chat */}
        <button style={{
          padding: "6px 14px",
          borderRadius: 20,
          background: "var(--omnix-grad-primary)",
          border: "none",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          boxShadow: "var(--omnix-glow-sm)",
          transition: "all 0.2s",
          fontFamily: "var(--omnix-font)",
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--omnix-glow-md)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--omnix-glow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <span style={{ fontSize: 14 }}>+</span> New Chat
        </button>

        {/* Avatar */}
        <div style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          cursor: "pointer",
          border: "2px solid rgba(99,102,241,0.4)",
          boxShadow: "var(--omnix-glow-sm)",
          flexShrink: 0,
        }}>A</div>
      </div>
    </header>
  );
}
