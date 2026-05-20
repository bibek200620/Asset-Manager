import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { useLocation } from "wouter";
import {
  MessageSquare, Users, Database, Crown, Zap, TrendingUp,
  FileText, Search, ArrowRight, Bot, Globe, BarChart2,
  Shield, Share2, Upload, RefreshCw, Clock, ChevronRight,
} from "lucide-react";

const statCards = [
  { value: "12.8K", label: "AI Conversations", badge: "Synced", badgeColor: "#00e87a", Icon: MessageSquare, color: "#00FFFF" },
  { value: "24", label: "Team Members", badge: "Shared", badgeColor: "#9b5cff", Icon: Users, color: "#9b5cff" },
  { value: "Live", label: "Knowledge Sources", badge: "Upload ready", badgeColor: "#ffb800", Icon: Database, color: "#00e87a" },
  { value: "Pro", label: "Workspace Plan", badge: "Active", badgeColor: "#00FFFF", Icon: Crown, color: "#ffb800" },
];

const quickActions = [
  { Icon: FileText, label: "Analyze Document", desc: "Upload and query source material", color: "#00FFFF" },
  { Icon: MessageSquare, label: "Start AI Chat", desc: "Open a collaborative thread", color: "#9b5cff" },
  { Icon: Search, label: "Deep Research", desc: "Use web and workspace context", color: "#00e87a" },
  { Icon: Users, label: "Team Management", desc: "Invite and manage roles", color: "#ffb800" },
  { Icon: BarChart2, label: "View Analytics", desc: "Explore usage and performance", color: "#ff4df4" },
  { Icon: Globe, label: "Sync Sources", desc: "Connect and refresh data", color: "#3366ff" },
];

const recentSessions = [
  {
    title: "Market research for Q3 product launch",
    preview: "Analyzed 14 documents and web sources — found 3 key competitor gaps worth addressing in the roadmap.",
    time: "2 min ago", icon: Search, color: "#00FFFF",
  },
  {
    title: "Design system documentation review",
    preview: "Summarized component library updates and flagged 7 inconsistencies across the design tokens.",
    time: "38 min ago", icon: FileText, color: "#9b5cff",
  },
  {
    title: "Sprint planning assistant",
    preview: "Broke down 22 backlog items into sprint goals. Estimated velocity based on last 4 sprints.",
    time: "2h ago", icon: Bot, color: "#00e87a",
  },
  {
    title: "Investor pitch deck narrative",
    preview: "Drafted executive summary, market size section, and competitive positioning slide with citations.",
    time: "5h ago", icon: TrendingUp, color: "#ffb800",
  },
];

const healthItems = [
  { label: "Session security", status: "Protected", pct: 100, color: "#00e87a" },
  { label: "Shared context", status: "Enabled", pct: 100, color: "#00FFFF" },
  { label: "Invite queue", status: "2 active", pct: 40, color: "#ffb800" },
  { label: "Storage used", status: "4.2 / 20 GB", pct: 21, color: "#9b5cff" },
];

const teamActivity = [
  { name: "Alex Chen", handle: "Founder", action: "is active in", target: "Omnix Labs", time: "Now", color: "#00FFFF", badge: "FOUNDER" },
  { name: "Sarah Kim", handle: "Co-owner", action: "joined", target: "Design Team", time: "4m ago", color: "#9b5cff", badge: "DESIGNER" },
  { name: "Marcus Johnson", handle: "Member", action: "uploaded to", target: "Dev Space", time: "18m ago", color: "#00e87a", badge: "MEMBER" },
  { name: "Priya Patel", handle: "Member", action: "started chat in", target: "Marketing", time: "1h ago", color: "#ffb800", badge: "MEMBER" },
];

export function Dashboard() {
  const [, navigate] = useLocation();
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);

  return (
    <AppLayout headerTitle="Dashboard" headerSubtitle="Welcome back, Alex">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16, animation: "omnix-fade-in 0.3s ease" }}>

        {/* Page title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <Zap size={18} color="var(--omnix-cyan)" />
              <span style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 22, fontFamily: "var(--omnix-font-display)" }}>Workspace Overview</span>
            </div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>Real-time insights across Omnix Labs AI interactions and data sources.</div>
          </div>
          <button onClick={() => navigate("/analytics")} style={{
            padding: "8px 18px", borderRadius: 9,
            background: "rgba(0,255,255,0.07)", border: "1px solid rgba(0,255,255,0.25)",
            color: "var(--omnix-cyan)", fontSize: 12, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--omnix-font)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.14)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,255,255,0.07)"; }}
          >
            <TrendingUp size={13} /> View Full Report
          </button>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {statCards.map((card, i) => (
            <div key={i} style={{
              borderRadius: "var(--omnix-radius)", padding: "16px 18px",
              background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
              position: "relative", overflow: "hidden", transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${card.color}35`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${card.color}10`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--omnix-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div style={{
                position: "absolute", top: 0, right: 0, bottom: 0, width: "35%",
                background: `radial-gradient(ellipse at 100% 50%, ${card.color}0a 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${card.color}15`, border: `1px solid ${card.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <card.Icon size={15} color={card.color} />
                </div>
                <span style={{
                  background: `${card.badgeColor}15`, border: `1px solid ${card.badgeColor}30`,
                  borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 600,
                  color: card.badgeColor,
                }}>{card.badge}</span>
              </div>
              <div style={{ color: "var(--omnix-text)", fontSize: 26, fontWeight: 800, fontFamily: "var(--omnix-font-display)", lineHeight: 1, marginBottom: 4 }}>{card.value}</div>
              <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Middle row: Quick Actions + Right column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>

          {/* Quick Actions */}
          <div style={{ borderRadius: "var(--omnix-radius)", padding: "18px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Zap size={14} color="var(--omnix-cyan)" />
              <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)" }}>Quick Actions</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {quickActions.map((action, i) => (
                <button key={i}
                  onMouseEnter={() => setHoveredAction(i)}
                  onMouseLeave={() => setHoveredAction(null)}
                  style={{
                    borderRadius: 10, padding: "12px 14px",
                    background: hoveredAction === i ? `${action.color}08` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${hoveredAction === i ? `${action.color}30` : "var(--omnix-border)"}`,
                    cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", gap: 12, alignItems: "center",
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${action.color}15`, border: `1px solid ${action.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <action.Icon size={15} color={action.color} />
                  </div>
                  <div>
                    <div style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{action.label}</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{action.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Workspace Health */}
          <div style={{ borderRadius: "var(--omnix-radius)", padding: "18px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Shield size={14} color="var(--omnix-cyan)" />
              <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)" }}>Workspace Health</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {healthItems.map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: "var(--omnix-text-2)", fontSize: 12 }}>{item.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.status}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${item.pct}%`, borderRadius: 2,
                      background: `linear-gradient(90deg, ${item.color}cc, ${item.color})`,
                      boxShadow: `0 0 8px ${item.color}60`,
                      transition: "width 0.8s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Recent Sessions + Team Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>

          {/* Recent AI Sessions */}
          <div style={{ borderRadius: "var(--omnix-radius)", padding: "18px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={14} color="var(--omnix-cyan)" />
                <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)" }}>Recent AI Sessions</span>
              </div>
              <button onClick={() => navigate("/chat")} style={{ background: "none", border: "none", color: "var(--omnix-cyan)", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", gap: 4 }}>
                View all <ArrowRight size={11} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {recentSessions.map((session, i) => (
                <button key={i} onClick={() => navigate("/chat")} style={{
                  width: "100%", borderRadius: 10, padding: "12px 14px",
                  background: "rgba(255,255,255,0.02)", border: "1px solid var(--omnix-border)",
                  cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", gap: 12, alignItems: "flex-start",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${session.color}06`; e.currentTarget.style.borderColor = `${session.color}25`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "var(--omnix-border)"; }}
                >
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `${session.color}15`, border: `1px solid ${session.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <session.icon size={13} color={session.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 600 }}>{session.title}</span>
                      <span style={{ color: "var(--omnix-text-3)", fontSize: 10, flexShrink: 0, marginLeft: 8 }}>{session.time}</span>
                    </div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>{session.preview}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Team Activity */}
          <div style={{ borderRadius: "var(--omnix-radius)", padding: "18px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Users size={14} color="var(--omnix-cyan)" />
              <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)" }}>Team Activity</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {teamActivity.map((member, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${member.color}, ${member.color}88)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "#050c17",
                    border: `1.5px solid ${member.color}50`,
                    boxShadow: i === 0 ? `0 0 10px ${member.color}40` : "none",
                  }}>{member.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, lineHeight: 1.4 }}>
                      <span style={{ color: "var(--omnix-text)", fontWeight: 600 }}>{member.name} </span>
                      <span style={{ color: "var(--omnix-text-3)" }}>{member.action} </span>
                      <span style={{ color: member.color, fontWeight: 500 }}>{member.target}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <span style={{
                        background: `${member.color}15`, border: `1px solid ${member.color}25`,
                        borderRadius: 20, padding: "1px 6px", fontSize: 9, fontWeight: 700,
                        color: member.color, letterSpacing: "0.04em",
                      }}>{member.badge}</span>
                      <span style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>{member.time}</span>
                    </div>
                  </div>
                  {i === 0 && (
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00e87a", boxShadow: "0 0 6px #00e87a80", flexShrink: 0, marginTop: 5 }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, borderTop: "1px solid var(--omnix-border)", paddingTop: 14 }}>
              <button onClick={() => navigate("/team")} style={{
                width: "100%", padding: "8px", borderRadius: 9,
                background: "rgba(0,255,255,0.05)", border: "1px solid rgba(0,255,255,0.15)",
                color: "var(--omnix-cyan)", fontSize: 11, fontWeight: 600, cursor: "pointer",
                fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,255,255,0.05)"; }}
              ><Users size={11} /> View All Team Members</button>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
