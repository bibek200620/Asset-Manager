import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Plus, Settings, Users, Database, Zap, MoreHorizontal, ChevronRight, ChevronDown, Layers, Crown, Globe } from "lucide-react";

interface SubSpace {
  id: number;
  name: string;
  desc: string;
  color: string;
  members: number;
  sources: number;
  queries: number;
}

interface WorkspaceData {
  id: number;
  name: string;
  desc: string;
  plan: string;
  color: string;
  members: number;
  sources: number;
  queries: number;
  storage: string;
  agents: string[];
  subSpaces: SubSpace[];
}

const workspaces: WorkspaceData[] = [
  {
    id: 1,
    name: "Omnix Labs",
    desc: "Super workspace — all teams collaborate here. Sub-spaces inherit access from this root.",
    plan: "Pro",
    color: "#00FFFF",
    members: 24,
    sources: 48,
    queries: 18420,
    storage: "4.2 GB",
    agents: ["Research", "Code", "Analytics", "Creative"],
    subSpaces: [
      { id: 11, name: "Design Team", desc: "UI/UX, brand, and creative direction", color: "#9b5cff", members: 5, sources: 9, queries: 3210 },
      { id: 12, name: "Dev Team", desc: "Engineering, architecture, and code review", color: "#00e87a", members: 8, sources: 18, queries: 7840 },
      { id: 13, name: "Marketing", desc: "Content, campaigns, and growth strategy", color: "#ffb800", members: 4, sources: 7, queries: 2100 },
      { id: 14, name: "Product", desc: "Roadmaps, specs, and user research", color: "#3366ff", members: 5, sources: 12, queries: 4180 },
      { id: 15, name: "Data & Analytics", desc: "Metrics, BI reports, and data pipelines", color: "#ff4df4", members: 2, sources: 2, queries: 1090 },
    ],
  },
  {
    id: 2,
    name: "Client Projects",
    desc: "External client workspace — isolated from internal data.",
    plan: "Team",
    color: "#9b5cff",
    members: 8,
    sources: 12,
    queries: 4310,
    storage: "1.1 GB",
    agents: ["Research", "Writing"],
    subSpaces: [
      { id: 21, name: "Alpha Corp", desc: "Q3 deliverables and communication", color: "#00FFFF", members: 3, sources: 5, queries: 1200 },
      { id: 22, name: "Beta Inc", desc: "Onboarding and integration project", color: "#00e87a", members: 2, sources: 3, queries: 980 },
    ],
  },
];

const plans = [
  { name: "Free", price: "$0", features: ["3 members", "2 sub-spaces", "10 sources", "10K queries/mo", "1 AI agent"], color: "#00e87a", current: false },
  { name: "Team", price: "$29", features: ["20 members", "10 sub-spaces", "50 sources", "100K queries/mo", "5 AI agents", "Analytics"], color: "#9b5cff", current: false },
  { name: "Pro", price: "$99", features: ["Unlimited members", "Unlimited sub-spaces", "Unlimited sources", "1M queries/mo", "Unlimited agents", "Advanced Analytics", "Priority support"], color: "#00FFFF", current: true },
];

export function Workspace() {
  const [activeWs, setActiveWs] = useState(1);
  const [expandedWs, setExpandedWs] = useState<number[]>([1]);
  const [activeSubSpace, setActiveSubSpace] = useState<number | null>(null);
  const [tab, setTab] = useState<"workspaces" | "billing">("workspaces");

  const current = workspaces.find(w => w.id === activeWs) || workspaces[0];
  const selectedSubSpace = current.subSpaces.find(s => s.id === activeSubSpace) || null;

  const toggleExpand = (id: number) => {
    setExpandedWs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <AppLayout headerTitle="Workspaces" headerSubtitle="Manage your super workspaces and sub-spaces">
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
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>

            {/* Workspace tree */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 4px 4px" }}>Super Workspaces</div>
              {workspaces.map(ws => (
                <div key={ws.id}>
                  {/* Super workspace row */}
                  <div
                    style={{
                      borderRadius: "var(--omnix-radius-sm)", padding: "10px 12px",
                      background: activeWs === ws.id && !activeSubSpace ? `${ws.color}08` : "var(--omnix-surface)",
                      border: `1px solid ${activeWs === ws.id && !activeSubSpace ? `${ws.color}35` : "var(--omnix-border)"}`,
                      cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 10,
                      boxShadow: activeWs === ws.id && !activeSubSpace ? `0 0 18px ${ws.color}10` : "none",
                    }}
                    onClick={() => { setActiveWs(ws.id); setActiveSubSpace(null); }}
                  >
                    <button
                      onClick={e => { e.stopPropagation(); toggleExpand(ws.id); }}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "var(--omnix-text-3)", flexShrink: 0 }}
                    >
                      {expandedWs.includes(ws.id)
                        ? <ChevronDown size={13} />
                        : <ChevronRight size={13} />}
                    </button>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: `${ws.color}18`, border: `1px solid ${ws.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: ws.color, flexShrink: 0 }}>{ws.name[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ws.name}</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>{ws.members} members · {ws.subSpaces.length} sub-spaces</div>
                    </div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--omnix-text-3)", padding: 2, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                      <MoreHorizontal size={14} />
                    </button>
                  </div>

                  {/* Sub-spaces */}
                  {expandedWs.includes(ws.id) && (
                    <div style={{ marginLeft: 16, marginTop: 4, display: "flex", flexDirection: "column", gap: 3, borderLeft: `1px solid ${ws.color}25`, paddingLeft: 12 }}>
                      {ws.subSpaces.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => { setActiveWs(ws.id); setActiveSubSpace(sub.id); }}
                          style={{
                            width: "100%", padding: "7px 10px",
                            borderRadius: 7,
                            background: activeSubSpace === sub.id ? `${sub.color}0d` : "transparent",
                            border: `1px solid ${activeSubSpace === sub.id ? `${sub.color}30` : "transparent"}`,
                            display: "flex", alignItems: "center", gap: 8,
                            cursor: "pointer", transition: "all 0.15s", textAlign: "left",
                          }}
                          onMouseEnter={e => { if (activeSubSpace !== sub.id) e.currentTarget.style.background = "var(--omnix-surface)"; }}
                          onMouseLeave={e => { if (activeSubSpace !== sub.id) e.currentTarget.style.background = "transparent"; }}
                        >
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: sub.color, boxShadow: `0 0 6px ${sub.color}80`, flexShrink: 0 }} />
                          <span style={{ color: activeSubSpace === sub.id ? "var(--omnix-text)" : "var(--omnix-text-2)", fontSize: 12, flex: 1 }}>{sub.name}</span>
                          <span style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>{sub.members}</span>
                        </button>
                      ))}
                      <button style={{
                        width: "100%", padding: "6px 10px",
                        borderRadius: 7, background: "transparent",
                        border: "1px dashed rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", gap: 6,
                        cursor: "pointer", color: "var(--omnix-text-3)", fontSize: 11, fontFamily: "var(--omnix-font)", transition: "all 0.15s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${ws.color}40`; e.currentTarget.style.color = ws.color; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                      >
                        <Plus size={11} /> New sub-space
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <button style={{
                borderRadius: "var(--omnix-radius-sm)", padding: "10px 12px",
                background: "transparent", border: "2px dashed var(--omnix-border)",
                color: "var(--omnix-text-3)", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 7,
                fontSize: 12, fontFamily: "var(--omnix-font)", transition: "all 0.2s", marginTop: 4,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)"; e.currentTarget.style.color = "var(--omnix-cyan)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
              ><Plus size={14} /> New super workspace</button>
            </div>

            {/* Detail panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {selectedSubSpace ? (
                /* Sub-space detail */
                <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: `1px solid ${selectedSubSpace.color}25` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: selectedSubSpace.color, boxShadow: `0 0 10px ${selectedSubSpace.color}80` }} />
                        <span style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 20, fontFamily: "var(--omnix-font-display)" }}>{selectedSubSpace.name}</span>
                        <span style={{ background: `${selectedSubSpace.color}15`, border: `1px solid ${selectedSubSpace.color}35`, borderRadius: 20, padding: "2px 9px", fontSize: 11, color: selectedSubSpace.color }}>Sub-space</span>
                      </div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>{selectedSubSpace.desc}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ padding: "7px 14px", borderRadius: 8, background: "var(--omnix-surface-2)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)" }}>
                        <Settings size={13} /> Manage
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
                    {[
                      { label: "Members", value: selectedSubSpace.members, Icon: Users, color: selectedSubSpace.color },
                      { label: "Sources", value: selectedSubSpace.sources, Icon: Database, color: "#9b5cff" },
                      { label: "Queries", value: selectedSubSpace.queries.toLocaleString(), Icon: Zap, color: "#00e87a" },
                    ].map((s, i) => (
                      <div key={i} style={{ borderRadius: 10, padding: "14px", background: `${s.color}06`, border: `1px solid ${s.color}20`, textAlign: "center" }}>
                        <s.Icon size={20} color={s.color} style={{ marginBottom: 6 }} />
                        <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 20, fontFamily: "var(--omnix-font-display)" }}>{s.value}</div>
                        <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "12px 16px", borderRadius: 9, background: "rgba(255,255,255,0.02)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", gap: 10 }}>
                    <Layers size={14} color="var(--omnix-text-3)" />
                    <span style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Part of </span>
                    <span style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500 }}>{current.name}</span>
                    <span style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>super workspace · inherits permissions and AI agents</span>
                  </div>
                </div>
              ) : (
                /* Super workspace detail */
                <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: `1px solid ${current.color}25` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <Layers size={20} color={current.color} />
                        <span style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 20, fontFamily: "var(--omnix-font-display)" }}>{current.name}</span>
                        <span style={{ background: `${current.color}15`, border: `1px solid ${current.color}35`, borderRadius: 20, padding: "2px 9px", fontSize: 11, color: current.color, fontWeight: 700 }}>Super Workspace</span>
                        <span style={{ background: `${current.color}15`, border: `1px solid ${current.color}35`, borderRadius: 20, padding: "2px 9px", fontSize: 11, color: current.color }}>{current.plan}</span>
                      </div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>{current.desc}</div>
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

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                    {[
                      { label: "Members", value: current.members, Icon: Users, color: current.color },
                      { label: "Sub-spaces", value: current.subSpaces.length, Icon: Layers, color: "#9b5cff" },
                      { label: "Sources", value: current.sources, Icon: Database, color: "#00e87a" },
                      { label: "Queries", value: current.queries.toLocaleString(), Icon: Zap, color: "#ffb800" },
                    ].map((s, i) => (
                      <div key={i} style={{ borderRadius: 10, padding: "12px", background: `${s.color}06`, border: `1px solid ${s.color}20`, textAlign: "center" }}>
                        <s.Icon size={18} color={s.color} style={{ marginBottom: 6 }} />
                        <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)" }}>{s.value}</div>
                        <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Sub-spaces grid */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>Sub-spaces</div>
                      <button style={{ padding: "5px 12px", borderRadius: 7, background: "transparent", border: `1px solid ${current.color}`, color: current.color, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${current.color}10`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                      ><Plus size={11} /> Add sub-space</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                      {current.subSpaces.map(sub => (
                        <button key={sub.id}
                          onClick={() => setActiveSubSpace(sub.id)}
                          style={{
                            borderRadius: "var(--omnix-radius-sm)", padding: "14px",
                            background: "rgba(255,255,255,0.02)", border: `1px solid ${sub.color}20`,
                            cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = `${sub.color}08`; e.currentTarget.style.borderColor = `${sub.color}40`; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = `${sub.color}20`; }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: sub.color, boxShadow: `0 0 8px ${sub.color}80`, flexShrink: 0 }} />
                            <span style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 600 }}>{sub.name}</span>
                          </div>
                          <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 10, lineHeight: 1.4 }}>{sub.desc}</div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ color: "var(--omnix-text-2)", fontSize: 11 }}>{sub.members} members</span>
                            <span style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>·</span>
                            <span style={{ color: "var(--omnix-text-2)", fontSize: 11 }}>{sub.sources} sources</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Agents */}
                  <div>
                    <div style={{ color: "var(--omnix-text-2)", fontSize: 12, fontWeight: 600, marginBottom: 10, letterSpacing: "0.04em", textTransform: "uppercase" }}>Active AI Agents</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {current.agents.map((agent, i) => (
                        <div key={i} style={{ borderRadius: 8, padding: "6px 14px", background: `${current.color}0f`, border: `1px solid ${current.color}25`, color: current.color, fontSize: 12, fontWeight: 500 }}>{agent} Agent</div>
                      ))}
                      <button style={{ borderRadius: 8, padding: "6px 14px", background: "transparent", border: "1px dashed var(--omnix-border)", color: "var(--omnix-text-3)", fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)"; e.currentTarget.style.color = "var(--omnix-cyan)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                      >+ Add Agent</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "billing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ borderRadius: "var(--omnix-radius)", padding: "18px", background: "rgba(0,255,255,0.05)", border: "1px solid rgba(0,255,255,0.2)", display: "flex", gap: 14, alignItems: "center" }}>
              <Crown size={24} color="var(--omnix-cyan)" />
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)" }}>Current: Pro Plan</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginTop: 3 }}>Next billing: June 20, 2026 · $99/month · Unlimited sub-spaces</div>
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
                        <span style={{ color: plan.color, fontSize: 12 }}>+</span>
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
