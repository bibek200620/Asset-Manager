import React, { useState, useRef, useEffect } from "react";
import { AppLayout } from "./_shared/AppLayout";
import {
  Search, MessageSquare, Paperclip, Globe, Send,
  FileText, ExternalLink, MoreVertical, Copy, Hash,
  Sparkles, ChevronLeft, ChevronRight, BrainCircuit, Zap, Pin,
  ChevronDown, BookOpen,
} from "lucide-react";
import "./_group.css";

const AI_MODES = [
  { id: "deep", label: "Deep Think", Icon: BrainCircuit, color: "#9b5cff", desc: "Complex reasoning" },
  { id: "fast", label: "Fast",       Icon: Zap,          color: "#00FFFF", desc: "Quick responses"  },
  { id: "web",  label: "Web Search", Icon: Globe,        color: "#00e87a", desc: "Live web data"    },
];

const SOURCES = [
  { label: "Nexus_Q2_Report.pdf",       Icon: FileText, color: "var(--omnix-blue)",  sub: "Uploaded 2 days ago" },
  { label: "Internal_Pricing_Draft.md", Icon: FileText, color: "var(--omnix-pink)",  sub: "Modified today"      },
  { label: "Zenith Press Release",      Icon: Globe,    color: "var(--omnix-green)", sub: "techcrunch.com"      },
];

export function Chat() {
  const [inputText, setInputText]       = useState("");
  const [historyOpen, setHistoryOpen]   = useState(true);
  const [activeMode, setActiveMode]     = useState("fast");
  const [modeOpen, setModeOpen]         = useState(false);
  const [sourcesOpen, setSourcesOpen]   = useState(false);
  const modeRef   = useRef<HTMLDivElement>(null);
  const sourcesRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (modeRef.current && !modeRef.current.contains(e.target as Node))   setModeOpen(false);
      if (sourcesRef.current && !sourcesRef.current.contains(e.target as Node)) setSourcesOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentMode = AI_MODES.find(m => m.id === activeMode)!;

  return (
    <AppLayout activePage="AI Chat" headerTitle="AI Chat" headerSubtitle="Omnix Labs workspace">
      <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--omnix-bg)", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>

        {/* ── LEFT PANEL: Conversations ── */}
        {historyOpen && (
          <div style={{
            width: 264, flexShrink: 0,
            borderRight: "1px solid var(--omnix-border)",
            background: "rgba(5,12,23,0.6)",
            display: "flex", flexDirection: "column",
            backdropFilter: "blur(16px)", position: "relative", zIndex: 10,
            animation: "omnix-slide-in 0.2s ease",
          }}>
            <div style={{ padding: "12px 12px 10px", borderBottom: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Search size={12} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--omnix-text-3)" }} />
                <input type="text" placeholder="Search chats..." style={{
                  width: "100%", boxSizing: "border-box",
                  background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                  borderRadius: 20, padding: "5px 9px 5px 28px",
                  fontSize: 12, color: "var(--omnix-text)", outline: "none", fontFamily: "var(--omnix-font)",
                }} />
              </div>
              <button onClick={() => setHistoryOpen(false)} title="Close history" style={{
                width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                background: "transparent", border: "1px solid var(--omnix-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--omnix-text-3)", transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
              ><ChevronLeft size={13} /></button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
              {/* Pinned */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px 5px", color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <Pin size={9} /><span>Pinned</span>
                </div>
                <button style={{ width: "100%", padding: "8px 10px", borderRadius: 8, textAlign: "left", background: "rgba(0,255,255,0.07)", border: "1px solid rgba(0,255,255,0.15)", boxShadow: "var(--omnix-glow-xs)", cursor: "pointer", transition: "all 0.15s", marginBottom: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500 }}>Q3 Product Launch</span>
                    <span style={{ color: "var(--omnix-cyan)", fontSize: 10 }}>Now</span>
                  </div>
                  <span style={{ color: "var(--omnix-text-2)", fontSize: 11, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>AI: Based on the competitor analysis...</span>
                </button>
                <button style={{ width: "100%", padding: "8px 10px", borderRadius: 8, textAlign: "left", background: "transparent", border: "1px solid transparent", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ color: "var(--omnix-text-2)", fontSize: 12, fontWeight: 500 }}>Investor Deck Prep</span>
                    <span style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>2h</span>
                  </div>
                  <span style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>Elena: Could we add the growth metrics?</span>
                </button>
              </div>

              {/* Recent */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 8px 5px", color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <MessageSquare size={9} /><span>Recent</span>
                </div>
                {[
                  { title: "Design System Updates", time: "1d", preview: "Added the new glassmorphism tokens." },
                  { title: "Q2 Post-mortem",         time: "2d", preview: "The retention numbers look solid." },
                  { title: "Engineering Sync",       time: "3d", preview: "AI: The API latency decreased by 40%." },
                  { title: "Marketing Assets",       time: "1w", preview: "Can we generate some banners..." },
                  { title: "Onboarding Flow",        time: "1w", preview: "I think step 3 is too complex." },
                ].map((chat, i) => (
                  <button key={i} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, textAlign: "left", background: "transparent", border: "1px solid transparent", cursor: "pointer", transition: "all 0.15s", marginBottom: 1 }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span style={{ color: "var(--omnix-text-2)", fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 150 }}>{chat.title}</span>
                      <span style={{ color: "var(--omnix-text-3)", fontSize: 10, flexShrink: 0 }}>{chat.time}</span>
                    </div>
                    <span style={{ color: "var(--omnix-text-3)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{chat.preview}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MAIN CHAT AREA ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

          {/* Chat sub-header */}
          <div style={{
            height: 52, flexShrink: 0,
            borderBottom: "1px solid var(--omnix-border)",
            background: "rgba(5,12,23,0.85)", backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 18px", zIndex: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {!historyOpen && (
                <button onClick={() => setHistoryOpen(true)} title="Open history" style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "var(--omnix-text-2)", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-active)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; }}
                ><ChevronRight size={13} /></button>
              )}
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--omnix-cyan)" }}>
                <Hash size={13} />
              </div>
              <div>
                <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>Q3 Product Launch</div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 10, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--omnix-green)", boxShadow: "0 0 5px var(--omnix-green)", display: "inline-block" }} />
                  Active collaborative session
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Participant avatars */}
              <div style={{ display: "flex" }}>
                {[{ i: "A", f: "#00FFFF", t: "#0066ff" }, { i: "E", f: "#f43f5e", t: "#ec4899" }, { i: "M", f: "#3b82f6", t: "#06b6d4" }].map((p, idx) => (
                  <div key={idx} style={{ width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg,${p.f},${p.t})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", border: "2px solid var(--omnix-bg)", marginLeft: idx === 0 ? 0 : -5, zIndex: 3 - idx }}>{p.i}</div>
                ))}
              </div>

              {/* Sources dropdown button */}
              <div ref={sourcesRef} style={{ position: "relative" }}>
                <button onClick={() => setSourcesOpen(v => !v)} style={{
                  height: 28, padding: "0 10px", borderRadius: 7,
                  background: sourcesOpen ? "var(--omnix-surface-hover)" : "var(--omnix-surface)",
                  border: `1px solid ${sourcesOpen ? "var(--omnix-border-2)" : "var(--omnix-border)"}`,
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: 11, color: "var(--omnix-text-2)", cursor: "pointer", transition: "all 0.15s",
                  fontFamily: "var(--omnix-font)",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-2)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                  onMouseLeave={e => { if (!sourcesOpen) { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-2)"; } }}
                >
                  <BookOpen size={11} />
                  Sources
                  <span style={{ background: "rgba(0,255,255,0.15)", color: "var(--omnix-cyan)", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 20, border: "1px solid rgba(0,255,255,0.25)" }}>3</span>
                  <ChevronDown size={10} style={{ transition: "transform 0.2s", transform: sourcesOpen ? "rotate(180deg)" : "none" }} />
                </button>

                {sourcesOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", right: 0, width: 280,
                    background: "#07131f", border: "1px solid var(--omnix-border-2)",
                    borderRadius: 10, boxShadow: "0 16px 40px rgba(0,0,0,0.6), var(--omnix-glow-xs)",
                    overflow: "hidden", animation: "omnix-slide-in 0.15s ease", zIndex: 100,
                  }}>
                    <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid var(--omnix-border)" }}>
                      <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 12, fontFamily: "var(--omnix-font-display)", letterSpacing: "0.04em" }}>Context &amp; Sources</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 10, marginTop: 2 }}>3 items referenced in this session</div>
                    </div>
                    {SOURCES.map((s, i) => (
                      <div key={i} style={{
                        padding: "10px 12px", borderBottom: i < SOURCES.length - 1 ? "1px solid var(--omnix-border)" : "none",
                        display: "flex", alignItems: "flex-start", gap: 9, cursor: "pointer", transition: "background 0.12s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: `${s.color}18`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <s.Icon size={12} color={s.color} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "var(--omnix-text)", fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</div>
                          <div style={{ color: "var(--omnix-text-3)", fontSize: 10, marginTop: 2 }}>{s.sub}</div>
                        </div>
                        <ExternalLink size={10} color="var(--omnix-text-3)" style={{ flexShrink: 0, marginTop: 3 }} />
                      </div>
                    ))}
                    <div style={{ padding: "8px 12px", borderTop: "1px solid var(--omnix-border)", background: "rgba(0,0,0,0.2)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--omnix-text-3)" }}>
                        <span>Timeline: <span style={{ color: "var(--omnix-text-2)" }}>Q3 (Sept 1)</span></span>
                        <span>Priority: <span style={{ color: "var(--omnix-pink)", fontWeight: 600 }}>High</span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--omnix-text-3)", display: "flex", alignItems: "center" }}>
                <MoreVertical size={15} />
              </button>
            </div>
          </div>

          {/* Messages stream */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 26, paddingBottom: 130 }}>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--omnix-text-3)", background: "var(--omnix-surface)", padding: "3px 12px", borderRadius: 20, border: "1px solid var(--omnix-border)" }}>Today, 10:24 AM</span>
            </div>

            {/* Alex */}
            <div style={{ display: "flex", gap: 13 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00FFFF,#0066ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#050c17", flexShrink: 0, marginTop: 2 }}>A</div>
              <div style={{ flex: 1, maxWidth: 680 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--omnix-text)" }}>Alex Chen</span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>Founder</span>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>10:24 AM</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--omnix-text-2)", fontWeight: 300 }}>
                  Team, we need to finalize the market research for the Q3 product launch. @Omnix, can you pull up the latest competitor analysis focusing on the premium segment, specifically looking at pricing tiers and core features?
                </div>
              </div>
            </div>

            {/* Elena */}
            <div style={{ display: "flex", gap: 13 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#f43f5e,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 2 }}>E</div>
              <div style={{ flex: 1, maxWidth: 680 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--omnix-text)" }}>Elena Rostova</span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>Co-Owner</span>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>10:26 AM</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--omnix-text-2)", fontWeight: 300 }}>
                  Yes, and please highlight any recent feature drops from Nexus and Zenith within the last 30 days. We need to know what we're up against.
                </div>
              </div>
            </div>

            {/* Omnix AI */}
            <div style={{ display: "flex", gap: 13 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, marginTop: 2, background: "linear-gradient(135deg,#00FFFF,#0055ff)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--omnix-glow-md)" }}>
                <Sparkles size={15} color="#fff" />
              </div>
              <div style={{ flex: 1, maxWidth: 740 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--omnix-cyan)", fontFamily: "var(--omnix-font-display)", letterSpacing: "0.03em", display: "flex", alignItems: "center", gap: 5 }}>
                    Omnix AI
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--omnix-cyan)", animation: "omnix-glow-pulse 2s ease-in-out infinite", display: "inline-block" }} />
                  </span>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>10:26 AM</span>
                </div>
                <div style={{ background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 16, padding: "18px 20px", boxShadow: "var(--omnix-glow-sm)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,var(--omnix-cyan),transparent)", opacity: 0.4 }} />

                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--omnix-text-2)", marginBottom: 14, marginTop: 0 }}>
                    I've analyzed the recent market data for the premium segment, focusing on <strong style={{ color: "var(--omnix-text)" }}>Nexus</strong> and <strong style={{ color: "var(--omnix-text)" }}>Zenith</strong> as requested. Here is the synthesized competitive landscape for Q3.
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                    <div style={{ width: 3, height: 14, borderRadius: 2, background: "var(--omnix-cyan)" }} />
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--omnix-text)", margin: 0, fontFamily: "var(--omnix-font-display)" }}>Pricing Tier Comparison</h3>
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid var(--omnix-border)", borderRadius: 10, overflow: "hidden", marginBottom: 18 }}>
                    <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "var(--omnix-surface)" }}>
                          {["Competitor", "Premium Tier", "Enterprise Tier"].map(h => (
                            <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "var(--omnix-text-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderTop: "1px solid var(--omnix-border)" }}>
                          <td style={{ padding: "9px 12px", fontWeight: 600, color: "var(--omnix-text)" }}>Nexus</td>
                          <td style={{ padding: "9px 12px", color: "var(--omnix-text-2)" }}>$49/mo (Annual)</td>
                          <td style={{ padding: "9px 12px", color: "var(--omnix-text-2)" }}>From $199/mo</td>
                        </tr>
                        <tr style={{ borderTop: "1px solid var(--omnix-border)", background: "rgba(255,255,255,0.015)" }}>
                          <td style={{ padding: "9px 12px", fontWeight: 600, color: "var(--omnix-text)" }}>Zenith</td>
                          <td style={{ padding: "9px 12px", color: "var(--omnix-text-2)" }}>$59/mo (AI credits)</td>
                          <td style={{ padding: "9px 12px", color: "var(--omnix-text-2)" }}>$249/mo</td>
                        </tr>
                        <tr style={{ borderTop: "1px solid var(--omnix-border)" }}>
                          <td style={{ padding: "9px 12px", fontWeight: 600, color: "var(--omnix-cyan)" }}>Our Q3 Target</td>
                          <td style={{ padding: "9px 12px", color: "var(--omnix-text)", fontWeight: 500 }}>$45/mo</td>
                          <td style={{ padding: "9px 12px", color: "var(--omnix-text)", fontWeight: 500 }}>$150/mo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                    <div style={{ width: 3, height: 14, borderRadius: 2, background: "var(--omnix-pink)" }} />
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--omnix-text)", margin: 0, fontFamily: "var(--omnix-font-display)" }}>Recent Feature Drops (Last 30 Days)</h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                    {[
                      { name: "Nexus",  text: "Released Automated Workflows V2 with visual node-based editing. High adoption rate reported." },
                      { name: "Zenith", text: "Integrated deep analytics dashboard with custom report generation. Marketing heavily to enterprise." },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 9, fontSize: 13, lineHeight: 1.6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--omnix-pink)", marginTop: 6, flexShrink: 0 }} />
                        <div style={{ color: "var(--omnix-text-2)" }}><strong style={{ color: "var(--omnix-text)" }}>{item.name}:</strong> {item.text}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#060d18", border: "1px solid var(--omnix-border)", borderRadius: 10, padding: "12px 14px", fontFamily: "monospace", fontSize: 12, position: "relative" }}>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 10, marginBottom: 6, fontFamily: "var(--omnix-font)" }}>// Suggested positioning statement</div>
                    <span style={{ color: "#0088ff" }}>const </span><span style={{ color: "#3b82f6" }}>positioning </span><span style={{ color: "#e2e8f0" }}>= </span><span style={{ color: "#22c55e" }}>"Enterprise-grade capabilities without the enterprise overhead."</span><span style={{ color: "#e2e8f0" }}>;</span>
                    <button style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", color: "var(--omnix-text-3)", display: "flex" }}><Copy size={12} /></button>
                  </div>

                  {/* Source pills */}
                  <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--omnix-border)", display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "var(--omnix-text-3)", fontWeight: 500, marginRight: 2 }}>Sources:</span>
                    {SOURCES.map((s, i) => (
                      <button key={i} style={{ height: 22, padding: "0 9px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", fontSize: 10, color: "var(--omnix-text-2)", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", transition: "all 0.12s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "var(--omnix-text-2)"; }}
                      >
                        <s.Icon size={10} color={s.color} />{s.label}<ExternalLink size={8} style={{ opacity: 0.5 }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Marcus */}
            <div style={{ display: "flex", gap: 13 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0, marginTop: 2 }}>M</div>
              <div style={{ flex: 1, maxWidth: 680 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--omnix-text)" }}>Marcus Doe</span>
                  <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>Member</span>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>10:28 AM</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: "var(--omnix-text-2)", fontWeight: 300 }}>
                  That positioning statement is really strong. Can we generate a quick mockup for the pricing page using that as the H1?
                </div>
              </div>
            </div>

            {/* Typing indicator */}
            <div style={{ display: "flex", gap: 13 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--omnix-text-3)" }}>
                <Sparkles size={15} style={{ opacity: 0.4 }} />
              </div>
              <div style={{ flex: 1, paddingTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {[0, 150, 300].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--omnix-cyan)", animation: "omnix-pulse 1.2s ease-in-out infinite", animationDelay: `${d}ms` }} />)}
                  <span style={{ fontSize: 11, color: "var(--omnix-text-3)", marginLeft: 5 }}>Generating interface mockup...</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── INPUT AREA ── */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 22px 18px", background: "linear-gradient(to top, var(--omnix-bg) 70%, transparent)", zIndex: 30, paddingTop: 28 }}>
            <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>

              {/* Quick actions */}
              <div style={{ position: "absolute", top: -32, left: 0, display: "flex", gap: 6 }}>
                {["Suggest ideas", "Summarize"].map(label => (
                  <button key={label} style={{ padding: "4px 11px", borderRadius: 20, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", fontSize: 11, color: "var(--omnix-text-2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s", backdropFilter: "blur(8px)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-2)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.color = "var(--omnix-text-2)"; }}
                  ><Sparkles size={10} color="var(--omnix-cyan)" />{label}</button>
                ))}
              </div>

              {/* Input box */}
              <div style={{ background: "rgba(8,16,30,0.88)", border: "1px solid var(--omnix-border)", borderRadius: 15, backdropFilter: "blur(20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", overflow: "hidden" }}>
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type a message or '/' for commands..."
                  rows={2}
                  style={{ width: "100%", boxSizing: "border-box", background: "transparent", border: "none", resize: "none", padding: "13px 15px", minHeight: 54, maxHeight: 180, fontSize: 14, color: "var(--omnix-text)", outline: "none", lineHeight: 1.6, fontFamily: "var(--omnix-font)" }}
                />
                <div style={{ padding: "9px 12px", borderTop: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.2)" }}>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {/* Attach */}
                    <button style={{ width: 28, height: 28, borderRadius: 7, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--omnix-text-3)", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.color = "var(--omnix-text)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                    ><Paperclip size={13} /></button>

                    <div style={{ width: 1, height: 14, background: "var(--omnix-border)", margin: "0 3px" }} />

                    {/* AI Mode mini-dropdown */}
                    <div ref={modeRef} style={{ position: "relative" }}>
                      <button onClick={() => setModeOpen(v => !v)} style={{
                        height: 26, padding: "0 9px", borderRadius: 7, border: "none",
                        background: modeOpen ? "var(--omnix-surface-hover)" : `${currentMode.color}12`,
                        outline: `1px solid ${currentMode.color}30`,
                        display: "flex", alignItems: "center", gap: 5,
                        fontSize: 11, fontWeight: 500, cursor: "pointer",
                        color: currentMode.color, transition: "all 0.15s",
                        fontFamily: "var(--omnix-font)",
                      }}>
                        <currentMode.Icon size={11} color={currentMode.color} />
                        {currentMode.label}
                        <ChevronDown size={9} style={{ opacity: 0.7, transition: "transform 0.2s", transform: modeOpen ? "rotate(180deg)" : "none" }} />
                      </button>

                      {modeOpen && (
                        <div style={{
                          position: "absolute", bottom: "calc(100% + 6px)", left: 0, width: 192,
                          background: "#07131f", border: "1px solid var(--omnix-border-2)",
                          borderRadius: 10, boxShadow: "0 -12px 32px rgba(0,0,0,0.6), var(--omnix-glow-xs)",
                          overflow: "hidden", animation: "omnix-slide-in 0.12s ease", zIndex: 100,
                        }}>
                          {AI_MODES.map(({ id, label, Icon, color, desc }) => (
                            <button key={id} onClick={() => { setActiveMode(id); setModeOpen(false); }} style={{
                              width: "100%", padding: "9px 12px", border: "none",
                              background: activeMode === id ? `${color}10` : "transparent",
                              borderLeft: activeMode === id ? `2px solid ${color}` : "2px solid transparent",
                              display: "flex", alignItems: "center", gap: 9,
                              cursor: "pointer", transition: "all 0.12s", textAlign: "left",
                              fontFamily: "var(--omnix-font)",
                            }}
                              onMouseEnter={e => { if (activeMode !== id) e.currentTarget.style.background = "var(--omnix-surface)"; }}
                              onMouseLeave={e => { if (activeMode !== id) e.currentTarget.style.background = "transparent"; }}
                            >
                              <div style={{ width: 26, height: 26, borderRadius: 6, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon size={12} color={color} />
                              </div>
                              <div>
                                <div style={{ fontSize: 12, fontWeight: 500, color: activeMode === id ? color : "var(--omnix-text)" }}>{label}</div>
                                <div style={{ fontSize: 10, color: "var(--omnix-text-3)", marginTop: 1 }}>{desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, color: "var(--omnix-text-3)", letterSpacing: "0.04em" }}>Return to send</span>
                    <button style={{
                      width: 30, height: 30, borderRadius: 8, border: "none",
                      background: inputText.trim() ? "linear-gradient(135deg,#00FFFF,#0055ff)" : "var(--omnix-surface)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: inputText.trim() ? "pointer" : "default",
                      color: inputText.trim() ? "#050c17" : "var(--omnix-text-3)",
                      boxShadow: inputText.trim() ? "var(--omnix-glow-sm)" : "none",
                      transition: "all 0.2s",
                    }}>
                      <Send size={13} />
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
