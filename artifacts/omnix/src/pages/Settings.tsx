import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { User, Bell, Shield, Palette, Zap, Key, Trash2 } from "lucide-react";

const settingsTabs = [
  { key: "profile", label: "Profile", Icon: User },
  { key: "ai", label: "AI Preferences", Icon: Zap },
  { key: "notifications", label: "Notifications", Icon: Bell },
  { key: "appearance", label: "Appearance", Icon: Palette },
  { key: "security", label: "Security", Icon: Shield },
  { key: "api", label: "API Keys", Icon: Key },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 40, height: 22, borderRadius: 11,
        background: checked ? "var(--omnix-cyan)" : "rgba(255,255,255,0.1)",
        border: "none", cursor: "pointer", position: "relative",
        transition: "all 0.2s",
        boxShadow: checked ? "0 0 10px rgba(0,255,255,0.35)" : "none",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: 3, left: checked ? 20 : 3,
        width: 16, height: 16, borderRadius: "50%",
        background: checked ? "#050c17" : "rgba(255,255,255,0.4)",
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }} />
    </button>
  );
}

function Slider({ value, onChange, min = 0, max = 100 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
      <div style={{ width: "100%", height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", position: "relative", cursor: "pointer" }}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          onChange(Math.round(min + pct * (max - min)));
        }}
      >
        <div style={{ height: "100%", width: `${((value - min) / (max - min)) * 100}%`, borderRadius: 2, background: "linear-gradient(90deg, #00FFFF, #0088ff)", boxShadow: "0 0 8px rgba(0,255,255,0.4)" }} />
        <div style={{
          position: "absolute", top: "50%", transform: "translate(-50%, -50%)",
          left: `${((value - min) / (max - min)) * 100}%`,
          width: 14, height: 14, borderRadius: "50%",
          background: "#00FFFF", border: "2px solid #050c17",
          boxShadow: "0 0 8px rgba(0,255,255,0.5)",
          cursor: "grab",
        }} />
      </div>
    </div>
  );
}

const apiKeys = [
  { name: "Production API Key", key: "omx_prod_••••••••••••••••", created: "Jan 15, 2024", lastUsed: "2 min ago" },
  { name: "Development Key", key: "omx_dev_••••••••••••••••", created: "Feb 3, 2024", lastUsed: "1h ago" },
];

export function Settings() {
  const [tab, setTab] = useState("profile");
  const [notifs, setNotifs] = useState({ aiComplete: true, newMember: true, sourceSynced: false, weeklyReport: true, billing: true });
  const [aiPrefs, setAiPrefs] = useState({ temperature: 70, maxTokens: 60, webSearch: true, codeExecution: true, citations: true, streaming: true });
  const [appearance, setAppearance] = useState({ accentColor: "#00FFFF", fontSize: "medium", animations: true, compactMode: false });

  return (
    <AppLayout headerTitle="Settings" headerSubtitle="Manage your account and preferences">
      <div style={{ height: "100%", display: "flex", overflow: "hidden" }}>
        {/* Settings sidebar */}
        <div style={{ width: 200, borderRight: "1px solid var(--omnix-border)", padding: "16px 10px", display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
          {settingsTabs.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              width: "100%", padding: "8px 12px",
              borderRadius: "var(--omnix-radius-sm)",
              background: tab === key ? "rgba(0,255,255,0.08)" : "transparent",
              border: tab === key ? "1px solid rgba(0,255,255,0.2)" : "1px solid transparent",
              color: tab === key ? "var(--omnix-text)" : "var(--omnix-text-2)",
              fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 9,
              fontFamily: "var(--omnix-font)", fontWeight: tab === key ? 500 : 400,
              transition: "all 0.15s", textAlign: "left",
            }}
              onMouseEnter={e => { if (tab !== key) e.currentTarget.style.background = "var(--omnix-surface)"; }}
              onMouseLeave={e => { if (tab !== key) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={14} color={tab === key ? "var(--omnix-cyan)" : "var(--omnix-text-3)"} />
              {label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px", animation: "omnix-fade-in 0.2s ease" }}>

          {tab === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Profile</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>Manage your personal information and account details.</div>
              </div>
              <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#050c17", border: "2px solid rgba(0,255,255,0.4)", boxShadow: "0 0 20px rgba(0,255,255,0.25)", flexShrink: 0 }}>A</div>
                <div>
                  <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 16, fontFamily: "var(--omnix-font-display)" }}>Alex Chen</div>
                  <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginTop: 2 }}>Founder · Pro Plan</div>
                </div>
                <button style={{ marginLeft: "auto", padding: "7px 14px", borderRadius: 8, background: "transparent", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)"; e.currentTarget.style.color = "var(--omnix-cyan)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-2)"; }}
                >Change Photo</button>
              </div>
              {[
                { label: "Full Name", value: "Alex Chen", type: "text" },
                { label: "Email Address", value: "alex@omnix.ai", type: "email" },
                { label: "Job Title", value: "Founder & CEO", type: "text" },
                { label: "Time Zone", value: "America/Los_Angeles (UTC-7)", type: "text" },
              ].map((field, i) => (
                <div key={i}>
                  <div style={{ color: "var(--omnix-text-2)", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{field.label}</div>
                  <input type={field.type} defaultValue={field.value} style={{
                    width: "100%", padding: "9px 13px",
                    borderRadius: "var(--omnix-radius-sm)", background: "var(--omnix-surface)",
                    border: "1px solid var(--omnix-border)", color: "var(--omnix-text)",
                    fontSize: 13, fontFamily: "var(--omnix-font)", outline: "none", transition: "border-color 0.2s",
                  }}
                    onFocus={e => { e.target.style.borderColor = "rgba(0,255,255,0.4)"; e.target.style.boxShadow = "var(--omnix-glow-xs)"; }}
                    onBlur={e => { e.target.style.borderColor = "var(--omnix-border)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              ))}
              <button style={{
                alignSelf: "flex-start", padding: "9px 22px", borderRadius: 9,
                background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)",
                border: "none", color: "#050c17", fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "var(--omnix-font)", boxShadow: "var(--omnix-glow-sm)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "var(--omnix-glow-md)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "var(--omnix-glow-sm)"; }}
              >Save Changes</button>
            </div>
          )}

          {tab === "ai" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>AI Preferences</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>Customize AI behavior and response settings.</div>
              </div>
              <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500 }}>Temperature (Creativity)</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>Higher values produce more creative, varied responses</div>
                    </div>
                    <span style={{ color: "var(--omnix-cyan)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>{(aiPrefs.temperature / 100).toFixed(1)}</span>
                  </div>
                  <Slider value={aiPrefs.temperature} onChange={v => setAiPrefs(p => ({ ...p, temperature: v }))} />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500 }}>Max Response Length</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>Controls maximum token output per response</div>
                    </div>
                    <span style={{ color: "var(--omnix-cyan)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>{Math.round(aiPrefs.maxTokens / 100 * 4096)}</span>
                  </div>
                  <Slider value={aiPrefs.maxTokens} onChange={v => setAiPrefs(p => ({ ...p, maxTokens: v }))} />
                </div>
                {[
                  { key: "webSearch", label: "Real-time Web Search", desc: "Allow AI to search the web for current information" },
                  { key: "codeExecution", label: "Code Execution", desc: "Enable AI to run code and show results" },
                  { key: "citations", label: "Show Citations", desc: "Display sources when answering from knowledge base" },
                  { key: "streaming", label: "Stream Responses", desc: "Show AI responses as they are generated" },
                ].map(({ key, label, desc }) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500 }}>{label}</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>{desc}</div>
                    </div>
                    <Toggle checked={aiPrefs[key as keyof typeof aiPrefs] as boolean} onChange={() => setAiPrefs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Notifications</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>Choose what updates you want to receive.</div>
              </div>
              <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { key: "aiComplete", label: "AI Task Complete", desc: "When an AI agent finishes a task" },
                  { key: "newMember", label: "New Team Members", desc: "When someone joins your workspace" },
                  { key: "sourceSynced", label: "Source Synced", desc: "When a knowledge source finishes syncing" },
                  { key: "weeklyReport", label: "Weekly Report", desc: "Weekly analytics summary email" },
                  { key: "billing", label: "Billing Alerts", desc: "Usage limits and billing notifications" },
                ].map(({ key, label, desc }) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500 }}>{label}</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>{desc}</div>
                    </div>
                    <Toggle checked={notifs[key as keyof typeof notifs]} onChange={() => setNotifs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "appearance" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Appearance</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>Customize how Omnix looks for you.</div>
              </div>
              <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Accent Color</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["#00FFFF", "#9b5cff", "#00e87a", "#ffb800", "#ff4df4", "#3366ff"].map(c => (
                      <button key={c} onClick={() => setAppearance(p => ({ ...p, accentColor: c }))} style={{
                        width: 32, height: 32, borderRadius: "50%", background: c,
                        border: appearance.accentColor === c ? `2px solid white` : "2px solid transparent",
                        cursor: "pointer", boxShadow: appearance.accentColor === c ? `0 0 14px ${c}80` : "none",
                        transition: "all 0.2s",
                      }} />
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Font Size</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["small", "medium", "large"].map(s => (
                      <button key={s} onClick={() => setAppearance(p => ({ ...p, fontSize: s }))} style={{
                        padding: "5px 14px", borderRadius: 8,
                        background: appearance.fontSize === s ? "rgba(0,255,255,0.1)" : "var(--omnix-surface-2)",
                        border: `1px solid ${appearance.fontSize === s ? "rgba(0,255,255,0.3)" : "var(--omnix-border)"}`,
                        color: appearance.fontSize === s ? "var(--omnix-cyan)" : "var(--omnix-text-2)",
                        fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)", textTransform: "capitalize", transition: "all 0.15s",
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
                {[
                  { key: "animations", label: "Animations", desc: "Enable UI transitions and animations" },
                  { key: "compactMode", label: "Compact Mode", desc: "Reduce spacing for more content density" },
                ].map(({ key, label, desc }) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500 }}>{label}</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginTop: 2 }}>{desc}</div>
                    </div>
                    <Toggle checked={appearance[key as keyof typeof appearance] as boolean} onChange={() => setAppearance(p => ({ ...p, [key]: !p[key as keyof typeof p] }))} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "security" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Security</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>Manage your account security and authentication settings.</div>
              </div>
              <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Change Password</div>
                {["Current Password", "New Password", "Confirm New Password"].map((label, i) => (
                  <div key={i}>
                    <div style={{ color: "var(--omnix-text-2)", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{label}</div>
                    <input type="password" placeholder="••••••••••••" style={{
                      width: "100%", padding: "9px 13px",
                      borderRadius: "var(--omnix-radius-sm)", background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--omnix-border)", color: "var(--omnix-text)",
                      fontSize: 13, fontFamily: "var(--omnix-font)", outline: "none", transition: "border-color 0.2s",
                    }}
                      onFocus={e => { e.target.style.borderColor = "rgba(0,255,255,0.4)"; }}
                      onBlur={e => { e.target.style.borderColor = "var(--omnix-border)"; }}
                    />
                  </div>
                ))}
                <button style={{ alignSelf: "flex-start", padding: "9px 22px", borderRadius: 9, background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)", border: "none", color: "#050c17", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--omnix-font)", boxShadow: "var(--omnix-glow-sm)" }}>Update Password</button>
              </div>
              <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 3 }}>Two-Factor Authentication</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Add an extra layer of security to your account</div>
                  </div>
                  <button style={{ padding: "7px 14px", borderRadius: 8, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.25)", color: "var(--omnix-cyan)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Enable 2FA</button>
                </div>
              </div>
              <div style={{ borderRadius: "var(--omnix-radius)", padding: "20px", background: "rgba(255,59,92,0.05)", border: "1px solid rgba(255,59,92,0.2)" }}>
                <div style={{ color: "var(--omnix-red)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 6 }}>Danger Zone</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 14 }}>Once you delete your account, there is no going back. Please be certain.</div>
                <button style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.3)", color: "var(--omnix-red)", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--omnix-font)" }}>
                  <Trash2 size={13} /> Delete Account
                </button>
              </div>
            </div>
          )}

          {tab === "api" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 600 }}>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>API Keys</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 13 }}>Manage API keys for integrating with Omnix externally.</div>
              </div>
              <div style={{ borderRadius: "var(--omnix-radius)", padding: "18px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", flexDirection: "column", gap: 14 }}>
                {apiKeys.map((key, i) => (
                  <div key={i} style={{ borderRadius: "var(--omnix-radius-sm)", padding: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--omnix-border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 13 }}>{key.name}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 11, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Copy</button>
                        <button style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,59,92,0.08)", border: "1px solid rgba(255,59,92,0.2)", color: "var(--omnix-red)", fontSize: 11, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Revoke</button>
                      </div>
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--omnix-text-3)", background: "rgba(0,0,0,0.3)", padding: "6px 10px", borderRadius: 6, marginBottom: 8 }}>{key.key}</div>
                    <div style={{ display: "flex", gap: 16 }}>
                      <span style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>Created {key.created}</span>
                      <span style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>Last used {key.lastUsed}</span>
                    </div>
                  </div>
                ))}
                <button style={{
                  padding: "10px", borderRadius: "var(--omnix-radius-sm)",
                  background: "transparent", border: "2px dashed var(--omnix-border)",
                  color: "var(--omnix-text-3)", fontSize: 12, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "var(--omnix-font)", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)"; e.currentTarget.style.color = "var(--omnix-cyan)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                >+ Generate New API Key</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}
