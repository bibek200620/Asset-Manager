import React, { useState, useEffect } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import { 
  BrainCircuit, 
  Users, 
  Database, 
  Sparkles, 
  MessageSquare, 
  FileText, 
  ArrowRight, 
  Zap, 
  Activity,
  History,
  TrendingUp,
  Cpu
} from "lucide-react";

// Mock Data
const keyMetrics = [
  { id: "conversations", label: "AI Conversations", value: 124, trend: "+12%", icon: MessageSquare, color: "var(--omnix-cyan)", glow: "var(--omnix-cyan)" },
  { id: "active_members", label: "Team Online", value: 8, trend: "4 idle", icon: Users, color: "var(--omnix-cyan)", glow: "var(--omnix-cyan)" },
  { id: "sources", label: "Knowledge Sources", value: 843, trend: "+24 this week", icon: Database, color: "var(--omnix-pink)", glow: "var(--omnix-pink)" },
  { id: "compute", label: "AI Compute", value: "94%", trend: "Optimal", icon: Cpu, color: "var(--omnix-green)", glow: "var(--omnix-green)" },
];

const quickActions = [
  { label: "Analyze Document", icon: FileText, desc: "Extract insights from PDF/Doc", color: "var(--omnix-blue)" },
  { label: "Generate Report", icon: Sparkles, desc: "Weekly metrics & synthesis", color: "var(--omnix-cyan)" },
  { label: "Deep Research", icon: BrainCircuit, desc: "Multi-step web search", color: "var(--omnix-pink)" },
  { label: "Team Sync", icon: Users, desc: "Summarize slack/emails", color: "var(--omnix-cyan)" },
];

const recentConversations = [
  { id: 1, title: "Q3 Strategy Synthesis", topic: "Strategy", time: "10 mins ago", tokens: "4.2k" },
  { id: 2, title: "Competitor Analysis: Acme Corp", topic: "Research", time: "1 hour ago", tokens: "12.8k" },
  { id: 3, title: "API Documentation Draft", topic: "Engineering", time: "3 hours ago", tokens: "2.1k" },
  { id: 4, title: "Onboarding Flow UX Review", topic: "Design", time: "Yesterday", tokens: "5.5k" },
];

const teamActivity = [
  { id: 1, user: "Sarah Jenkins", role: "Co-owner", roleColor: "var(--omnix-pink)", action: "connected a new data source", target: "Stripe API v2", time: "5m ago", avatar: "S" },
  { id: 2, user: "Mike Ross", role: "Member", roleColor: "var(--omnix-blue)", action: "generated a report", target: "Q3 Financials", time: "12m ago", avatar: "M" },
  { id: 3, user: "Elena Rodriguez", role: "Member", roleColor: "var(--omnix-blue)", action: "started a deep research session", target: "Web3 Trends", time: "1h ago", avatar: "E" },
  { id: 4, user: "Alex Chen", role: "Founder", roleColor: "var(--omnix-cyan)", action: "updated workspace settings", target: "Model defaults", time: "2h ago", avatar: "A" },
];

export function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppLayout activePage="Dashboard" headerTitle="Dashboard" headerSubtitle="Good morning, Alex. Workspace health is optimal.">
      <div 
        className="w-full h-full overflow-y-auto overflow-x-hidden p-6 md:p-8"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2" style={{ fontFamily: "var(--omnix-font-display)" }}>
                <Sparkles className="w-5 h-5 text-[#00FFFF]" />
                Workspace Overview
              </h1>
              <p className="text-sm mt-1" style={{ color: "var(--omnix-text-2)" }}>
                Real-time insights across your team's AI interactions and data sources.
              </p>
            </div>
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "var(--omnix-surface)",
                border: "1px solid var(--omnix-border)",
                color: "var(--omnix-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--omnix-surface-hover)";
                e.currentTarget.style.borderColor = "var(--omnix-border-active)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--omnix-surface)";
                e.currentTarget.style.borderColor = "var(--omnix-border)";
              }}
            >
              <Activity className="w-4 h-4 text-[#00FFFF]" />
              View Full Report
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((metric, i) => (
              <div 
                key={metric.id}
                className="relative p-5 rounded-xl border flex flex-col justify-between overflow-hidden group"
                style={{
                  background: "var(--omnix-surface)",
                  borderColor: "var(--omnix-border)",
                  animation: `omnix-slide-in 0.4s ease-out ${i * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = metric.glow;
                  e.currentTarget.style.boxShadow = `0 0 20px ${metric.glow}33`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--omnix-border)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Ambient glow in background */}
                <div 
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: metric.color }}
                />

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="p-2 rounded-lg" style={{ background: `${metric.color}22` }}>
                    <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "var(--omnix-text-2)" }}>
                    {metric.trend}
                  </span>
                </div>
                
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--omnix-font-display)" }}>
                    {metric.value}
                  </div>
                  <div className="text-sm" style={{ color: "var(--omnix-text-3)" }}>
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (2/3 width on LG) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Quick Actions */}
              <div 
                className="p-6 rounded-xl border relative overflow-hidden"
                style={{
                  background: "var(--omnix-surface)",
                  borderColor: "var(--omnix-border)",
                  animation: `omnix-slide-in 0.5s ease-out 0.2s both`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Quick Actions
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-lg text-left transition-all border border-transparent group"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${action.color}11`;
                        e.currentTarget.style.borderColor = `${action.color}33`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <div className="p-2 rounded-md transition-colors" style={{ background: `${action.color}22` }}>
                        <action.icon className="w-5 h-5" style={{ color: action.color }} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white mb-0.5 group-hover:text-[#00e8e8] transition-colors">
                          {action.label}
                        </div>
                        <div className="text-xs" style={{ color: "var(--omnix-text-3)" }}>
                          {action.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Conversations */}
              <div 
                className="p-6 rounded-xl border"
                style={{
                  background: "var(--omnix-surface)",
                  borderColor: "var(--omnix-border)",
                  animation: `omnix-slide-in 0.5s ease-out 0.3s both`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <History className="w-4 h-4 text-[#00FFFF]" />
                    Recent AI Sessions
                  </h2>
                  <button className="text-xs font-medium text-[#00FFFF] hover:text-[#00cccc] transition-colors">
                    View All →
                  </button>
                </div>

                <div className="space-y-2">
                  {recentConversations.map((chat) => (
                    <div 
                      key={chat.id}
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors border border-transparent"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--omnix-surface-hover)";
                        e.currentTarget.style.borderColor = "var(--omnix-border)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(0,255,255,0.08)] text-[#00FFFF]">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{chat.title}</div>
                          <div className="text-xs flex items-center gap-2 mt-0.5" style={{ color: "var(--omnix-text-3)" }}>
                            <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold" style={{ background: "rgba(255,255,255,0.05)" }}>
                              {chat.topic}
                            </span>
                            <span>• {chat.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-medium" style={{ color: "var(--omnix-text-3)" }}>
                        {chat.tokens} tkns
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (1/3 width on LG) */}
            <div className="space-y-6">
              
              {/* Workspace Health */}
              <div 
                className="p-6 rounded-xl border relative overflow-hidden"
                style={{
                  background: "var(--omnix-surface)",
                  borderColor: "var(--omnix-border)",
                  animation: `omnix-slide-in 0.5s ease-out 0.4s both`,
                }}
              >
                {/* Decorative gradient */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20"
                  style={{ background: "var(--omnix-green)" }}
                />

                <h2 className="text-lg font-semibold text-white mb-6 relative z-10">Workspace Health</h2>
                
                <div className="space-y-5 relative z-10">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: "var(--omnix-text-2)" }}>API Rate Limit</span>
                      <span className="text-green-400 font-medium">12%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full w-[12%]" style={{ background: "var(--omnix-green)", boxShadow: "0 0 10px var(--omnix-green)" }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: "var(--omnix-text-2)" }}>Storage Capacity</span>
                      <span className="text-amber-400 font-medium">78%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full w-[78%]" style={{ background: "#fbbf24", boxShadow: "0 0 10px #fbbf24" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: "var(--omnix-text-2)" }}>Compute Credits</span>
                      <span className="text-[#00FFFF] font-medium">45%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full w-[45%]" style={{ background: "var(--omnix-cyan)", boxShadow: "0 0 10px var(--omnix-cyan)" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Activity */}
              <div 
                className="p-6 rounded-xl border flex flex-col"
                style={{
                  background: "var(--omnix-surface)",
                  borderColor: "var(--omnix-border)",
                  animation: `omnix-slide-in 0.5s ease-out 0.5s both`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-pink-400" />
                    Team Activity
                  </h2>
                </div>

                <div className="space-y-4 flex-1">
                  {teamActivity.map((activity, i) => (
                    <div key={activity.id} className="relative flex gap-4">
                      {/* Connecting line */}
                      {i !== teamActivity.length - 1 && (
                        <div className="absolute left-4 top-10 bottom-[-16px] w-[1px]" style={{ background: "var(--omnix-border)" }} />
                      )}
                      
                      <div className="relative z-10">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 border border-white/10"
                          style={{
                            background: `linear-gradient(135deg, ${activity.roleColor}, rgba(0,0,0,0.8))`
                          }}
                        >
                          {activity.avatar}
                        </div>
                      </div>
                      
                      <div className="pb-1">
                        <div className="text-sm mb-0.5">
                          <span className="font-medium text-white">{activity.user}</span>
                          <span style={{ color: "var(--omnix-text-3)" }}> {activity.action} </span>
                          <span className="font-medium text-[#00cccc]">{activity.target}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span 
                            className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold"
                            style={{ color: activity.roleColor, background: `${activity.roleColor}15` }}
                          >
                            {activity.role}
                          </span>
                          <span style={{ color: "var(--omnix-text-3)" }}>• {activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="w-full mt-4 py-2 rounded-lg text-sm font-medium transition-all border border-transparent"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    color: "var(--omnix-text-2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--omnix-surface-hover)";
                    e.currentTarget.style.borderColor = "var(--omnix-border)";
                    e.currentTarget.style.color = "var(--omnix-text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.color = "var(--omnix-text-2)";
                  }}
                >
                  View All Activity
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
