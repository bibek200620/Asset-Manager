import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Plus, Settings, Users, Database, Zap, Crown, MoreHorizontal, Globe } from "lucide-react";

const workspaces = [
  {
    id: 1, name: "Omnix Labs", desc: "Main product workspace with full AI capabilities", plan: "Pro", color: "#00FFFF",
    members: 12, sources: 28, queries: 18420, storage: "4.2 GB", icon: "🔬",
    agents: ["Research", "Code", "Analytics"], status: "active",
  },
  {
    id: 2, name: "Design Studio", desc: "Creative workspace for design team", plan: "Team", color: "#9b5cff",
    members: 5, sources: 9, queries: 3210, storage: "1.1 GB", icon: "🎨",
    agents: ["Creative", "Research"], status: "active",
  },
  {
    id: 3, name: "Dev Space", desc: "Engineering and development workspace", plan: "Free", color: "#00e87a",
    members: 3, sources: 14, queries: 1840, storage: "2.8 GB", icon: "💻",
    agents: ["Code"], status: "active",
  },
];

const plans = [
  { name: "Free", price: "$0", features: ["3 members", "10 sources", "10K queries/mo", "1 AI agent"], color: "#00e87a", current: false },
  { name: "Team", price: "$29", features: ["20 members", "50 sources", "100K queries/mo", "5 AI agents", "Analytics"], color: "#9b5cff", current: false },
  { name: "Pro", price: "$99", features: ["Unlimited members", "Unlimited sources", "1M queries/mo", "Unlimited agents", "Advanced Analytics", "Priority support"], color: "#00FFFF", current: true },
];

export function Workspace() {
  const [activeWs, setActiveWs] = useState(1);
  const [tab, setTab] = useState<"workspaces" | "billing">("workspaces");

  const current = workspaces.find(w => w.id === activeWs) || workspaces[0];

  return (
    <AppLayout headerTitle="Workspaces" headerSubtitle="Manage your AI workspaces">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 18, animation: "omnix-fade-in 0.3s ease" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {(["workspaces", "billing"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "6px 16px", borderRadius: 7, fontSize: 12, fontWeight: 500,
              background: tab === t ? "rgba(0,255,255,0.1)" : "transparent",
              border: tab === t ? "1px solid rgba(0,255,255,0.25)" : "1px solid transparent",
              color: tab === t ? "var(--omnix-cyan)" : "var(--omnix-text-2)",
              cursor: "pointer", fontFamily: "var(--omnix-font)", transition: "all 0.15s", textTransform: "capitalize",
            }}>{t}</button>
          ))}
        </div>

        {tab === "workspaces" && (
          <>
            {/* Workspace list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {workspaces.map(ws => (
                <div key={ws.id}
                  onClick={() => setActiveWs(ws.id)}
                  style={{
                    borderRadius: "var(--omnix-radius)", padding: "16px 20px",
                    background: activeWs === ws.id ? `${ws.color}08` : "var(--omnix-surface)",
                    border: `1px solid ${activeWs === ws.id ? `${ws.color}35` : "var(--omnix-border)"}`,
                    cursor: "pointer", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 16,
                    boxShadow: activeWs === ws.id ? `0 0 24px ${ws.color}10` : "none",
                  }}
                  onMouseEnter={e => { if (activeWs !== ws.id) { e.currentTarget.style.borderColor = `${ws.color}25`; e.currentTarget.style.background = "var(--omnix-surface-hover)"; } }}
                  onMouseLeave={e => { if (activeWs !== ws.id) { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.background = "var(--omnix-surface)"; } }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${ws.color}18`, border: `1.5px solid ${ws.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, boxShadow: `0 0 16px ${ws.color}25` }}>{ws.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)" }}>{ws.name}</span>
                      <span style={{
                        background: `${ws.color}18`, border: `1px solid ${ws.color}35`,
                        borderRadius: 20, padding: "2px 9px", fontSize: 10, fontWeight: 700, color: ws.color,
                      }}>{ws.plan}</span>
                    </div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>{ws.desc}</div>
                  </div>
                  <div style={{ display: "flex", gap: 18 }}>
                    {[
                      { Icon: Users, val: ws.members, label: "members" },
                      { Icon: Database, val: ws.sources, label: "sources" },
                      { Icon: Zap, val: ws.queries.toLocaleString(), label: "queries" },
                    ].map((stat, i) => (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 16, fontFamily: "var(--omnix-font-display)" }}>{stat.val}</div>
                        <div style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <button style={{ background: "none", border: "none", color: "var(--omnix-text-3)", cursor: "pointer", padding: 4, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}

              <button style={{
                borderRadius: "var(--omnix-radius)", padding: "14px 20px",
                background: "transparent", border: "2px dashed var(--omnix-border)",
                color: "var(--omnix-text-3)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontSize: 13, fontFamily: "var(--omnix-font)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)"; e.currentTarget.style.color = "var(--omnix-cyan)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
              ><Plus size={15} /> Create New Workspace</button>
            </div>

            {/* Workspace detail */}
            <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: `1px solid ${current.color}25` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{current.icon}</span>
                    <span style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)" }}>{current.name}</span>
                  </div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginTop: 4 }}>{current.desc}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ padding: "7px 14px", borderRadius: 8, background: "var(--omnix-surface-2)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)" }}>
                    <Settings size={13} /> Settings
                  </button>
                  <button style={{ padding: "7px 14px", borderRadius: 8, background: "transparent", border: `1px solid ${current.color}`, color: current.color, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${current.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  ><Globe size={13} /> Open</button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
                {[
                  { label: "Members", value: current.members, Icon: Users, color: current.color },
                  { label: "Sources", value: current.sources, Icon: Database, color: "#9b5cff" },
                  { label: "Queries", value: current.queries.toLocaleString(), Icon: Zap, color: "#00e87a" },
                  { label: "Storage", value: current.storage, Icon: Database, color: "#ffb800" },
                ].map((stat, i) => (
                  <div key={i} style={{ borderRadius: 10, padding: "12px", background: `${stat.color}06`, border: `1px solid ${stat.color}20`, textAlign: "center" }}>
                    <stat.Icon size={18} color={stat.color} style={{ marginBottom: 6 }} />
                    <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)" }}>{stat.value}</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ color: "var(--omnix-text-2)", fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: "0.05em" }}>ACTIVE AI AGENTS</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {current.agents.map((agent, i) => (
                    <div key={i} style={{ borderRadius: 8, padding: "6px 14px", background: `${current.color}0f`, border: `1px solid ${current.color}25`, color: current.color, fontSize: 12, fontWeight: 500 }}>{agent} Agent</div>
                  ))}
                  <button style={{ borderRadius: 8, padding: "6px 14px", background: "transparent", border: "1px dashed var(--omnix-border)", color: "var(--omnix-text-3)", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)"; e.currentTarget.style.color = "var(--omnix-cyan)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                  >+ Add Agent</button>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "billing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ borderRadius: "var(--omnix-radius)", padding: "18px", background: "rgba(0,255,255,0.05)", border: "1px solid rgba(0,255,255,0.2)", display: "flex", gap: 14, alignItems: "center" }}>
              <Crown size={24} color="var(--omnix-cyan)" />
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)" }}>Current: Pro Plan</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginTop: 3 }}>Next billing: June 20, 2026 · $99/month</div>
              </div>
              <button style={{ marginLeft: "auto", padding: "7px 16px", borderRadius: 8, background: "transparent", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Manage Billing</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {plans.map((plan, i) => (
                <div key={i} style={{
                  borderRadius: "var(--omnix-radius)", padding: "20px",
                  background: plan.current ? `${plan.color}08` : "var(--omnix-surface)",
                  border: `1px solid ${plan.current ? plan.color + "35" : "var(--omnix-border)"}`,
                  boxShadow: plan.current ? `0 0 30px ${plan.color}12` : "none",
                  position: "relative",
                }}>
                  {plan.current && (
                    <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: plan.color, color: "#050c17", fontSize: 10, fontWeight: 700, padding: "2px 12px", borderRadius: "0 0 6px 6px", letterSpacing: "0.05em" }}>CURRENT</div>
                  )}
                  <div style={{ color: plan.color, fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
                    <span style={{ color: "var(--omnix-text)", fontSize: 28, fontWeight: 700, fontFamily: "var(--omnix-font-display)" }}>{plan.price}</span>
                    <span style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>/month</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: 7, alignItems: "center" }}>
                        <span style={{ color: plan.color, fontSize: 12 }}>✓</span>
                        <span style={{ color: "var(--omnix-text-2)", fontSize: 12 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: "100%", padding: "9px", borderRadius: 9,
                    background: plan.current ? `linear-gradient(135deg, ${plan.color} 0%, #0088ff 100%)` : "var(--omnix-surface-2)",
                    border: plan.current ? "none" : `1px solid ${plan.color}30`,
                    color: plan.current ? "#050c17" : plan.color,
                    fontSize: 13, fontWeight: 700, cursor: plan.current ? "default" : "pointer",
                    fontFamily: "var(--omnix-font)", transition: "all 0.2s",
                    boxShadow: plan.current ? `0 0 20px ${plan.color}30` : "none",
                  }}>{plan.current ? "Active Plan" : "Upgrade"}</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
