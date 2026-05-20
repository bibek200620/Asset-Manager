import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import {
  Search, Plus, MoreHorizontal, Mail, Shield, User, Settings,
  ArrowRight, UserPlus, Clock, Zap, X, ShieldAlert, Building2,
  MessageSquare, Database, Globe, Activity, TrendingUp, ChevronRight,
  Lock, AlertTriangle, Check, Copy, RefreshCw,
} from "lucide-react";

const members = [
  { id: 1, name: "Elena Rostova",  role: "Founder",  email: "elena@omnix.ai",  initials: "ER", bg: "linear-gradient(135deg,#ec4899,#be185d)", color: "var(--omnix-pink)",  lastActive: "Just now", status: "online"  },
  { id: 2, name: "Marcus Webb",    role: "Co-owner", email: "marcus@omnix.ai", initials: "MW", bg: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#f59e0b",            lastActive: "5m ago",   status: "online"  },
  { id: 3, name: "Sarah Chen",     role: "Member",   email: "sarah@omnix.ai",  initials: "SC", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)", color: "var(--omnix-blue)", lastActive: "1h ago",   status: "offline" },
  { id: 4, name: "David Kim",      role: "Member",   email: "david@omnix.ai",  initials: "DK", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)", color: "var(--omnix-blue)", lastActive: "2h ago",   status: "offline" },
  { id: 5, name: "Maya Patel",     role: "Member",   email: "maya@omnix.ai",   initials: "MP", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)", color: "var(--omnix-blue)", lastActive: "4h ago",   status: "offline" },
  { id: 6, name: "James Wilson",   role: "Viewer",   email: "james@omnix.ai",  initials: "JW", bg: "linear-gradient(135deg,#4b5563,#374151)", color: "var(--omnix-text-3)", lastActive: "1d ago", status: "offline" },
  { id: 7, name: "Alex Thompson",  role: "Viewer",   email: "alex@omnix.ai",   initials: "AT", bg: "linear-gradient(135deg,#4b5563,#374151)", color: "var(--omnix-text-3)", lastActive: "2d ago", status: "offline" },
];

const pendingInvites = [
  { email: "jessica@omnix.ai", role: "Member", sent: "2 days ago", expires: "in 5 days" },
  { email: "ryan@omnix.ai",    role: "Viewer", sent: "3 days ago", expires: "in 4 days" },
];

const activities = [
  { user: "Marcus Webb",   action: "created a new chat",           target: "Project Alpha Synthesis", time: "10m ago", Icon: Zap,       color: "#f59e0b" },
  { user: "Sarah Chen",    action: "joined the workspace",         target: "",                        time: "2h ago",  Icon: UserPlus,  color: "var(--omnix-blue)" },
  { user: "Omnix AI",      action: "completed deep analysis",      target: "Q3 Market Research",      time: "4h ago",  Icon: Shield,    color: "var(--omnix-cyan)" },
  { user: "Elena Rostova", action: "updated workspace settings",   target: "",                        time: "1d ago",  Icon: Settings,  color: "var(--omnix-pink)" },
  { user: "David Kim",     action: "uploaded 3 source documents",  target: "Financial Models",        time: "1d ago",  Icon: Database,  color: "var(--omnix-green)" },
];

function StatCard({ icon: Icon, color, label, value, sub }: { icon: any, color: string, label: string, value: string, sub: string }) {
  return (
    <div style={{ padding: "18px 20px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)", display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{ width: 38, height: 38, borderRadius: 9, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={17} color={color} />
      </div>
      <div>
        <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{label}</div>
        <div style={{ color: "var(--omnix-text)", fontSize: 22, fontWeight: 700, fontFamily: "var(--omnix-font-display)", lineHeight: 1 }}>{value}</div>
        <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
}

export function Workspace() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <AppLayout activePage="Workspaces" headerTitle="Workspace Management" headerSubtitle="Omnix Labs · 7 members">
      <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--omnix-bg)", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>

        {/* ── MAIN ── */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "28px 32px", maxWidth: 860, width: "100%", margin: "0 auto" }}>

            {/* Workspace identity card */}
            <div style={{ padding: "22px 24px", borderRadius: 14, border: "1px solid var(--omnix-border)", background: "rgba(10,14,26,0.5)", position: "relative", overflow: "hidden", marginBottom: 24 }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 220, height: 220, background: "var(--omnix-cyan)", opacity: 0.07, borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg,#00FFFF,#0055ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#050c17", fontFamily: "var(--omnix-font-display)", boxShadow: "var(--omnix-glow-md)" }}>O</div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--omnix-font-display)", margin: "0 0 4px 0" }}>Omnix Labs</h2>
                    <p style={{ color: "var(--omnix-text-3)", fontSize: 12, margin: "0 0 10px 0" }}>Futuristic AI research and product development team.</p>
                    <div style={{ display: "flex", gap: 18 }}>
                      {[["User", "7 Members", User], ["Zap", "124 Chats", Zap], ["Database", "32 Sources", Database]].map(([, label, Icon]: any, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--omnix-text-2)", fontSize: 12 }}>
                          <Icon size={13} color="var(--omnix-text-3)" />{label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(0,255,255,0.25)", background: "rgba(0,255,255,0.08)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--omnix-cyan)", boxShadow: "0 0 6px var(--omnix-cyan)", display: "inline-block" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--omnix-cyan)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Pro Plan</span>
                  </div>
                  <button style={{ fontSize: 11, color: "var(--omnix-text-2)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>Upgrade plan <ArrowRight size={11} /></button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--omnix-border)", marginBottom: 24, position: "relative" }}>
              {["Overview", "Members", "Invitations", "Settings"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: "8px 16px", background: "none", border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? "var(--omnix-text)" : "var(--omnix-text-2)",
                  position: "relative", transition: "color 0.15s", fontFamily: "var(--omnix-font)",
                }}>
                  {tab}
                  {activeTab === tab && <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, borderRadius: "2px 2px 0 0", background: "var(--omnix-cyan)", boxShadow: "0 0 8px rgba(0,255,255,0.6)" }} />}
                </button>
              ))}
              <div style={{ marginLeft: "auto", paddingBottom: 8 }}>
                <button style={{ height: 32, padding: "0 14px", borderRadius: 8, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--omnix-font)" }}>
                  <Plus size={13} />New Workspace
                </button>
              </div>
            </div>

            {/* ── OVERVIEW ── */}
            {activeTab === "Overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                  <StatCard icon={MessageSquare} color="var(--omnix-cyan)"  label="AI Chats"       value="124"  sub="+12% this week"   />
                  <StatCard icon={User}          color="var(--omnix-blue)"  label="Members"        value="7"    sub="2 online now"      />
                  <StatCard icon={Database}      color="var(--omnix-green)" label="Sources"        value="32"   sub="843 KB indexed"    />
                  <StatCard icon={Activity}      color="#f59e0b"            label="AI Compute"     value="94%"  sub="Optimal"           />
                </div>

                {/* Usage bars */}
                <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, fontFamily: "var(--omnix-font-display)" }}>Workspace Health</div>
                  {[
                    { label: "API Rate Limit",     pct: 12, color: "var(--omnix-cyan)"  },
                    { label: "Storage Capacity",   pct: 78, color: "#f59e0b"            },
                    { label: "Compute Credits",    pct: 45, color: "var(--omnix-green)" },
                    { label: "Active Sessions",    pct: 60, color: "var(--omnix-blue)"  },
                  ].map(({ label, pct, color }) => (
                    <div key={label} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: "var(--omnix-text-2)" }}>{label}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color }}>{pct}%</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                        <div style={{ height: "100%", borderRadius: 3, width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}66` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent AI Sessions */}
                <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, fontFamily: "var(--omnix-font-display)" }}>Recent AI Sessions</div>
                  {[
                    { title: "Q3 Competitor Analysis",   user: "Elena Rostova", mode: "Deep Think", time: "10m ago",  tokens: "4.2k" },
                    { title: "Investor Deck Generation",  user: "Marcus Webb",   mode: "Fast",       time: "1h ago",   tokens: "1.8k" },
                    { title: "Engineering Sync Summary",  user: "Sarah Chen",    mode: "Fast",       time: "3h ago",   tokens: "920"  },
                    { title: "Financial Model Review",    user: "David Kim",     mode: "Deep Think", time: "1d ago",   tokens: "5.1k" },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--omnix-border)" : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)", marginBottom: 2 }}>{s.title}</div>
                        <div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{s.user} · {s.mode} · {s.tokens} tokens</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{s.time}</span>
                        <ChevronRight size={13} color="var(--omnix-text-3)" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── MEMBERS ── */}
            {activeTab === "Members" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ borderRadius: 12, border: "1px solid var(--omnix-border)", background: "rgba(6,8,16,0.6)", overflow: "hidden" }}>
                  <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Team Members</span>
                    <div style={{ position: "relative" }}>
                      <Search size={13} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--omnix-text-3)" }} />
                      <input type="text" placeholder="Search members..." style={{ paddingLeft: 28, paddingRight: 12, paddingTop: 6, paddingBottom: 6, fontSize: 12, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 20, color: "var(--omnix-text)", outline: "none", width: 200, fontFamily: "var(--omnix-font)" }} />
                    </div>
                  </div>
                  {members.map((m, i) => (
                    <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: i < members.length - 1 ? "1px solid var(--omnix-border)" : "none", transition: "background 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ position: "relative" }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{m.initials}</div>
                          <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", border: "2px solid var(--omnix-bg)", background: m.status === "online" ? "#22c55e" : "#4b5563" }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)", display: "flex", alignItems: "center", gap: 6 }}>
                            {m.name}
                            {m.role === "Founder" && <ShieldAlert size={12} color="var(--omnix-pink)" />}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{m.email}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 80 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.color, boxShadow: `0 0 6px ${m.color}`, display: "inline-block" }} />
                          <span style={{ fontSize: 11, fontWeight: 500, color: m.color }}>{m.role}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--omnix-text-3)", fontSize: 11, minWidth: 80 }}>
                          <Clock size={11} />{m.lastActive}
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button style={{ width: 28, height: 28, borderRadius: 7, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--omnix-text-3)" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-hover)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                          ><Settings size={13} /></button>
                          <button style={{ width: 28, height: 28, borderRadius: 7, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--omnix-text-3)" }}
                            onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-hover)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                          ><MoreHorizontal size={13} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── INVITATIONS ── */}
            {activeTab === "Invitations" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Invite form */}
                <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, fontFamily: "var(--omnix-font-display)" }}>Invite Members</div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 16 }}>Send email invitations to add new people to this workspace.</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    <div style={{ flex: 1, position: "relative" }}>
                      <Mail size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--omnix-text-3)" }} />
                      <input type="email" placeholder="Email address" style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px 9px 32px", fontSize: 13, background: "rgba(0,0,0,0.3)", border: "1px solid var(--omnix-border)", borderRadius: 9, color: "var(--omnix-text)", outline: "none", fontFamily: "var(--omnix-font)" }} />
                    </div>
                    <select style={{ padding: "9px 14px", fontSize: 12, background: "rgba(0,0,0,0.3)", border: "1px solid var(--omnix-border)", borderRadius: 9, color: "var(--omnix-text)", outline: "none", fontFamily: "var(--omnix-font)", minWidth: 120 }}>
                      <option>Member</option><option>Viewer</option><option>Co-owner</option>
                    </select>
                    <button style={{ padding: "9px 20px", borderRadius: 9, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--omnix-font)", boxShadow: "var(--omnix-glow-sm)", flexShrink: 0 }}>Send Invite</button>
                  </div>

                  {/* Pending */}
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 8 }}>Pending Invitations</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {pendingInvites.map((inv, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 9, border: "1px solid var(--omnix-border)", background: "rgba(0,0,0,0.2)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--omnix-surface-hover)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--omnix-text-3)" }}><Mail size={13} /></div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)" }}>{inv.email}</div>
                            <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginTop: 1 }}>Sent {inv.sent} · Expires {inv.expires}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--omnix-text-2)" }}>{inv.role}</span>
                          <div style={{ width: 1, height: 14, background: "var(--omnix-border)" }} />
                          <button style={{ fontSize: 11, fontWeight: 500, color: "var(--omnix-cyan)", background: "none", border: "none", cursor: "pointer" }}>Resend</button>
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--omnix-text-3)", display: "flex" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                          ><X size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invite link */}
                <div style={{ padding: "18px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Invite Link</div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 12 }}>Anyone with this link can request to join the workspace.</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--omnix-border)", background: "rgba(0,0,0,0.3)", fontSize: 12, color: "var(--omnix-text-2)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      https://omnix.ai/invite/ws_labs_ab3x9k2m
                    </div>
                    <button style={{ padding: "8px 14px", borderRadius: 8, background: "var(--omnix-surface-hover)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)" }}><Copy size={12} />Copy</button>
                    <button style={{ padding: "8px 14px", borderRadius: 8, background: "var(--omnix-surface-hover)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)" }}><RefreshCw size={12} />Regenerate</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── WORKSPACE SETTINGS ── */}
            {activeTab === "Settings" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Identity */}
                <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, fontFamily: "var(--omnix-font-display)" }}>Workspace Identity</div>
                  <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0 }}>
                      <div style={{ width: 72, height: 72, borderRadius: 14, background: "linear-gradient(135deg,#00FFFF,#0055ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#050c17", fontFamily: "var(--omnix-font-display)", cursor: "pointer", boxShadow: "var(--omnix-glow-sm)" }}>O</div>
                      <div style={{ fontSize: 10, color: "var(--omnix-text-3)", textAlign: "center", marginTop: 6 }}>Click to change</div>
                    </div>
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5 }}>Workspace Name</div>
                        <input defaultValue="Omnix Labs" style={{ width: "100%", boxSizing: "border-box", padding: "8px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--omnix-border)", borderRadius: 8, color: "var(--omnix-text)", fontSize: 13, outline: "none", fontFamily: "var(--omnix-font)" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5 }}>URL Slug</div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ padding: "8px 10px", background: "rgba(0,0,0,0.4)", border: "1px solid var(--omnix-border)", borderRight: "none", borderRadius: "8px 0 0 8px", fontSize: 12, color: "var(--omnix-text-3)" }}>omnix.ai/</span>
                          <input defaultValue="omnix-labs" style={{ flex: 1, padding: "8px 10px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--omnix-border)", borderRadius: "0 8px 8px 0", color: "var(--omnix-text)", fontSize: 13, outline: "none", fontFamily: "var(--omnix-font)" }} />
                        </div>
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5 }}>Description</div>
                        <textarea defaultValue="Futuristic AI research and product development team." rows={2} style={{ width: "100%", boxSizing: "border-box", padding: "8px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid var(--omnix-border)", borderRadius: 8, color: "var(--omnix-text)", fontSize: 13, outline: "none", fontFamily: "var(--omnix-font)", resize: "none" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, fontFamily: "var(--omnix-font-display)" }}>Member Permissions</div>
                  {[
                    { label: "Members can invite others",       desc: "Allow Members (not just owners) to send invitations" },
                    { label: "Members can create chats",        desc: "Allow all workspace members to create new AI chats"  },
                    { label: "Members can upload sources",      desc: "Allow members to upload documents to the workspace"  },
                    { label: "Require approval to join",        desc: "New members need owner approval before accessing"    },
                  ].map((p, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--omnix-border)" : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)" }}>{p.label}</div>
                        <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginTop: 2 }}>{p.desc}</div>
                      </div>
                      <div style={{ width: 38, height: 22, borderRadius: 11, background: i < 2 ? "var(--omnix-cyan)" : "rgba(255,255,255,0.1)", position: "relative", cursor: "pointer", transition: "all 0.2s", flexShrink: 0, boxShadow: i < 2 ? "var(--omnix-glow-xs)" : "none" }}>
                        <div style={{ position: "absolute", top: 2, left: i < 2 ? 18 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save + Danger */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button style={{ padding: "9px 24px", borderRadius: 9, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--omnix-font)", boxShadow: "var(--omnix-glow-sm)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Check size={14} />Save Changes
                  </button>
                </div>

                <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <AlertTriangle size={14} color="#f87171" />
                    <span style={{ fontWeight: 600, fontSize: 13, color: "#f87171" }}>Danger Zone</span>
                  </div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 14 }}>Permanently delete this workspace and all its data. This cannot be undone.</div>
                  <button style={{ padding: "8px 18px", borderRadius: 8, background: "transparent", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Delete Workspace</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── ACTIVITY SIDEBAR ── */}
        <div style={{ width: 280, flexShrink: 0, borderLeft: "1px solid var(--omnix-border)", background: "rgba(5,12,23,0.95)", backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid var(--omnix-border)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)" }}>Activity Feed</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>
            <div style={{ borderLeft: "1px solid var(--omnix-border)", marginLeft: 10, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 22 }}>
              {activities.map((a, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: -28, top: 3, width: 20, height: 20, borderRadius: "50%", background: "var(--omnix-bg)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <a.Icon size={10} color={a.color} />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--omnix-text-2)", lineHeight: 1.5, marginBottom: 3 }}>
                    <strong style={{ color: "var(--omnix-text)" }}>{a.user}</strong> {a.action}
                    {a.target && <div style={{ color: "var(--omnix-cyan)", fontWeight: 500, fontSize: 11, marginTop: 2 }}>{a.target}</div>}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--omnix-text-3)" }}>{a.time}</div>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", marginTop: 20, padding: "10px", borderRadius: 8, border: "1px dashed var(--omnix-border)", background: "none", color: "var(--omnix-text-3)", fontSize: 12, cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--omnix-font)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--omnix-text)"; e.currentTarget.style.borderColor = "var(--omnix-border-2)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--omnix-text-3)"; e.currentTarget.style.borderColor = "var(--omnix-border)"; }}
            >Load older activity</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
