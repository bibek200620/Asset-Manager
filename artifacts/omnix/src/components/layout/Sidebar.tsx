import React, { useState } from "react";
import { useLocation } from "wouter";

const navItems = [
  { icon: "⊞", label: "Dashboard", path: "/" },
  { icon: "◈", label: "AI Chat", path: "/chat", badge: "3" },
  { icon: "⬡", label: "Workspaces", path: "/workspace" },
  { icon: "◫", label: "Team", path: "/team" },
  { icon: "⊙", label: "Sources", path: "/sources" },
  { icon: "▤", label: "Analytics", path: "/analytics" },
];

const workspaces = [
  { name: "Omnix Labs", plan: "Pro", color: "#00FFFF" },
  { name: "Design Studio", plan: "Team", color: "#9b5cff" },
  { name: "Dev Space", plan: "Free", color: "#00e87a" },
];

export function Sidebar() {
  const [location, navigate] = useLocation();
  const [wsOpen, setWsOpen] = useState(false);
  const [currentWs, setCurrentWs] = useState(workspaces[0]);

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <aside style={{
      width: "var(--omnix-sidebar-w)",
      height: "100%",
      background: "rgba(5,12,23,0.98)",
      borderRight: "1px solid var(--omnix-border)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 220,
        background: "radial-gradient(ellipse at 50% -10%, rgba(0,255,255,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        padding: "18px 18px 14px",
        display: "flex", alignItems: "center", gap: 10,
        borderBottom: "1px solid var(--omnix-border)",
        position: "relative",
      }}>
        <div style={{ width: 34, height: 34, flexShrink: 0, position: "relative" }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="17,2 30,9 30,25 17,32 4,25 4,9" fill="none" stroke="#00FFFF" strokeWidth="1.5" opacity="0.9"/>
            <polygon points="17,7 26,12 26,22 17,27 8,22 8,12" fill="none" stroke="#00FFFF" strokeWidth="1" opacity="0.5"/>
            <circle cx="17" cy="2" r="1.5" fill="#00FFFF"/>
            <circle cx="30" cy="9" r="1.5" fill="#00FFFF"/>
            <circle cx="30" cy="25" r="1.5" fill="#00FFFF"/>
            <circle cx="17" cy="32" r="1.5" fill="#00FFFF"/>
            <circle cx="4" cy="25" r="1.5" fill="#00FFFF"/>
            <circle cx="4" cy="9" r="1.5" fill="#00FFFF"/>
            <line x1="17" y1="2" x2="26" y2="12" stroke="#00FFFF" strokeWidth="0.7" opacity="0.5"/>
            <line x1="30" y1="9" x2="26" y2="22" stroke="#00FFFF" strokeWidth="0.7" opacity="0.5"/>
            <line x1="4" y1="9" x2="8" y2="22" stroke="#00FFFF" strokeWidth="0.7" opacity="0.5"/>
            <circle cx="17" cy="17" r="2.5" fill="#00FFFF" opacity="0.8"/>
          </svg>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%)",
          }}/>
        </div>
        <div>
          <div style={{
            color: "#fff", fontFamily: "var(--omnix-font-display)",
            fontWeight: 700, fontSize: 16, letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>OMNIX</div>
          <div style={{ color: "var(--omnix-text-3)", fontSize: 10, letterSpacing: "0.05em" }}>AI Workspace</div>
        </div>
      </div>

      <div style={{ padding: "10px 10px 6px", position: "relative" }}>
        <button
          onClick={() => setWsOpen(!wsOpen)}
          style={{
            width: "100%", padding: "9px 11px",
            borderRadius: "var(--omnix-radius-sm)",
            background: "var(--omnix-surface)",
            border: "1px solid var(--omnix-border)",
            display: "flex", alignItems: "center", gap: 9,
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-hover)"; e.currentTarget.style.borderColor = "var(--omnix-border-2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.borderColor = "var(--omnix-border)"; }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 5, flexShrink: 0,
            background: `${currentWs.color}22`,
            border: `1px solid ${currentWs.color}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: currentWs.color,
            boxShadow: `0 0 8px ${currentWs.color}33`,
          }}>{currentWs.name[0]}</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{currentWs.name}</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>{currentWs.plan} Plan</div>
          </div>
          <span style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>⌄</span>
        </button>

        {wsOpen && (
          <div style={{
            marginTop: 4, borderRadius: "var(--omnix-radius-sm)",
            background: "#0a1628",
            border: "1px solid var(--omnix-border-2)",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), var(--omnix-glow-xs)",
            animation: "omnix-slide-in 0.15s ease",
            position: "absolute", left: 10, right: 10, zIndex: 50,
          }}>
            {workspaces.map((ws, i) => (
              <button key={i} onClick={() => { setCurrentWs(ws); setWsOpen(false); }}
                style={{
                  width: "100%", padding: "8px 11px",
                  display: "flex", alignItems: "center", gap: 8,
                  cursor: "pointer",
                  background: ws.name === currentWs.name ? `${ws.color}0f` : "transparent",
                  border: "none",
                  borderLeft: ws.name === currentWs.name ? `2px solid ${ws.color}` : "2px solid transparent",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (ws.name !== currentWs.name) e.currentTarget.style.background = "var(--omnix-surface)"; }}
                onMouseLeave={e => { if (ws.name !== currentWs.name) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ width: 20, height: 20, borderRadius: 5, background: `${ws.color}22`, border: `1px solid ${ws.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: ws.color }}>{ws.name[0]}</div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500 }}>{ws.name}</div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>{ws.plan}</div>
                </div>
                {ws.name === currentWs.name && <span style={{ color: ws.color, fontSize: 11 }}>✓</span>}
              </button>
            ))}
            <div style={{ borderTop: "1px solid var(--omnix-border)", padding: "5px" }}>
              <button style={{
                width: "100%", padding: "7px 8px",
                borderRadius: 6, background: "transparent", border: "none",
                color: "var(--omnix-text-3)", fontSize: 11, cursor: "pointer",
                textAlign: "left", display: "flex", alignItems: "center", gap: 5,
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.color = "var(--omnix-text-cyan)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
              ><span>+</span> New Workspace</button>
            </div>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: "4px 10px", overflowY: "auto" }}>
        <div style={{ color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 8px 4px" }}>Navigation</div>
        {navItems.map((item, i) => {
          const active = isActive(item.path);
          return (
            <button key={i} onClick={() => navigate(item.path)} style={{
              width: "100%", padding: "8px 10px",
              borderRadius: "var(--omnix-radius-sm)",
              background: active ? "rgba(0,255,255,0.08)" : "transparent",
              border: active ? "1px solid rgba(0,255,255,0.2)" : "1px solid transparent",
              display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer", marginBottom: 1, position: "relative",
              transition: "all 0.15s",
              boxShadow: active ? "var(--omnix-glow-xs)" : "none",
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "var(--omnix-surface)"; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; } }}
            >
              {active && (
                <div style={{
                  position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                  width: 2.5, height: "55%", borderRadius: 2,
                  background: "var(--omnix-grad-cyan)",
                  boxShadow: "var(--omnix-glow-sm)",
                }} />
              )}
              <span style={{
                fontSize: 13, width: 18, textAlign: "center",
                color: active ? "var(--omnix-cyan)" : "var(--omnix-text-3)",
              }}>{item.icon}</span>
              <span style={{
                flex: 1, fontSize: 13, textAlign: "left",
                fontWeight: active ? 500 : 400,
                color: active ? "var(--omnix-text)" : "var(--omnix-text-2)",
                fontFamily: "var(--omnix-font)",
              }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  background: active ? "rgba(0,255,255,0.2)" : "rgba(255,255,255,0.07)",
                  color: active ? "var(--omnix-cyan)" : "var(--omnix-text-2)",
                  border: active ? "1px solid rgba(0,255,255,0.3)" : "1px solid transparent",
                  borderRadius: 20, fontSize: 10, fontWeight: 600,
                  padding: "1px 6px", minWidth: 18, textAlign: "center",
                }}>{item.badge}</span>
              )}
            </button>
          );
        })}

        <div style={{ color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "14px 8px 4px" }}>Settings</div>
        <button onClick={() => navigate("/settings")} style={{
          width: "100%", padding: "8px 10px",
          borderRadius: "var(--omnix-radius-sm)",
          background: isActive("/settings") ? "rgba(0,255,255,0.08)" : "transparent",
          border: isActive("/settings") ? "1px solid rgba(0,255,255,0.2)" : "1px solid transparent",
          display: "flex", alignItems: "center", gap: 10,
          cursor: "pointer", marginBottom: 1, position: "relative",
          transition: "all 0.15s",
          boxShadow: isActive("/settings") ? "var(--omnix-glow-xs)" : "none",
        }}
          onMouseEnter={e => { if (!isActive("/settings")) { e.currentTarget.style.background = "var(--omnix-surface)"; } }}
          onMouseLeave={e => { if (!isActive("/settings")) { e.currentTarget.style.background = "transparent"; } }}
        >
          {isActive("/settings") && (
            <div style={{
              position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
              width: 2.5, height: "55%", borderRadius: 2,
              background: "var(--omnix-grad-cyan)",
              boxShadow: "var(--omnix-glow-sm)",
            }} />
          )}
          <span style={{ fontSize: 13, width: 18, textAlign: "center", color: isActive("/settings") ? "var(--omnix-cyan)" : "var(--omnix-text-3)" }}>⚙</span>
          <span style={{ flex: 1, fontSize: 13, textAlign: "left", fontWeight: isActive("/settings") ? 500 : 400, color: isActive("/settings") ? "var(--omnix-text)" : "var(--omnix-text-2)", fontFamily: "var(--omnix-font)" }}>Settings</span>
        </button>
      </nav>

      <div style={{ padding: "10px", borderTop: "1px solid var(--omnix-border)" }}>
        <button style={{
          width: "100%", padding: "8px 10px",
          borderRadius: "var(--omnix-radius-sm)",
          background: "var(--omnix-surface)",
          border: "1px solid var(--omnix-border)",
          display: "flex", alignItems: "center", gap: 9,
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-2)"; e.currentTarget.style.background = "var(--omnix-surface-hover)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.background = "var(--omnix-surface)"; }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#050c17",
            boxShadow: "0 0 10px rgba(0,255,255,0.35)",
          }}>A</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500 }}>Alex Chen</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>Founder · Online</div>
          </div>
          <span style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>⋯</span>
        </button>
      </div>
    </aside>
  );
}
