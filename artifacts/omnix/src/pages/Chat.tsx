import React, { useState, useRef, useEffect } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Send, Paperclip, Globe, Zap, Bot, Plus, Search } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
  sources?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1, role: "assistant",
    content: "Hello! I'm your Omnix AI assistant. I have access to your knowledge base, can search the web in real-time, and analyze your documents. What would you like to explore today?",
    time: "9:41 AM",
  },
  {
    id: 2, role: "user",
    content: "What are the latest trends in AI workspace tools for 2025?",
    time: "9:42 AM",
  },
  {
    id: 3, role: "assistant",
    content: "Great question! Based on my analysis of recent data and your knowledge sources, here are the key trends in AI workspace tools for 2025:\n\n**1. Multi-Agent Orchestration**\nWorkspaces are moving towards systems where multiple specialized AI agents collaborate — one handles research, another drafts content, while a third validates accuracy. This reduces hallucinations and improves output quality.\n\n**2. Retrieval-Augmented Generation (RAG) at Scale**\nCompanies are ingesting proprietary data into vector databases to give AI grounded, factual responses. We're seeing 10-100x improvements in accuracy on domain-specific queries.\n\n**3. Real-Time Knowledge Sync**\nAI tools now integrate with Notion, Confluence, Google Drive, and Slack in real-time, keeping knowledge bases perpetually fresh without manual updates.\n\n**4. Embedded Analytics**\nTeams are demanding AI that can both generate insights and visualize them — closing the loop between analysis and decision-making.",
    time: "9:42 AM",
    sources: ["Market Analysis 2025.pdf", "AI Industry Report", "Web Search"],
  },
];

const conversations = [
  { id: 1, title: "AI Workspace Trends 2025", preview: "Multi-agent orchestration...", time: "9:42 AM", active: true },
  { id: 2, title: "Product Roadmap Q3", preview: "Let's outline the key milestones...", time: "Yesterday" },
  { id: 3, title: "Competitor Analysis", preview: "Comparing feature sets...", time: "Mon" },
  { id: 4, title: "Marketing Strategy", preview: "Target audience analysis...", time: "Mon" },
  { id: 5, title: "Technical Architecture", preview: "System design for...", time: "Sun" },
];

const suggestions = [
  "Summarize my recent documents",
  "What's happening in AI this week?",
  "Analyze our team's productivity",
  "Generate a weekly report",
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [activeConv, setActiveConv] = useState(1);
  const [webSearch, setWebSearch] = useState(true);
  const [useKb, setUseKb] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = () => {
    if (!input.trim() || thinking) return;
    const userMsg: Message = {
      id: Date.now(), role: "user", content: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1, role: "assistant",
        content: `I've analyzed your query about "${userMsg.content.slice(0, 40)}..."\n\nBased on your knowledge base and ${webSearch ? "live web data" : "stored documents"}, here's what I found:\n\n**Key Insights:**\n- The data suggests significant opportunities in this area\n- Cross-referencing multiple sources shows consistent patterns\n- I recommend focusing on the highest-impact areas first\n\nWould you like me to dive deeper into any specific aspect?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: useKb ? ["Knowledge Base", webSearch ? "Web Search" : ""].filter(Boolean) : undefined,
      };
      setMessages(prev => [...prev, aiMsg]);
      setThinking(false);
    }, 1800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AppLayout headerTitle="AI Chat" headerSubtitle="Omnix Intelligence">
      <div style={{ height: "100%", display: "flex", overflow: "hidden" }}>

        {/* Conversation list */}
        <div style={{
          width: 230, flexShrink: 0,
          background: "rgba(5,12,23,0.95)",
          borderRight: "1px solid var(--omnix-border)",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ padding: "10px 10px 6px" }}>
            <button style={{
              width: "100%", padding: "8px 12px",
              borderRadius: "var(--omnix-radius-sm)",
              background: "rgba(0,255,255,0.07)",
              border: "1px solid rgba(0,255,255,0.2)",
              color: "var(--omnix-cyan)", fontSize: 12, fontWeight: 600,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              fontFamily: "var(--omnix-font)", transition: "all 0.2s",
              boxShadow: "var(--omnix-glow-xs)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,255,255,0.07)"; }}
            ><Plus size={13} strokeWidth={2.5} /> New Conversation</button>
            <div style={{ position: "relative", marginTop: 8 }}>
              <Search size={12} color="var(--omnix-text-3)" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }} />
              <input style={{
                width: "100%", padding: "6px 10px 6px 28px",
                borderRadius: 7, background: "var(--omnix-surface)",
                border: "1px solid var(--omnix-border)", color: "var(--omnix-text)",
                fontSize: 11, fontFamily: "var(--omnix-font)", outline: "none",
              }} placeholder="Search conversations..." />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "4px 6px" }}>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 6px 3px" }}>Recent</div>
            {conversations.map(conv => (
              <button key={conv.id} onClick={() => setActiveConv(conv.id)} style={{
                width: "100%", padding: "8px 9px", borderRadius: 8,
                background: activeConv === conv.id ? "rgba(0,255,255,0.08)" : "transparent",
                border: `1px solid ${activeConv === conv.id ? "rgba(0,255,255,0.2)" : "transparent"}`,
                display: "flex", flexDirection: "column", alignItems: "flex-start",
                cursor: "pointer", marginBottom: 1, transition: "all 0.15s",
                textAlign: "left",
              }}
                onMouseEnter={e => { if (activeConv !== conv.id) e.currentTarget.style.background = "var(--omnix-surface)"; }}
                onMouseLeave={e => { if (activeConv !== conv.id) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 3 }}>
                  <span style={{ color: activeConv === conv.id ? "var(--omnix-text)" : "var(--omnix-text-2)", fontSize: 12, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 130 }}>{conv.title}</span>
                  <span style={{ color: "var(--omnix-text-3)", fontSize: 10, flexShrink: 0 }}>{conv.time}</span>
                </div>
                <span style={{ color: "var(--omnix-text-3)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>{conv.preview}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: "flex", gap: 12, flexDirection: msg.role === "user" ? "row-reverse" : "row", animation: "omnix-slide-in 0.2s ease" }}>
                {msg.role === "assistant" && (
                  <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: "rgba(0,255,255,0.12)", border: "1px solid rgba(0,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--omnix-glow-xs)" }}>
                    <Bot size={16} color="var(--omnix-cyan)" />
                  </div>
                )}
                <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: 6 }}>
                  <div style={{
                    padding: "12px 16px", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.role === "user" ? "rgba(0,255,255,0.12)" : "var(--omnix-surface)",
                    border: `1px solid ${msg.role === "user" ? "rgba(0,255,255,0.25)" : "var(--omnix-border)"}`,
                    color: "var(--omnix-text)", fontSize: 13, lineHeight: 1.65,
                    whiteSpace: "pre-wrap",
                    boxShadow: msg.role === "user" ? "var(--omnix-glow-xs)" : "none",
                  }}>
                    {msg.content.split("**").map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: "#fff" }}>{part}</strong> : part)}
                  </div>
                  {msg.sources && (
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {msg.sources.map((src, i) => (
                        <span key={i} style={{ background: "rgba(0,255,255,0.07)", border: "1px solid rgba(0,255,255,0.18)", borderRadius: 20, padding: "2px 8px", fontSize: 10, color: "var(--omnix-cyan)", fontWeight: 500 }}>{src}</span>
                      ))}
                    </div>
                  )}
                  <span style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>{msg.time}</span>
                </div>
              </div>
            ))}
            {thinking && (
              <div style={{ display: "flex", gap: 12, animation: "omnix-slide-in 0.2s ease" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: "rgba(0,255,255,0.12)", border: "1px solid rgba(0,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bot size={16} color="var(--omnix-cyan)" style={{ animation: "omnix-spin 1.5s linear infinite" }} />
                </div>
                <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", gap: 6, alignItems: "center" }}>
                  {[0, 0.15, 0.3].map((d, i) => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--omnix-cyan)", animation: `omnix-pulse 1.2s ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 24px 16px", borderTop: "1px solid var(--omnix-border)", background: "rgba(5,12,23,0.9)", backdropFilter: "blur(10px)" }}>
            {messages.length === 1 && (
              <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => setInput(s)} style={{
                    padding: "5px 11px", borderRadius: 20, background: "var(--omnix-surface)",
                    border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)",
                    fontSize: 11, cursor: "pointer", fontFamily: "var(--omnix-font)", transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--omnix-border-active)"; e.currentTarget.style.color = "var(--omnix-cyan)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.color = "var(--omnix-text-2)"; }}
                  >{s}</button>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <div style={{ flex: 1, borderRadius: "var(--omnix-radius)", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border-2)", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8, transition: "border-color 0.2s" }}
                onFocusCapture={e => { e.currentTarget.style.borderColor = "rgba(0,255,255,0.4)"; e.currentTarget.style.boxShadow = "var(--omnix-glow-xs)"; }}
                onBlurCapture={e => { e.currentTarget.style.borderColor = "var(--omnix-border-2)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything — research, analyze, create..."
                  rows={1}
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    color: "var(--omnix-text)", fontSize: 13, resize: "none",
                    fontFamily: "var(--omnix-font)", lineHeight: 1.5, width: "100%",
                    maxHeight: 100, overflow: "auto",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button style={{ background: "none", border: "none", color: "var(--omnix-text-3)", cursor: "pointer", padding: 2 }} title="Attach file">
                    <Paperclip size={14} />
                  </button>
                  <button
                    onClick={() => setWebSearch(!webSearch)}
                    style={{
                      background: webSearch ? "rgba(0,255,255,0.1)" : "none",
                      border: webSearch ? "1px solid rgba(0,255,255,0.25)" : "1px solid transparent",
                      borderRadius: 6, color: webSearch ? "var(--omnix-cyan)" : "var(--omnix-text-3)",
                      cursor: "pointer", padding: "2px 7px", fontSize: 10, fontWeight: 500,
                      display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--omnix-font)",
                      transition: "all 0.15s",
                    }}
                    title="Toggle web search"
                  >
                    <Globe size={11} /> Web
                  </button>
                  <button
                    onClick={() => setUseKb(!useKb)}
                    style={{
                      background: useKb ? "rgba(155,92,255,0.1)" : "none",
                      border: useKb ? "1px solid rgba(155,92,255,0.25)" : "1px solid transparent",
                      borderRadius: 6, color: useKb ? "#9b5cff" : "var(--omnix-text-3)",
                      cursor: "pointer", padding: "2px 7px", fontSize: 10, fontWeight: 500,
                      display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--omnix-font)",
                      transition: "all 0.15s",
                    }}
                    title="Use knowledge base"
                  >
                    <Zap size={11} /> KB
                  </button>
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || thinking}
                style={{
                  width: 44, height: 44, borderRadius: "var(--omnix-radius-sm)",
                  background: input.trim() && !thinking ? "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)" : "var(--omnix-surface)",
                  border: `1px solid ${input.trim() && !thinking ? "transparent" : "var(--omnix-border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: input.trim() && !thinking ? "pointer" : "default",
                  boxShadow: input.trim() && !thinking ? "var(--omnix-glow-sm)" : "none",
                  transition: "all 0.2s", flexShrink: 0,
                }}
              >
                <Send size={16} color={input.trim() && !thinking ? "#050c17" : "var(--omnix-text-3)"} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
