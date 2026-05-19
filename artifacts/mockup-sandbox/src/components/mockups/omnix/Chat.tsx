import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { Search, Pin, MessageSquare, Paperclip, Globe, Send, ChevronRight, FileText, ExternalLink, MoreVertical, Copy, Check, Hash, Sparkles } from "lucide-react";
import "./_group.css";

export function Chat() {
  const [inputText, setInputText] = useState("");
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);

  return (
    <AppLayout activePage="AI Chat" headerTitle="AI Chat" headerSubtitle="Omnix Labs workspace">
      <div className="flex h-full w-full overflow-hidden bg-[var(--omnix-bg)] text-[var(--omnix-text)]">
        
        {/* LEFT PANEL: Conversations */}
        <div className="w-[280px] shrink-0 border-r border-[var(--omnix-border)] bg-[rgba(6,8,16,0.5)] flex flex-col backdrop-blur-xl relative z-10">
          <div className="p-4 border-b border-[var(--omnix-border)]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--omnix-text-3)]" />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full bg-[var(--omnix-surface)] border border-[var(--omnix-border)] rounded-full py-2 pl-9 pr-4 text-sm text-[var(--omnix-text)] placeholder-[var(--omnix-text-3)] focus:outline-none focus:border-[var(--omnix-border-active)] transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-6">
            {/* Pinned Chats */}
            <div>
              <div className="flex items-center gap-2 px-2 mb-2 text-xs font-semibold tracking-wider text-[var(--omnix-text-3)] uppercase">
                <Pin className="w-3 h-3" />
                <span>Pinned</span>
              </div>
              <div className="space-y-1">
                <button className="w-full flex flex-col gap-1 p-3 rounded-[var(--omnix-radius-sm)] bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] text-left hover:bg-[rgba(0,255,255,0.10)] transition-all shadow-[var(--omnix-glow-sm)]">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium text-[var(--omnix-text)] truncate pr-2">Q3 Product Launch</span>
                    <span className="text-[10px] text-[var(--omnix-cyan)]">Now</span>
                  </div>
                  <span className="text-xs text-[var(--omnix-text-2)] truncate w-full">AI: Based on the competitor analysis...</span>
                </button>
                <button className="w-full flex flex-col gap-1 p-3 rounded-[var(--omnix-radius-sm)] bg-transparent border border-transparent text-left hover:bg-[var(--omnix-surface)] transition-all">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium text-[var(--omnix-text-2)] truncate pr-2">Investor Deck Prep</span>
                    <span className="text-[10px] text-[var(--omnix-text-3)]">2h</span>
                  </div>
                  <span className="text-xs text-[var(--omnix-text-3)] truncate w-full">Elena: Could we add the growth metrics?</span>
                </button>
              </div>
            </div>

            {/* Recent Chats */}
            <div>
              <div className="flex items-center gap-2 px-2 mb-2 text-xs font-semibold tracking-wider text-[var(--omnix-text-3)] uppercase">
                <MessageSquare className="w-3 h-3" />
                <span>Recent</span>
              </div>
              <div className="space-y-1">
                {[
                  { title: "Design System Updates", time: "1d", preview: "Added the new glassmorphism tokens." },
                  { title: "Q2 Post-mortem", time: "2d", preview: "The retention numbers look solid." },
                  { title: "Engineering Sync", time: "3d", preview: "AI: The API latency has decreased by 40%." },
                  { title: "Marketing Assets", time: "1w", preview: "Can we generate some banners for..." },
                  { title: "Onboarding Flow", time: "1w", preview: "I think step 3 is too complex." }
                ].map((chat, i) => (
                  <button key={i} className="w-full flex flex-col gap-1 p-3 rounded-[var(--omnix-radius-sm)] bg-transparent border border-transparent text-left hover:bg-[var(--omnix-surface)] transition-all">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-medium text-[var(--omnix-text-2)] truncate pr-2">{chat.title}</span>
                      <span className="text-[10px] text-[var(--omnix-text-3)]">{chat.time}</span>
                    </div>
                    <span className="text-xs text-[var(--omnix-text-3)] truncate w-full">{chat.preview}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CHAT AREA */}
        <div className="flex-1 flex flex-col relative z-0">
          
          {/* Top header for the current chat */}
          <div className="h-[60px] shrink-0 border-b border-[var(--omnix-border)] bg-[rgba(6,8,16,0.8)] backdrop-blur-md flex items-center justify-between px-6 z-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[rgba(0,255,255,0.10)] flex items-center justify-center text-[var(--omnix-cyan)] border border-[rgba(0,255,255,0.2)] shadow-[var(--omnix-glow-sm)]">
                <Hash className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-[var(--omnix-text)] font-semibold text-sm font-[var(--omnix-font-display)] tracking-wide">Q3 Product Launch</h2>
                <p className="text-[var(--omnix-text-3)] text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--omnix-green)] shadow-[0_0_8px_var(--omnix-green)]"></span>
                  Active collaborative session
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-[var(--omnix-bg)] bg-gradient-to-br from-[#00FFFF] to-[#0066ff] flex items-center justify-center text-[10px] font-bold text-white z-30">A</div>
                <div className="w-7 h-7 rounded-full border-2 border-[var(--omnix-bg)] bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-[10px] font-bold text-white z-20">E</div>
                <div className="w-7 h-7 rounded-full border-2 border-[var(--omnix-bg)] bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-white z-10">M</div>
              </div>
              <button className="text-[var(--omnix-text-3)] hover:text-[var(--omnix-text)] transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth pb-32">
            
            {/* System Message */}
            <div className="flex justify-center">
              <span className="text-[10px] uppercase tracking-widest text-[var(--omnix-text-3)] bg-[var(--omnix-surface)] px-3 py-1 rounded-full border border-[var(--omnix-border)]">
                Today, 10:24 AM
              </span>
            </div>

            {/* Human Message 1 */}
            <div className="flex gap-4 animate-[omnix-slide-in_0.3s_ease]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#0066ff] flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-lg shadow-indigo-500/20 mt-1">A</div>
              <div className="flex-1 max-w-3xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-[var(--omnix-text)]">Alex Chen</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20">Founder</span>
                  <span className="text-xs text-[var(--omnix-text-3)] ml-2">10:24 AM</span>
                </div>
                <div className="text-[15px] leading-relaxed text-[var(--omnix-text-2)] font-light">
                  Team, we need to finalize the market research for the Q3 product launch. @Omnix, can you pull up the latest competitor analysis focusing on the premium segment, specifically looking at pricing tiers and core features?
                </div>
              </div>
            </div>

            {/* Human Message 2 */}
            <div className="flex gap-4 animate-[omnix-slide-in_0.4s_ease]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-lg shadow-pink-500/20 mt-1">E</div>
              <div className="flex-1 max-w-3xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-[var(--omnix-text)]">Elena Rostova</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">Co-Owner</span>
                  <span className="text-xs text-[var(--omnix-text-3)] ml-2">10:26 AM</span>
                </div>
                <div className="text-[15px] leading-relaxed text-[var(--omnix-text-2)] font-light">
                  Yes, and please highlight any recent feature drops from Nexus and Zenith within the last 30 days. We need to know what we're up against.
                </div>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex gap-4 animate-[omnix-slide-in_0.5s_ease]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FFFF] to-[#0055ff] flex items-center justify-center text-white shrink-0 shadow-[var(--omnix-glow-md)] mt-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <Sparkles className="w-5 h-5 relative z-10" />
              </div>
              <div className="flex-1 max-w-4xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-[var(--omnix-cyan)] font-[var(--omnix-font-display)] tracking-wide flex items-center gap-1.5">
                    Omnix AI
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--omnix-cyan)] animate-pulse shadow-[0_0_8px_var(--omnix-cyan)]"></div>
                  </span>
                  <span className="text-xs text-[var(--omnix-text-3)] ml-2">10:26 AM</span>
                </div>
                
                {/* AI Glassmorphism Card */}
                <div className="bg-[var(--omnix-surface)] border border-[var(--omnix-border)] rounded-2xl p-5 shadow-[var(--omnix-glow-sm)] relative overflow-hidden backdrop-blur-md">
                  {/* Subtle top glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--omnix-cyan)] to-transparent opacity-50"></div>
                  
                  <div className="prose prose-invert max-w-none text-[15px] leading-relaxed font-light text-[var(--omnix-text-2)] prose-headings:text-[var(--omnix-text)] prose-headings:font-[var(--omnix-font-display)] prose-headings:font-semibold prose-a:text-[var(--omnix-cyan)] prose-strong:text-[var(--omnix-text)]">
                    <p>I've analyzed the recent market data for the premium segment, focusing on <strong>Nexus</strong> and <strong>Zenith</strong> as requested. Here is the synthesized competitive landscape for Q3.</p>
                    
                    <h3 className="text-lg mt-6 mb-3 flex items-center gap-2">
                      <div className="w-1 h-4 bg-[var(--omnix-cyan)] rounded-full"></div>
                      Pricing Tier Comparison
                    </h3>
                    
                    <div className="bg-[rgba(0,0,0,0.3)] border border-[var(--omnix-border)] rounded-xl overflow-hidden my-4">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[var(--omnix-surface)] text-[var(--omnix-text)] text-xs uppercase tracking-wider">
                          <tr>
                            <th className="px-4 py-3 font-medium">Competitor</th>
                            <th className="px-4 py-3 font-medium">Premium Tier</th>
                            <th className="px-4 py-3 font-medium">Enterprise Tier</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--omnix-border)] text-[var(--omnix-text-2)]">
                          <tr>
                            <td className="px-4 py-3 font-medium text-[var(--omnix-text)]">Nexus</td>
                            <td className="px-4 py-3">$49/mo (Billed Annually)</td>
                            <td className="px-4 py-3">Custom / Starting at $199/mo</td>
                          </tr>
                          <tr className="bg-[rgba(255,255,255,0.02)]">
                            <td className="px-4 py-3 font-medium text-[var(--omnix-text)]">Zenith</td>
                            <td className="px-4 py-3">$59/mo (Includes AI credits)</td>
                            <td className="px-4 py-3">$249/mo (Dedicated Support)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-[var(--omnix-cyan)]">Our Q3 Target</td>
                            <td className="px-4 py-3 text-[var(--omnix-text)]">$45/mo</td>
                            <td className="px-4 py-3 text-[var(--omnix-text)]">$150/mo</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-lg mt-6 mb-3 flex items-center gap-2">
                      <div className="w-1 h-4 bg-[var(--omnix-pink)] rounded-full"></div>
                      Recent Feature Drops (Last 30 Days)
                    </h3>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex gap-3">
                        <span className="text-[var(--omnix-pink)] mt-1">✦</span>
                        <div>
                          <strong className="text-[var(--omnix-text)]">Nexus:</strong> Released "Automated Workflows V2" which introduces visual node-based editing. <em className="text-[var(--omnix-text-3)] text-sm">(High adoption rate reported)</em>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[var(--omnix-pink)] mt-1">✦</span>
                        <div>
                          <strong className="text-[var(--omnix-text)]">Zenith:</strong> Integrated deep analytics dashboard with custom report generation. They are heavily marketing this to enterprise clients.
                        </div>
                      </li>
                    </ul>

                    <div className="bg-[#0a0e17] rounded-xl p-4 border border-[var(--omnix-border)] font-mono text-sm relative group">
                      <button className="absolute top-3 right-3 text-[var(--omnix-text-3)] hover:text-[var(--omnix-text)] opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="w-4 h-4" />
                      </button>
                      <div className="text-[var(--omnix-text-3)] mb-2 text-xs">// Suggested positioning statement</div>
                      <div className="text-[#0088ff]">const</div> <div className="text-[#3b82f6] inline">positioning</div> <div className="text-[#e2e8f0] inline">=</div> <div className="text-[#22c55e] inline">"Enterprise-grade capabilities without the enterprise overhead. Visual workspaces built for modern speed."</div><div className="text-[#e2e8f0] inline">;</div>
                    </div>
                  </div>

                  {/* Sources Citation Pills */}
                  <div className="mt-5 pt-4 border-t border-[var(--omnix-border)] flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-[var(--omnix-text-3)] flex items-center h-6 mr-1">Sources:</span>
                    <button className="h-6 px-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[11px] text-[var(--omnix-text-2)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--omnix-text)] transition-colors flex items-center gap-1.5 group">
                      <FileText className="w-3 h-3 text-[var(--omnix-blue)]" />
                      Nexus_Q2_Report.pdf
                      <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button className="h-6 px-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[11px] text-[var(--omnix-text-2)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--omnix-text)] transition-colors flex items-center gap-1.5 group">
                      <Globe className="w-3 h-3 text-[var(--omnix-green)]" />
                      Zenith Press Release
                      <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <button className="h-6 px-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[11px] text-[var(--omnix-text-2)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--omnix-text)] transition-colors flex items-center gap-1.5 group">
                      <FileText className="w-3 h-3 text-[var(--omnix-pink)]" />
                      Internal_Pricing_Draft.md
                      <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Human Message 3 */}
            <div className="flex gap-4 animate-[omnix-slide-in_0.6s_ease]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-lg shadow-blue-500/20 mt-1">M</div>
              <div className="flex-1 max-w-3xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-[var(--omnix-text)]">Marcus Doe</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">Member</span>
                  <span className="text-xs text-[var(--omnix-text-3)] ml-2">10:28 AM</span>
                </div>
                <div className="text-[15px] leading-relaxed text-[var(--omnix-text-2)] font-light">
                  That positioning statement is actually really strong. Can we generate a quick mockup for the pricing page using that as the H1?
                </div>
              </div>
            </div>

            {/* AI Streaming Indicator */}
            <div className="flex gap-4 animate-[omnix-slide-in_0.7s_ease]">
              <div className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[var(--omnix-text-3)] shrink-0 mt-1">
                <Sparkles className="w-5 h-5 opacity-50" />
              </div>
              <div className="flex-1 max-w-4xl pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--omnix-cyan)] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-[var(--omnix-cyan)] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-[var(--omnix-cyan)] animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  <span className="text-xs text-[var(--omnix-text-3)] ml-2 font-medium">Generating interface mockup...</span>
                </div>
              </div>
            </div>

          </div>

          {/* INPUT AREA */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--omnix-bg)] via-[var(--omnix-bg)] to-transparent pt-12 z-30">
            <div className="max-w-4xl mx-auto relative">
              
              {/* Floating Action Bar (above input) */}
              <div className="absolute -top-10 left-0 flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--omnix-surface)] border border-[var(--omnix-border)] text-xs text-[var(--omnix-text-2)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--omnix-text)] transition-colors backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--omnix-cyan)]" />
                  Suggest ideas
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--omnix-surface)] border border-[var(--omnix-border)] text-xs text-[var(--omnix-text-2)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--omnix-text)] transition-colors backdrop-blur-md">
                  <FileText className="w-3.5 h-3.5 text-[var(--omnix-cyan)]" />
                  Summarize
                </button>
              </div>

              {/* Input Box */}
              <div className="bg-[rgba(10,14,26,0.8)] border border-[var(--omnix-border)] rounded-2xl shadow-2xl backdrop-blur-xl transition-all focus-within:border-[rgba(99,102,241,0.5)] focus-within:shadow-[var(--omnix-glow-md)] overflow-hidden">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message or type '/' for commands..."
                  className="w-full bg-transparent border-none resize-none p-4 min-h-[60px] max-h-[200px] text-[15px] text-[var(--omnix-text)] placeholder-[var(--omnix-text-3)] focus:outline-none focus:ring-0 leading-relaxed"
                  rows={2}
                />
                
                <div className="px-4 py-3 border-t border-[var(--omnix-border)] flex items-center justify-between bg-[rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg text-[var(--omnix-text-3)] hover:text-[var(--omnix-text)] hover:bg-[var(--omnix-surface)] transition-colors group relative">
                      <Paperclip className="w-4 h-4" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--omnix-bg-3)] border border-[var(--omnix-border)] text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Attach file</span>
                    </button>
                    
                    <div className="w-px h-4 bg-[var(--omnix-border)] mx-1"></div>
                    
                    <button 
                      onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        webSearchEnabled 
                          ? "bg-[rgba(34,197,94,0.1)] text-[var(--omnix-green)] border border-[rgba(34,197,94,0.2)]" 
                          : "text-[var(--omnix-text-3)] hover:text-[var(--omnix-text)] hover:bg-[var(--omnix-surface)] border border-transparent"
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Web Search
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--omnix-text-3)] hidden sm:block">Return to send</span>
                    <button className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                      inputText.trim() 
                        ? "bg-[var(--omnix-grad-primary)] text-white shadow-[var(--omnix-glow-sm)] hover:shadow-[var(--omnix-glow-md)] hover:-translate-y-0.5" 
                        : "bg-[var(--omnix-surface)] text-[var(--omnix-text-3)] cursor-not-allowed"
                    }`}>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Sources / Context */}
        <div className="w-[300px] shrink-0 border-l border-[var(--omnix-border)] bg-[rgba(6,8,16,0.5)] flex flex-col backdrop-blur-xl relative z-10 hidden lg:flex">
          <div className="h-[60px] flex items-center px-5 border-b border-[var(--omnix-border)]">
            <h3 className="text-sm font-semibold text-[var(--omnix-text)] tracking-wide uppercase">Context & Sources</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* Referenced Files */}
            <div>
              <h4 className="text-xs font-medium text-[var(--omnix-text-3)] uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Referenced Documents
              </h4>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[var(--omnix-surface)] border border-[var(--omnix-border)] group hover:border-[rgba(0,255,255,0.2)] transition-colors cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--omnix-blue)]"></div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-[var(--omnix-text)] mb-0.5 truncate pr-4">Nexus_Q2_Report.pdf</p>
                      <p className="text-[10px] text-[var(--omnix-text-3)]">Uploaded 2 days ago</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--omnix-text-3)] group-hover:text-[var(--omnix-text)]" />
                  </div>
                </div>
                
                <div className="p-3 rounded-xl bg-[var(--omnix-surface)] border border-[var(--omnix-border)] group hover:border-[rgba(0,255,255,0.2)] transition-colors cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--omnix-pink)]"></div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-[var(--omnix-text)] mb-0.5 truncate pr-4">Internal_Pricing_Draft.md</p>
                      <p className="text-[10px] text-[var(--omnix-text-3)]">Modified today</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--omnix-text-3)] group-hover:text-[var(--omnix-text)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Web Links */}
            <div>
              <h4 className="text-xs font-medium text-[var(--omnix-text-3)] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                Web Sources
              </h4>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[var(--omnix-surface)] border border-[var(--omnix-border)] group hover:border-[rgba(0,255,255,0.2)] transition-colors cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--omnix-green)]"></div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-[var(--omnix-text)] mb-0.5 pr-2 leading-tight">Zenith announces new enterprise features</p>
                      <p className="text-[10px] text-[var(--omnix-text-3)] truncate w-48">techcrunch.com/zenith-enterprise</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Context */}
            <div className="p-4 rounded-xl bg-[rgba(99,102,241,0.05)] border border-[rgba(0,255,255,0.10)]">
              <h4 className="text-xs font-semibold text-[var(--omnix-cyan)] mb-2 flex items-center gap-2">
                <Hash className="w-3.5 h-3.5" />
                Workspace Metadata
              </h4>
              <ul className="space-y-1.5 text-xs text-[var(--omnix-text-2)]">
                <li className="flex justify-between">
                  <span className="text-[var(--omnix-text-3)]">Timeline:</span>
                  <span>Q3 (Sept 1)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[var(--omnix-text-3)]">Priority:</span>
                  <span className="text-[var(--omnix-pink)]">High</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[var(--omnix-text-3)]">Team:</span>
                  <span>Marketing, Product</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </AppLayout>
  );
}
