import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import {
  TrendingUp, TrendingDown, Zap, Clock, Users, MessageSquare,
  BrainCircuit, Globe, Activity, ChevronDown, Database,
  BarChart2, Calendar, Download,
} from "lucide-react";

const DATE_RANGES = ["7 days", "30 days", "90 days", "All time"];

// Bar chart data — AI sessions per day (last 7 days)
const DAILY_SESSIONS = [
  { day: "Mon", sessions: 18, tokens: 72  },
  { day: "Tue", sessions: 24, tokens: 96  },
  { day: "Wed", sessions: 31, tokens: 124 },
  { day: "Thu", sessions: 22, tokens: 88  },
  { day: "Fri", sessions: 38, tokens: 152 },
  { day: "Sat", sessions: 12, tokens: 48  },
  { day: "Sun", sessions: 9,  tokens: 36  },
];
const MAX_SESSIONS = Math.max(...DAILY_SESSIONS.map(d => d.sessions));

// Token usage per member
const MEMBER_USAGE = [
  { name: "Elena Rostova", tokens: 180, color: "#f43f5e" },
  { name: "Marcus Webb",   tokens: 140, color: "#f59e0b" },
  { name: "Sarah Chen",    tokens: 95,  color: "#3b82f6" },
  { name: "David Kim",     tokens: 78,  color: "#9b5cff" },
  { name: "Maya Patel",    tokens: 52,  color: "#06b6d4" },
  { name: "Others",        tokens: 17,  color: "#4b5563" },
];
const MAX_TOKENS = Math.max(...MEMBER_USAGE.map(m => m.tokens));

// Top queries
const TOP_QUERIES = [
  { query: "Competitor analysis for premium tier",    sessions: 14, mode: "Deep Think", color: "#9b5cff" },
  { query: "Generate executive summary from PDF",     sessions: 11, mode: "Fast",       color: "#00FFFF" },
  { query: "Summarize Q3 financial projections",      sessions: 9,  mode: "Fast",       color: "#00FFFF" },
  { query: "Research latest AI model benchmarks",     sessions: 8,  mode: "Web Search", color: "#00e87a" },
  { query: "Draft investor update email",             sessions: 7,  mode: "Fast",       color: "#00FFFF" },
  { query: "Analyze customer feedback sentiment",     sessions: 6,  mode: "Deep Think", color: "#9b5cff" },
];

// Model performance
const MODEL_PERF = [
  { label: "Avg Response Time", value: "1.4s",  trend: "-12%", up: true,  color: "var(--omnix-green)" },
  { label: "Avg Token Length",  value: "2,480", trend: "+8%",  up: false, color: "#f59e0b"            },
  { label: "Error Rate",        value: "0.3%",  trend: "-5%",  up: true,  color: "var(--omnix-cyan)"  },
  { label: "Context Hit Rate",  value: "94%",   trend: "+3%",  up: true,  color: "var(--omnix-blue)"  },
];

function StatCard({ label, value, sub, trend, trendUp, Icon, color }: any) {
  return (
    <div style={{ padding: "18px 20px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)", display: "flex", alignItems: "flex-start", gap: 14, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: color, opacity: 0.08, filter: "blur(20px)" }} />
      <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={16} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, color: "var(--omnix-text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--omnix-text)", fontFamily: "var(--omnix-font-display)", lineHeight: 1, marginBottom: 4 }}>{value}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: trendUp ? "var(--omnix-green)" : "#f87171", display: "flex", alignItems: "center", gap: 2 }}>
            {trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{trend}
          </span>
          {sub && <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{sub}</span>}
        </div>
      </div>
    </div>
  );
}

export function Analytics() {
  const [dateRange, setDateRange] = useState("7 days");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <AppLayout activePage="Analytics" headerTitle="Analytics" headerSubtitle="AI usage insights across your workspace">
      <div style={{ height: "100%", width: "100%", overflowY: "auto", background: "var(--omnix-bg)", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>
        <div style={{ padding: "24px 32px", maxWidth: 1100, margin: "0 auto", paddingBottom: 48 }}>

          {/* Top controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <div style={{ display: "flex", gap: 2, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 20, padding: 3 }}>
              {DATE_RANGES.map(r => (
                <button key={r} onClick={() => setDateRange(r)} style={{ padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "var(--omnix-font)", background: dateRange === r ? "rgba(0,255,255,0.12)" : "transparent", color: dateRange === r ? "var(--omnix-cyan)" : "var(--omnix-text-2)", outline: dateRange === r ? "1px solid rgba(0,255,255,0.3)" : "none", transition: "all 0.15s" }}>{r}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ height: 32, padding: "0 14px", borderRadius: 8, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)" }}>
                <Calendar size={12} />May 2026
              </button>
              <button style={{ height: 32, padding: "0 14px", borderRadius: 8, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)" }}>
                <Download size={12} />Export
              </button>
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            <StatCard label="AI Sessions"      value="154"     trend="+22%" trendUp={true}  sub="vs last week"  Icon={MessageSquare} color="var(--omnix-cyan)"  />
            <StatCard label="Tokens Consumed"  value="562k"    trend="+18%" trendUp={true}  sub="this period"   Icon={Zap}           color="var(--omnix-blue)"  />
            <StatCard label="Avg Response"     value="1.4s"    trend="-12%" trendUp={true}  sub="latency"       Icon={Clock}         color="var(--omnix-green)" />
            <StatCard label="Active Users"     value="7"       trend="+1"   trendUp={true}  sub="this week"     Icon={Users}         color="#9b5cff"            />
          </div>

          {/* Two column: bar chart + member usage */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginBottom: 16 }}>

            {/* Daily sessions bar chart */}
            <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <BarChart2 size={14} color="var(--omnix-cyan)" />
                  <span style={{ fontWeight: 600, fontSize: 13, fontFamily: "var(--omnix-font-display)" }}>AI Sessions · Last 7 Days</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>154 total</div>
              </div>

              {/* Bar chart */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140, padding: "0 4px" }}>
                {DAILY_SESSIONS.map((d, i) => {
                  const pct = d.sessions / MAX_SESSIONS;
                  const isHov = hoveredBar === i;
                  return (
                    <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end", cursor: "pointer" }}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {isHov && (
                        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--omnix-cyan)", background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.25)", padding: "2px 6px", borderRadius: 5, whiteSpace: "nowrap" }}>{d.sessions}</div>
                      )}
                      <div style={{ width: "100%", background: isHov ? "var(--omnix-cyan)" : "rgba(0,255,255,0.25)", borderRadius: "4px 4px 0 0", height: `${pct * 110}px`, transition: "all 0.2s", boxShadow: isHov ? "0 0 12px rgba(0,255,255,0.5)" : "none", position: "relative", overflow: "hidden" }}>
                        {!isHov && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,255,255,0.6) 0%, rgba(0,85,255,0.3) 100%)" }} />}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--omnix-text-3)", textAlign: "center" }}>{d.day}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--omnix-border)", display: "flex", gap: 20 }}>
                {[
                  { label: "Deep Think sessions", pct: "32%", color: "#9b5cff" },
                  { label: "Fast sessions",        pct: "51%", color: "var(--omnix-cyan)" },
                  { label: "Web Search",           pct: "17%", color: "var(--omnix-green)" },
                ].map(({ label, pct, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                    <span style={{ fontSize: 10, color: "var(--omnix-text-3)" }}>{label} <strong style={{ color: "var(--omnix-text-2)" }}>{pct}</strong></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Token usage by member */}
            <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <Users size={14} color="var(--omnix-cyan)" />
                <span style={{ fontWeight: 600, fontSize: 13, fontFamily: "var(--omnix-font-display)" }}>Token Usage by Member</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {MEMBER_USAGE.map(m => (
                  <div key={m.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: "var(--omnix-text-2)" }}>{m.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--omnix-text)" }}>{m.tokens}k</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 3, width: `${(m.tokens / MAX_TOKENS) * 100}%`, background: m.color, boxShadow: `0 0 8px ${m.color}66`, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--omnix-border)", display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--omnix-text-3)" }}>
                <span>Total: <strong style={{ color: "var(--omnix-text)" }}>562k tokens</strong></span>
                <span>Budget: <strong style={{ color: "#f59e0b" }}>500k / mo limit</strong></span>
              </div>
            </div>
          </div>

          {/* Bottom row: top queries + model perf */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>

            {/* Top queries */}
            <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <MessageSquare size={14} color="var(--omnix-cyan)" />
                <span style={{ fontWeight: 600, fontSize: 13, fontFamily: "var(--omnix-font-display)" }}>Top Query Patterns</span>
              </div>
              {TOP_QUERIES.map((q, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < TOP_QUERIES.length - 1 ? "1px solid var(--omnix-border)" : "none" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--omnix-text-3)", width: 16, textAlign: "center", flexShrink: 0 }}>#{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: "var(--omnix-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{q.query}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 20, background: `${q.color}15`, border: `1px solid ${q.color}30`, color: q.color, fontWeight: 600 }}>{q.mode}</span>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, fontSize: 12, fontWeight: 600, color: "var(--omnix-text-2)" }}>{q.sessions}×</div>
                </div>
              ))}
            </div>

            {/* Model performance */}
            <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Activity size={14} color="var(--omnix-cyan)" />
                <span style={{ fontWeight: 600, fontSize: 13, fontFamily: "var(--omnix-font-display)" }}>Model Performance</span>
              </div>

              {/* Ollama model card */}
              <div style={{ padding: "12px 14px", borderRadius: 9, border: "1px solid rgba(0,255,255,0.2)", background: "rgba(0,255,255,0.04)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <BrainCircuit size={16} color="var(--omnix-cyan)" />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--omnix-text)" }}>Ollama · llama3.2:latest</div>
                  <div style={{ fontSize: 10, color: "var(--omnix-text-3)", display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--omnix-green)", boxShadow: "0 0 4px var(--omnix-green)", display: "inline-block" }} />
                    AWS · Self-hosted · 128k context
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0, borderRadius: 9, border: "1px solid var(--omnix-border)", overflow: "hidden" }}>
                {MODEL_PERF.map((p, i) => (
                  <div key={p.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", borderBottom: i < MODEL_PERF.length - 1 ? "1px solid var(--omnix-border)" : "none" }}>
                    <span style={{ fontSize: 12, color: "var(--omnix-text-2)" }}>{p.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: p.color, fontFamily: "var(--omnix-font-display)" }}>{p.value}</span>
                      <span style={{ fontSize: 10, color: p.up ? "var(--omnix-green)" : "#f87171", display: "flex", alignItems: "center", gap: 2 }}>
                        {p.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}{p.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 9, background: "rgba(0,0,0,0.2)", border: "1px solid var(--omnix-border)", display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                <span style={{ color: "var(--omnix-text-3)" }}>Cost savings vs OpenAI GPT-4</span>
                <span style={{ color: "var(--omnix-green)", fontWeight: 700 }}>~$2,340 saved</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
