import React, { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Search, Plus, MoreHorizontal, Mail, Shield, Crown, User } from "lucide-react";

const members = [
  { id: 1, name: "Alex Chen", email: "alex@omnix.ai", role: "Founder", avatar: "A", color: "#00FFFF", status: "online", queries: 2841, joined: "Jan 2024", department: "Leadership" },
  { id: 2, name: "Sarah Kim", email: "sarah@omnix.ai", role: "Product Lead", avatar: "S", color: "#9b5cff", status: "online", queries: 1920, joined: "Feb 2024", department: "Product" },
  { id: 3, name: "Marcus Johnson", email: "marcus@omnix.ai", role: "Engineer", avatar: "M", color: "#00e87a", status: "online", queries: 3102, joined: "Jan 2024", department: "Engineering" },
  { id: 4, name: "Priya Patel", email: "priya@omnix.ai", role: "Designer", avatar: "P", color: "#ffb800", status: "away", queries: 892, joined: "Mar 2024", department: "Design" },
  { id: 5, name: "Jake Rivera", email: "jake@omnix.ai", role: "Marketing", avatar: "J", color: "#ff4df4", status: "offline", queries: 540, joined: "Apr 2024", department: "Marketing" },
  { id: 6, name: "Lena Wang", email: "lena@omnix.ai", role: "Data Analyst", avatar: "L", color: "#3366ff", status: "online", queries: 2104, joined: "Feb 2024", department: "Analytics" },
];

const departments = ["All", "Leadership", "Engineering", "Product", "Design", "Marketing", "Analytics"];

const roleIcon: Record<string, React.FC<any>> = {
  "Founder": Crown,
  "Product Lead": Shield,
  "Engineer": User,
  "Designer": User,
  "Marketing": User,
  "Data Analyst": User,
};

const statusColors: Record<string, string> = {
  online: "#00e87a",
  away: "#ffb800",
  offline: "var(--omnix-text-3)",
};

export function Team() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const filtered = members.filter(m =>
    (dept === "All" || m.department === dept) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppLayout headerTitle="Team" headerSubtitle="Manage workspace members">
      <div style={{ height: "100%", overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 18, animation: "omnix-fade-in 0.3s ease" }}>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "Total Members", value: members.length, color: "#00FFFF" },
            { label: "Online Now", value: members.filter(m => m.status === "online").length, color: "#00e87a" },
            { label: "Departments", value: departments.length - 1, color: "#9b5cff" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, borderRadius: "var(--omnix-radius-sm)", padding: "12px 16px", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, boxShadow: `0 0 8px ${s.color}80`, flexShrink: 0 }} />
              <span style={{ color: "var(--omnix-text-3)", fontSize: 12 }}>{s.label}</span>
              <span style={{ color: "var(--omnix-text)", fontWeight: 700, fontSize: 18, fontFamily: "var(--omnix-font-display)", marginLeft: "auto" }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <Search size={13} color="var(--omnix-text-3)" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search members..."
              style={{ width: "100%", padding: "7px 12px 7px 30px", borderRadius: "var(--omnix-radius-sm)", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text)", fontSize: 12, fontFamily: "var(--omnix-font)", outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => { e.target.style.borderColor = "rgba(0,255,255,0.35)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--omnix-border)"; }}
            />
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {departments.map(d => (
              <button key={d} onClick={() => setDept(d)} style={{
                padding: "5px 12px", borderRadius: 20,
                background: dept === d ? "rgba(0,255,255,0.1)" : "var(--omnix-surface)",
                border: `1px solid ${dept === d ? "rgba(0,255,255,0.3)" : "var(--omnix-border)"}`,
                color: dept === d ? "var(--omnix-cyan)" : "var(--omnix-text-3)",
                fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "var(--omnix-font)", transition: "all 0.15s",
              }}>{d}</button>
            ))}
          </div>
          <button onClick={() => setInviteOpen(true)} style={{
            padding: "7px 14px", borderRadius: "var(--omnix-radius-sm)",
            background: "transparent", border: "1px solid var(--omnix-cyan)",
            color: "var(--omnix-cyan)", fontSize: 12, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--omnix-font)", transition: "all 0.2s",
            boxShadow: "var(--omnix-glow-xs)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          ><Plus size={13} strokeWidth={2.5} /> Invite Member</button>
        </div>

        {/* Invite modal */}
        {inviteOpen && (
          <div style={{
            borderRadius: "var(--omnix-radius)", padding: "18px",
            background: "#07131f", border: "1px solid var(--omnix-border-2)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.6), var(--omnix-glow-xs)",
            animation: "omnix-slide-in 0.2s ease",
          }}>
            <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 15, fontFamily: "var(--omnix-font-display)", marginBottom: 4 }}>Invite Team Member</div>
            <div style={{ color: "var(--omnix-text-3)", fontSize: 12, marginBottom: 14 }}>Send an invitation email to add someone to your workspace.</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <Mail size={13} color="var(--omnix-text-3)" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  style={{ width: "100%", padding: "9px 12px 9px 30px", borderRadius: "var(--omnix-radius-sm)", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border-2)", color: "var(--omnix-text)", fontSize: 13, fontFamily: "var(--omnix-font)", outline: "none" }}
                />
              </div>
              <button onClick={() => { setInviteOpen(false); setInviteEmail(""); }} style={{
                padding: "9px 18px", borderRadius: "var(--omnix-radius-sm)",
                background: "linear-gradient(135deg, #00FFFF 0%, #0088ff 100%)",
                border: "none", color: "#050c17", fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "var(--omnix-font)", boxShadow: "var(--omnix-glow-sm)",
              }}>Send Invite</button>
              <button onClick={() => setInviteOpen(false)} style={{ padding: "9px 14px", borderRadius: "var(--omnix-radius-sm)", background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)", color: "var(--omnix-text-2)", fontSize: 13, cursor: "pointer", fontFamily: "var(--omnix-font)" }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Members Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {filtered.map(member => {
            const RoleIcon = roleIcon[member.role] || User;
            return (
              <div key={member.id} style={{
                borderRadius: "var(--omnix-radius)", padding: "18px",
                background: "var(--omnix-surface)", border: "1px solid var(--omnix-border)",
                transition: "all 0.2s", cursor: "pointer", position: "relative",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${member.color}30`; e.currentTarget.style.background = "var(--omnix-surface-hover)"; e.currentTarget.style.boxShadow = `0 0 24px ${member.color}10`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--omnix-border)"; e.currentTarget.style.background = "var(--omnix-surface)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <button style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "var(--omnix-text-3)", cursor: "pointer", padding: 4 }}><MoreHorizontal size={15} /></button>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}88 100%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, fontWeight: 700, color: "#050c17",
                      border: `2px solid ${member.color}55`,
                      boxShadow: `0 0 16px ${member.color}30`,
                    }}>{member.avatar}</div>
                    <div style={{
                      position: "absolute", bottom: 1, right: 1, width: 11, height: 11,
                      borderRadius: "50%", background: statusColors[member.status],
                      border: "2px solid #050c17",
                      boxShadow: member.status === "online" ? "0 0 6px rgba(0,232,122,0.8)" : "none",
                    }} />
                  </div>
                  <div>
                    <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>{member.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                      <RoleIcon size={11} color={member.color} />
                      <span style={{ color: member.color, fontSize: 11, fontWeight: 500 }}>{member.role}</span>
                    </div>
                  </div>
                </div>
                <div style={{ color: "var(--omnix-text-3)", fontSize: 11, marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>
                  <Mail size={11} /> {member.email}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, borderRadius: 7, padding: "6px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--omnix-border)", textAlign: "center" }}>
                    <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 14, fontFamily: "var(--omnix-font-display)" }}>{member.queries.toLocaleString()}</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>Queries</div>
                  </div>
                  <div style={{ flex: 1, borderRadius: 7, padding: "6px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--omnix-border)", textAlign: "center" }}>
                    <div style={{ color: "var(--omnix-text)", fontWeight: 600, fontSize: 12, fontFamily: "var(--omnix-font-display)" }}>{member.joined}</div>
                    <div style={{ color: "var(--omnix-text-3)", fontSize: 10 }}>Joined</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
