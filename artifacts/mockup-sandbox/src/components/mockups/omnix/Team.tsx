import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import {
  Search, Plus, Mail, Shield, ShieldAlert, ShieldCheck,
  MoreHorizontal, MessageSquare, Clock, Star, Activity,
  ChevronDown, Users, Zap, Globe, Code2, Palette, BrainCircuit,
} from "lucide-react";

const ROLES = ["All", "Founder", "Co-owner", "Member", "Viewer"];

const SKILLS_MAP: Record<string, { label: string; color: string }[]> = {
  "Elena Rostova":  [{ label: "Strategy", color: "#f43f5e" }, { label: "AI Research", color: "#00FFFF" }, { label: "Product", color: "#9b5cff" }],
  "Marcus Webb":    [{ label: "Engineering", color: "#3b82f6" }, { label: "DevOps", color: "#00e87a" }, { label: "Backend", color: "#0055ff" }],
  "Sarah Chen":     [{ label: "Design", color: "#9b5cff" }, { label: "Frontend", color: "#00FFFF" }, { label: "UX", color: "#f59e0b" }],
  "David Kim":      [{ label: "Data Science", color: "#00e87a" }, { label: "ML", color: "#00FFFF" }, { label: "Analytics", color: "#3b82f6" }],
  "Maya Patel":     [{ label: "Marketing", color: "#f59e0b" }, { label: "Content", color: "#f43f5e" }, { label: "Growth", color: "#9b5cff" }],
  "James Wilson":   [{ label: "Sales", color: "#00e87a" }, { label: "CRM", color: "#f59e0b" }],
  "Alex Thompson":  [{ label: "Finance", color: "#3b82f6" }, { label: "Legal", color: "#f43f5e" }],
};

const MEMBERS = [
  { id: 1,  name: "Elena Rostova",  role: "Founder",  email: "elena@omnix.ai",  initials: "ER", bg: "linear-gradient(135deg,#ec4899,#be185d)", color: "#f43f5e",           status: "online",  lastActive: "Just now", chats: 42, tokens: "180k" },
  { id: 2,  name: "Marcus Webb",    role: "Co-owner", email: "marcus@omnix.ai", initials: "MW", bg: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#f59e0b",           status: "online",  lastActive: "2m ago",   chats: 35, tokens: "140k" },
  { id: 3,  name: "Sarah Chen",     role: "Member",   email: "sarah@omnix.ai",  initials: "SC", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)", color: "var(--omnix-blue)", status: "idle",    lastActive: "18m ago",  chats: 28, tokens: "95k"  },
  { id: 4,  name: "David Kim",      role: "Member",   email: "david@omnix.ai",  initials: "DK", bg: "linear-gradient(135deg,#8b5cf6,#6d28d9)", color: "#9b5cff",           status: "offline", lastActive: "2h ago",   chats: 19, tokens: "78k"  },
  { id: 5,  name: "Maya Patel",     role: "Member",   email: "maya@omnix.ai",   initials: "MP", bg: "linear-gradient(135deg,#06b6d4,#0e7490)", color: "#06b6d4",           status: "offline", lastActive: "4h ago",   chats: 14, tokens: "52k"  },
  { id: 6,  name: "James Wilson",   role: "Viewer",   email: "james@omnix.ai",  initials: "JW", bg: "linear-gradient(135deg,#4b5563,#374151)", color: "#6b7280",           status: "offline", lastActive: "1d ago",   chats: 4,  tokens: "12k"  },
  { id: 7,  name: "Alex Thompson",  role: "Viewer",   email: "alex@omnix.ai",   initials: "AT", bg: "linear-gradient(135deg,#4b5563,#374151)", color: "#6b7280",           status: "offline", lastActive: "2d ago",   chats: 2,  tokens: "5k"   },
];

const STATUS_DOT: Record<string, string> = { online: "#22c55e", idle: "#f59e0b", offline: "#4b5563" };

function RoleIcon({ role }: { role: string }) {
  if (role === "Founder")  return <ShieldAlert size={12} color="#f43f5e" />;
  if (role === "Co-owner") return <ShieldCheck size={12} color="#f59e0b" />;
  if (role === "Member")   return <Shield size={12} color="var(--omnix-blue)" />;
  return <Shield size={12} color="#4b5563" />;
}

export function Team() {
  const [search, setSearch]     = useState("");
  const [roleFilter, setRole]   = useState("All");
  const [view, setView]         = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = MEMBERS.filter(m =>
    (roleFilter === "All" || m.role === roleFilter) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))
  );

  const online  = MEMBERS.filter(m => m.status === "online").length;
  const idle    = MEMBERS.filter(m => m.status === "idle").length;

  return (
    <AppLayout activePage="Team" headerTitle="Team" headerSubtitle={`${MEMBERS.length} members · ${online} online`}>
      <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--omnix-bg)", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>

        {/* ── MAIN ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              {/* Search */}
              <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
                <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--omnix-text-3)" }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." style={{ width: "100%", boxSizing: "border-box", paddingLeft: 32, paddingRight: 12, paddingTop: 7, paddingBottom: 7, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 20, fontSize: 12, color: "var(--omnix-text)", outline: "none", fontFamily: "var(--omnix-font)" }} />
              </div>
              {/* Role filter */}
              <div style={{ display: "flex", gap: 2, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 20, padding: 3 }}>
                {ROLES.map(r => (
                  <button key={r} onClick={() => setRole(r)} style={{ padding: "4px 10px", borderRadius: 16, fontSize: 11, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "var(--omnix-font)", background: roleFilter === r ? "rgba(0,255,255,0.12)" : "transparent", color: roleFilter === r ? "var(--omnix-cyan)" : "var(--omnix-text-2)", outline: roleFilter === r ? "1px solid rgba(0,255,255,0.3)" : "none", transition: "all 0.15s" }}>{r}</button>
                ))}
              </div>
            </div>
            <button style={{ height: 34, padding: "0 16px", borderRadius: 9, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "var(--omnix-glow-sm)", fontFamily: "var(--omnix-font)" }}>
              <Plus size={13} />Invite Member
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 22 }}>
            {[
              { label: "Total Members", value: MEMBERS.length, Icon: Users,       color: "var(--omnix-cyan)"  },
              { label: "Online Now",    value: online,          Icon: Activity,    color: "var(--omnix-green)" },
              { label: "Away",          value: idle,            Icon: Clock,       color: "#f59e0b"            },
              { label: "AI Sessions",   value: "144",           Icon: MessageSquare, color: "var(--omnix-blue)" },
            ].map(({ label, value, Icon, color }) => (
              <div key={label} style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "var(--omnix-text)", fontFamily: "var(--omnix-font-display)", lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: 10, color: "var(--omnix-text-3)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Member grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {filtered.map(m => {
              const skills = SKILLS_MAP[m.name] || [];
              const isSelected = selected === m.id;
              return (
                <div key={m.id} onClick={() => setSelected(isSelected ? null : m.id)} style={{
                  padding: "18px 18px 14px",
                  borderRadius: 12,
                  border: `1px solid ${isSelected ? "rgba(0,255,255,0.35)" : "var(--omnix-border)"}`,
                  background: isSelected ? "rgba(0,255,255,0.04)" : "var(--omnix-surface)",
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: isSelected ? "var(--omnix-glow-xs)" : "none",
                  position: "relative",
                }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = "var(--omnix-border-2)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.transform = "none"; } }}
                >
                  {/* More menu */}
                  <button onClick={e => e.stopPropagation()} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: "var(--omnix-text-3)", display: "flex", alignItems: "center", padding: 4, borderRadius: 6 }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-hover)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                  ><MoreHorizontal size={13} /></button>

                  {/* Avatar + status */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>{m.initials}</div>
                      <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: STATUS_DOT[m.status], border: "2px solid var(--omnix-bg)" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0, paddingRight: 20 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--omnix-text)", marginBottom: 2, display: "flex", alignItems: "center", gap: 5 }}>
                        {m.name} <RoleIcon role={m.role} />
                      </div>
                      <div style={{ fontSize: 11, color: "var(--omnix-text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.email}</div>
                    </div>
                  </div>

                  {/* Role badge */}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 20, background: `${m.color}15`, border: `1px solid ${m.color}30`, marginBottom: 10 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: m.color, display: "inline-block" }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: m.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.role}</span>
                  </div>

                  {/* Skills */}
                  {skills.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                      {skills.map(s => (
                        <span key={s.label} style={{ padding: "2px 7px", borderRadius: 20, fontSize: 10, background: `${s.color}12`, border: `1px solid ${s.color}25`, color: s.color }}>{s.label}</span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div style={{ display: "flex", borderTop: "1px solid var(--omnix-border)", paddingTop: 10, gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MessageSquare size={11} color="var(--omnix-text-3)" />
                      <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{m.chats} chats</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Zap size={11} color="var(--omnix-text-3)" />
                      <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{m.tokens} tokens</span>
                    </div>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={11} color="var(--omnix-text-3)" />
                      <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{m.lastActive}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Role breakdown sidebar ── */}
        <div style={{ width: 260, flexShrink: 0, borderLeft: "1px solid var(--omnix-border)", background: "rgba(5,12,23,0.95)", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid var(--omnix-border)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)" }}>Role Breakdown</div>
          </div>
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { role: "Founder",  count: 1, color: "#f43f5e" },
              { role: "Co-owner", count: 1, color: "#f59e0b" },
              { role: "Member",   count: 3, color: "var(--omnix-blue)" },
              { role: "Viewer",   count: 2, color: "#6b7280" },
            ].map(({ role, count, color }) => (
              <div key={role}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: "var(--omnix-text-2)" }}>{role}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color }}>{count}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)" }}>
                  <div style={{ height: "100%", borderRadius: 2, width: `${(count / MEMBERS.length) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--omnix-border)", padding: "16px 18px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 12 }}>Top Contributors</div>
            {MEMBERS.slice(0, 4).map((m, i) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.bg.includes("ec4899") ? "#f43f5e" : m.bg.includes("f59e0b") ? "#f59e0b" : m.bg.includes("3b82f6") ? "#3b82f6" : "#8b5cf6", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--omnix-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: "var(--omnix-text-3)" }}>{m.tokens} tokens used</div>
                </div>
                <span style={{ fontSize: 10, color: "var(--omnix-text-3)", flexShrink: 0 }}>#{i + 1}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--omnix-border)", padding: "14px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 12 }}>Skills Coverage</div>
            {[
              { label: "Engineering", Icon: Code2,        color: "var(--omnix-blue)" },
              { label: "Design",      Icon: Palette,      color: "#9b5cff" },
              { label: "AI / ML",     Icon: BrainCircuit, color: "var(--omnix-cyan)" },
              { label: "Marketing",   Icon: Globe,        color: "#f59e0b" },
            ].map(({ label, Icon, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={11} color={color} />
                </div>
                <span style={{ fontSize: 12, color: "var(--omnix-text-2)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
