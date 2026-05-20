import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import {
  Search, Plus, FileText, Globe, Database, Link2, Upload,
  CheckCircle2, AlertCircle, RefreshCw, Trash2, MoreHorizontal,
  Eye, Download, Clock, Filter, ChevronDown, FolderOpen, Zap,
  FileJson, FileSpreadsheet, Code2,
} from "lucide-react";

type SourceType = "All" | "Documents" | "URLs" | "Databases" | "APIs";

const TYPE_TABS: SourceType[] = ["All", "Documents", "URLs", "Databases", "APIs"];

interface Source {
  id: number;
  name: string;
  type: "pdf" | "md" | "url" | "db" | "api" | "csv" | "json";
  size: string;
  indexed: string;
  status: "indexed" | "processing" | "error" | "stale";
  chunks: number;
  usedIn: number;
  addedBy: string;
  tag: SourceType;
}

const SOURCES: Source[] = [
  { id: 1,  name: "Nexus_Q2_Report.pdf",          type: "pdf",  size: "2.4 MB",  indexed: "2h ago",   status: "indexed",    chunks: 148, usedIn: 12, addedBy: "Elena", tag: "Documents"  },
  { id: 2,  name: "Internal_Pricing_Draft.md",     type: "md",   size: "42 KB",   indexed: "1d ago",   status: "indexed",    chunks: 31,  usedIn: 8,  addedBy: "Alex",  tag: "Documents"  },
  { id: 3,  name: "Engineering_Handbook.pdf",       type: "pdf",  size: "5.1 MB",  indexed: "3d ago",   status: "indexed",    chunks: 310, usedIn: 5,  addedBy: "Marcus", tag: "Documents" },
  { id: 4,  name: "Zenith Press Release",           type: "url",  size: "—",       indexed: "12h ago",  status: "stale",      chunks: 18,  usedIn: 3,  addedBy: "Elena", tag: "URLs"       },
  { id: 5,  name: "techcrunch.com/ai-trends",       type: "url",  size: "—",       indexed: "4h ago",   status: "indexed",    chunks: 24,  usedIn: 7,  addedBy: "Sarah", tag: "URLs"       },
  { id: 6,  name: "Product Roadmap Q3-Q4.csv",      type: "csv",  size: "180 KB",  indexed: "6h ago",   status: "indexed",    chunks: 52,  usedIn: 9,  addedBy: "Marcus", tag: "Documents" },
  { id: 7,  name: "PostgreSQL (Production)",        type: "db",   size: "12.3 GB", indexed: "Live sync", status: "indexed",   chunks: 0,   usedIn: 4,  addedBy: "Marcus", tag: "Databases" },
  { id: 8,  name: "analytics_schema.json",          type: "json", size: "64 KB",   indexed: "2d ago",   status: "indexed",    chunks: 22,  usedIn: 2,  addedBy: "David", tag: "Documents"  },
  { id: 9,  name: "Stripe API v2",                  type: "api",  size: "—",       indexed: "Live sync", status: "indexed",   chunks: 0,   usedIn: 6,  addedBy: "Sarah", tag: "APIs"       },
  { id: 10, name: "Competitor Analysis Report.pdf", type: "pdf",  size: "1.8 MB",  indexed: "5d ago",   status: "error",      chunks: 0,   usedIn: 0,  addedBy: "Elena", tag: "Documents"  },
  { id: 11, name: "GitHub Issues Feed",             type: "api",  size: "—",       indexed: "30m ago",  status: "processing", chunks: 0,   usedIn: 0,  addedBy: "Marcus", tag: "APIs"      },
  { id: 12, name: "Customer Feedback.csv",          type: "csv",  size: "320 KB",  indexed: "1d ago",   status: "indexed",    chunks: 89,  usedIn: 3,  addedBy: "Maya",  tag: "Documents"  },
];

const TYPE_META: Record<string, { Icon: any; color: string; bg: string }> = {
  pdf:  { Icon: FileText,        color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  md:   { Icon: FileText,        color: "var(--omnix-cyan)",  bg: "rgba(0,255,255,0.10)" },
  url:  { Icon: Globe,           color: "var(--omnix-green)", bg: "rgba(0,232,122,0.10)" },
  db:   { Icon: Database,        color: "var(--omnix-blue)",  bg: "rgba(59,130,246,0.12)" },
  api:  { Icon: Link2,           color: "#9b5cff",            bg: "rgba(155,92,255,0.12)" },
  csv:  { Icon: FileSpreadsheet, color: "#f59e0b",            bg: "rgba(245,158,11,0.12)" },
  json: { Icon: FileJson,        color: "#06b6d4",            bg: "rgba(6,182,212,0.12)"  },
};

const STATUS_META: Record<string, { label: string; color: string; bg: string; Icon: any }> = {
  indexed:    { label: "Indexed",    color: "var(--omnix-green)", bg: "rgba(0,232,122,0.10)", Icon: CheckCircle2 },
  processing: { label: "Processing", color: "#f59e0b",            bg: "rgba(245,158,11,0.10)", Icon: RefreshCw    },
  error:      { label: "Error",      color: "#f87171",            bg: "rgba(248,113,113,0.10)", Icon: AlertCircle  },
  stale:      { label: "Stale",      color: "#6b7280",            bg: "rgba(107,114,128,0.10)", Icon: Clock        },
};

export function Sources() {
  const [activeTab, setActiveTab] = useState<SourceType>("All");
  const [search, setSearch]       = useState("");
  const [sortBy, setSortBy]       = useState("recent");

  const filtered = SOURCES.filter(s =>
    (activeTab === "All" || s.tag === activeTab) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalChunks = SOURCES.filter(s => s.status === "indexed").reduce((a, s) => a + s.chunks, 0);
  const totalSize   = "21.2 MB indexed";

  return (
    <AppLayout activePage="Sources" headerTitle="Knowledge Sources" headerSubtitle={`${SOURCES.length} sources · ${totalChunks} chunks indexed`}>
      <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden", background: "var(--omnix-bg)", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>

        {/* ── MAIN ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "22px 28px" }}>

          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--omnix-text-3)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sources..." style={{ width: "100%", boxSizing: "border-box", paddingLeft: 32, paddingRight: 12, paddingTop: 7, paddingBottom: 7, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", borderRadius: 20, fontSize: 12, color: "var(--omnix-text)", outline: "none", fontFamily: "var(--omnix-font)" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 8, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)", cursor: "pointer" }}>
              <Filter size={12} color="var(--omnix-text-3)" />
              <span style={{ fontSize: 12, color: "var(--omnix-text-2)" }}>Sort: Recent</span>
              <ChevronDown size={11} color="var(--omnix-text-3)" />
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button style={{ height: 34, padding: "0 14px", borderRadius: 8, background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--omnix-font)" }}>
                <Upload size={12} />Upload
              </button>
              <button style={{ height: 34, padding: "0 14px", borderRadius: 8, background: "linear-gradient(135deg,#00FFFF,#0055ff)", border: "none", color: "#050c17", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "var(--omnix-glow-sm)", fontFamily: "var(--omnix-font)" }}>
                <Plus size={13} />Add Source
              </button>
            </div>
          </div>

          {/* Type tabs */}
          <div style={{ display: "flex", gap: 2, borderBottom: "1px solid var(--omnix-border)", marginBottom: 18 }}>
            {TYPE_TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: activeTab === tab ? 600 : 400, color: activeTab === tab ? "var(--omnix-text)" : "var(--omnix-text-2)", position: "relative", transition: "color 0.15s", fontFamily: "var(--omnix-font)" }}>
                {tab}
                <span style={{ marginLeft: 5, fontSize: 10, padding: "1px 5px", borderRadius: 20, background: "rgba(255,255,255,0.06)", color: "var(--omnix-text-3)" }}>
                  {tab === "All" ? SOURCES.length : SOURCES.filter(s => s.tag === tab).length}
                </span>
                {activeTab === tab && <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, borderRadius: "2px 2px 0 0", background: "var(--omnix-cyan)", boxShadow: "0 0 8px rgba(0,255,255,0.6)" }} />}
              </button>
            ))}
          </div>

          {/* Source list */}
          <div style={{ borderRadius: 12, border: "1px solid var(--omnix-border)", background: "var(--omnix-surface)", overflow: "hidden" }}>
            {/* List header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 80px 100px 80px 70px 90px", padding: "10px 16px", borderBottom: "1px solid var(--omnix-border)", background: "rgba(0,0,0,0.2)" }}>
              {["Name", "Type", "Status", "Chunks", "Used In", "Actions"].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 600, color: "var(--omnix-text-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
              ))}
            </div>

            {filtered.map((s, i) => {
              const tm = TYPE_META[s.type];
              const sm = STATUS_META[s.status];
              return (
                <div key={s.id} style={{
                  display: "grid", gridTemplateColumns: "2fr 80px 100px 80px 70px 90px",
                  padding: "12px 16px", borderBottom: i < filtered.length - 1 ? "1px solid var(--omnix-border)" : "none",
                  alignItems: "center", transition: "background 0.12s", cursor: "pointer",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  {/* Name */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: tm.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <tm.Icon size={14} color={tm.color} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--omnix-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "var(--omnix-text-3)", marginTop: 1 }}>
                        {s.size !== "—" ? s.size : ""}{s.size !== "—" && s.indexed ? " · " : ""}{s.indexed} · {s.addedBy}
                      </div>
                    </div>
                  </div>

                  {/* Type */}
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: tm.color, letterSpacing: "0.04em" }}>{s.type.toUpperCase()}</div>

                  {/* Status */}
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 20, background: sm.bg, border: `1px solid ${sm.color}30`, width: "fit-content" }}>
                    <sm.Icon size={10} color={sm.color} style={{ animation: s.status === "processing" ? "spin 1s linear infinite" : "none" }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: sm.color }}>{sm.label}</span>
                  </div>

                  {/* Chunks */}
                  <div style={{ fontSize: 12, color: s.chunks > 0 ? "var(--omnix-text-2)" : "var(--omnix-text-3)" }}>{s.chunks > 0 ? s.chunks.toLocaleString() : "—"}</div>

                  {/* Used In */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Zap size={11} color={s.usedIn > 0 ? "var(--omnix-cyan)" : "var(--omnix-text-3)"} />
                    <span style={{ fontSize: 12, color: s.usedIn > 0 ? "var(--omnix-text)" : "var(--omnix-text-3)" }}>{s.usedIn}</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {[Eye, RefreshCw, Trash2].map((Icon, idx) => (
                      <button key={idx} onClick={e => e.stopPropagation()} style={{ width: 26, height: 26, borderRadius: 6, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--omnix-text-3)" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "var(--omnix-surface-hover)"; e.currentTarget.style.color = idx === 2 ? "#f87171" : "var(--omnix-text)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--omnix-text-3)"; }}
                      ><Icon size={12} /></button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div style={{ width: 240, flexShrink: 0, borderLeft: "1px solid var(--omnix-border)", background: "rgba(5,12,23,0.95)", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid var(--omnix-border)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)" }}>Index Overview</div>
          </div>
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 14, borderBottom: "1px solid var(--omnix-border)" }}>
            {[
              { label: "Total Sources", value: SOURCES.length.toString(), color: "var(--omnix-cyan)" },
              { label: "Chunks Indexed", value: totalChunks.toLocaleString(), color: "var(--omnix-green)" },
              { label: "Storage Used", value: totalSize, color: "#f59e0b" },
              { label: "Errors", value: SOURCES.filter(s => s.status === "error").length.toString(), color: "#f87171" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--omnix-text-3)" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--omnix-border)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 12 }}>By Type</div>
            {[
              { label: "Documents", count: 7, color: "#f87171" },
              { label: "URLs",      count: 2, color: "var(--omnix-green)" },
              { label: "APIs",      count: 2, color: "#9b5cff" },
              { label: "Databases", count: 1, color: "var(--omnix-blue)" },
            ].map(({ label, count, color }) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "var(--omnix-text-2)" }}>{label}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color }}>{count}</span>
                </div>
                <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)" }}>
                  <div style={{ height: "100%", borderRadius: 2, width: `${(count / SOURCES.length) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--omnix-text-3)", marginBottom: 10 }}>Last Sync</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--omnix-green)", boxShadow: "0 0 5px var(--omnix-green)" }} />
              <span style={{ fontSize: 12, color: "var(--omnix-text-2)" }}>Index up to date</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--omnix-text-3)" }}>Last full sync: 30m ago</div>
            <button style={{ marginTop: 10, width: "100%", height: 30, borderRadius: 7, background: "transparent", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: "var(--omnix-font)" }}>
              <RefreshCw size={11} />Re-index All
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
