import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  User, Settings2, Building2, Cpu, Palette,
  Bell, Users, CreditCard, CheckCircle2, Server, Globe,
  BrainCircuit, Zap, SlidersHorizontal
} from "lucide-react";

const SETTINGS_SECTIONS = [
  { id: "profile",       label: "Profile",         Icon: User         },
  { id: "account",       label: "Account",          Icon: Settings2    },
  { id: "workspace",     label: "Workspace",        Icon: Building2    },
  { id: "ai",            label: "AI Settings",      Icon: Cpu          },
  { id: "appearance",    label: "Appearance",       Icon: Palette      },
  { id: "notifications", label: "Notifications",    Icon: Bell         },
  { id: "team",          label: "Team Management",  Icon: Users        },
  { id: "billing",       label: "Billing & Plans",  Icon: CreditCard   },
];

const AI_MODES = [
  { id: "deep",     name: "Deep Think", desc: "Complex reasoning, multi-step analysis",   Icon: BrainCircuit, color: "#9b5cff" },
  { id: "fast",     name: "Fast",       desc: "Quick responses, standard logic",           Icon: Zap,          color: "#00FFFF" },
  { id: "balanced", name: "Balanced",   desc: "Optimal speed / quality ratio",             Icon: SlidersHorizontal, color: "#00e87a" },
];

export function Settings() {
  const [activeSection, setActiveSection] = useState("ai");
  const [aiMode, setAiMode]               = useState("balanced");
  const [webSearch, setWebSearch]         = useState(true);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [temperature, setTemperature]     = useState([0.7]);

  return (
    <AppLayout activePage="Settings" headerTitle="Settings" headerSubtitle="Account & Preferences">
      <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>

        {/* ── Left Nav ── */}
        <div style={{
          width: 220, flexShrink: 0,
          borderRight: "1px solid var(--omnix-border)",
          background: "rgba(5,12,23,0.6)",
          padding: "16px 10px",
          overflowY: "auto",
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", padding: "0 8px 10px" }}>
            Settings Menu
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {SETTINGS_SECTIONS.map(({ id, label, Icon }) => {
              const isActive = activeSection === id;
              return (
                <button key={id} onClick={() => setActiveSection(id)} style={{
                  width: "100%", padding: "8px 10px",
                  borderRadius: 8, border: "none", textAlign: "left",
                  display: "flex", alignItems: "center", gap: 9, cursor: "pointer",
                  background: isActive ? "var(--omnix-surface-hover)" : "transparent",
                  color: isActive ? "var(--omnix-text)" : "var(--omnix-text-2)",
                  fontWeight: isActive ? 500 : 400, fontSize: 13,
                  boxShadow: isActive ? "var(--omnix-glow-xs)" : "none",
                  position: "relative", transition: "all 0.15s",
                  fontFamily: "var(--omnix-font)",
                }}>
                  {isActive && (
                    <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 2.5, height: "55%", borderRadius: 2, background: "var(--omnix-cyan)", boxShadow: "var(--omnix-glow-xs)" }} />
                  )}
                  <Icon size={14} color={isActive ? "var(--omnix-cyan)" : "var(--omnix-text-3)"} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Content ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px", position: "relative" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", paddingBottom: 80 }}>

            {/* ── AI SETTINGS ── */}
            <section style={{ marginBottom: 48 }}>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--omnix-font-display)", color: "var(--omnix-text)", margin: "0 0 6px 0" }}>AI Settings</h2>
                <p style={{ color: "var(--omnix-text-3)", fontSize: 13, margin: 0, lineHeight: 1.6 }}>Configure how the Omnix AI assistant behaves and interacts with your workspace.</p>
              </div>

              {/* Connected Model — Ollama on AWS */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 10 }}>Connected Model</div>
                <div style={{
                  padding: "16px 20px",
                  borderRadius: 12, border: "1px solid var(--omnix-border-active)",
                  background: "rgba(0,255,255,0.04)",
                  boxShadow: "var(--omnix-glow-xs)",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: "rgba(0,255,255,0.1)", border: "1px solid var(--omnix-border-2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "var(--omnix-glow-xs)",
                  }}>
                    <Server size={20} color="var(--omnix-cyan)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)" }}>Ollama</span>
                      <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "rgba(0,232,122,0.12)", color: "var(--omnix-green)", border: "1px solid rgba(0,232,122,0.25)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Connected</span>
                    </div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>Running on AWS · Self-hosted instance</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", marginBottom: 3 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--omnix-green)", boxShadow: "0 0 6px var(--omnix-green)" }} />
                      <span style={{ color: "var(--omnix-green)", fontSize: 11, fontWeight: 500 }}>Online</span>
                    </div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>Latency: 42ms</div>
                  </div>
                </div>

                {/* Model detail row */}
                <div style={{
                  marginTop: 8, padding: "12px 20px",
                  borderRadius: 10, border: "1px solid var(--omnix-border)",
                  background: "var(--omnix-surface)",
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 16,
                }}>
                  {[
                    { label: "Model", value: "llama3.2:latest" },
                    { label: "Context Window", value: "128k tokens" },
                    { label: "Endpoint", value: "aws.omnix.internal" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: 10, color: "var(--omnix-text-3)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 12, color: "var(--omnix-text)", fontFamily: "monospace" }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Default Mode */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 10 }}>Default Mode</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {AI_MODES.map(({ id, name, desc, Icon, color }) => {
                    const isActive = aiMode === id;
                    return (
                      <button key={id} onClick={() => setAiMode(id)} style={{
                        padding: "14px 16px", borderRadius: 10, textAlign: "left",
                        cursor: "pointer", transition: "all 0.2s", border: "1px solid",
                        background: isActive ? `${color}0e` : "var(--omnix-surface)",
                        borderColor: isActive ? `${color}66` : "var(--omnix-border)",
                        boxShadow: isActive ? `0 0 16px ${color}22` : "none",
                        fontFamily: "var(--omnix-font)",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 7,
                            background: isActive ? `${color}1a` : "rgba(255,255,255,0.04)",
                            border: `1px solid ${isActive ? color + "44" : "var(--omnix-border)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Icon size={13} color={isActive ? color : "var(--omnix-text-3)"} />
                          </div>
                          <span style={{ fontWeight: 600, fontSize: 13, color: isActive ? "var(--omnix-text)" : "var(--omnix-text-2)" }}>{name}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "var(--omnix-text-3)", lineHeight: 1.5 }}>{desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles & Sliders */}
              <div style={{ borderRadius: 12, border: "1px solid var(--omnix-border)", overflow: "hidden", marginBottom: 28 }}>
                {/* Web Search */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13, color: "var(--omnix-text)", marginBottom: 3, display: "flex", alignItems: "center", gap: 7 }}>
                      <Globe size={13} color="var(--omnix-green)" />
                      Web Search
                    </div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11, lineHeight: 1.5 }}>Allow the AI to fetch up-to-date information from the web during chats.</div>
                  </div>
                  <Switch checked={webSearch} onCheckedChange={setWebSearch} className="data-[state=checked]:bg-[var(--omnix-cyan)]" />
                </div>

                {/* Memory */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13, color: "var(--omnix-text)", marginBottom: 3 }}>Context Memory</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11, lineHeight: 1.5 }}>Remember details from past conversations across workspaces.</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button style={{
                      height: 30, padding: "0 12px", borderRadius: 7,
                      background: "transparent", border: "1px solid var(--omnix-border)",
                      color: "var(--omnix-text-2)", fontSize: 11, cursor: "pointer",
                      fontFamily: "var(--omnix-font)", transition: "all 0.15s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-2)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-2)"; }}
                    >Clear Memory</button>
                    <Switch checked={memoryEnabled} onCheckedChange={setMemoryEnabled} className="data-[state=checked]:bg-[var(--omnix-cyan)]" />
                  </div>
                </div>

                {/* Temperature */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--omnix-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 13, color: "var(--omnix-text)", marginBottom: 3 }}>Creativity / Temperature</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>Higher values make output more random; lower keeps it focused.</div>
                    </div>
                    <div style={{ fontSize: 12, fontFamily: "monospace", background: "rgba(0,0,0,0.3)", padding: "3px 9px", borderRadius: 6, color: "var(--omnix-cyan)", border: "1px solid var(--omnix-border)", flexShrink: 0 }}>
                      {temperature[0].toFixed(2)}
                    </div>
                  </div>
                  <Slider value={temperature} onValueChange={setTemperature} max={2} step={0.1} className="cursor-pointer" />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--omnix-text-3)", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    <span>Precise</span><span>Creative</span>
                  </div>
                </div>

                {/* Max Tokens */}
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13, color: "var(--omnix-text)", marginBottom: 3 }}>Max Response Tokens</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>Limit the maximum length of AI responses.</div>
                  </div>
                  <Input
                    type="number" defaultValue="4096"
                    className="w-24 h-8 bg-[rgba(0,0,0,0.3)] border-[var(--omnix-border)] text-sm font-mono text-center focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] focus-visible:border-[var(--omnix-cyan)] rounded-lg"
                  />
                </div>
              </div>

              {/* Custom Instructions */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 10 }}>Custom Instructions</div>
                <Textarea
                  placeholder="E.g., Always reply in markdown. Never use emojis. Assume I am a senior engineer..."
                  className="min-h-[100px] bg-[var(--omnix-surface)] border-[var(--omnix-border)] focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] focus-visible:border-[var(--omnix-cyan)] rounded-xl resize-none text-sm placeholder:text-[var(--omnix-text-3)]"
                />
              </div>
            </section>

            {/* ── PROFILE SECTION ── */}
            <div style={{ paddingTop: 36, borderTop: "1px solid var(--omnix-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--omnix-font-display)", color: "var(--omnix-text)", margin: "0 0 4px 0" }}>Profile</h3>
                  <p style={{ color: "var(--omnix-text-3)", fontSize: 12, margin: 0 }}>Personal details and public presence.</p>
                </div>
                <button style={{
                  height: 32, padding: "0 14px", borderRadius: 8,
                  background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                  color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer",
                  fontFamily: "var(--omnix-font)", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-2)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-2)"; }}
                >View Full Profile</button>
              </div>

              <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                {/* Avatar upload */}
                <div style={{ position: "relative", cursor: "pointer", flexShrink: 0 }}>
                  <div style={{
                    width: 88, height: 88, borderRadius: "50%",
                    border: "2px dashed var(--omnix-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,0,0,0.2)", position: "relative", zIndex: 1,
                    transition: "border-color 0.2s",
                  }}>
                    <span style={{ fontSize: 28, fontWeight: 700, background: "linear-gradient(135deg, #00FFFF, #0055ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>A</span>
                  </div>
                  <div style={{
                    position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                    background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                    fontSize: 9, padding: "2px 8px", borderRadius: 20,
                    color: "var(--omnix-text-2)", letterSpacing: "0.06em", textTransform: "uppercase",
                    whiteSpace: "nowrap", zIndex: 2,
                  }}>Upload</div>
                </div>

                {/* Fields */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 6, display: "block" }}>Display Name</Label>
                      <Input defaultValue="Alex Chen" className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] h-9 text-sm focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] focus-visible:border-[var(--omnix-cyan)] rounded-lg" />
                    </div>
                    <div>
                      <Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 6, display: "block" }}>Email</Label>
                      <Input defaultValue="alex@omnix.ai" readOnly className="bg-[rgba(0,0,0,0.2)] border-[var(--omnix-border)] h-9 text-sm text-[var(--omnix-text-3)] cursor-not-allowed rounded-lg" />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Label style={{ fontSize: 11, color: "var(--omnix-text-3)", marginBottom: 6, display: "block" }}>Role / Title</Label>
                      <Input defaultValue="Senior AI Researcher" className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] h-9 text-sm focus-visible:ring-1 focus-visible:ring-[var(--omnix-cyan)] focus-visible:border-[var(--omnix-cyan)] rounded-lg" />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button style={{
                      height: 36, padding: "0 22px", borderRadius: 9,
                      background: "linear-gradient(135deg, #00FFFF, #0055ff)",
                      border: "none", color: "#050c17",
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                      boxShadow: "var(--omnix-glow-sm)", transition: "all 0.2s",
                      fontFamily: "var(--omnix-font)", letterSpacing: "0.02em",
                      display: "flex", alignItems: "center", gap: 6,
                    }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--omnix-glow-md)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--omnix-glow-sm)"; e.currentTarget.style.transform = ""; }}
                    >
                      <CheckCircle2 size={14} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
