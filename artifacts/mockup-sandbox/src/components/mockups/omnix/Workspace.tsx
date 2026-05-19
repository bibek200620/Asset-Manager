import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import { Search, Plus, MoreHorizontal, Mail, Shield, User, Settings, ArrowRight, UserPlus, Clock, Zap, Check, X, ShieldAlert } from "lucide-react";

export function Workspace() {
  const [activeTab, setActiveTab] = useState("Members");

  const members = [
    { id: 1, name: "Elena Rostova", role: "Founder", email: "elena@omnix.ai", initials: "ER", color: "var(--omnix-pink)", bg: "linear-gradient(135deg, #ec4899, #be185d)", lastActive: "Just now", status: "online" },
    { id: 2, name: "Marcus Webb", role: "Co-owner", email: "marcus@omnix.ai", initials: "MW", color: "#f59e0b", bg: "linear-gradient(135deg, #f59e0b, #d97706)", lastActive: "5m ago", status: "online" },
    { id: 3, name: "Sarah Chen", role: "Member", email: "sarah@omnix.ai", initials: "SC", color: "var(--omnix-blue)", bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)", lastActive: "1h ago", status: "offline" },
    { id: 4, name: "David Kim", role: "Member", email: "david@omnix.ai", initials: "DK", color: "var(--omnix-blue)", bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)", lastActive: "2h ago", status: "offline" },
    { id: 5, name: "Maya Patel", role: "Member", email: "maya@omnix.ai", initials: "MP", color: "var(--omnix-blue)", bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)", lastActive: "4h ago", status: "offline" },
    { id: 6, name: "James Wilson", role: "Viewer", email: "james@omnix.ai", initials: "JW", color: "var(--omnix-text-3)", bg: "linear-gradient(135deg, #4b5563, #374151)", lastActive: "1d ago", status: "offline" },
    { id: 7, name: "Alex Thompson", role: "Viewer", email: "alex@omnix.ai", initials: "AT", color: "var(--omnix-text-3)", bg: "linear-gradient(135deg, #4b5563, #374151)", lastActive: "2d ago", status: "offline" },
  ];

  const pendingInvites = [
    { email: "jessica@omnix.ai", role: "Member", sent: "2 days ago", expires: "in 5 days" },
    { email: "ryan@omnix.ai", role: "Viewer", sent: "3 days ago", expires: "in 4 days" }
  ];

  const activities = [
    { id: 1, user: "Marcus Webb", action: "created a new chat", target: "Project Alpha Synthesis", time: "10m ago", icon: <Zap size={14} className="text-amber-500" /> },
    { id: 2, user: "Sarah Chen", action: "joined the workspace", target: "", time: "2h ago", icon: <UserPlus size={14} className="text-blue-500" /> },
    { id: 3, user: "Omnix AI", action: "completed deep analysis", target: "Q3 Market Research", time: "4h ago", icon: <Shield size={14} className="text-indigo-500" /> },
    { id: 4, user: "Elena Rostova", action: "updated workspace settings", target: "", time: "1d ago", icon: <Settings size={14} className="text-pink-500" /> },
  ];

  return (
    <AppLayout activePage="Workspaces" headerTitle="Workspace Management" headerSubtitle="Omnix Labs · 8 members">
      <div className="flex h-full w-full overflow-hidden" style={{ background: "var(--omnix-bg)", color: "var(--omnix-text)", fontFamily: "var(--omnix-font)" }}>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <div className="p-8 max-w-5xl mx-auto w-full flex-1">
            
            {/* Header section with tabs and CTA */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-6 border-b border-[var(--omnix-border)] w-full max-w-2xl">
                {["Overview", "Members", "Invitations", "Settings"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="pb-3 px-2 text-sm font-medium transition-all relative"
                    style={{ 
                      color: activeTab === tab ? "var(--omnix-text)" : "var(--omnix-text-2)",
                      textShadow: activeTab === tab ? "var(--omnix-glow-sm)" : "none"
                    }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-[var(--omnix-purple-bright)] shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                    )}
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-[var(--omnix-surface)] border border-[var(--omnix-border)] hover:bg-[var(--omnix-surface-hover)] transition-all ml-4 shrink-0">
                <Plus size={16} />
                <span>New Workspace</span>
              </button>
            </div>

            {/* Content Switcher */}
            {activeTab === "Members" && (
              <div className="space-y-6 animation-omnix-slide-in">
                
                {/* Workspace Overview Card */}
                <div className="p-6 rounded-2xl border border-[var(--omnix-border)] relative overflow-hidden backdrop-blur-md bg-[rgba(10,14,26,0.5)]">
                  {/* Decorative ambient light */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--omnix-purple)] opacity-10 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold shadow-[var(--omnix-glow-md)]" style={{ background: "var(--omnix-grad-primary)", fontFamily: "var(--omnix-font-display)" }}>
                        O
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold mb-1" style={{ fontFamily: "var(--omnix-font-display)" }}>Omnix Labs</h2>
                        <p className="text-sm text-[var(--omnix-text-2)] mb-3">Futuristic AI research and product development team.</p>
                        
                        <div className="flex items-center gap-4 text-xs font-medium text-[var(--omnix-text-3)]">
                          <div className="flex items-center gap-1.5"><User size={14} className="text-[var(--omnix-text-2)]" /> 8 Members</div>
                          <div className="flex items-center gap-1.5"><Zap size={14} className="text-[var(--omnix-text-2)]" /> 124 Chats</div>
                          <div className="flex items-center gap-1.5"><Search size={14} className="text-[var(--omnix-text-2)]" /> 32 Sources</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                        <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">Pro Plan</span>
                      </div>
                      <button className="text-xs font-medium text-[var(--omnix-text-2)] hover:text-white transition-colors flex items-center gap-1">
                        Upgrade plan <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Team Members List */}
                <div className="rounded-2xl border border-[var(--omnix-border)] bg-[rgba(6,8,16,0.6)] backdrop-blur-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-[var(--omnix-border)] flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Team Members</h3>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--omnix-text-3)]" />
                      <input 
                        type="text" 
                        placeholder="Search members..." 
                        className="pl-9 pr-4 py-1.5 text-sm bg-[var(--omnix-surface)] border border-[var(--omnix-border)] rounded-full focus:outline-none focus:border-[var(--omnix-purple)] transition-colors text-[var(--omnix-text)] w-64"
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-[var(--omnix-border)]">
                    {members.map((member) => (
                      <div key={member.id} className="group flex items-center justify-between px-6 py-4 hover:bg-[var(--omnix-surface)] transition-all">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm" style={{ background: member.bg }}>
                              {member.initials}
                            </div>
                            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--omnix-bg)] ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-[var(--omnix-text)] flex items-center gap-2">
                              {member.name}
                              {member.role === 'Founder' && <ShieldAlert size={14} className="text-pink-400" />}
                            </div>
                            <div className="text-xs text-[var(--omnix-text-3)] mt-0.5">{member.email}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 w-28">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: member.color, boxShadow: `0 0 8px ${member.color}` }} />
                            <span className="text-xs font-medium" style={{ color: member.color }}>{member.role}</span>
                          </div>
                          
                          <div className="w-24 text-xs text-[var(--omnix-text-3)] flex items-center gap-1.5">
                            <Clock size={12} />
                            {member.lastActive}
                          </div>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity w-16 justify-end">
                            <button className="p-1.5 text-[var(--omnix-text-3)] hover:text-white hover:bg-[var(--omnix-surface-hover)] rounded-md transition-all">
                              <Settings size={16} />
                            </button>
                            <button className="p-1.5 text-[var(--omnix-text-3)] hover:text-white hover:bg-[var(--omnix-surface-hover)] rounded-md transition-all">
                              <MoreHorizontal size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invite Members Section */}
                <div className="rounded-2xl border border-[var(--omnix-border)] bg-[rgba(6,8,16,0.6)] backdrop-blur-xl p-6">
                  <h3 className="font-semibold text-lg mb-1">Invite Members</h3>
                  <p className="text-sm text-[var(--omnix-text-3)] mb-5">Send email invitations to add new people to this workspace.</p>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex-1">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--omnix-text-3)]" />
                      <input 
                        type="email" 
                        placeholder="Email address" 
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-[var(--omnix-surface)] border border-[var(--omnix-border)] rounded-lg focus:outline-none focus:border-[var(--omnix-purple)] transition-colors text-[var(--omnix-text)]"
                      />
                    </div>
                    <select className="px-4 py-2.5 text-sm bg-[var(--omnix-surface)] border border-[var(--omnix-border)] rounded-lg focus:outline-none focus:border-[var(--omnix-purple)] text-[var(--omnix-text)] appearance-none min-w-[120px]">
                      <option value="member">Member</option>
                      <option value="viewer">Viewer</option>
                      <option value="co-owner">Co-owner</option>
                    </select>
                    <button className="px-6 py-2.5 bg-[var(--omnix-grad-primary)] text-white text-sm font-semibold rounded-lg shadow-[var(--omnix-glow-sm)] hover:shadow-[var(--omnix-glow-md)] transition-all shrink-0">
                      Send Invite
                    </button>
                  </div>

                  {pendingInvites.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--omnix-text-3)] uppercase tracking-wider mb-3">Pending Invitations</h4>
                      <div className="space-y-2">
                        {pendingInvites.map((invite, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--omnix-surface)] border border-[var(--omnix-border)]">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[var(--omnix-surface-hover)] flex items-center justify-center text-[var(--omnix-text-3)]">
                                <Mail size={14} />
                              </div>
                              <div>
                                <div className="text-sm font-medium">{invite.email}</div>
                                <div className="text-xs text-[var(--omnix-text-3)]">Sent {invite.sent} · Expires {invite.expires}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-medium text-[var(--omnix-text-2)]">{invite.role}</span>
                              <div className="h-4 w-px bg-[var(--omnix-border)]" />
                              <button className="text-xs font-medium text-[var(--omnix-purple-bright)] hover:text-white transition-colors">Resend</button>
                              <button className="text-[var(--omnix-text-3)] hover:text-red-400 transition-colors ml-1"><X size={16} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Empty State / Not Implemented Tabs */}
            {activeTab !== "Members" && (
              <div className="h-64 rounded-2xl border border-dashed border-[var(--omnix-border)] flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-[var(--omnix-surface)] flex items-center justify-center mb-4">
                  <Clock size={24} className="text-[var(--omnix-text-3)]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{activeTab} coming soon</h3>
                <p className="text-sm text-[var(--omnix-text-3)] max-w-sm">This section of the workspace settings is currently under development in the beta version.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Activity Feed */}
        <div className="w-80 border-l border-[var(--omnix-border)] bg-[rgba(6,8,16,0.95)] backdrop-blur-xl flex flex-col h-full shrink-0">
          <div className="p-5 border-b border-[var(--omnix-border)]">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[var(--omnix-text-2)]">Activity Feed</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div className="relative border-l border-[var(--omnix-border)] ml-3 pl-6 space-y-8">
              {activities.map((activity, i) => (
                <div key={activity.id} className="relative">
                  <div className="absolute -left-[31px] w-6 h-6 rounded-full bg-[var(--omnix-bg-2)] border border-[var(--omnix-border)] flex items-center justify-center">
                    {activity.icon}
                  </div>
                  
                  <div className="mb-1 text-sm text-[var(--omnix-text-2)] leading-tight">
                    <span className="font-semibold text-[var(--omnix-text)] mr-1">{activity.user}</span>
                    {activity.action}
                  </div>
                  
                  {activity.target && (
                    <div className="text-sm font-medium text-[var(--omnix-purple-bright)] mb-1">
                      {activity.target}
                    </div>
                  )}
                  
                  <div className="text-xs text-[var(--omnix-text-3)]">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 text-xs font-medium text-[var(--omnix-text-3)] hover:text-white transition-colors border border-dashed border-[var(--omnix-border)] rounded-lg">
              Load Older Activity
            </button>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
