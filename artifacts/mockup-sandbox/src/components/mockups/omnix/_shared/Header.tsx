import React, { useState } from "react";

const aiModes = [
  { id: "deep",   label: "Deep Think",  icon: "◈", color: "#9b5cff" },
  { id: "fast",   label: "Fast",        icon: "⚡", color: "#00FFFF" },
  { id: "web",    label: "Web Search",  icon: "⊙", color: "#00e87a" },
];

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = "AI Chat", subtitle }: HeaderProps) {
  const [activeMode, setActiveMode] = useState("fast");
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header style={{
      height: "var(--omnix-header-h)",
      background: "rgba(5,12,23,0.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--omnix-border)",
      display: "flex", alignItems: "center",
      padding: "0 20px", gap: 16, position: "relative", zIndex: 10, flexShrink: 0,
    }}>
      {/* Scan line effect */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
        background: "linear-gradient(180deg, transparent 45%, rgba(0,255,255,0.02) 50%, transparent 55%)",
      }} />

      {/* Title */}
      <div style={{ flex: 1 }}>
        <div style={{ color: "var(--omnix-text)", fontFamily: "var(--omnix-font-display)", fontWeight: 600, fontSize: 15, letterSpacing: "0.01em" }}>{title}</div>
        {subtitle && <div style={{ color: "var(--omnix-text-3)", fontSize: 10, letterSpacing: "0.03em" }}>{subtitle}</div>}
      </div>

      {/* AI Mode Selector */}
      <div style={{
        display: "flex", alignItems: "center", gap: 2,
        background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
        borderRadius: 20, padding: "3px",
      }}>
        {aiModes.map((mode) => {
          const isActive = mode.id === activeMode;
          return (
            <button key={mode.id} onClick={() => setActiveMode(mode.id)} style={{
              padding: "4px 11px", borderRadius: 16, border: "none",
              background: isActive ? `${mode.color}18` : "transparent",
              display: "flex", alignItems: "center", gap: 5, cursor: "pointer",
              transition: "all 0.2s",
              outline: isActive ? `1px solid ${mode.color}44` : "none",
              boxShadow: isActive ? `0 0 10px ${mode.color}33` : "none",
            }}>
              <span style={{ fontSize: 11, color: isActive ? mode.color : "var(--omnix-text-3)" }}>{mode.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? mode.color : "var(--omnix-text-3)", fontFamily: "var(--omnix-font)", letterSpacing: "0.01em" }}>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setNotifOpen(!notifOpen)} style={{
            width: 34, height: 34, borderRadius: 9,
            background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 14, color: "var(--omnix-text-2)",
            position: "relative", transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-active)"; e.currentTarget.style.boxShadow = "var(--omnix-glow-xs)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            🔔
            <div style={{
              position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: "50%",
              background: "var(--omnix-cyan)",
              border: "1.5px solid #050c17",
              boxShadow: "0 0 6px rgba(0,255,255,0.7)",
              animation: "omnix-glow-pulse 2s ease-in-out infinite",
            }} />
          </button>

          {notifOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0, width: 280,
              background: "#08162b",
              border: "1px solid var(--omnix-border-2)",
              borderRadius: "var(--omnix-radius)",
              boxShadow: "0 24px 48px rgba(0,0,0,0.7), var(--omnix-glow-xs)",
              overflow: "hidden", animation: "omnix-slide-in 0.15s ease", zIndex: 100,
            }}>
              <div style={{ padding: "11px 14px", borderBottom: "1px solid var(--omnix-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 13 }}>Notifications</span>
                <span style={{ color: "var(--omnix-cyan)", fontSize: 11, cursor: "pointer" }}>Mark all read</span>
              </div>
              {[
                { text: "Sarah shared a new document", time: "2m ago", icon: "📄" },
                { text: "AI completed your research task", time: "5m ago", icon: "◈" },
                { text: "3 new members joined workspace", time: "1h ago", icon: "👥" },
              ].map((n, i) => (
                <div key={i} style={{
                  padding: "10px 14px", borderBottom: i < 2 ? "1px solid var(--omnix-border)" : "none",
                  display: "flex", gap: 10, cursor: "pointer", transition: "background 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontSize: 15, flexShrink: 0 }}>{n.icon}</span>
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
          padding: "6px 14px", borderRadius: 20,
          background: "transparent",
          border: "1px solid var(--omnix-cyan)",
          color: "var(--omnix-cyan)",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 5,
          transition: "all 0.2s", fontFamily: "var(--omnix-font)",
          boxShadow: "var(--omnix-glow-xs)",
          letterSpacing: "0.02em",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.1)"; e.currentTarget.style.boxShadow = "var(--omnix-glow-sm)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "var(--omnix-glow-xs)"; e.currentTarget.style.transform = ""; }}
        >
          <span style={{ fontSize: 14 }}>+</span> New Chat
        </button>

        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#050c17",
          cursor: "pointer",
          border: "1.5px solid rgba(0,255,255,0.4)",
          boxShadow: "0 0 12px rgba(0,255,255,0.3)",
        }}>A</div>
      </div>
    </header>
  );
}
