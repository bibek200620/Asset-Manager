import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  User, Settings2, Building2, Cpu, Palette, Bell, Users, CreditCard,
  CheckCircle2, Server, Globe, BrainCircuit, Zap, SlidersHorizontal,
  Shield, Key, Monitor, Smartphone, Lock, AlertTriangle, Check,
  Mail, Clock, TrendingUp, Database, Activity,
  ShieldCheck, Eye, EyeOff, ChevronRight, Trash2, Plus, X,
  Moon, Sun, Laptop, ShieldAlert, MoreHorizontal,
} from "lucide-react";

const SECTIONS = [
  { id: "profile",       label: "Profile",         Icon: User         },
  { id: "account",       label: "Account",          Icon: Settings2    },
  { id: "workspace",     label: "Workspace",        Icon: Building2    },
  { id: "ai",            label: "AI Settings",      Icon: Cpu          },
  { id: "appearance",    label: "Appearance",       Icon: Palette      },
  { id: "notifications", label: "Notifications",    Icon: Bell         },
  { id: "team",          label: "Team",             Icon: Users        },
  { id: "billing",       label: "Billing & Plans",  Icon: CreditCard   },
];

const AI_MODES = [
  { id: "deep",     name: "Deep Think", desc: "Complex reasoning",        Icon: BrainCircuit,    color: "#9b5cff" },
  { id: "fast",     name: "Fast",       desc: "Quick responses",           Icon: Zap,             color: "#00FFFF" },
  { id: "balanced", name: "Balanced",   desc: "Optimal speed/quality",     Icon: SlidersHorizontal, color: "#00e87a" },
];

function Row({ label, desc, children }: { label: string, desc?: string, children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)" }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)", marginBottom: desc ? 2 : 0 }}>{label}</div>
        {desc && <div style={{ fontSize: 11, color: "var(--omnix-text-3)", lineHeight: 1.5 }}>{desc}</div>}
      </div>
      {children}
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string, desc: string }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--omnix-font-display)", color: "var(--omnix-text)", margin: "0 0 5px 0" }}>{title}</h2>
      <p style={{ color: "var(--omnix-text-3)", fontSize: 12, margin: 0, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function SCard({ children, style = {} }: { children: React.ReactNode, style?: React.CSSProperties }) {
  return (
    <div style={{ borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)", overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

export function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [aiMode, setAiMode]               = useState("balanced");
  const [webSearch, setWebSearch]         = useState(true);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [temperature, setTemperature]     = useState([0.7]);
  const [showPw, setShowPw]               = useState(false);
  const [theme, setTheme]                 = useState("dark");
  const [accent, setAccent]               = useState("#00FFFF");
  const [density, setDensity]             = useState("default");

  const notifCategories = ["New messages", "AI completions", "Team updates", "Billing alerts", "Security alerts"];
  const [emailNotifs, setEmailNotifs]  = useState<Record<string, boolean>>({ "New messages": true, "AI completions": true, "Team updates": false, "Billing alerts": true, "Security alerts": true });
  const [pushNotifs, setPushNotifs]    = useState<Record<string, boolean>>({ "New messages": true, "AI completions": false, "Team updates": true,  "Billing alerts": true, "Security alerts": true });

  const members = [
    { name: "Elena Rostova", email: "elena@omnix.ai", role: "Founder",  initials: "ER", bg: "linear-gradient(135deg,#ec4899,#be185d)", color: "var(--omnix-pink)" },
    { name: "Marcus Webb",   email: "marcus@omnix.ai",role: "Co-owner", initials: "MW", bg: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#f59e0b"          },
    { name: "Sarah Chen",    email: "sarah@omnix.ai", role: "Member",   initials: "SC", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)", color: "var(--omnix-blue)" },
    { name: "David Kim",     email: "david@omnix.ai", role: "Member",   initials: "DK", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)", color: "var(--omnix-blue)" },
    { name: "Maya Patel",    email: "maya@omnix.ai",  role: "Viewer",   initials: "MP", bg: "linear-gradient(135deg,#4b5563,#374151)", color: "var(--omnix-text-3)" },
  ];

  return (
    <AppLayout activePage="Settings" headerTitle="Settings" headerSubtitle="Account & Preferences">
      <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>

        {/* ── LEFT NAV ── */}
        <div style={{ width: 210, flexShrink: 0, borderRight: "1px solid var(--omnix-border)", background: "rgba(5,12,23,0.6)", padding: "14px 8px", overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", padding: "0 8px 8px" }}>Settings</div>
          {SECTIONS.map(({ id, label, Icon }) => {
            const active = activeSection === id;
            return (
              <button key={id} onClick={() => setActiveSection(id)} style={{
                width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", textAlign: "left",
                display: "flex", alignItems: "center", gap: 9, cursor: "pointer",
                background: active ? "var(--omnix-surface-hover)" : "transparent",
                color: active ? "var(--omnix-text)" : "var(--omnix-text-2)",
                fontWeight: active ? 500 : 400, fontSize: 13,
                boxShadow: active ? "var(--omnix-glow-xs)" : "none",
                position: "relative", transition: "all 0.15s", fontFamily: "var(--omnix-font)", marginBottom: 2,
              }}>
                {active && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 2.5, height: "55%", borderRadius: 2, background: "var(--omnix-cyan)", boxShadow: "var(--omnix-glow-xs)" }} />}
                <Icon size={14} color={active ? "var(--omnix-cyan)" : "var(--omnix-text-3)"} />
                {label}
              </button>
            );
          })}
        </div>

        {/* ── CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>
          <div style={{ maxWidth: 660, margin: "0 auto", paddingBottom: 60 }}>

            {/* ═══ PROFILE ═══ */}
            {activeSection === "profile" && (<>
              <SectionTitle title="Profile" desc="Your personal details and public presence within Omnix." />
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 20 }}>
                <div style={{ flexShrink: 0, textAlign: "center", cursor: "pointer" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px dashed var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)", position: "relative" }}>
                    <span style={{ fontSize: 26, fontWeight: 700, background: "linear-gradient(135deg,#00FFFF,#0055ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>A</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--omnix-text-3)", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Upload</div>
                </div>
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>Display Name</Label><Input defaultValue="Alex Chen" className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] h-9 text-sm focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] focus-visible:border-[var(--omnix-cyan)] rounded-lg" /></div>
                  <div><Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>Email</Label><Input defaultValue="alex@omnix.ai" readOnly className="bg-[rgba(0,0,0,0.2)] border-[var(--omnix-border)] h-9 text-sm text-[var(--omnix-text-3)] cursor-not-allowed rounded-lg" /></div>
                  <div><Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>Role / Title</Label><Input defaultValue="Senior AI Researcher" className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] h-9 text-sm focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] rounded-lg" /></div>
                  <div><Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>Timezone</Label>
                    <select style={{ width: "100%", padding: "7px 10px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 8, color: "var(--omnix-text)", fontSize: 13, outline: "none", fontFamily: "var(--omnix-font)" }}>
                      <option>UTC-8 (PST)</option><option>UTC+0 (GMT)</option><option>UTC+5:30 (IST)</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}><Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>Bio</Label><Textarea defaultValue="Building the future of AI-powered collaborative workspaces." rows={3} className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] text-sm resize-none focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] rounded-lg" /></div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ height: 36, padding: "0 22px", borderRadius: 9, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "var(--omnix-glow-sm)", fontFamily: "var(--omnix-font)" }}>
                  <CheckCircle2 size={14} />Save Changes
                </button>
              </div>
            </>)}

            {/* ═══ ACCOUNT ═══ */}
            {activeSection === "account" && (<>
              <SectionTitle title="Account" desc="Manage your password, security, and active sessions." />
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><Key size={14} color="var(--omnix-cyan)" />Change Password</div>
                <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Current Password", "New Password", "Confirm New Password"].map((p, i) => (
                    <div key={i}>
                      <Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>{p}</Label>
                      <div style={{ position: "relative" }}>
                        <Input type={showPw ? "text" : "password"} defaultValue={i === 0 ? "••••••••••" : ""} className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] h-9 text-sm rounded-lg focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] pr-10" />
                        <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--omnix-text-3)" }}>{showPw ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                    <button style={{ height: 34, padding: "0 18px", borderRadius: 8, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Update Password</button>
                  </div>
                </div>
              </SCard>
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><ShieldCheck size={14} color="var(--omnix-cyan)" />Two-Factor Authentication</div>
                <Row label="Authenticator App" desc="Use an authenticator app to generate one-time codes">
                  <button style={{ height: 30, padding: "0 14px", borderRadius: 7, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.25)", color: "var(--omnix-cyan)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Enable</button>
                </Row>
                <Row label="SMS Backup" desc="Receive a code via SMS as a backup method">
                  <button style={{ height: 30, padding: "0 14px", borderRadius: 7, background: "var(--omnix-surface-hover)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Set Up</button>
                </Row>
              </SCard>
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><Monitor size={14} color="var(--omnix-cyan)" />Active Sessions</div>
                {[
                  { device: "MacBook Pro 16", os: "macOS 14.4", location: "San Francisco, US", Icon: Laptop, current: true },
                  { device: "iPhone 15 Pro",  os: "iOS 17.4",   location: "San Francisco, US", Icon: Smartphone, current: false },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: i === 0 ? "1px solid var(--omnix-border)" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--omnix-surface-hover)", display: "flex", alignItems: "center", justifyContent: "center" }}><s.Icon size={15} color="var(--omnix-text-2)" /></div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)", display: "flex", alignItems: "center", gap: 7 }}>
                          {s.device}
                          {s.current && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 20, background: "rgba(0,255,255,0.12)", color: "var(--omnix-cyan)", border: "1px solid rgba(0,255,255,0.25)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Current</span>}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{s.os} · {s.location}</div>
                      </div>
                    </div>
                    {!s.current && <button style={{ height: 28, padding: "0 12px", borderRadius: 7, background: "transparent", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 11, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Revoke</button>}
                  </div>
                ))}
              </SCard>
              <div style={{ padding: "18px 20px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}><AlertTriangle size={13} color="#f87171" /><span style={{ fontWeight: 600, fontSize: 13, color: "#f87171" }}>Danger Zone</span></div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 12 }}>Permanently delete your account and all associated data. This cannot be undone.</div>
                <button style={{ height: 32, padding: "0 16px", borderRadius: 7, background: "transparent", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", gap: 6 }}>
                  <Trash2 size={12} />Delete Account
                </button>
              </div>
            </>)}

            {/* ═══ WORKSPACE ═══ */}
            {activeSection === "workspace" && (<>
              <SectionTitle title="Workspace" desc="Configure workspace identity, domain, and default member permissions." />
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><Building2 size={14} color="var(--omnix-cyan)" />Identity</div>
                <div style={{ padding: "16px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>Workspace Name</Label><Input defaultValue="Omnix Labs" className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] h-9 text-sm focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] rounded-lg" /></div>
                  <div><Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>URL Slug</Label>
                    <div style={{ display: "flex" }}>
                      <span style={{ padding: "7px 10px", background: "rgba(0,0,0,0.4)", border: "1px solid var(--omnix-border)", borderRight: "none", borderRadius: "8px 0 0 8px", fontSize: 12, color: "var(--omnix-text-3)" }}>omnix.ai/</span>
                      <Input defaultValue="omnix-labs" className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] h-9 text-sm focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] rounded-[0_8px_8px_0]" style={{ borderLeft: "none" } as any} />
                    </div>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}><Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 5, display: "block" }}>Description</Label><Textarea defaultValue="Futuristic AI research and product development team." rows={2} className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] text-sm resize-none focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] rounded-lg" /></div>
                </div>
              </SCard>
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><Shield size={14} color="var(--omnix-cyan)" />Permissions</div>
                {[
                  { label: "Members can invite others",    desc: "Allow non-owners to send invitations", on: false },
                  { label: "Members can create chats",     desc: "Allow all members to start AI chats",   on: true  },
                  { label: "Members can upload sources",   desc: "Allow uploading documents",             on: true  },
                  { label: "Require join approval",        desc: "Owners must approve new members",       on: false },
                ].map((p, i, arr) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: i < arr.length - 1 ? "1px solid var(--omnix-border)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)" }}>{p.label}</div>
                      <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginTop: 2 }}>{p.desc}</div>
                    </div>
                    <div style={{ width: 38, height: 22, borderRadius: 11, background: p.on ? "var(--omnix-cyan)" : "rgba(255,255,255,0.1)", position: "relative", cursor: "pointer", flexShrink: 0, boxShadow: p.on ? "var(--omnix-glow-xs)" : "none" }}>
                      <div style={{ position: "absolute", top: 2, left: p.on ? 18 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.4)", transition: "left 0.2s" }} />
                    </div>
                  </div>
                ))}
              </SCard>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <button style={{ height: 36, padding: "0 22px", borderRadius: 9, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "var(--omnix-glow-sm)", fontFamily: "var(--omnix-font)" }}><Check size={14} />Save Changes</button>
              </div>
              <div style={{ padding: "18px 20px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}><AlertTriangle size={13} color="#f87171" /><span style={{ fontWeight: 600, fontSize: 13, color: "#f87171" }}>Danger Zone</span></div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 12 }}>Permanently delete this workspace and all its data.</div>
                <button style={{ height: 32, padding: "0 16px", borderRadius: 7, background: "transparent", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", gap: 6 }}><Trash2 size={12} />Delete Workspace</button>
              </div>
            </>)}

            {/* ═══ AI SETTINGS ═══ */}
            {activeSection === "ai" && (<>
              <SectionTitle title="AI Settings" desc="Configure how Omnix AI behaves and interacts with your workspace." />
              {/* Ollama model */}
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><Server size={14} color="var(--omnix-cyan)" />Connected Model</div>
                <div style={{ padding: "14px 18px", background: "rgba(0,255,255,0.04)", border: "none", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(0,255,255,0.1)", border: "1px solid var(--omnix-border-2)", display: "flex", alignItems: "center", justifyContent: "center" }}><Server size={19} color="var(--omnix-cyan)" /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>Ollama</span>
                      <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "rgba(0,232,122,0.12)", color: "var(--omnix-green)", border: "1px solid rgba(0,232,122,0.25)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Connected</span>
                    </div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Running on AWS · Self-hosted</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", marginBottom: 2 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--omnix-green)", boxShadow: "0 0 5px var(--omnix-green)" }} />
                      <span style={{ fontSize: 11, fontWeight: 500, color: "var(--omnix-green)" }}>Online</span>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>Latency: 42ms</div>
                  </div>
                </div>
                <div style={{ padding: "12px 18px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, borderTop: "1px solid var(--omnix-border)", background: "var(--omnix-surface)" }}>
                  {[["Model", "llama3.2:latest"], ["Context Window", "128k tokens"], ["Endpoint", "aws.omnix.internal"]].map(([k, v]) => (
                    <div key={k}><div style={{ fontSize: 10, color: "var(--omnix-text-3)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{k}</div><div style={{ fontSize: 12, color: "var(--omnix-text)", fontFamily: "monospace" }}>{v}</div></div>
                  ))}
                </div>
              </SCard>
              {/* Default Mode */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 8 }}>Default Mode</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {AI_MODES.map(({ id, name, desc, Icon, color }) => {
                    const on = aiMode === id;
                    return (
                      <button key={id} onClick={() => setAiMode(id)} style={{ padding: "12px 14px", borderRadius: 10, textAlign: "left", cursor: "pointer", border: `1px solid ${on ? color + "66" : "var(--omnix-border)"}`, background: on ? `${color}0e` : "var(--omnix-surface)", boxShadow: on ? `0 0 14px ${color}22` : "none", fontFamily: "var(--omnix-font)", transition: "all 0.2s" }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: on ? `${color}1a` : "rgba(255,255,255,0.04)", border: `1px solid ${on ? color + "44" : "var(--omnix-border)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 7 }}><Icon size={12} color={on ? color : "var(--omnix-text-3)"} /></div>
                        <div style={{ fontWeight: 600, fontSize: 12, color: on ? "var(--omnix-text)" : "var(--omnix-text-2)", marginBottom: 2 }}>{name}</div>
                        <div style={{ fontSize: 10, color: "var(--omnix-text-3)" }}>{desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <SCard style={{ marginBottom: 16 }}>
                <Row label="Web Search" desc="Allow the AI to fetch up-to-date information from the web"><Switch checked={webSearch} onCheckedChange={setWebSearch} className="data-[state=checked]:bg-[var(--omnix-cyan)]" /></Row>
                <Row label="Context Memory" desc="Remember details from past conversations">
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button style={{ height: 28, padding: "0 11px", borderRadius: 6, background: "transparent", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 11, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Clear</button>
                    <Switch checked={memoryEnabled} onCheckedChange={setMemoryEnabled} className="data-[state=checked]:bg-[var(--omnix-cyan)]" />
                  </div>
                </Row>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div><div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)", marginBottom: 2 }}>Temperature</div><div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>Higher = more creative, lower = more precise</div></div>
                    <div style={{ fontSize: 12, fontFamily: "monospace", background: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 6, color: "var(--omnix-cyan)", border: "1px solid var(--omnix-border)", flexShrink: 0 }}>{temperature[0].toFixed(2)}</div>
                  </div>
                  <Slider value={temperature} onValueChange={setTemperature} max={2} step={0.1} className="cursor-pointer" />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--omnix-text-3)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}><span>Precise</span><span>Creative</span></div>
                </div>
                <Row label="Max Response Tokens" desc="Limit the maximum length of AI responses">
                  <Input type="number" defaultValue="4096" className="w-24 h-8 bg-[rgba(0,0,0,0.3)] border-[var(--omnix-border)] text-sm font-mono text-center focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] rounded-lg" />
                </Row>
              </SCard>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 8 }}>Custom Instructions</div>
                <Textarea placeholder="E.g., Always reply in markdown. Never use emojis. Assume I am a senior engineer..." className="min-h-[90px] bg-[var(--omnix-surface)] border-[var(--omnix-border)] focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] rounded-xl resize-none text-sm placeholder:text-[var(--omnix-text-3)]" />
              </div>
            </>)}

            {/* ═══ APPEARANCE ═══ */}
            {activeSection === "appearance" && (<>
              <SectionTitle title="Appearance" desc="Customize the look and feel of your Omnix workspace." />
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13 }}>Theme</div>
                <div style={{ padding: "16px 18px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[{ id: "dark", label: "Dark", Icon: Moon }, { id: "light", label: "Light", Icon: Sun }, { id: "system", label: "System", Icon: Laptop }].map(({ id, label, Icon }) => (
                    <button key={id} onClick={() => setTheme(id)} style={{ padding: "14px 10px", borderRadius: 10, textAlign: "center", cursor: "pointer", border: `1px solid ${theme === id ? "var(--omnix-cyan)" : "var(--omnix-border)"}`, background: theme === id ? "rgba(0,255,255,0.07)" : "var(--omnix-surface)", boxShadow: theme === id ? "var(--omnix-glow-xs)" : "none", fontFamily: "var(--omnix-font)", transition: "all 0.2s" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: theme === id ? "rgba(0,255,255,0.12)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                        <Icon size={17} color={theme === id ? "var(--omnix-cyan)" : "var(--omnix-text-3)"} />
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: theme === id ? "var(--omnix-text)" : "var(--omnix-text-2)" }}>{label}</div>
                    </button>
                  ))}
                </div>
              </SCard>
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13 }}>Accent Color</div>
                <div style={{ padding: "16px 18px", display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["#00FFFF", "#0055ff", "#9b5cff", "#00e87a", "#f43f5e", "#f59e0b", "#e879f9"].map(c => (
                    <button key={c} onClick={() => setAccent(c)} style={{ width: 32, height: 32, borderRadius: "50%", background: c, border: `3px solid ${accent === c ? "rgba(255,255,255,0.8)" : "transparent"}`, cursor: "pointer", boxShadow: accent === c ? `0 0 12px ${c}88` : "none", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {accent === c && <Check size={13} color="#050c17" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </SCard>
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13 }}>Interface Density</div>
                <div style={{ padding: "14px 18px", display: "flex", gap: 8 }}>
                  {["Compact", "Default", "Comfortable"].map(d => (
                    <button key={d} onClick={() => setDensity(d.toLowerCase())} style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: `1px solid ${density === d.toLowerCase() ? "var(--omnix-cyan)" : "var(--omnix-border)"}`, background: density === d.toLowerCase() ? "rgba(0,255,255,0.07)" : "transparent", color: density === d.toLowerCase() ? "var(--omnix-cyan)" : "var(--omnix-text-2)", fontSize: 12, fontWeight: density === d.toLowerCase() ? 600 : 400, cursor: "pointer", fontFamily: "var(--omnix-font)", transition: "all 0.2s" }}>{d}</button>
                  ))}
                </div>
              </SCard>
              <SCard>
                <Row label="Reduce Motion" desc="Minimize animations and transitions"><Switch className="data-[state=checked]:bg-[var(--omnix-cyan)]" /></Row>
                <Row label="Compact Sidebar" desc="Use a narrower sidebar to maximize content space"><Switch className="data-[state=checked]:bg-[var(--omnix-cyan)]" /></Row>
              </SCard>
            </>)}

            {/* ═══ NOTIFICATIONS ═══ */}
            {activeSection === "notifications" && (<>
              <SectionTitle title="Notifications" desc="Choose how and when Omnix notifies you about activity." />
              {[
                { title: "Email Notifications", Icon: Mail, state: emailNotifs, setState: setEmailNotifs },
                { title: "Push Notifications",  Icon: Smartphone, state: pushNotifs, setState: setPushNotifs },
              ].map(({ title, Icon, state, setState }) => (
                <SCard key={title} style={{ marginBottom: 16 }}>
                  <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><Icon size={14} color="var(--omnix-cyan)" />{title}</div>
                  {notifCategories.map((cat, i) => (
                    <Row key={cat} label={cat} desc={i === 0 ? "Direct messages and @mentions" : i === 1 ? "When an AI task finishes" : i === 2 ? "Member joins, role changes" : i === 3 ? "Invoices and usage warnings" : "Suspicious logins and 2FA changes"}>
                      <Switch checked={state[cat]} onCheckedChange={v => setState({ ...state, [cat]: v })} className="data-[state=checked]:bg-[var(--omnix-cyan)]" />
                    </Row>
                  ))}
                </SCard>
              ))}
              <SCard>
                <Row label="Do Not Disturb" desc="Silence all notifications during focus hours">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <select style={{ padding: "4px 8px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 6, color: "var(--omnix-text)", fontSize: 11, outline: "none", fontFamily: "var(--omnix-font)" }}><option>10 PM – 8 AM</option><option>11 PM – 7 AM</option></select>
                    <Switch className="data-[state=checked]:bg-[var(--omnix-cyan)]" />
                  </div>
                </Row>
              </SCard>
            </>)}

            {/* ═══ TEAM ═══ */}
            {activeSection === "team" && (<>
              <SectionTitle title="Team Management" desc="View and manage members within your workspace." />
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>Members · {members.length}</span>
                  <button style={{ height: 30, padding: "0 12px", borderRadius: 7, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.25)", color: "var(--omnix-cyan)", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--omnix-font)" }}><Plus size={12} />Invite</button>
                </div>
                {members.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 18px", borderBottom: i < members.length - 1 ? "1px solid var(--omnix-border)" : "none", transition: "background 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{m.initials}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)", display: "flex", alignItems: "center", gap: 6 }}>
                          {m.name}
                          {m.role === "Founder" && <ShieldAlert size={11} color="var(--omnix-pink)" />}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>{m.email}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 500, color: m.color }}>{m.role}</span>
                      <button style={{ width: 26, height: 26, borderRadius: 6, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--omnix-text-3)" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-hover)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
                      ><MoreHorizontal size={13} /></button>
                    </div>
                  </div>
                ))}
              </SCard>
              <SCard>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13 }}>Invite by Email</div>
                <div style={{ padding: "14px 18px", display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <Mail size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--omnix-text-3)" }} />
                    <Input type="email" placeholder="colleague@company.com" className="pl-8 bg-[var(--omnix-surface)] border-[var(--omnix-border)] h-9 text-sm focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] rounded-lg" />
                  </div>
                  <select style={{ padding: "0 12px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 8, color: "var(--omnix-text)", fontSize: 12, outline: "none", fontFamily: "var(--omnix-font)" }}><option>Member</option><option>Viewer</option><option>Co-owner</option></select>
                  <button style={{ height: 36, padding: "0 16px", borderRadius: 8, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Send</button>
                </div>
              </SCard>
            </>)}

            {/* ═══ BILLING ═══ */}
            {activeSection === "billing" && (<>
              <SectionTitle title="Billing & Plans" desc="Manage your subscription, usage, and payment method." />
              {/* Current plan */}
              <div style={{ padding: "20px 22px", borderRadius: 12, border: "1px solid rgba(0,255,255,0.25)", background: "rgba(0,255,255,0.04)", boxShadow: "var(--omnix-glow-xs)", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--omnix-cyan)", marginBottom: 4 }}>Current Plan</div>
                  <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--omnix-font-display)", color: "var(--omnix-text)", marginBottom: 4 }}>Pro <span style={{ fontSize: 14, fontWeight: 400, color: "var(--omnix-text-3)" }}>· $45 / month</span></div>
                  <div style={{ fontSize: 12, color: "var(--omnix-text-3)" }}>Renews on June 1, 2026 · Billed annually</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ height: 34, padding: "0 16px", borderRadius: 8, background: "transparent", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Cancel Plan</button>
                  <button style={{ height: 34, padding: "0 16px", borderRadius: 8, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Upgrade</button>
                </div>
              </div>
              {/* Usage */}
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><Activity size={14} color="var(--omnix-cyan)" />Usage This Month</div>
                <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { label: "AI Tokens",        used: "124k", limit: "500k", pct: 25, color: "var(--omnix-cyan)"  },
                    { label: "Storage",           used: "2.3 GB", limit: "10 GB", pct: 23, color: "var(--omnix-blue)"  },
                    { label: "API Calls",         used: "8,420", limit: "50k",   pct: 17, color: "var(--omnix-green)" },
                    { label: "Active Members",    used: "7",    limit: "20",    pct: 35, color: "#f59e0b"            },
                  ].map(({ label, used, limit, pct, color }) => (
                    <div key={label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, color: "var(--omnix-text-2)" }}>{label}</span>
                        <span style={{ fontSize: 12, color: "var(--omnix-text-3)" }}>{used} / {limit}</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                        <div style={{ height: "100%", borderRadius: 3, width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}55` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </SCard>
              {/* Plan comparison */}
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13 }}>Available Plans</div>
                <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { name: "Starter", price: "$0", desc: "For individuals", features: ["5k tokens/mo", "1 workspace", "5 sources", "Fast mode only"] },
                    { name: "Pro",     price: "$45", desc: "For teams", features: ["500k tokens/mo", "3 workspaces", "Unlimited sources", "All AI modes"], current: true },
                    { name: "Enterprise", price: "Custom", desc: "For organizations", features: ["Unlimited tokens", "Unlimited workspaces", "SSO & audit logs", "Dedicated support"] },
                  ].map(p => (
                    <div key={p.name} style={{ padding: "14px", borderRadius: 10, border: `1px solid ${p.current ? "var(--omnix-cyan)" : "var(--omnix-border)"}`, background: p.current ? "rgba(0,255,255,0.05)" : "transparent", position: "relative" }}>
                      {p.current && <div style={{ position: "absolute", top: -1, right: 10, fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: "0 0 6px 6px", background: "var(--omnix-cyan)", color: "#050c17", textTransform: "uppercase", letterSpacing: "0.06em" }}>Current</div>}
                      <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--omnix-font-display)", color: "var(--omnix-text)", marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: p.current ? "var(--omnix-cyan)" : "var(--omnix-text)", marginBottom: 2 }}>{p.price}<span style={{ fontSize: 11, fontWeight: 400, color: "var(--omnix-text-3)" }}>{p.price !== "Custom" ? "/mo" : ""}</span></div>
                      <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 10 }}>{p.desc}</div>
                      {p.features.map(f => <div key={f} style={{ fontSize: 11, color: "var(--omnix-text-2)", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><Check size={10} color="var(--omnix-green)" />{f}</div>)}
                    </div>
                  ))}
                </div>
              </SCard>
              {/* Payment method */}
              <SCard style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}><CreditCard size={14} color="var(--omnix-cyan)" />Payment Method</div>
                <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#1a1f36,#2d3561)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 22, height: 14, borderRadius: 2, background: "linear-gradient(135deg,#eb8c1d,#fbbf24)" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)" }}>Visa ending in 4242</div>
                      <div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>Expires 08/2027</div>
                    </div>
                  </div>
                  <button style={{ height: 28, padding: "0 12px", borderRadius: 7, background: "transparent", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 11, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Update</button>
                </div>
              </SCard>
              {/* Invoices */}
              <SCard>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)", fontWeight: 600, fontSize: 13 }}>Recent Invoices</div>
                {[["May 2026", "$45.00", "Paid"], ["Apr 2026", "$45.00", "Paid"], ["Mar 2026", "$45.00", "Paid"]].map(([date, amt, status], i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: i < arr.length - 1 ? "1px solid var(--omnix-border)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 13, color: "var(--omnix-text)", fontWeight: 500 }}>Pro Plan · {date}</div>
                      <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginTop: 1 }}>Billed to Visa 4242</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--omnix-text)" }}>{amt}</span>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(0,232,122,0.1)", color: "var(--omnix-green)", border: "1px solid rgba(0,232,122,0.2)", fontWeight: 600 }}>{status}</span>
                      <button style={{ fontSize: 11, color: "var(--omnix-cyan)", background: "none", border: "none", cursor: "pointer" }}>Download</button>
                    </div>
                  </div>
                ))}
              </SCard>
            </>)}

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
