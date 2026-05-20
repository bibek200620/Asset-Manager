import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import {
  User, Shield, Settings as SettingsIcon, Cpu, Monitor, Bell, Users, Info,
  CheckCircle, LogOut, Save, RefreshCw, Upload, Zap, Globe, Brain
} from "lucide-react";

const settingsTabs = [
  { key: "profile", label: "Profile", Icon: User },
  { key: "account", label: "Account", Icon: Shield },
  { key: "workspace", label: "Workspace", Icon: SettingsIcon },
  { key: "ai", label: "AI Settings", Icon: Cpu },
  { key: "appearance", label: "Appearance", Icon: Monitor },
  { key: "notifications", label: "Notifications", Icon: Bell },
  { key: "team", label: "Team Management", Icon: Users },
  { key: "about", label: "About", Icon: Info },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 42, height: 23, borderRadius: 12,
        background: checked ? "var(--omnix-cyan)" : "rgba(255,255,255,0.1)",
        border: "none", cursor: "pointer", position: "relative",
        transition: "all 0.2s",
        boxShadow: checked ? "0 0 10px rgba(0,255,255,0.35)" : "none",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: 3.5, left: checked ? 21 : 3.5,
        width: 16, height: 16, borderRadius: "50%",
        background: checked ? "#050c17" : "rgba(255,255,255,0.4)",
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }} />
    </button>
  );
}

function SliderInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
      <div style={{ width: "100%", height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", position: "relative", cursor: "pointer" }}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          onChange(Math.round(pct * 100));
        }}
      >
        <div style={{ height: "100%", width: `${value}%`, borderRadius: 2, background: "linear-gradient(90deg, #00FFFF, #0088ff)", boxShadow: "0 0 8px rgba(0,255,255,0.4)" }} />
        <div style={{
          position: "absolute", top: "50%", transform: "translate(-50%, -50%)",
          left: `${value}%`,
          width: 14, height: 14, borderRadius: "50%",
          background: "#00FFFF", border: "2px solid #050c17",
          boxShadow: "0 0 8px rgba(0,255,255,0.5)",
          cursor: "grab",
        }} />
      </div>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      borderRadius: "var(--omnix-radius)", padding: "20px",
      background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 22, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>{title}</div>
      <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>{desc}</div>
    </div>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <div style={{ color: "var(--omnix-text-2)", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{label}</div>;
}

function TextInput({ defaultValue, placeholder, type = "text" }: { defaultValue?: string; placeholder?: string; type?: string }) {
  return (
    <input type={type} defaultValue={defaultValue} placeholder={placeholder} style={{
      width: "100%", padding: "9px 13px",
      borderRadius: "var(--omnix-radius-sm)", background: "rgba(255,255,255,0.03)",
      border: "1px solid var(--omnix-border)", color: "var(--omnix-text)",
      fontSize: 13, fontFamily: "var(--omnix-font)", outline: "none", transition: "border-color 0.2s",
    }}
      onFocus={e => { e.target.style.borderColor = "rgba(0,255,255,0.4)"; e.target.style.boxShadow = "var(--omnix-glow-xs)"; }}
      onBlur={e => { e.target.style.borderColor = "var(--omnix-border)"; e.target.style.boxShadow = "none"; }}
    />
  );
}

function SaveBtn({ label = "Save Changes" }: { label?: string }) {
  return (
    <button style={{
      alignSelf: "flex-start", padding: "9px 22px", borderRadius: 9,
      background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)",
      border: "none", color: "#050c17", fontSize: 13, fontWeight: 700,
      cursor: "pointer", fontFamily: "var(--omnix-font)", boxShadow: "var(--omnix-glow-sm)",
      display: "flex", alignItems: "center", gap: 7, transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "var(--omnix-glow-md)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--omnix-glow-sm)"; }}
    >
      <Save size={13} /> {label}
    </button>
  );
}

const teamMembers = [
  { name: "Alex Chen", email: "alex@omnix.ai", role: "Founder", avatar: "A", color: "#00FFFF" },
  { name: "Sarah Kim", email: "sarah@omnix.ai", role: "Member", avatar: "S", color: "#9b5cff" },
  { name: "Marcus Johnson", email: "marcus@omnix.ai", role: "Member", avatar: "M", color: "#00e87a" },
];

const invitations = [
  { email: "saniya200603@gmail.com", sent: "9h ago", role: "Member", status: "Accepted" },
  { email: "bibekkumarshah2006@gmail.com", sent: "9h ago", role: "Member", status: "Pending" },
];

export function Settings() {
  const [tab, setTab] = useState("profile");
  const [aiMode, setAiMode] = useState<"deep" | "fast" | "balanced">("balanced");
  const [webSearch, setWebSearch] = useState(true);
  const [contextMemory, setContextMemory] = useState(true);
  const [temperature, setTemperature] = useState(70);
  const [compactList, setCompactList] = useState(true);
  const [ambientMotion, setAmbientMotion] = useState(true);
  const [inviteNofifs, setInviteNotifs] = useState(true);
  const [wsEmails, setWsEmails] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");

  return (
    <AppLayout headerTitle="Settings" headerSubtitle="Manage your account and preferences">
      <div style={{ height: "100%", display: "flex", overflow: "hidden" }}>

        {/* Settings sidebar */}
        <div style={{
          width: 220, borderRight: "1px solid var(--omnix-border)",
          padding: "16px 10px", display: "flex", flexDirection: "column", gap: 2, flexShrink: 0,
          overflowY: "auto",
        }}>
          <div style={{ color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px 8px" }}>Settings Menu</div>
          {settingsTabs.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              width: "100%", padding: "9px 12px",
              borderRadius: "var(--omnix-radius-sm)",
              background: tab === key ? "rgba(0,255,255,0.08)" : "transparent",
              borderLeft: tab === key ? "2.5px solid var(--omnix-cyan)" : "2.5px solid transparent",
              border: tab === key ? "1px solid rgba(0,255,255,0.18)" : "1px solid transparent",
              color: tab === key ? "var(--omnix-text)" : "var(--omnix-text-2)",
              fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "var(--omnix-font)", fontWeight: tab === key ? 500 : 400,
              transition: "all 0.15s", textAlign: "left",
            }}
              onMouseEnter={e => { if (tab !== key) e.currentTarget.style.background = "var(--omnix-surface)"; }}
              onMouseLeave={e => { if (tab !== key) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={15} color={tab === key ? "var(--omnix-cyan)" : "rgba(255,255,255,0.3)"} strokeWidth={tab === key ? 2 : 1.5} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px", animation: "omnix-fade-in 0.2s ease" }}>

          {/* ─── PROFILE ─── */}
          {tab === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
              <SectionTitle title="Profile" desc="Manage the identity teammates see across Omnix: avatar, display name, handle, and email." />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Card>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: "50%",
                      background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, fontWeight: 700, color: "#050c17",
                      border: "2px solid rgba(0,255,255,0.4)", boxShadow: "0 0 20px rgba(0,255,255,0.25)", flexShrink: 0,
                    }}>A</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15 }}>Display Name</span>
                        <span style={{ background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.25)", borderRadius: 20, padding: "1px 8px", fontSize: 10, color: "var(--omnix-cyan)", display: "flex", alignItems: "center", gap: 4 }}>
                          <CheckCircle size={10} /> Authenticated
                        </span>
                      </div>
                      <button style={{ background: "rgba(0,255,255,0.06)", border: "1px solid var(--omnix-border)", borderRadius: 7, padding: "4px 12px", fontSize: 11, color: "var(--omnix-text-2)", cursor: "pointer", fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", gap: 5 }}>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Email</div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13 }}>alex@omnix.ai</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Omnix Handle</div>
                      <div style={{ color: "var(--omnix-cyan)", fontSize: 13 }}>@alex_2006</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>Handles are unique and can be used to invite teammates.</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Profile picture</div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 14 }}>Used in chat, team rosters, and the top bar.</div>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, fontWeight: 700, color: "#050c17", marginBottom: 14,
                    border: "2px solid rgba(0,255,255,0.4)", boxShadow: "0 0 16px rgba(0,255,255,0.2)",
                  }}>A</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", gap: 5 }}>
                      <Upload size={12} /> Upload
                    </button>
                    <button style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", gap: 5 }}>
                      <RefreshCw size={12} /> Reset
                    </button>
                  </div>
                  <button style={{ marginTop: 12, background: "none", border: "none", color: "var(--omnix-text-3)", fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)", padding: 0, textDecoration: "underline" }}>Refresh profile</button>
                </Card>
              </div>
            </div>
          )}

          {/* ─── ACCOUNT ─── */}
          {tab === "account" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
              <SectionTitle title="Account" desc="Review the authenticated browser session and account identity details." />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Card>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle size={18} color="var(--omnix-cyan)" />
                    </div>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Active session</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 12 }}>Session is active in this browser.</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Signed in as</div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13 }}>alex@omnix.ai</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Shield size={18} color="var(--omnix-text-2)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Session control</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 14 }}>Signing out clears the local session and returns this browser to login.</div>
                      <button style={{
                        width: "100%", padding: "9px", borderRadius: 9,
                        background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.3)",
                        color: "var(--omnix-red)", fontSize: 13, fontWeight: 600, cursor: "pointer",
                        fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "all 0.2s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,59,92,0.18)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,59,92,0.1)"; }}
                      >
                        <LogOut size={14} /> Sign out
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              <Card>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Auth User ID</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 10 }}>Your unique identifier in the Omnix system.</div>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--omnix-text-2)", background: "rgba(0,0,0,0.3)", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--omnix-border)" }}>
                  aa96eddd-a075-452d-b389-4ec4989f0678
                </div>
              </Card>
            </div>
          )}

          {/* ─── WORKSPACE ─── */}
          {tab === "workspace" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
              <SectionTitle title="Workspace Settings" desc="Edit the active workspace identity and keep workspace-level controls separate from account profile settings." />

              <Card>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <SettingsIcon size={18} color="var(--omnix-cyan)" />
                  </div>
                  <div>
                    <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, marginBottom: 3 }}>Workspace identity</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>These settings belong to the active workspace only. Account profile data lives separately.</div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Current workspace</div>
                    <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 16 }}>Omnix Labs</div>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 6 }}>
                      <span style={{ background: "rgba(0,255,255,0.1)", border: "1px solid rgba(0,255,255,0.25)", borderRadius: 20, padding: "2px 9px", fontSize: 10, color: "var(--omnix-cyan)" }}>Founder</span>
                      <span style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--omnix-border)", borderRadius: 20, padding: "2px 9px", fontSize: 10, color: "var(--omnix-text-2)" }}>12 members</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <FieldLabel label="Workspace name" />
                    <TextInput defaultValue="Omnix Labs" />
                  </div>
                  <div>
                    <FieldLabel label="Description" />
                    <textarea defaultValue="Main AI workspace for the Omnix Labs team." style={{
                      width: "100%", padding: "9px 13px", borderRadius: "var(--omnix-radius-sm)",
                      background: "rgba(255,255,255,0.03)", border: "1px solid var(--omnix-border)",
                      color: "var(--omnix-text)", fontSize: 13, fontFamily: "var(--omnix-font)", outline: "none",
                      resize: "vertical", minHeight: 80, transition: "border-color 0.2s",
                    }}
                      onFocus={e => { e.target.style.borderColor = "rgba(0,255,255,0.4)"; }}
                      onBlur={e => { e.target.style.borderColor = "var(--omnix-border)"; }}
                    />
                  </div>
                  <SaveBtn label="Save workspace" />
                </div>
              </Card>
            </div>
          )}

          {/* ─── AI SETTINGS ─── */}
          {tab === "ai" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
              <SectionTitle title="AI Settings" desc="Configure how Omnix reasons, uses context, and responds inside your workspace." />

              <Card>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14 }}>Connected Model</span>
                      <span style={{ background: "rgba(0,232,122,0.12)", border: "1px solid rgba(0,232,122,0.25)", borderRadius: 20, padding: "1px 8px", fontSize: 10, color: "var(--omnix-green)" }}>Online</span>
                    </div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Backend model routing is preserved through the existing Omnix API.</div>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Brain size={18} color="var(--omnix-cyan)" />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Provider: Omnix API", "Context: Workspace + Web", "Streaming: Enabled"].map((t, i) => (
                    <div key={i} style={{ flex: 1, padding: "6px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--omnix-border)", borderRadius: 8, color: "var(--omnix-text-2)", fontSize: 11 }}>{t}</div>
                  ))}
                </div>
              </Card>

              <Card>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12, color: "var(--omnix-text-3)" }}>Default Mode</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
                  {[
                    { key: "deep", Icon: Cpu, label: "Deep Think", desc: "Complex reasoning and multi-step analysis" },
                    { key: "fast", Icon: Zap, label: "Fast", desc: "Quick responses and standard workspace logic" },
                    { key: "balanced", Icon: SettingsIcon, label: "Balanced", desc: "Default speed and quality balance" },
                  ].map(({ key, Icon, label, desc }) => (
                    <button key={key} onClick={() => setAiMode(key as any)} style={{
                      padding: "14px 12px", borderRadius: "var(--omnix-radius-sm)",
                      background: aiMode === key ? "rgba(0,255,255,0.08)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${aiMode === key ? "rgba(0,255,255,0.35)" : "var(--omnix-border)"}`,
                      cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                      boxShadow: aiMode === key ? "var(--omnix-glow-xs)" : "none",
                    }}>
                      <Icon size={18} color={aiMode === key ? "var(--omnix-cyan)" : "var(--omnix-text-3)"} style={{ marginBottom: 8 }} />
                      <div style={{ color: aiMode === key ? "var(--omnix-text)" : "var(--omnix-text-2)", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{label}</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11, lineHeight: 1.4 }}>{desc}</div>
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--omnix-border)" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                        <Globe size={14} color="var(--omnix-text-2)" /> Web Search
                      </div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Allow Omnix to request live web context when it asks for current information.</div>
                    </div>
                    <Toggle checked={webSearch} onChange={() => setWebSearch(!webSearch)} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--omnix-border)" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                        <Brain size={14} color="var(--omnix-text-2)" /> Context Memory
                      </div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Use workspace conversation history and uploaded files as retrieval context.</div>
                    </div>
                    <Toggle checked={contextMemory} onChange={() => setContextMemory(!contextMemory)} />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <div>
                        <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, marginBottom: 3 }}>Creativity / Temperature</div>
                        <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Higher values make output more exploratory.</div>
                      </div>
                      <span style={{ color: "var(--omnix-cyan)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>{(temperature / 100).toFixed(2)}</span>
                    </div>
                    <SliderInput value={temperature} onChange={setTemperature} />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ─── APPEARANCE ─── */}
          {tab === "appearance" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
              <SectionTitle title="Appearance" desc="Local presentation and density controls for this browser." />

              <Card>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Monitor size={18} color="var(--omnix-cyan)" />
                  </div>
                  <div>
                    <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>Display preferences</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Tune the cockpit without changing workspace data.</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--omnix-border)" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, marginBottom: 3 }}>Compact conversation list</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Use denser history rows in the sidebar.</div>
                    </div>
                    <Toggle checked={compactList} onChange={() => setCompactList(!compactList)} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--omnix-border)" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, marginBottom: 3 }}>Ambient motion</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Keep subtle glows and motion enabled where supported.</div>
                    </div>
                    <Toggle checked={ambientMotion} onChange={() => setAmbientMotion(!ambientMotion)} />
                  </div>
                  <div>
                    <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Accent colors</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {[
                        { label: "Primary", color: "#00FFFF" },
                        { label: "Intelligence", color: "#3366ff" },
                        { label: "Signal", color: "#00e87a" },
                      ].map(({ label, color }) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}60` }} />
                          <span style={{ color: "var(--omnix-text-2)", fontSize: 12 }}>{label}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: "var(--omnix-radius-sm)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-3)", fontSize: 12 }}>
                      Sidebar collapse preferences are saved automatically from the sidebar control.
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ─── NOTIFICATIONS ─── */}
          {tab === "notifications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
              <SectionTitle title="Notifications" desc="Keep invite and workspace alerts visible without burying them in account details." />

              <Card>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Bell size={18} color="var(--omnix-cyan)" />
                  </div>
                  <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14 }}>Workspace alerts</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--omnix-border)" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, marginBottom: 3 }}>Invite notifications</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Show top-bar and sidebar notifications for pending workspace invites.</div>
                    </div>
                    <Toggle checked={inviteNofifs} onChange={() => setInviteNotifs(!inviteNofifs)} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, marginBottom: 3 }}>Workspace emails</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Receive product and workspace activity updates when email delivery is configured.</div>
                    </div>
                    <Toggle checked={wsEmails} onChange={() => setWsEmails(!wsEmails)} />
                  </div>
                </div>
                <div style={{ marginTop: 4, padding: "10px 14px", borderRadius: "var(--omnix-radius-sm)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-3)", fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <Bell size={13} /> Email invitations are sent from the backend when a workspace invite is created.
                </div>
              </Card>
            </div>
          )}

          {/* ─── TEAM MANAGEMENT ─── */}
          {tab === "team" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
              <SectionTitle title="Team Management" desc="Review workspace membership, roles, and invite activity without mixing account-level profile settings." />

              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Users size={18} color="var(--omnix-cyan)" />
                    </div>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, marginBottom: 3 }}>Team Members</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Manage workspace access, ownership level, and collaborator visibility.</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ display: "flex" }}>
                      {teamMembers.map((m, i) => (
                        <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#050c17", border: "2px solid #050c17", marginLeft: i > 0 ? -8 : 0 }}>{m.avatar}</div>
                      ))}
                    </div>
                    <span style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--omnix-border)", borderRadius: 20, padding: "2px 9px", fontSize: 11, color: "var(--omnix-text-2)" }}>{teamMembers.length} members</span>
                    <span style={{ background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)", borderRadius: 20, padding: "2px 9px", fontSize: 11, color: "var(--omnix-cyan)" }}>Your role: Founder</span>
                    <button style={{ padding: "6px 12px", borderRadius: 8, background: "transparent", border: "1px solid var(--omnix-cyan)", color: "var(--omnix-cyan)", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    ><Users size={11} /> Invite teammate</button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {teamMembers.map((m, i) => (
                    <div key={i} style={{ padding: "10px 14px", borderRadius: 9, background: "rgba(255,255,255,0.02)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#050c17", flexShrink: 0, border: `1.5px solid ${m.color}55`, boxShadow: `0 0 10px ${m.color}25` }}>{m.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500 }}>{m.name}</div>
                        <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{m.email}</div>
                      </div>
                      <span style={{ background: i === 0 ? "rgba(0,255,255,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${i === 0 ? "rgba(0,255,255,0.25)" : "var(--omnix-border)"}`, borderRadius: 20, padding: "2px 9px", fontSize: 11, color: i === 0 ? "var(--omnix-cyan)" : "var(--omnix-text-2)" }}>{m.role}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  Invitations
                </div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 14 }}>Pending and recent invite activity stays here after the team roster.</div>

                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <input
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    style={{ flex: 1, padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text)", fontSize: 12, fontFamily: "var(--omnix-font)", outline: "none" }}
                    onFocus={e => { e.target.style.borderColor = "rgba(0,255,255,0.4)"; }}
                    onBlur={e => { e.target.style.borderColor = "var(--omnix-border)"; }}
                  />
                  <button onClick={() => setInviteEmail("")} style={{ padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)", border: "none", color: "#050c17", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--omnix-font)", display: "flex", alignItems: "center", gap: 5, boxShadow: "var(--omnix-glow-xs)" }}>
                    <Users size={12} /> Invite
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {invitations.map((inv, i) => (
                    <div key={i} style={{ padding: "10px 14px", borderRadius: 9, background: "rgba(255,255,255,0.02)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "var(--omnix-text)", fontSize: 13 }}>{inv.email}</div>
                        <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>Sent {inv.sent} · {inv.role}</div>
                      </div>
                      <span style={{
                        background: inv.status === "Accepted" ? "rgba(0,232,122,0.1)" : "rgba(255,184,0,0.1)",
                        border: `1px solid ${inv.status === "Accepted" ? "rgba(0,232,122,0.25)" : "rgba(255,184,0,0.25)"}`,
                        borderRadius: 20, padding: "2px 9px", fontSize: 11,
                        color: inv.status === "Accepted" ? "var(--omnix-green)" : "var(--omnix-amber)",
                        display: "flex", alignItems: "center", gap: 5,
                      }}>
                        <CheckCircle size={11} /> {inv.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ─── ABOUT ─── */}
          {tab === "about" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
              <SectionTitle title="About / Terms" desc="Product context, policies, and presentation-ready account responsibilities." />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Card>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Brain size={18} color="var(--omnix-cyan)" />
                  </div>
                  <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 16, fontFamily: "var(--omnix-font-display)", marginBottom: 8 }}>Omnix</div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 13, lineHeight: 1.65 }}>A collaborative AI workspace for team chat, document-aware reasoning, shared files, and workspace invites.</div>
                </Card>

                <Card>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(155,92,255,0.08)", border: "1px solid rgba(155,92,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Info size={18} color="#9b5cff" />
                  </div>
                  <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 16, fontFamily: "var(--omnix-font-display)", marginBottom: 8 }}>Terms and policies</div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 13, lineHeight: 1.65 }}>Review account access, workspace data, AI response guidance, and acceptable use.</div>
                </Card>
              </div>

              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 4 }}>Version</div>
                    <div style={{ color: "var(--omnix-text)", fontSize: 14, fontWeight: 500 }}>Omnix v1.0.0</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 4 }}>Build</div>
                    <div style={{ color: "var(--omnix-text)", fontSize: 14, fontWeight: 500 }}>May 2026</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 4 }}>Plan</div>
                    <div style={{ color: "var(--omnix-cyan)", fontSize: 14, fontWeight: 500 }}>Pro</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}
