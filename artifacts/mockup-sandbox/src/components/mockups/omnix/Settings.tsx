import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import "./_group.css";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SETTINGS_SECTIONS = [
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "account", label: "Account", icon: "⚙️" },
  { id: "workspace", label: "Workspace", icon: "🏢" },
  { id: "ai", label: "AI Settings", icon: "✨" },
  { id: "appearance", label: "Appearance", icon: "🎨" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "team", label: "Team Management", icon: "👥" },
  { id: "billing", label: "Billing & Plans", icon: "💳" },
];

const AI_MODELS = [
  { id: "gpt4o", name: "GPT-4o", provider: "OpenAI", badge: "Recommended" },
  { id: "claude35", name: "Claude 3.5", provider: "Anthropic", badge: "Fast" },
  { id: "gemini", name: "Gemini Pro", provider: "Google", badge: "" },
];

const AI_MODES = [
  { id: "deep", name: "Deep Think", desc: "Complex reasoning, slower", icon: "🧠" },
  { id: "fast", name: "Fast", desc: "Quick responses, standard logic", icon: "⚡" },
  { id: "balanced", name: "Balanced", desc: "Optimal speed/quality ratio", icon: "⚖️" },
];

export function Settings() {
  const [activeSection, setActiveSection] = useState("ai");
  const [aiModel, setAiModel] = useState("gpt4o");
  const [aiMode, setAiMode] = useState("balanced");
  const [webSearch, setWebSearch] = useState(true);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [temperature, setTemperature] = useState([0.7]);
  
  return (
    <AppLayout activePage="Settings" headerTitle="Settings" headerSubtitle="Account & Preferences">
      <div className="flex h-full w-full overflow-hidden text-[var(--omnix-text)]" style={{ fontFamily: 'var(--omnix-font)' }}>
        
        {/* Left Nav */}
        <div className="w-[240px] flex-shrink-0 border-r border-[var(--omnix-border)] bg-[rgba(6,8,16,0.5)] p-4 overflow-y-auto hidden md:block">
          <div className="text-[10px] font-semibold tracking-wider text-[var(--omnix-text-3)] uppercase mb-3 px-2">
            Settings Menu
          </div>
          <div className="space-y-1">
            {SETTINGS_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-[var(--omnix-radius-sm)] text-sm transition-all text-left relative"
                style={{
                  background: activeSection === section.id ? 'var(--omnix-surface-hover)' : 'transparent',
                  color: activeSection === section.id ? 'var(--omnix-text)' : 'var(--omnix-text-2)',
                  fontWeight: activeSection === section.id ? 500 : 400,
                  boxShadow: activeSection === section.id ? 'var(--omnix-glow-sm)' : 'none',
                }}
              >
                {activeSection === section.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-2/3 rounded-full bg-[var(--omnix-purple)] shadow-[var(--omnix-glow-sm)]" />
                )}
                <span className="text-[15px] opacity-80">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <div className="max-w-4xl mx-auto space-y-12 pb-20">
            
            {/* AI Settings Section */}
            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-bold font-[var(--omnix-font-display)] mb-1">AI Settings</h2>
                <p className="text-[var(--omnix-text-3)] text-sm">Configure how the Omnix AI assistant behaves and interacts with your workspace.</p>
              </div>

              {/* Models */}
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-widest text-[var(--omnix-text-3)] font-semibold">AI Model</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {AI_MODELS.map(model => (
                    <button
                      key={model.id}
                      onClick={() => setAiModel(model.id)}
                      className="p-4 rounded-[var(--omnix-radius)] text-left transition-all relative overflow-hidden group"
                      style={{
                        background: aiModel === model.id ? 'var(--omnix-surface-hover)' : 'var(--omnix-surface)',
                        border: `1px solid ${aiModel === model.id ? 'var(--omnix-border-active)' : 'var(--omnix-border)'}`,
                        boxShadow: aiModel === model.id ? 'var(--omnix-glow-sm)' : 'none',
                      }}
                    >
                      {aiModel === model.id && (
                        <div className="absolute inset-0 bg-[var(--omnix-grad-glow)] opacity-50 pointer-events-none" />
                      )}
                      <div className="relative z-10 flex justify-between items-start mb-2">
                        <div className="font-[var(--omnix-font-display)] font-semibold text-base">{model.name}</div>
                        {model.badge && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[rgba(99,102,241,0.15)] text-[var(--omnix-purple-bright)] border border-[rgba(99,102,241,0.3)]">
                            {model.badge}
                          </span>
                        )}
                      </div>
                      <div className="relative z-10 text-[var(--omnix-text-3)] text-xs">{model.provider}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Default AI Mode */}
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-widest text-[var(--omnix-text-3)] font-semibold">Default Mode</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {AI_MODES.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setAiMode(mode.id)}
                      className="p-4 rounded-[var(--omnix-radius)] text-left transition-all border group"
                      style={{
                        background: aiMode === mode.id ? 'var(--omnix-surface-hover)' : 'transparent',
                        borderColor: aiMode === mode.id ? 'var(--omnix-purple)' : 'var(--omnix-border)',
                        boxShadow: aiMode === mode.id ? 'var(--omnix-glow-sm)' : 'none',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-1.5">
                        <div className="text-xl" style={{ filter: aiMode === mode.id ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none' }}>
                          {mode.icon}
                        </div>
                        <div className="font-medium text-sm text-[var(--omnix-text)]">{mode.name}</div>
                      </div>
                      <div className="text-[var(--omnix-text-3)] text-xs leading-relaxed">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles & Sliders Card */}
              <div className="rounded-[var(--omnix-radius-lg)] border border-[var(--omnix-border)] bg-[var(--omnix-surface)] overflow-hidden">
                
                {/* Web Search */}
                <div className="p-5 border-b border-[var(--omnix-border)] flex items-center justify-between gap-6 hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <div>
                    <div className="font-medium text-sm mb-1 text-[var(--omnix-text)]">Web Search Enabled</div>
                    <div className="text-[var(--omnix-text-3)] text-xs">Allow the AI to search the internet for up-to-date information during chats.</div>
                  </div>
                  <Switch 
                    checked={webSearch} 
                    onCheckedChange={setWebSearch} 
                    className="data-[state=checked]:bg-[var(--omnix-purple)] shadow-[var(--omnix-glow-sm)]" 
                  />
                </div>

                {/* Memory */}
                <div className="p-5 border-b border-[var(--omnix-border)] flex items-center justify-between gap-6 hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <div>
                    <div className="font-medium text-sm mb-1 text-[var(--omnix-text)]">Context Memory</div>
                    <div className="text-[var(--omnix-text-3)] text-xs">Remember details from past conversations across workspaces.</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="h-8 text-xs border-[var(--omnix-border)] bg-transparent hover:bg-[var(--omnix-surface-hover)] text-[var(--omnix-text-2)] hover:text-[var(--omnix-text)] rounded-[var(--omnix-radius-sm)]">
                      Clear Memory
                    </Button>
                    <Switch 
                      checked={memoryEnabled} 
                      onCheckedChange={setMemoryEnabled} 
                      className="data-[state=checked]:bg-[var(--omnix-purple)] shadow-[var(--omnix-glow-sm)]" 
                    />
                  </div>
                </div>

                {/* Temperature */}
                <div className="p-5 border-b border-[var(--omnix-border)] hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium text-sm mb-1 text-[var(--omnix-text)]">Creativity / Temperature</div>
                      <div className="text-[var(--omnix-text-3)] text-xs">Higher values make output more random, lower makes it more focused.</div>
                    </div>
                    <div className="text-xs font-mono bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded text-[var(--omnix-purple-bright)] border border-[var(--omnix-border)]">
                      {temperature[0].toFixed(2)}
                    </div>
                  </div>
                  <div className="px-1">
                    <Slider 
                      value={temperature} 
                      onValueChange={setTemperature} 
                      max={2} 
                      step={0.1}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[var(--omnix-text-3)] mt-2 uppercase tracking-wide">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>

                {/* Tokens */}
                <div className="p-5 hover:bg-[rgba(255,255,255,0.01)] transition-colors flex items-center justify-between gap-6">
                  <div>
                    <div className="font-medium text-sm mb-1 text-[var(--omnix-text)]">Max Response Tokens</div>
                    <div className="text-[var(--omnix-text-3)] text-xs">Limit the maximum length of AI responses.</div>
                  </div>
                  <Input 
                    type="number" 
                    defaultValue="4096"
                    className="w-24 h-8 bg-[rgba(0,0,0,0.3)] border-[var(--omnix-border)] text-sm font-mono text-center focus-visible:ring-[var(--omnix-purple)] focus-visible:border-[var(--omnix-purple)] rounded-[var(--omnix-radius-sm)]" 
                  />
                </div>
              </div>

              {/* Custom Instructions */}
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-widest text-[var(--omnix-text-3)] font-semibold">Custom Instructions</Label>
                <Textarea 
                  placeholder="E.g., Always reply in markdown. Never use emojis. Assume I am a senior engineer..."
                  className="min-h-[120px] bg-[var(--omnix-surface)] border-[var(--omnix-border)] focus-visible:ring-1 focus-visible:ring-[var(--omnix-purple)] focus-visible:border-[var(--omnix-purple)] rounded-[var(--omnix-radius)] resize-none text-sm placeholder:text-[var(--omnix-text-3)] shadow-inner"
                />
              </div>

            </section>


            {/* Profile Peek Section */}
            <div className="mt-16 pt-16 border-t border-[var(--omnix-border)] opacity-60 hover:opacity-100 transition-opacity duration-300">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-[var(--omnix-font-display)] text-[var(--omnix-text-2)] mb-1">Profile</h3>
                  <p className="text-[var(--omnix-text-3)] text-xs">Personal details and public presence.</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-[var(--omnix-surface)] border border-[var(--omnix-border)] text-[var(--omnix-text-2)] hover:text-white hover:border-[var(--omnix-border-active)] rounded-[var(--omnix-radius-sm)] transition-all"
                >
                  View Full Profile
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-[var(--omnix-border)] group-hover:border-[var(--omnix-purple-bright)] flex items-center justify-center bg-[rgba(0,0,0,0.2)] relative z-10 transition-colors">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-[var(--omnix-grad-primary)]">A</span>
                  </div>
                  <div className="absolute inset-0 bg-[var(--omnix-purple)] rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity z-0" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[var(--omnix-surface)] border border-[var(--omnix-border)] text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider text-[var(--omnix-text-2)] group-hover:text-white group-hover:border-[var(--omnix-purple)] transition-colors shadow-lg z-20 whitespace-nowrap">
                    Upload
                  </div>
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-[var(--omnix-text-3)]">Display Name</Label>
                      <Input defaultValue="Alex Chen" className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] rounded-[var(--omnix-radius-sm)] h-9 focus-visible:ring-1 focus-visible:ring-[var(--omnix-purple)] focus-visible:border-[var(--omnix-purple)] text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-[var(--omnix-text-3)]">Email</Label>
                      <Input defaultValue="alex@omnix.ai" readOnly className="bg-[rgba(0,0,0,0.2)] border-[var(--omnix-border)] rounded-[var(--omnix-radius-sm)] h-9 text-[var(--omnix-text-3)] text-sm cursor-not-allowed" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label className="text-xs text-[var(--omnix-text-3)]">Role / Title</Label>
                      <Input defaultValue="Senior AI Researcher" className="bg-[var(--omnix-surface)] border-[var(--omnix-border)] rounded-[var(--omnix-radius-sm)] h-9 focus-visible:ring-1 focus-visible:ring-[var(--omnix-purple)] focus-visible:border-[var(--omnix-purple)] text-sm" />
                    </div>
                  </div>
                  
                  <div className="pt-2 flex justify-end">
                    <Button className="bg-[var(--omnix-grad-primary)] text-white border-none shadow-[var(--omnix-glow-sm)] hover:shadow-[var(--omnix-glow-md)] hover:-translate-y-[1px] transition-all rounded-[var(--omnix-radius-sm)] h-9 px-6 font-medium text-sm">
                      Save Changes
                    </Button>
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
