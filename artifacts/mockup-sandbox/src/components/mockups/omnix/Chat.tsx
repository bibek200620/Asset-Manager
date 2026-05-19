import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import {
  Search, MessageSquare, Paperclip, Globe, Send,
  FileText, ExternalLink, MoreVertical, Copy, Hash,
  Sparkles, ChevronLeft, ChevronRight, BrainCircuit, Zap, Pin
} from "lucide-react";
import "./_group.css";

const AI_MODES = [
  { id: "deep",   label: "Deep Think",  Icon: BrainCircuit, color: "#9b5cff", desc: "Complex reasoning" },
  { id: "fast",   label: "Fast",        Icon: Zap,           color: "#00FFFF", desc: "Quick responses"   },
  { id: "web",    label: "Web Search",  Icon: Globe,         color: "#00e87a", desc: "Live web data"     },
];

export function Chat() {
  const [inputText, setInputText]         = useState("");
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  const [historyOpen, setHistoryOpen]     = useState(true);
  const [activeMode, setActiveMode]       = useState("fast");

  return (
    <AppLayout activePage="AI Chat" headerTitle="AI Chat" headerSubtitle="Omnix Labs workspace">
      <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--omnix-bg)", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>

        {/* ── LEFT PANEL: Conversations ── */}
        {historyOpen && (
          <div style={{
            width: 272, flexShrink: 0,
            borderRight: "1px solid var(--omnix-border)",
            background: "rgba(5,12,23,0.6)",
            display: "flex", flexDirection: "column",
            backdropFilter: "blur(16px)",
            position: "relative", zIndex: 10,
            animation: "omnix-slide-in 0.2s ease",
          }}>
            {/* Panel header with toggle */}
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--omnix-text-3)" }} />
                <input
                  type="text"
                  placeholder="Search chats..."
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                    borderRadius: 20, padding: "6px 10px 6px 30px",
                    fontSize: 12, color: "var(--omnix-text)",
                    outline: "none", fontFamily: "var(--omnix-font)",
                  }}
                />
              </div>
              {/* Close history button */}
              <button
                onClick={() => setHistoryOpen(false)}
                title="Close history"
                style={{
                  width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                  background: "transparent", border: "1px solid var(--omnix-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "var(--omnix-text-3)", transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
              >
                <ChevronLeft size={14} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px" }}>
              {/* Pinned */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px 6px", color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <Pin size={10} />
                  <span>Pinned</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <button style={{
                    width: "100%", padding: "9px 10px",
                    borderRadius: 8, textAlign: "left",
                    background: "rgba(0,255,255,0.07)", border: "1px solid rgba(0,255,255,0.15)",
                    boxShadow: "var(--omnix-glow-xs)", cursor: "pointer", transition: "all 0.15s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ color: "var(--omnix-text)", fontSize: 13, fontWeight: 500 }}>Q3 Product Launch</span>
                      <span style={{ color: "var(--omnix-cyan)", fontSize: 10 }}>Now</span>
                    </div>
                    <span style={{ color: "var(--omnix-text-2)", fontSize: 11, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>AI: Based on the competitor analysis...</span>
                  </button>
                  <button style={{
                    width: "100%", padding: "9px 10px", borderRadius: 8, textAlign: "left",
                    background: "transparent", border: "1px solid transparent",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ color: "var(--omnix-text-2)", fontSize: 13, fontWeight: 500 }}>Investor Deck Prep</span>
                      <span style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>2h</span>
                    </div>
                    <span style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>Elena: Could we add the growth metrics?</span>
                  </button>
                </div>
              </div>

              {/* Recent */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px 6px", color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <MessageSquare size={10} />
                  <span>Recent</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    { title: "Design System Updates", time: "1d", preview: "Added the new glassmorphism tokens." },
                    { title: "Q2 Post-mortem",         time: "2d", preview: "The retention numbers look solid." },
                    { title: "Engineering Sync",       time: "3d", preview: "AI: The API latency decreased by 40%." },
                    { title: "Marketing Assets",       time: "1w", preview: "Can we generate some banners..." },
                    { title: "Onboarding Flow",        time: "1w", preview: "I think step 3 is too complex." },
                  ].map((chat, i) => (
                    <button key={i} style={{
                      width: "100%", padding: "9px 10px", borderRadius: 8, textAlign: "left",
                      background: "transparent", border: "1px solid transparent",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ color: "var(--omnix-text-2)", fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{chat.title}</span>
                        <span style={{ color: "var(--omnix-text-3)", fontSize: 10, flexShrink: 0 }}>{chat.time}</span>
                      </div>
                      <span style={{ color: "var(--omnix-text-3)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{chat.preview}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MAIN CHAT AREA ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

          {/* Chat sub-header */}
          <div style={{
            height: 56, flexShrink: 0,
            borderBottom: "1px solid var(--omnix-border)",
            background: "rgba(5,12,23,0.85)", backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 20px", zIndex: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Open history button (shown when panel is closed) */}
              {!historyOpen && (
                <button
                  onClick={() => setHistoryOpen(true)}
                  title="Open history"
                  style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "var(--omnix-text-2)", marginRight: 4, transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-active)"; e.currentTarget.style.boxShadow = "var(--omnix-glow-xs)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <ChevronRight size={14} />
                </button>
              )}
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--omnix-cyan)",
              }}>
                <Hash size={14} />
              </div>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>Q3 Product Launch</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--omnix-green)", boxShadow: "0 0 6px var(--omnix-green)", display: "inline-block" }} />
                  Active collaborative session
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* AI Mode Selector — in the chat sub-header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 2,
                background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                borderRadius: 20, padding: "3px",
              }}>
                {AI_MODES.map(({ id, label, Icon, color }) => {
                  const isActive = activeMode === id;
                  return (
                    <button key={id} onClick={() => setActiveMode(id)} style={{
                      padding: "4px 10px", borderRadius: 16, border: "none",
                      background: isActive ? `${color}18` : "transparent",
                      display: "flex", alignItems: "center", gap: 5,
                      cursor: "pointer", transition: "all 0.2s",
                      outline: isActive ? `1px solid ${color}40` : "none",
                      boxShadow: isActive ? `0 0 10px ${color}30` : "none",
                    }}>
                      <Icon size={11} color={isActive ? color : "var(--omnix-text-3)"} />
                      <span style={{ fontSize: 11, fontWeight: 500, color: isActive ? color : "var(--omnix-text-3)", fontFamily: "var(--omnix-font)" }}>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Participant avatars */}
              <div style={{ display: "flex" }}>
                {[
                  { initials: "A", from: "#00FFFF", to: "#0066ff" },
                  { initials: "E", from: "#f43f5e", to: "#ec4899" },
                  { initials: "M", from: "#3b82f6", to: "#06b6d4" },
                ].map((p, i) => (
                  <div key={i} style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, color: "#fff",
                    border: "2px solid var(--omnix-bg)",
                    marginLeft: i === 0 ? 0 : -6, zIndex: 3 - i,
                  }}>{p.initials}</div>
                ))}
              </div>

              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--omnix-text-3)", display: "flex", alignItems: "center" }}>
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Messages stream */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 28, paddingBottom: 120 }}>

            {/* Date separator */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--omnix-text-3)", background: "var(--omnix-surface)", padding: "3px 12px", borderRadius: 20, border: "1px solid var(--omnix-border)" }}>
                Today, 10:24 AM
              </span>
            </div>

            {/* Human — Alex (Founder) */}
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #00FFFF, #0066ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#050c17", flexShrink: 0, marginTop: 2 }}>A</div>
              <div style={{ flex: 1, maxWidth: 680 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--omnix-text)" }}>Alex Chen</span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>Founder</span>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>10:24 AM</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--omnix-text-2)", fontWeight: 300 }}>
                  Team, we need to finalize the market research for the Q3 product launch. @Omnix, can you pull up the latest competitor analysis focusing on the premium segment, specifically looking at pricing tiers and core features?
                </div>
              </div>
            </div>

            {/* Human — Elena (Co-Owner) */}
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #f43f5e, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 2 }}>E</div>
              <div style={{ flex: 1, maxWidth: 680 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--omnix-text)" }}>Elena Rostova</span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>Co-Owner</span>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>10:26 AM</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--omnix-text-2)", fontWeight: 300 }}>
                  Yes, and please highlight any recent feature drops from Nexus and Zenith within the last 30 days. We need to know what we're up against.
                </div>
              </div>
            </div>

            {/* AI Response */}
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0, marginTop: 2,
                background: "linear-gradient(135deg, #00FFFF, #0055ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "var(--omnix-glow-md)", position: "relative", overflow: "hidden",
              }}>
                <Sparkles size={16} color="#fff" style={{ position: "relative", zIndex: 1 }} />
              </div>
              <div style={{ flex: 1, maxWidth: 760 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--omnix-cyan)", fontFamily: "var(--omnix-font-display)", letterSpacing: "0.03em", display: "flex", alignItems: "center", gap: 6 }}>
                    Omnix AI
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--omnix-cyan)", animation: "omnix-glow-pulse 2s ease-in-out infinite", display: "inline-block" }} />
                  </span>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>10:26 AM</span>
                </div>

                {/* AI card */}
                <div style={{
                  background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                  borderRadius: 16, padding: "20px 22px",
                  boxShadow: "var(--omnix-glow-sm)", position: "relative", overflow: "hidden",
                  backdropFilter: "blur(8px)",
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--omnix-cyan), transparent)", opacity: 0.4 }} />

                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--omnix-text-2)", marginBottom: 16, marginTop: 0 }}>
                    I've analyzed the recent market data for the premium segment, focusing on <strong style={{ color: "var(--omnix-text)" }}>Nexus</strong> and <strong style={{ color: "var(--omnix-text)" }}>Zenith</strong> as requested. Here is the synthesized competitive landscape for Q3.
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2, background: "var(--omnix-cyan)" }} />
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--omnix-text)", margin: 0, fontFamily: "var(--omnix-font-display)" }}>Pricing Tier Comparison</h3>
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid var(--omnix-border)", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
                    <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "var(--omnix-surface)" }}>
                          {["Competitor", "Premium Tier", "Enterprise Tier"].map(h => (
                            <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--omnix-text-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderTop: "1px solid var(--omnix-border)" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 600, color: "var(--omnix-text)" }}>Nexus</td>
                          <td style={{ padding: "10px 14px", color: "var(--omnix-text-2)" }}>$49/mo (Annual)</td>
                          <td style={{ padding: "10px 14px", color: "var(--omnix-text-2)" }}>From $199/mo</td>
                        </tr>
                        <tr style={{ borderTop: "1px solid var(--omnix-border)", background: "rgba(255,255,255,0.015)" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 600, color: "var(--omnix-text)" }}>Zenith</td>
                          <td style={{ padding: "10px 14px", color: "var(--omnix-text-2)" }}>$59/mo (AI credits)</td>
                          <td style={{ padding: "10px 14px", color: "var(--omnix-text-2)" }}>$249/mo</td>
                        </tr>
                        <tr style={{ borderTop: "1px solid var(--omnix-border)" }}>
                          <td style={{ padding: "10px 14px", fontWeight: 600, color: "var(--omnix-cyan)" }}>Our Q3 Target</td>
                          <td style={{ padding: "10px 14px", color: "var(--omnix-text)", fontWeight: 500 }}>$45/mo</td>
                          <td style={{ padding: "10px 14px", color: "var(--omnix-text)", fontWeight: 500 }}>$150/mo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2, background: "var(--omnix-pink)" }} />
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--omnix-text)", margin: 0, fontFamily: "var(--omnix-font-display)" }}>Recent Feature Drops (Last 30 Days)</h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {[
                      { name: "Nexus", text: "Released Automated Workflows V2 with visual node-based editing. High adoption rate reported." },
                      { name: "Zenith", text: "Integrated deep analytics dashboard with custom report generation. Marketing heavily to enterprise clients." },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--omnix-pink)", marginTop: 7, flexShrink: 0 }} />
                        <div style={{ color: "var(--omnix-text-2)" }}>
                          <strong style={{ color: "var(--omnix-text)" }}>{item.name}:</strong> {item.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#060d18", border: "1px solid var(--omnix-border)", borderRadius: 10, padding: "14px 16px", fontFamily: "monospace", fontSize: 13, position: "relative" }}>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 8, fontFamily: "var(--omnix-font)" }}>// Suggested positioning statement</div>
                    <span style={{ color: "#0088ff" }}>const </span>
                    <span style={{ color: "#3b82f6" }}>positioning </span>
                    <span style={{ color: "#e2e8f0" }}>= </span>
                    <span style={{ color: "#22c55e" }}>"Enterprise-grade capabilities without the enterprise overhead."</span>
                    <span style={{ color: "#e2e8f0" }}>;</span>
                    <button style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", color: "var(--omnix-text-3)", display: "flex", alignItems: "center" }}>
                      <Copy size={13} />
                    </button>
                  </div>

                  {/* Sources */}
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--omnix-border)", display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--omnix-text-3)", fontWeight: 500, marginRight: 2 }}>Sources:</span>
                    {[
                      { label: "Nexus_Q2_Report.pdf", Icon: FileText, color: "var(--omnix-blue)" },
                      { label: "Zenith Press Release", Icon: Globe, color: "var(--omnix-green)" },
                      { label: "Internal_Pricing_Draft.md", Icon: FileText, color: "var(--omnix-pink)" },
                    ].map((s, i) => (
                      <button key={i} style={{
                        height: 24, padding: "0 10px", borderRadius: 20,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                        fontSize: 11, color: "var(--omnix-text-2)",
                        display: "flex", alignItems: "center", gap: 5,
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "var(--omnix-text-2)"; }}
                      >
                        <s.Icon size={11} color={s.color} />
                        {s.label}
                        <ExternalLink size={9} style={{ opacity: 0.5 }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Human — Marcus (Member) */}
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 2 }}>M</div>
              <div style={{ flex: 1, maxWidth: 680 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--omnix-text)" }}>Marcus Doe</span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>Member</span>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>10:28 AM</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--omnix-text-2)", fontWeight: 300 }}>
                  That positioning statement is really strong. Can we generate a quick mockup for the pricing page using that as the H1?
                </div>
              </div>
            </div>

            {/* AI streaming indicator */}
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--omnix-text-3)",
              }}>
                <Sparkles size={16} style={{ opacity: 0.4 }} />
              </div>
              <div style={{ flex: 1, paddingTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {[0, 150, 300].map(delay => (
                    <div key={delay} style={{
                      width: 7, height: 7, borderRadius: "50%", background: "var(--omnix-cyan)",
                      animation: `omnix-pulse 1.2s ease-in-out infinite`,
                      animationDelay: `${delay}ms`,
                    }} />
                  ))}
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)", marginLeft: 6 }}>Generating interface mockup...</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── INPUT AREA ── */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0 24px 20px",
            background: "linear-gradient(to top, var(--omnix-bg) 70%, transparent)",
            zIndex: 30, paddingTop: 32,
          }}>
            <div style={{ maxWidth: 840, margin: "0 auto", position: "relative" }}>
              {/* Floating quick actions */}
              <div style={{ position: "absolute", top: -36, left: 0, display: "flex", gap: 6 }}>
                {["Suggest ideas", "Summarize"].map(label => (
                  <button key={label} style={{
                    padding: "5px 12px", borderRadius: 20,
                    background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                    fontSize: 11, color: "var(--omnix-text-2)", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                    transition: "all 0.15s", backdropFilter: "blur(8px)",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-2)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.color = "var(--omnix-text-2)"; }}
                  >
                    <Sparkles size={11} color="var(--omnix-cyan)" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Input box */}
              <div style={{
                background: "rgba(8,16,30,0.85)", border: "1px solid var(--omnix-border)",
                borderRadius: 16, backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)", overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}>
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type a message or '/' for commands..."
                  rows={2}
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "transparent", border: "none", resize: "none",
                    padding: "14px 16px", minHeight: 58, maxHeight: 180,
                    fontSize: 14, color: "var(--omnix-text)", outline: "none",
                    lineHeight: 1.6, fontFamily: "var(--omnix-font)",
                  }}
                />
                <div style={{
                  padding: "10px 14px", borderTop: "1px solid var(--omnix-border)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "rgba(0,0,0,0.2)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <button style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: "transparent", border: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", color: "var(--omnix-text-3)", transition: "all 0.15s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                    >
                      <Paperclip size={14} />
                    </button>
                    <div style={{ width: 1, height: 16, background: "var(--omnix-border)", margin: "0 4px" }} />
                    <button
                      onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                      style={{
                        height: 28, padding: "0 10px", borderRadius: 7, border: "none",
                        background: webSearchEnabled ? "rgba(0,232,122,0.1)" : "transparent",
                        outline: webSearchEnabled ? "1px solid rgba(0,232,122,0.2)" : "none",
                        display: "flex", alignItems: "center", gap: 5,
                        fontSize: 11, fontWeight: 500, cursor: "pointer",
                        color: webSearchEnabled ? "var(--omnix-green)" : "var(--omnix-text-3)",
                        transition: "all 0.15s",
                      }}
                    >
                      <Globe size={12} />
                      Web Search
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, color: "var(--omnix-text-3)", letterSpacing: "0.04em" }}>Return to send</span>
                    <button style={{
                      width: 32, height: 32, borderRadius: 9, border: "none",
                      background: inputText.trim()
                        ? "linear-gradient(135deg, #00FFFF, #0055ff)"
                        : "var(--omnix-surface)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: inputText.trim() ? "pointer" : "default",
                      color: inputText.trim() ? "#050c17" : "var(--omnix-text-3)",
                      boxShadow: inputText.trim() ? "var(--omnix-glow-sm)" : "none",
                      transition: "all 0.2s",
                    }}>
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Sources ── */}
        <div style={{
          width: 260, flexShrink: 0,
          borderLeft: "1px solid var(--omnix-border)",
          background: "rgba(5,12,23,0.5)",
          display: "flex", flexDirection: "column",
          backdropFilter: "blur(16px)",
        }}>
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--omnix-border)" }}>
            <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 13, fontFamily: "var(--omnix-font-display)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Context &amp; Sources</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px" }}>
            {[
              {
                group: "Referenced Documents",
                Icon: FileText, color: "var(--omnix-blue)",
                items: [
                  { name: "Nexus_Q2_Report.pdf", sub: "Uploaded 2 days ago" },
                  { name: "Internal_Pricing_Draft.md", sub: "Modified today" },
                ],
              },
              {
                group: "Web Sources",
                Icon: Globe, color: "var(--omnix-green)",
                items: [
                  { name: "Zenith announces new enterprise features", sub: "techcrunch.com/zenith-enterprise" },
                ],
              },
            ].map((section, si) => (
              <div key={si} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <section.Icon size={10} color={section.color} />
                  {section.group}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{
                      padding: "8px 10px", borderRadius: 8,
                      background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-2)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                        <div style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500, lineHeight: 1.4, flex: 1 }}>{item.name}</div>
                        <ExternalLink size={10} color="var(--omnix-text-3)" style={{ flexShrink: 0, marginTop: 2 }} />
                      </div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 10, marginTop: 3 }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Workspace metadata */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <Hash size={10} color="var(--omnix-cyan)" />
                Workspace Metadata
              </div>
              {[["Timeline", "Q3 (Sept 1)"], ["Priority", "High"], ["Team", "Marketing, Product"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid var(--omnix-border)", fontSize: 12 }}>
                  <span style={{ color: "var(--omnix-text-3)" }}>{k}</span>
                  <span style={{ color: v === "High" ? "var(--omnix-pink)" : "var(--omnix-text-2)", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
