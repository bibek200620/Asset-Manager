import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { useLocation } from "wouter";
import { Zap, TrendingUp, Users, Database, ArrowRight, Bot, FileText, BarChart2, Globe, ChevronRight, Search, Code } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const sparkData = [
  { v: 30 }, { v: 45 }, { v: 38 }, { v: 62 }, { v: 55 }, { v: 78 }, { v: 70 }, { v: 88 }, { v: 82 }, { v: 96 },
];

const activityData = [
  { time: "00", queries: 12 }, { time: "02", queries: 5 }, { time: "04", queries: 3 },
  { time: "06", queries: 8 }, { time: "08", queries: 24 }, { time: "10", queries: 42 },
  { time: "12", queries: 38 }, { time: "14", queries: 55 }, { time: "16", queries: 49 },
  { time: "18", queries: 63 }, { time: "20", queries: 44 }, { time: "22", queries: 29 },
];

const recentActivity = [
  { Icon: Bot, label: "AI completed research on market trends", time: "2 min ago", color: "#00FFFF" },
  { Icon: FileText, label: "Sarah uploaded 3 new documents", time: "8 min ago", color: "#9b5cff" },
  { Icon: Users, label: "Marcus joined the workspace", time: "24 min ago", color: "#00e87a" },
  { Icon: BarChart2, label: "Monthly analytics report generated", time: "1h ago", color: "#ffb800" },
  { Icon: Globe, label: "Knowledge base synced with Notion", time: "2h ago", color: "#3366ff" },
];

const agents = [
  { name: "Research Agent", desc: "Web and document research", status: "Active", Icon: Search, queries: 248, color: "#00FFFF" },
  { name: "Code Assistant", desc: "Code generation and review", status: "Idle", Icon: Code, queries: 892, color: "#9b5cff" },
  { name: "Data Analyst", desc: "Charts and data insights", status: "Running", Icon: BarChart2, queries: 156, color: "#00e87a" },
];

const statCards = [
  { label: "Total Queries", value: "12,847", change: "+18.4%", Icon: Zap, color: "#00FFFF", data: sparkData },
  { label: "Active Users", value: "2,394", change: "+7.2%", Icon: Users, color: "#9b5cff", data: sparkData.map(d => ({ v: d.v * 0.7 })) },
  { label: "Knowledge Sources", value: "1,283", change: "+23.1%", Icon: Database, color: "#00e87a", data: sparkData.map(d => ({ v: d.v * 0.5 })) },
  { label: "Tokens Used", value: "4.2M", change: "+12.5%", Icon: TrendingUp, color: "#ffb800", data: sparkData.map(d => ({ v: d.v * 0.85 })) },
];

export function Dashboard() {
  const [, navigate] = useLocation();
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <AppLayout headerTitle="Dashboard" headerSubtitle="Welcome back, Alex">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 20, animation: "omnix-fade-in 0.3s ease" }}>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {statCards.map((card, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredStat(i)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{
                borderRadius: "var(--omnix-radius)", padding: "16px",
                background: hoveredStat === i ? "var(--omnix-surface-2)" : "var(--omnix-surface)",
                border: `1px solid ${hoveredStat === i ? `${card.color}33` : "var(--omnix-border)"}`,
                transition: "all 0.2s", cursor: "default", position: "relative", overflow: "hidden",
                boxShadow: hoveredStat === i ? `0 0 24px ${card.color}15` : "none",
              }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, opacity: 0.6 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={card.data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={card.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={card.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke={card.color} strokeWidth={1.5} fill={`url(#grad${i})`} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `${card.color}15`, border: `1px solid ${card.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <card.Icon size={16} color={card.color} />
                  </div>
                  <span style={{ background: "rgba(0,232,122,0.12)", border: "1px solid rgba(0,232,122,0.25)", borderRadius: 20, padding: "2px 7px", fontSize: 10, fontWeight: 600, color: "var(--omnix-green)" }}>{card.change}</span>
                </div>
                <div style={{ color: "var(--omnix-text)", fontSize: 22, fontWeight: 700, fontFamily: "var(--omnix-font-display)", lineHeight: 1 }}>{card.value}</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 4 }}>{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts + Activity row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14 }}>
          <div style={{ borderRadius: "var(--omnix-radius)", padding: 18, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>Query Activity</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>Queries per hour, last 24h</div>
              </div>
              <button onClick={() => navigate("/analytics")} style={{ background: "none", border: "none", color: "var(--omnix-cyan)", fontSize: 11, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>View Details</button>
            </div>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="queries" stroke="#00FFFF" strokeWidth={2} fill="url(#actGrad)" dot={false} />
                  <Tooltip
                    contentStyle={{ background: "#0a1628", border: "1px solid rgba(0,255,255,0.2)", borderRadius: 8, fontSize: 11, color: "#fff" }}
                    cursor={{ stroke: "rgba(0,255,255,0.3)", strokeWidth: 1, strokeDasharray: "4 4" }}
                    formatter={(v: number) => [v, "Queries"]}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ borderRadius: "var(--omnix-radius)", padding: 18, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 14 }}>Recent Activity</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentActivity.slice(0, 4).map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: `${item.color}18`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <item.Icon size={12} color={item.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "var(--omnix-text)", fontSize: 11, lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 10, marginTop: 1 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Agents */}
        <div style={{ borderRadius: "var(--omnix-radius)", padding: 18, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>AI Agents</div>
              <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>Your active AI assistants</div>
            </div>
            <button onClick={() => navigate("/chat")} style={{
              background: "transparent", border: "1px solid var(--omnix-cyan)",
              color: "var(--omnix-cyan)", borderRadius: 8, padding: "5px 12px",
              fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
              transition: "all 0.2s", fontFamily: "var(--omnix-font)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >Open Chat <ArrowRight size={12} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {agents.map((agent, i) => (
              <div key={i} style={{
                borderRadius: "var(--omnix-radius-sm)", padding: "14px",
                background: "rgba(255,255,255,0.02)", border: `1px solid ${agent.color}20`,
                transition: "all 0.2s", cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${agent.color}45`; e.currentTarget.style.background = `${agent.color}06`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${agent.color}20`; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${agent.color}15`, border: `1px solid ${agent.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <agent.Icon size={18} color={agent.color} />
                  </div>
                  <span style={{
                    borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 600,
                    background: agent.status === "Active" ? "rgba(0,255,255,0.12)" : agent.status === "Running" ? "rgba(0,232,122,0.12)" : "rgba(255,255,255,0.05)",
                    color: agent.status === "Active" ? "var(--omnix-cyan)" : agent.status === "Running" ? "var(--omnix-green)" : "var(--omnix-text-3)",
                    border: agent.status === "Active" ? "1px solid rgba(0,255,255,0.25)" : agent.status === "Running" ? "1px solid rgba(0,232,122,0.25)" : "1px solid transparent",
                  }}>{agent.status}</span>
                </div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 13, fontFamily: "var(--omnix-font-display)", marginBottom: 3 }}>{agent.name}</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 10 }}>{agent.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--omnix-text-2)", fontSize: 11 }}>{agent.queries.toLocaleString()} queries</span>
                  <ChevronRight size={12} color={agent.color} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
