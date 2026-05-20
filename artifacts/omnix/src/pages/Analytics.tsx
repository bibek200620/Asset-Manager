import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { TrendingUp, Users, Zap, Database, Filter } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const timeRanges = ["24h", "7d", "30d", "90d"];

const queryVolumeData = [
  { day: "Mon", queries: 2400, success: 2300 }, { day: "Tue", queries: 3200, success: 3100 },
  { day: "Wed", queries: 2800, success: 2700 }, { day: "Thu", queries: 4100, success: 3950 },
  { day: "Fri", queries: 3700, success: 3620 }, { day: "Sat", queries: 1800, success: 1770 },
  { day: "Sun", queries: 1400, success: 1380 },
];

const topicData = [
  { name: "Research", value: 38 }, { name: "Code", value: 25 },
  { name: "Analysis", value: 18 }, { name: "Writing", value: 12 }, { name: "Other", value: 7 },
];
const TOPIC_COLORS = ["#00FFFF", "#9b5cff", "#00e87a", "#ffb800", "#ff3b5c"];

const tokenData = [
  { hour: "00", tokens: 1200 }, { hour: "02", tokens: 800 }, { hour: "04", tokens: 600 },
  { hour: "06", tokens: 900 }, { hour: "08", tokens: 3200 }, { hour: "10", tokens: 5600 },
  { hour: "12", tokens: 4800 }, { hour: "14", tokens: 7200 }, { hour: "16", tokens: 6400 },
  { hour: "18", tokens: 8100 }, { hour: "20", tokens: 5200 }, { hour: "22", tokens: 3400 },
];

const userTrendData = [
  { week: "W1", active: 120, new: 18 }, { week: "W2", active: 145, new: 22 },
  { week: "W3", active: 138, new: 15 }, { week: "W4", active: 172, new: 31 },
];

const topSources = [
  { name: "Company Wiki", queries: 4280, pct: 92 },
  { name: "Product Docs", queries: 3120, pct: 71 },
  { name: "Slack Channels", queries: 2490, pct: 58 },
  { name: "GitHub Repos", queries: 1870, pct: 44 },
  { name: "Notion Pages", queries: 1340, pct: 32 },
];

const kpiCards = [
  { label: "Total Queries", value: "18,420", change: "+22%", Icon: Zap, color: "#00FFFF" },
  { label: "Active Users", value: "2,394", change: "+8%", Icon: Users, color: "#9b5cff" },
  { label: "Avg Response", value: "1.2s", change: "-0.3s", Icon: TrendingUp, color: "#00e87a" },
  { label: "Sources Used", value: "1,283", change: "+34%", Icon: Database, color: "#ffb800" },
];

const tooltipStyle = { background: "#0a1628", border: "1px solid rgba(0,255,255,0.2)", borderRadius: 8, fontSize: 11, color: "#fff" };

export function Analytics() {
  const [activeRange, setActiveRange] = useState("7d");

  return (
    <AppLayout headerTitle="Analytics" headerSubtitle="Usage metrics and performance insights">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 18, animation: "omnix-fade-in 0.3s ease" }}>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 2, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 9, padding: 3 }}>
            {timeRanges.map(r => (
              <button key={r} onClick={() => setActiveRange(r)} style={{
                padding: "4px 12px", borderRadius: 6,
                background: activeRange === r ? "rgba(0,255,255,0.12)" : "transparent",
                border: activeRange === r ? "1px solid rgba(0,255,255,0.25)" : "1px solid transparent",
                color: activeRange === r ? "var(--omnix-cyan)" : "var(--omnix-text-3)",
                fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "var(--omnix-font)", transition: "all 0.15s",
              }}>{r}</button>
            ))}
          </div>
          <button style={{
            padding: "5px 12px", borderRadius: 8, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
            color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)", transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-2)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; }}
          ><Filter size={12} /> Filter</button>
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {kpiCards.map((card, i) => (
            <div key={i} style={{ borderRadius: "var(--omnix-radius)", padding: "16px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${card.color}30`; e.currentTarget.style.boxShadow = `0 0 20px ${card.color}10`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${card.color}15`, border: `1px solid ${card.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <card.Icon size={15} color={card.color} />
                </div>
                <span style={{ background: "rgba(0,232,122,0.12)", border: "1px solid rgba(0,232,122,0.25)", borderRadius: 20, padding: "2px 7px", fontSize: 10, fontWeight: 600, color: "var(--omnix-green)" }}>{card.change}</span>
              </div>
              <div style={{ color: "var(--omnix-text)", fontSize: 24, fontWeight: 700, fontFamily: "var(--omnix-font-display)", lineHeight: 1 }}>{card.value}</div>
              <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 4 }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14 }}>
          <div style={{ borderRadius: "var(--omnix-radius)", padding: 18, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Query Volume</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 14 }}>Queries and success rate over time</div>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={queryVolumeData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Bar dataKey="queries" name="Total" fill="rgba(0,255,255,0.2)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="success" name="Success" fill="#00FFFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ borderRadius: "var(--omnix-radius)", padding: 18, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Topics</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 10 }}>Query breakdown by type</div>
            <div style={{ height: 120, display: "flex", justifyContent: "center" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topicData} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={3} dataKey="value">
                    {topicData.map((_, i) => <Cell key={i} fill={TOPIC_COLORS[i % TOPIC_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8 }}>
              {topicData.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: TOPIC_COLORS[i], flexShrink: 0 }} />
                  <span style={{ flex: 1, color: "var(--omnix-text-2)", fontSize: 11 }}>{t.name}</span>
                  <span style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ borderRadius: "var(--omnix-radius)", padding: 18, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Token Usage</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 14 }}>Tokens consumed hourly</div>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tokenData}>
                  <defs>
                    <linearGradient id="tokenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9b5cff" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#9b5cff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v.toLocaleString(), "Tokens"]} />
                  <Area type="monotone" dataKey="tokens" stroke="#9b5cff" strokeWidth={2} fill="url(#tokenGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ borderRadius: "var(--omnix-radius)", padding: 18, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>User Growth</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 14 }}>Active & new users by week</div>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="active" name="Active" stroke="#00e87a" strokeWidth={2} dot={{ fill: "#00e87a", r: 3 }} />
                  <Line type="monotone" dataKey="new" name="New" stroke="#00FFFF" strokeWidth={2} dot={{ fill: "#00FFFF", r: 3 }} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Sources table */}
        <div style={{ borderRadius: "var(--omnix-radius)", padding: 18, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
          <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 14 }}>Top Knowledge Sources</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topSources.map((src, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 20, color: "var(--omnix-text-3)", fontSize: 11, textAlign: "center" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500 }}>{src.name}</span>
                    <span style={{ color: "var(--omnix-text-2)", fontSize: 11 }}>{src.queries.toLocaleString()} queries</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${src.pct}%`, borderRadius: 4, background: `linear-gradient(90deg, #00FFFF ${src.pct > 50 ? "0%" : "0%"}, #0088ff 100%)`, boxShadow: "0 0 8px rgba(0,255,255,0.4)", transition: "width 0.8s ease" }} />
                  </div>
                </div>
                <span style={{ color: "var(--omnix-text-3)", fontSize: 11, width: 35, textAlign: "right" }}>{src.pct}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
