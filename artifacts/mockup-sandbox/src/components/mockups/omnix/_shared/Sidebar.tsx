import React, { useState } from "react";

const navItems = [
  { icon: "⊞", label: "Dashboard", active: false, badge: null },
  { icon: "✦", label: "AI Chat", active: true, badge: "3" },
  { icon: "◈", label: "Workspaces", active: false, badge: null },
  { icon: "⬡", label: "Team", active: false, badge: null },
  { icon: "⊙", label: "Sources", active: false, badge: null },
  { icon: "◎", label: "Analytics", active: false, badge: null },
];

const workspaces = [
  { name: "Omnix Labs", plan: "Pro", color: "#6366f1" },
  { name: "Design Studio", plan: "Team", color: "#ec4899" },
  { name: "Dev Space", plan: "Free", color: "#22c55e" },
];

interface SidebarProps {
  activePage?: string;
}

export function Sidebar({ activePage = "AI Chat" }: SidebarProps) {
  const [wsOpen, setWsOpen] = useState(false);
  const [currentWs, setCurrentWs] = useState(workspaces[0]);

  return (
    <aside style={{
      width: "var(--omnix-sidebar-w)",
      height: "100%",
      background: "rgba(6,8,16,0.98)",
      borderRight: "1px solid var(--omnix-border)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      flexShrink: 0,
      backdropFilter: "blur(20px)",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "200px",
        background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{
        padding: "20px 20px 16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderBottom: "1px solid var(--omnix-border)",
        position: "relative",
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: "var(--omnix-grad-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "var(--omnix-font-display)",
          boxShadow: "var(--omnix-glow-sm)",
          flexShrink: 0,
        }}>O</div>
        <div>
          <div style={{ color: "var(--omnix-text)", fontFamily: "var(--omnix-font-display)", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>Omnix</div>
          <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>AI Workspace</div>
        </div>
      </div>

      {/* Workspace Switcher */}
      <div style={{ padding: "12px 12px 8px" }}>
        <button
          onClick={() => setWsOpen(!wsOpen)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "var(--omnix-radius-sm)",
            background: "var(--omnix-surface)",
            border: "1px solid var(--omnix-border)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--omnix-surface-hover)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--omnix-surface)")}
        >
          <div style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: currentWs.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}>
            {currentWs.name[0]}
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, lineHeight: 1.2 }}>{currentWs.name}</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{currentWs.plan} Plan</div>
          </div>
          <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>⌄</div>
        </button>

        {wsOpen && (
          <div style={{
            marginTop: 4,
            borderRadius: "var(--omnix-radius-sm)",
            background: "#0e1424",
            border: "1px solid var(--omnix-border)",
            overflow: "hidden",
            animation: "omnix-slide-in 0.15s ease",
          }}>
            {workspaces.map((ws, i) => (
              <button key={i}
                onClick={() => { setCurrentWs(ws); setWsOpen(false); }}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  background: ws.name === currentWs.name ? "rgba(99,102,241,0.1)" : "transparent",
                  border: "none",
                  borderLeft: ws.name === currentWs.name ? `2px solid ${ws.color}` : "2px solid transparent",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (ws.name !== currentWs.name) e.currentTarget.style.background = "var(--omnix-surface)"; }}
                onMouseLeave={e => { if (ws.name !== currentWs.name) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ width: 20, height: 20, borderRadius: 5, background: ws.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>{ws.name[0]}</div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500 }}>{ws.name}</div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>{ws.plan}</div>
                </div>
                {ws.name === currentWs.name && <div style={{ color: ws.color, fontSize: 12 }}>✓</div>}
              </button>
            ))}
            <div style={{ borderTop: "1px solid var(--omnix-border)", padding: "6px" }}>
              <button style={{
                width: "100%",
                padding: "7px 8px",
                borderRadius: 6,
                background: "transparent",
                border: "none",
                color: "var(--omnix-text-3)",
                fontSize: 12,
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
              >
                <span style={{ fontSize: 14 }}>+</span> New Workspace
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "4px 12px", overflowY: "auto" }}>
        <div style={{ marginBottom: 6 }}>
          <div style={{ color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 8px 4px" }}>Navigation</div>
          {navItems.map((item, i) => {
            const isActive = item.label === activePage;
            return (
              <button key={i} style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "var(--omnix-radius-sm)",
                background: isActive ? "rgba(99,102,241,0.12)" : "transparent",
                border: isActive ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                marginBottom: 1,
                position: "relative",
                transition: "all 0.15s",
                boxShadow: isActive ? "var(--omnix-glow-sm)" : "none",
              }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "var(--omnix-surface)"; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; } }}
              >
                {isActive && (
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: "60%",
                    borderRadius: 2,
                    background: "var(--omnix-grad-primary)",
                    boxShadow: "var(--omnix-glow-sm)",
                  }} />
                )}
                <span style={{
                  fontSize: 14,
                  color: isActive ? "var(--omnix-purple-bright)" : "var(--omnix-text-2)",
                  width: 18,
                  textAlign: "center",
                }}>{item.icon}</span>
                <span style={{
                  flex: 1,
                  fontSize: 13,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--omnix-text)" : "var(--omnix-text-2)",
                  textAlign: "left",
                  fontFamily: "var(--omnix-font)",
                }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    background: isActive ? "var(--omnix-purple)" : "rgba(255,255,255,0.1)",
                    color: isActive ? "#fff" : "var(--omnix-text-2)",
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "1px 6px",
                    minWidth: 18,
                    textAlign: "center",
                  }}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Profile */}
      <div style={{
        padding: "12px",
        borderTop: "1px solid var(--omnix-border)",
      }}>
        <button style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: "var(--omnix-radius-sm)",
          background: "var(--omnix-surface)",
          border: "1px solid var(--omnix-border)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-hover)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
        >
          <div style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}>A</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500 }}>Alex Chen</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>Founder · Online</div>
          </div>
          <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>⋯</div>
        </button>
      </div>
    </aside>
  );
}
