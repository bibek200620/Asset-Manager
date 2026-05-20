import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Search, Plus, Database, Globe, FileText, MessageSquare, Github, RefreshCw, MoreHorizontal, CheckCircle2, AlertCircle } from "lucide-react";

const iconMap: Record<string, React.FC<any>> = {
  Globe, FileText, MessageSquare, Github, Database,
};

const sources = [
  { id: 1, name: "Company Wiki", type: "Confluence", icon: "Globe", docs: 1284, size: "4.2 GB", status: "synced", lastSync: "2 min ago", color: "#00FFFF", queries: 4280, desc: "Internal documentation and processes" },
  { id: 2, name: "Product Documentation", type: "Notion", icon: "FileText", docs: 892, size: "1.8 GB", status: "synced", lastSync: "5 min ago", color: "#9b5cff", queries: 3120, desc: "Product specs, roadmaps, and feature docs" },
  { id: 3, name: "Slack Channels", type: "Slack", icon: "MessageSquare", docs: 48291, size: "12.4 GB", status: "syncing", lastSync: "Syncing...", color: "#00e87a", queries: 2490, desc: "#engineering, #product, #general" },
  { id: 4, name: "GitHub Repositories", type: "GitHub", icon: "Github", docs: 3847, size: "8.9 GB", status: "synced", lastSync: "1h ago", color: "#ffb800", queries: 1870, desc: "Code, PRs, issues, and wikis" },
  { id: 5, name: "Customer Feedback DB", type: "PostgreSQL", icon: "Database", docs: 9284, size: "2.1 GB", status: "error", lastSync: "Failed — auth error", color: "#ff3b5c", queries: 0, desc: "Zendesk tickets and survey responses" },
];

const connectors = [
  { name: "Notion", icon: "📓", status: "Available", color: "#00FFFF" },
  { name: "Google Drive", icon: "💾", status: "Available", color: "#9b5cff" },
  { name: "Confluence", icon: "🌐", status: "Available", color: "#00e87a" },
  { name: "Jira", icon: "📋", status: "Available", color: "#ffb800" },
  { name: "Slack", icon: "💬", status: "Available", color: "#3366ff" },
  { name: "GitHub", icon: "⚡", status: "Available", color: "#00FFFF" },
  { name: "Salesforce", icon: "☁", status: "Coming soon", color: "#9b5cff" },
  { name: "Zendesk", icon: "🎫", status: "Coming soon", color: "#00e87a" },
];

export function Sources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedSource, setSelectedSource] = useState<number | null>(null);

  const filtered = sources.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDocs = sources.reduce((a, s) => a + s.docs, 0);
  const syncedCount = sources.filter(s => s.status === "synced").length;

  return (
    <AppLayout headerTitle="Knowledge Sources" headerSubtitle="Manage your connected data">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 18, animation: "omnix-fade-in 0.3s ease" }}>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "Connected Sources", value: sources.length, color: "#00FFFF" },
            { label: "Total Documents", value: totalDocs.toLocaleString(), color: "#9b5cff" },
            { label: "Synced", value: `${syncedCount}/${sources.length}`, color: "#00e87a" },
          ].map((stat, i) => (
            <div key={i} style={{ flex: 1, borderRadius: "var(--omnix-radius-sm)", padding: "12px 16px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: stat.color, boxShadow: `0 0 8px ${stat.color}80`, flexShrink: 0 }} />
              <span style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>{stat.label}</span>
              <span style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 15, fontFamily: "var(--omnix-font-display)", marginLeft: "auto" }}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={13} color="var(--omnix-text-3)" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search knowledge sources..."
              style={{
                width: "100%", padding: "8px 12px 8px 32px",
                borderRadius: "var(--omnix-radius-sm)", background: "var(--omnix-surface)",
                border: "1px solid var(--omnix-border)", color: "var(--omnix-text)",
                fontSize: 12, fontFamily: "var(--omnix-font)", outline: "none", transition: "border-color 0.2s",
              }}
              onFocus={e => { e.target.style.borderColor = "rgba(0,255,255,0.35)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--omnix-border)"; }}
            />
          </div>
          <div style={{ display: "flex", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 8, overflow: "hidden" }}>
            {(["grid", "list"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "6px 12px", background: view === v ? "rgba(0,255,255,0.1)" : "transparent",
                border: "none", color: view === v ? "var(--omnix-cyan)" : "var(--omnix-text-3)",
                fontSize: 12, cursor: "pointer", fontFamily: "var(--omnix-font)", transition: "all 0.15s",
              }}>{v === "grid" ? "⊞" : "≡"}</button>
            ))}
          </div>
          <button style={{
            padding: "7px 14px", borderRadius: "var(--omnix-radius-sm)",
            background: "transparent", border: "1px solid var(--omnix-cyan)",
            color: "var(--omnix-cyan)", fontSize: 12, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--omnix-font)", transition: "all 0.2s",
            boxShadow: "var(--omnix-glow-xs)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          ><Plus size={13} strokeWidth={2.5} /> Add Source</button>
        </div>

        {/* Sources Grid */}
        <div style={{ display: "grid", gridTemplateColumns: view === "grid" ? "repeat(3, 1fr)" : "1fr", gap: 14 }}>
          {filtered.map(src => {
            const Icon = iconMap[src.icon] || Database;
            const isSelected = selectedSource === src.id;
            return (
              <div key={src.id}
                onClick={() => setSelectedSource(isSelected ? null : src.id)}
                style={{
                  borderRadius: "var(--omnix-radius)", padding: "16px",
                  background: isSelected ? `${src.color}08` : "var(--omnix-surface)",
                  border: `1px solid ${isSelected ? `${src.color}35` : "var(--omnix-border)"}`,
                  cursor: "pointer", transition: "all 0.2s", position: "relative",
                  boxShadow: isSelected ? `0 0 24px ${src.color}12` : "none",
                }}
                onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = `${src.color}25`; e.currentTarget.style.background = "var(--omnix-surface-hover)"; } }}
                onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.background = "var(--omnix-surface)"; } }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${src.color}15`, border: `1px solid ${src.color}30`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${src.color}20` }}>
                      <Icon size={18} color={src.color} />
                    </div>
                    <div>
                      <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 13, fontFamily: "var(--omnix-font-display)" }}>{src.name}</div>
                      <div style={{ color: "var(--omnix-text-3)", fontSize: 11 }}>{src.type}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {src.status === "synced" && <CheckCircle2 size={14} color="var(--omnix-green)" />}
                    {src.status === "syncing" && <RefreshCw size={14} color="var(--omnix-cyan)" style={{ animation: "omnix-spin 1.5s linear infinite" }} />}
                    {src.status === "error" && <AlertCircle size={14} color="var(--omnix-red)" />}
                    <button style={{ background: "none", border: "none", color: "var(--omnix-text-3)", cursor: "pointer", padding: 2 }}><MoreHorizontal size={14} /></button>
                  </div>
                </div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 12, lineHeight: 1.4 }}>{src.desc}</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--omnix-border)", borderRadius: 6, padding: "4px 8px", fontSize: 11, color: "var(--omnix-text-2)" }}>{src.docs.toLocaleString()} docs</div>
                  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--omnix-border)", borderRadius: 6, padding: "4px 8px", fontSize: 11, color: "var(--omnix-text-2)" }}>{src.size}</div>
                  <div style={{
                    background: src.status === "synced" ? "rgba(0,232,122,0.1)" : src.status === "syncing" ? "rgba(0,255,255,0.1)" : "rgba(255,59,92,0.1)",
                    border: `1px solid ${src.status === "synced" ? "rgba(0,232,122,0.25)" : src.status === "syncing" ? "rgba(0,255,255,0.25)" : "rgba(255,59,92,0.25)"}`,
                    borderRadius: 6, padding: "4px 8px", fontSize: 11, color: src.status === "synced" ? "var(--omnix-green)" : src.status === "syncing" ? "var(--omnix-cyan)" : "var(--omnix-red)",
                    marginLeft: "auto",
                  }}>{src.lastSync}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connector marketplace */}
        <div style={{ borderRadius: "var(--omnix-radius)", padding: "18px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)" }}>
          <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Add Connector</div>
          <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 14 }}>Connect your tools and sync data automatically</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 10 }}>
            {connectors.map((c, i) => (
              <button key={i} style={{
                borderRadius: "var(--omnix-radius-sm)", padding: "12px 8px",
                background: "rgba(255,255,255,0.02)", border: "1px solid var(--omnix-border)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                cursor: c.status === "Available" ? "pointer" : "default",
                opacity: c.status === "Available" ? 1 : 0.45,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { if (c.status === "Available") { e.currentTarget.style.borderColor = `${c.color}35`; e.currentTarget.style.background = `${c.color}08`; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <span style={{ color: "var(--omnix-text-2)", fontSize: 10, textAlign: "center" }}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
