import React from "react";
import { 
  Home, Globe, MessageSquare, Microscope, Network, Settings, 
  Workflow, PenTool, Sparkles, Bot, Hexagon, Beaker,
  Database, UserCircle, Bell, LayoutDashboard, ChevronRight,
  ShieldCheck, BrainCircuit, Activity, Layers
} from "lucide-react";
import "./_group.css";

export function Browser() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col font-tx text-[#f0f2f7]" style={{ backgroundColor: "#0a0b0f" }}>
      {/* 1. Top Navigation Bar */}
      <div className="h-20 flex flex-col border-b border-[#2a2d3e]" style={{ backgroundColor: "#12141f" }}>
        {/* Top Row */}
        <div className="h-12 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4 w-1/4">
            <div className="flex items-center gap-2 text-[#6366f1] font-bold text-xl tracking-tight">
              <Hexagon className="w-6 h-6 fill-current opacity-80" />
              <span>Tx</span>
            </div>
          </div>

          <div className="w-1/2 max-w-2xl flex justify-center">
            <div className="w-full h-8 rounded-full border border-[#2a2d3e] bg-[#0a0b0f] flex items-center px-3 gap-2 shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all">
              <ShieldCheck className="w-4 h-4 text-[#34d399]" />
              <span className="text-[#6b7280] text-sm truncate flex-1">
                <span className="text-[#6366f1]">tx://</span>research/quantum-computing
              </span>
              <Sparkles className="w-4 h-4 text-[#6366f1] opacity-70" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 w-1/4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a2d3e] bg-[#1a1d2e]">
              <div className="w-2 h-2 rounded-full bg-[#6366f1] animate-tx-pulse" />
              <span className="text-xs font-medium text-[#f0f2f7]">Gemini Ultra</span>
            </div>
            <div className="flex items-center gap-3 text-[#6b7280]">
              <LayoutDashboard className="w-4 h-4 hover:text-[#f0f2f7] cursor-pointer transition-colors" />
              <Bell className="w-4 h-4 hover:text-[#f0f2f7] cursor-pointer transition-colors" />
              <div className="w-6 h-6 rounded-full bg-[#2a2d3e] flex items-center justify-center border border-[#6366f1]/30 text-[#f0f2f7]">
                <UserCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="h-8 px-4 flex items-end gap-2 text-xs font-medium">
          <div className="h-7 px-4 rounded-t-lg bg-[#1a1d2e] border border-b-0 border-[#6366f1]/30 text-[#6366f1] flex items-center gap-2 relative">
            <Microscope className="w-3 h-3" />
            Quantum Research
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#6366f1]" />
          </div>
          <div className="h-7 px-4 rounded-t-lg bg-transparent hover:bg-[#1a1d2e]/50 border border-transparent text-[#6b7280] flex items-center gap-2 cursor-pointer transition-colors">
            <MessageSquare className="w-3 h-3" />
            Architecture Planning
          </div>
          <div className="h-7 px-4 rounded-t-lg bg-transparent hover:bg-[#1a1d2e]/50 border border-transparent text-[#6b7280] flex items-center gap-2 cursor-pointer transition-colors">
            <Database className="w-3 h-3" />
            User Data Models
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* 2. Left Sidebar */}
        <div className="w-16 border-r border-[#2a2d3e] flex flex-col items-center py-4 justify-between" style={{ backgroundColor: "#12141f" }}>
          <div className="flex flex-col gap-6">
            <div className="p-2 rounded-lg text-[#6b7280] hover:text-[#f0f2f7] hover:bg-[#1a1d2e] cursor-pointer transition-all">
              <Home className="w-5 h-5" />
            </div>
            <div className="p-2 rounded-lg text-[#6b7280] hover:text-[#f0f2f7] hover:bg-[#1a1d2e] cursor-pointer transition-all">
              <Globe className="w-5 h-5" />
            </div>
            <div className="p-2 rounded-lg text-[#6366f1] bg-[#6366f1]/10 border border-[#6366f1]/20 cursor-pointer shadow-[0_0_10px_rgba(99,102,241,0.1)] relative">
              <Microscope className="w-5 h-5" />
              <div className="absolute inset-y-0 left-0 w-[2px] bg-[#6366f1] -ml-2 rounded-r" />
            </div>
            <div className="p-2 rounded-lg text-[#6b7280] hover:text-[#f0f2f7] hover:bg-[#1a1d2e] cursor-pointer transition-all">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="p-2 rounded-lg text-[#6b7280] hover:text-[#f0f2f7] hover:bg-[#1a1d2e] cursor-pointer transition-all">
              <Network className="w-5 h-5" />
            </div>
            <div className="p-2 rounded-lg text-[#6b7280] hover:text-[#f0f2f7] hover:bg-[#1a1d2e] cursor-pointer transition-all">
              <Workflow className="w-5 h-5" />
            </div>
            <div className="p-2 rounded-lg text-[#6b7280] hover:text-[#f0f2f7] hover:bg-[#1a1d2e] cursor-pointer transition-all">
              <PenTool className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center">
            {/* AI Team indicators */}
            <div className="flex flex-col gap-3">
              <div className="w-8 h-8 rounded-full border border-[#2a2d3e] bg-[#0a0b0f] flex items-center justify-center relative">
                <Bot className="w-4 h-4 text-[#22d3ee]" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#22d3ee] rounded-full animate-tx-pulse-cyan border border-[#0a0b0f]" />
              </div>
              <div className="w-8 h-8 rounded-full border border-[#2a2d3e] bg-[#0a0b0f] flex items-center justify-center relative">
                <BrainCircuit className="w-4 h-4 text-[#6366f1]" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#6366f1] rounded-full animate-tx-pulse border border-[#0a0b0f]" />
              </div>
            </div>
            <div className="w-8 h-[1px] bg-[#2a2d3e]" />
            <div className="p-2 rounded-lg text-[#6b7280] hover:text-[#f0f2f7] hover:bg-[#1a1d2e] cursor-pointer transition-all">
              <Settings className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 3. Main Content Area */}
        <div className="flex-1 flex">
          {/* Left Column: Active Research */}
          <div className="w-[60%] flex flex-col p-6 gap-4 overflow-y-auto">
            {/* Deep Research Banner */}
            <div className="rounded-lg border border-[#6366f1]/30 bg-[#1a1d2e]/80 p-3 flex items-center justify-between backdrop-blur relative overflow-hidden">
              <div className="absolute inset-0 animate-tx-shimmer" />
              <div className="relative z-10 flex items-center gap-3">
                <Activity className="w-4 h-4 text-[#6366f1]" />
                <span className="text-sm font-medium text-[#6366f1]">Deep Research Mode</span>
                <span className="text-xs text-[#6b7280] ml-2">Analyzing 847 sources...</span>
              </div>
              <div className="relative z-10 flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full animate-tx-pulse" />
                <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full animate-tx-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full animate-tx-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>

            {/* Main Article Header */}
            <div className="py-4">
              <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#6b7280] mb-2">
                Quantum Computing Breakthroughs 2025
              </h1>
              <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                <span className="flex items-center gap-1"><UserCircle className="w-3 h-3" /> Auto-Generated Brief</span>
                <span>•</span>
                <span>Updated 2 mins ago</span>
              </div>
            </div>

            {/* Sources Cards */}
            <div className="grid grid-cols-3 gap-4 mb-2">
              {[
                { title: "Topological Qubits at Scale", source: "Nature.com", score: 98, color: "text-[#34d399]", bg: "bg-[#34d399]/10" },
                { title: "Error Correction Protocols", source: "MIT Tech Review", score: 94, color: "text-[#34d399]", bg: "bg-[#34d399]/10" },
                { title: "Neutral Atom Arrays", source: "arXiv:2501.1448", score: 87, color: "text-[#22d3ee]", bg: "bg-[#22d3ee]/10" },
              ].map((s, i) => (
                <div key={i} className="rounded-lg border border-[#2a2d3e] bg-[#12141f] p-3 flex flex-col gap-2 hover:border-[#6366f1]/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-[#6b7280] uppercase tracking-wider">{s.source}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.bg} ${s.color}`}>
                      {s.score}
                    </span>
                  </div>
                  <h3 className="text-xs font-medium text-[#f0f2f7] leading-snug group-hover:text-[#6366f1] transition-colors">{s.title}</h3>
                </div>
              ))}
            </div>

            {/* AI Synthesis Panel */}
            <div className="flex-1 rounded-lg border border-[#2a2d3e] bg-[#12141f] flex flex-col overflow-hidden">
              <div className="border-b border-[#2a2d3e] p-3 flex items-center justify-between bg-[#1a1d2e]/50">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#6366f1]" />
                  <span className="text-sm font-medium">AI Synthesis</span>
                </div>
              </div>
              <div className="p-5 text-[#f0f2f7] text-sm leading-relaxed space-y-4">
                <p>
                  Recent advancements in 2025 have shifted the quantum computing paradigm from noisy intermediate-scale quantum (NISQ) devices towards fault-tolerant architectures.
                </p>
                <p>
                  The critical breakthrough involves topological qubits demonstrating a coherence time improvement of 400x compared to last year's benchmarks. This is largely attributed to non-Abelian anyon braiding in 2D electron gases.
                </p>
                <p className="text-[#6366f1]">
                  Building executive summary
                  <span className="inline-block w-2 h-4 bg-[#6366f1] ml-1 align-middle animate-tx-blink" />
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: AI Intelligence Panel */}
          <div className="w-[40%] border-l border-[#2a2d3e] bg-[#12141f] flex flex-col">
            {/* Header */}
            <div className="h-14 border-b border-[#2a2d3e] flex items-center justify-between px-4">
              <span className="text-sm font-medium tracking-wide">Intelligence Layer</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#6366f1] animate-tx-pulse" />
                <div className="w-2 h-2 rounded-full bg-[#22d3ee] animate-tx-pulse-cyan" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              {/* Chat Thread */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2a2d3e] flex-shrink-0 flex items-center justify-center text-[10px]">US</div>
                  <div className="flex flex-col gap-1 pt-1">
                    <span className="text-xs text-[#f0f2f7]">Highlight the specific improvements in error correction.</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#6366f1]/20 flex-shrink-0 flex items-center justify-center text-[10px] text-[#6366f1] border border-[#6366f1]/30">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <span className="text-xs text-[#6b7280] font-medium">Tx Coordinator</span>
                    <p className="text-sm text-[#f0f2f7] leading-relaxed">
                      I've dispatched the Research Agent to scan recent arXiv preprints. The primary advancement is the implementation of surface codes using dynamic logical qubits.
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 rounded bg-[#1a1d2e] border border-[#2a2d3e] text-[10px] text-[#6b7280]">
                        <span className="text-[#6366f1]">Ref:</span> arXiv:2501.1448
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#2a2d3e] to-transparent" />

              {/* Active Agents */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Active Agents</span>
                
                <div className="flex items-center gap-3 p-2 rounded-lg border border-[#2a2d3e] bg-[#1a1d2e]/50">
                  <div className="w-6 h-6 rounded-full bg-[#22d3ee]/20 flex items-center justify-center border border-[#22d3ee]/30">
                    <Search className="w-3 h-3 text-[#22d3ee]" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-medium">Research Agent</span>
                    <span className="text-[10px] text-[#6b7280]">Scanning papers...</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-tx-pulse-cyan mr-2" />
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg border border-[#2a2d3e] bg-[#1a1d2e]/50">
                  <div className="w-6 h-6 rounded-full bg-[#6366f1]/20 flex items-center justify-center border border-[#6366f1]/30">
                    <PenTool className="w-3 h-3 text-[#6366f1]" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-medium">Synthesis Agent</span>
                    <span className="text-[10px] text-[#6b7280]">Building summary...</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-tx-pulse mr-2" />
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg border border-[#2a2d3e] bg-[#1a1d2e]/50 opacity-60">
                  <div className="w-6 h-6 rounded-full bg-[#34d399]/20 flex items-center justify-center border border-[#34d399]/30">
                    <ShieldCheck className="w-3 h-3 text-[#34d399]" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-xs font-medium">Fact Check Agent</span>
                    <span className="text-[10px] text-[#6b7280]">Waiting for draft</span>
                  </div>
                </div>
              </div>

              {/* Knowledge Graph Mini */}
              <div className="mt-auto h-40 rounded-lg border border-[#2a2d3e] bg-[#0a0b0f] relative overflow-hidden flex flex-col">
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[10px] font-medium text-[#6b7280] uppercase tracking-wider">Concept Graph</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-80">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    {/* Lines */}
                    <line x1="100" y1="50" x2="50" y2="30" stroke="#2a2d3e" strokeWidth="1" />
                    <line x1="100" y1="50" x2="150" y2="30" stroke="#6366f1" strokeWidth="1" className="animate-tx-line" />
                    <line x1="100" y1="50" x2="140" y2="70" stroke="#22d3ee" strokeWidth="1" className="animate-tx-line" />
                    <line x1="100" y1="50" x2="60" y2="80" stroke="#2a2d3e" strokeWidth="1" />
                    <line x1="150" y1="30" x2="170" y2="45" stroke="#2a2d3e" strokeWidth="1" />
                    <line x1="50" y1="30" x2="30" y2="50" stroke="#2a2d3e" strokeWidth="1" />
                    
                    {/* Nodes */}
                    <circle cx="100" cy="50" r="4" fill="#6366f1" />
                    <circle cx="50" cy="30" r="3" fill="#6b7280" />
                    <circle cx="150" cy="30" r="3" fill="#22d3ee" />
                    <circle cx="140" cy="70" r="3" fill="#34d399" />
                    <circle cx="60" cy="80" r="2.5" fill="#6b7280" />
                    <circle cx="170" cy="45" r="2" fill="#6b7280" />
                    <circle cx="30" cy="50" r="2" fill="#6b7280" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Status Bar */}
      <div className="h-8 border-t border-[#2a2d3e] flex items-center justify-between px-4 text-[10px] text-[#6b7280]" style={{ backgroundColor: "#0a0b0f" }}>
        <div className="flex items-center gap-4">
          <span>847 sources indexed</span>
          <span className="w-1 h-1 rounded-full bg-[#2a2d3e]" />
          <span>12 agents active</span>
          <span className="w-1 h-1 rounded-full bg-[#2a2d3e]" />
          <span>3 workflows running</span>
        </div>
        
        <div className="flex-1 flex justify-center max-w-[200px] mx-auto">
          <div className="w-full h-1 bg-[#1a1d2e] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#6366f1] to-[#22d3ee] w-[65%]" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span>Project Tx v1.0 — Intelligence OS</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-tx-pulse-emerald" />
        </div>
      </div>
    </div>
  );
}

// Minimal placeholder for the search icon missing from top imports
function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
