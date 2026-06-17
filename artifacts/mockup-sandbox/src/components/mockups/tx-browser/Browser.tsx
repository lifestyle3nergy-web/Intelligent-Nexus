import React from "react";
import {
  Home, Globe, MessageSquare, Microscope, Network, Settings,
  Workflow, PenTool, Sparkles, Bot, Hexagon, Search,
  UserCircle, Bell, LayoutDashboard, ShieldCheck,
  BrainCircuit, Activity, Layers, BookOpen, Cpu,
  CheckCircle2, Clock, ChevronRight, X, Plus,
  FileText, Zap, BarChart3
} from "lucide-react";
import "./_group.css";

/* ─── Stone palette tokens ─────────────────────────────────────────── */
const C = {
  bg:           "#100e0c",
  bgPanel:      "#191612",
  bgRaised:     "#211d19",
  bgHover:      "#2a2520",
  border:       "#302b25",
  borderLight:  "#3d3730",
  stone:        "#c4a882",      // sandstone — primary accent
  terra:        "#c4714a",      // terracotta — secondary accent
  sage:         "#7fa882",      // sage green — success / active
  ochre:        "#c49a3c",      // warm ochre — warning / highlight
  textPrimary:  "#ede6db",      // warm cream
  textSecondary:"#8a7e72",      // muted stone
  textDim:      "#5c534a",      // very muted
};

/* ─── Sidebar nav items ─────────────────────────────────────────────── */
const NAV = [
  { icon: Home,         label: "Home" },
  { icon: Globe,        label: "Browser" },
  { icon: Microscope,   label: "Research Hub",  active: true },
  { icon: MessageSquare,label: "AI Chat" },
  { icon: Network,      label: "Knowledge" },
  { icon: Workflow,     label: "Automation" },
  { icon: PenTool,      label: "Creator" },
  { icon: BarChart3,    label: "Analytics" },
];

const AGENTS = [
  { icon: Search,      label: "Research",  color: C.stone,  anim: "animate-tx-pulse",       status: "Scanning papers" },
  { icon: Layers,      label: "Synthesis", color: C.terra,  anim: "animate-tx-pulse-terra", status: "Building summary" },
  { icon: ShieldCheck, label: "Fact Check",color: C.sage,   anim: "",                       status: "Waiting for draft", dim: true },
];

const SOURCES = [
  { title: "Topological Qubits at Scale",     source: "Nature.com",          score: 98, scoreColor: C.sage,  scoreBg: "rgba(127,168,130,0.12)" },
  { title: "Surface Code Error Correction",   source: "MIT Technology Review",score: 94, scoreColor: C.sage,  scoreBg: "rgba(127,168,130,0.12)" },
  { title: "Neutral Atom Arrays — New Data",  source: "arXiv 2501.1448",     score: 87, scoreColor: C.ochre, scoreBg: "rgba(196,154,60,0.12)"  },
];

/* ─── Micro components ──────────────────────────────────────────────── */
function Tab({ label, icon: Icon, active }: { label: string; icon: any; active?: boolean }) {
  return (
    <div
      className="h-7 px-3 rounded-t-md flex items-center gap-2 text-[11px] font-medium relative cursor-pointer select-none transition-colors"
      style={{
        backgroundColor: active ? C.bgRaised : "transparent",
        color: active ? C.textPrimary : C.textSecondary,
        borderTop:    active ? `1px solid ${C.borderLight}` : "1px solid transparent",
        borderLeft:   active ? `1px solid ${C.borderLight}` : "1px solid transparent",
        borderRight:  active ? `1px solid ${C.borderLight}` : "1px solid transparent",
        borderBottom: active ? `1px solid ${C.bgRaised}` : "1px solid transparent",
      }}
    >
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span>{label}</span>
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t"
          style={{ backgroundColor: C.stone }} />
      )}
      {!active && <X className="w-2.5 h-2.5 ml-1 opacity-0 group-hover:opacity-100" />}
    </div>
  );
}

function SourceCard({ title, source, score, scoreColor, scoreBg }: typeof SOURCES[0]) {
  return (
    <div
      className="rounded-lg p-3 flex flex-col gap-2 cursor-pointer transition-all"
      style={{
        backgroundColor: C.bgRaised,
        border: `1px solid ${C.border}`,
      }}
    >
      <div className="flex justify-between items-start gap-2">
        <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: C.textDim }}>
          {source}
        </span>
        <span
          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
          style={{ color: scoreColor, backgroundColor: scoreBg }}
        >
          {score}
        </span>
      </div>
      <p className="text-[11px] font-medium leading-snug" style={{ color: C.textPrimary }}>
        {title}
      </p>
      <div className="flex items-center gap-1" style={{ color: C.textDim }}>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[9px]">Open source</span>
      </div>
    </div>
  );
}

function AgentRow({ icon: Icon, label, color, anim, status, dim }: typeof AGENTS[0] & { dim?: boolean }) {
  return (
    <div
      className="flex items-center gap-3 p-2.5 rounded-lg transition-all"
      style={{
        backgroundColor: C.bgRaised,
        border: `1px solid ${C.border}`,
        opacity: dim ? 0.5 : 1,
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}18`, border: `1px solid ${color}35` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[11px] font-semibold" style={{ color: C.textPrimary }}>{label} Agent</span>
        <span className="text-[10px] truncate" style={{ color: C.textSecondary }}>{status}</span>
      </div>
      {!dim && (
        <div
          className={`w-2 h-2 rounded-full flex-shrink-0 ${anim}`}
          style={{ backgroundColor: color }}
        />
      )}
      {dim && <Clock className="w-3 h-3 flex-shrink-0" style={{ color: C.textDim }} />}
    </div>
  );
}

/* ─── Knowledge graph ───────────────────────────────────────────────── */
const NODES = [
  { x: 100, y: 56,  r: 5, color: C.stone,  label: "Quantum" },
  { x: 50,  y: 30,  r: 3, color: C.textSecondary, label: "Coherence" },
  { x: 155, y: 28,  r: 3, color: C.terra,  label: "Error Corr." },
  { x: 148, y: 76,  r: 3, color: C.sage,   label: "Topological" },
  { x: 58,  y: 82,  r: 2, color: C.textDim, label: "NISQ" },
  { x: 176, y: 50,  r: 2, color: C.textDim, label: "Anyon" },
  { x: 26,  y: 56,  r: 2, color: C.textDim, label: "Fidelity" },
  { x: 108, y: 96,  r: 2, color: C.ochre,  label: "Atom Array" },
];
const EDGES = [
  { x1: 100, y1: 56, x2: 50,  y2: 30,  color: C.border,         anim: "" },
  { x1: 100, y1: 56, x2: 155, y2: 28,  color: C.stone,          anim: "animate-tx-line" },
  { x1: 100, y1: 56, x2: 148, y2: 76,  color: C.terra,          anim: "animate-tx-line" },
  { x1: 100, y1: 56, x2: 58,  y2: 82,  color: C.border,         anim: "" },
  { x1: 155, y1: 28, x2: 176, y2: 50,  color: C.border,         anim: "" },
  { x1: 50,  y1: 30, x2: 26,  y2: 56,  color: C.border,         anim: "" },
  { x1: 148, y1: 76, x2: 108, y2: 96,  color: C.ochre,          anim: "animate-tx-line-slow" },
];

/* ─── Main component ────────────────────────────────────────────────── */
export function Browser() {
  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col font-tx"
      style={{ backgroundColor: C.bg, color: C.textPrimary }}
    >
      {/* ── 1. Top Navigation Bar ── */}
      <div
        className="flex-shrink-0 flex flex-col"
        style={{ backgroundColor: C.bgPanel, borderBottom: `1px solid ${C.border}` }}
      >
        {/* Top row */}
        <div className="h-12 flex items-center px-4 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 w-14">
            <Hexagon className="w-5 h-5" style={{ color: C.stone, fill: `${C.stone}22` }} />
            <span className="font-bold text-lg tracking-tight" style={{ color: C.stone }}>Tx</span>
          </div>

          {/* Omnibox */}
          <div className="flex-1 flex justify-center">
            <div
              className="w-full max-w-xl h-8 rounded-full flex items-center px-3 gap-2 transition-all"
              style={{
                backgroundColor: C.bgRaised,
                border: `1px solid ${C.borderLight}`,
                boxShadow: `0 0 0 0 ${C.stone}`,
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.sage }} />
              <span className="text-[12px] flex-1 truncate" style={{ color: C.textSecondary }}>
                <span style={{ color: C.stone }}>tx://</span>research/quantum-computing
              </span>
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.stone, opacity: 0.6 }} />
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 flex-shrink-0 w-auto">
            {/* Model chip */}
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{
                backgroundColor: C.bgRaised,
                border: `1px solid ${C.borderLight}`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-tx-pulse" style={{ backgroundColor: C.stone }} />
              <span className="text-[11px] font-medium" style={{ color: C.textPrimary }}>Gemini Ultra</span>
              <Cpu className="w-3 h-3" style={{ color: C.textDim }} />
            </div>
            {/* Icons */}
            <LayoutDashboard className="w-4 h-4 cursor-pointer transition-colors" style={{ color: C.textSecondary }} />
            <Bell className="w-4 h-4 cursor-pointer transition-colors" style={{ color: C.textSecondary }} />
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: C.bgRaised,
                border: `1px solid ${C.stone}55`,
              }}
            >
              <UserCircle className="w-5 h-5" style={{ color: C.textSecondary }} />
            </div>
          </div>
        </div>

        {/* Tab row */}
        <div
          className="flex items-end gap-0.5 px-4"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <Tab label="Quantum Research"     icon={Microscope}    active />
          <Tab label="Architecture Planning" icon={MessageSquare} />
          <Tab label="Market Intelligence"   icon={BarChart3} />
          <Tab label="User Data Models"      icon={FileText} />
          <div
            className="mb-0.5 ml-2 p-1 rounded cursor-pointer"
            style={{ color: C.textDim }}
          >
            <Plus className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* ── 2. Body ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Sidebar */}
        <div
          className="w-14 flex-shrink-0 flex flex-col items-center py-3 gap-0 justify-between"
          style={{ backgroundColor: C.bgPanel, borderRight: `1px solid ${C.border}` }}
        >
          <div className="flex flex-col gap-1 w-full px-2">
            {NAV.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                title={label}
                className="relative w-full flex items-center justify-center p-2 rounded-lg cursor-pointer transition-all"
                style={{
                  backgroundColor: active ? `${C.stone}18` : "transparent",
                  color: active ? C.stone : C.textDim,
                }}
              >
                <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                {active && (
                  <div
                    className="absolute left-0 inset-y-1 w-0.5 rounded-r-full"
                    style={{ backgroundColor: C.stone }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* AI Team at bottom */}
          <div className="flex flex-col items-center gap-2 px-2 pb-1">
            <div className="w-full h-px" style={{ backgroundColor: C.border }} />
            <div className="flex flex-col gap-2 pt-1">
              {[
                { icon: Bot,         color: C.stone, anim: "animate-tx-pulse",       title: "Research Agent" },
                { icon: BrainCircuit,color: C.terra, anim: "animate-tx-pulse-terra", title: "Synthesis Agent" },
                { icon: Zap,         color: C.ochre, anim: "animate-tx-pulse-ochre", title: "Engineer Agent" },
              ].map(({ icon: Icon, color, anim, title }) => (
                <div
                  key={title}
                  title={title}
                  className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                  style={{
                    backgroundColor: C.bgRaised,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                  <div
                    className={`absolute top-0 right-0 w-2 h-2 rounded-full ${anim}`}
                    style={{
                      backgroundColor: color,
                      border: `1.5px solid ${C.bgPanel}`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="w-full h-px mt-1" style={{ backgroundColor: C.border }} />
            <div
              title="Settings"
              className="p-2 rounded-lg cursor-pointer w-full flex justify-center"
              style={{ color: C.textDim }}
            >
              <Settings className="w-[18px] h-[18px]" />
            </div>
          </div>
        </div>

        {/* ── 3. Main Content ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* Left 60% — Research Session */}
          <div
            className="flex flex-col overflow-y-auto"
            style={{ width: "60%", padding: "20px 24px", gap: "16px", display: "flex", flexDirection: "column" }}
          >
            {/* Deep Research Banner */}
            <div
              className="rounded-xl flex items-center justify-between px-4 py-2.5 relative overflow-hidden flex-shrink-0"
              style={{
                backgroundColor: `${C.stone}0d`,
                border: `1px solid ${C.stone}40`,
              }}
            >
              <div className="absolute inset-0 animate-tx-shimmer pointer-events-none" />
              <div className="relative flex items-center gap-3">
                <Activity className="w-4 h-4" style={{ color: C.stone }} />
                <span className="text-[12px] font-semibold" style={{ color: C.stone }}>Deep Research Mode</span>
                <span className="text-[11px]" style={{ color: C.textSecondary }}>Analyzing 847 sources…</span>
              </div>
              <div className="relative flex items-center gap-1.5">
                {[0, 0.25, 0.5].map(delay => (
                  <div
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full animate-tx-pulse"
                    style={{ backgroundColor: C.stone, animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Article header */}
            <div className="flex-shrink-0" style={{ paddingBottom: "4px" }}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${C.ochre}18`, color: C.ochre, border: `1px solid ${C.ochre}40` }}
                >
                  Auto-Brief
                </span>
                <span className="text-[10px]" style={{ color: C.textDim }}>Updated 2 mins ago</span>
              </div>
              <h1
                className="text-3xl font-bold tracking-tight leading-tight mb-1"
                style={{
                  color: C.textPrimary,
                  backgroundImage: `linear-gradient(135deg, ${C.textPrimary} 60%, ${C.textSecondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Quantum Computing<br />Breakthroughs 2025
              </h1>
            </div>

            {/* Source cards */}
            <div className="grid grid-cols-3 gap-3 flex-shrink-0">
              {SOURCES.map((s, i) => <SourceCard key={i} {...s} />)}
            </div>

            {/* AI Synthesis panel */}
            <div
              className="flex-1 rounded-xl flex flex-col overflow-hidden"
              style={{
                backgroundColor: C.bgPanel,
                border: `1px solid ${C.border}`,
                minHeight: "220px",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
                style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.bgRaised }}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" style={{ color: C.stone }} />
                  <span className="text-[12px] font-semibold" style={{ color: C.textPrimary }}>AI Synthesis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px]" style={{ color: C.textDim }}>Gemini Ultra · 3.2s</span>
                  <BookOpen className="w-3.5 h-3.5" style={{ color: C.textDim }} />
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4 overflow-y-auto" style={{ color: C.textPrimary }}>
                <p className="text-[13px] leading-relaxed" style={{ color: C.textSecondary }}>
                  Recent advances in 2025 have shifted the quantum computing paradigm away from noisy intermediate-scale
                  quantum (NISQ) devices toward fault-tolerant, error-corrected architectures capable of commercial workloads.
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: C.textSecondary }}>
                  The pivotal breakthrough centers on topological qubits achieving coherence time improvements of{" "}
                  <span style={{ color: C.stone, fontWeight: 600 }}>400x</span> over prior benchmarks, enabled by
                  non-Abelian anyon braiding in 2D electron gas heterostructures. Surface code implementations now
                  sustain logical error rates below{" "}
                  <span style={{ color: C.stone, fontWeight: 600 }}>10⁻⁶</span> — the threshold for practical computation.
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: C.stone }}>
                  Building executive summary
                  <span
                    className="inline-block w-[2px] h-[14px] ml-1 align-middle rounded-sm animate-tx-blink"
                    style={{ backgroundColor: C.stone }}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Right 40% — Intelligence Panel */}
          <div
            className="flex flex-col flex-shrink-0 overflow-hidden"
            style={{
              width: "40%",
              backgroundColor: C.bgPanel,
              borderLeft: `1px solid ${C.border}`,
            }}
          >
            {/* Panel header */}
            <div
              className="h-12 flex items-center justify-between px-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.bgRaised }}
            >
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4" style={{ color: C.stone }} />
                <span className="text-[12px] font-semibold" style={{ color: C.textPrimary }}>Intelligence Layer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-tx-pulse"       style={{ backgroundColor: C.stone }} />
                <div className="w-1.5 h-1.5 rounded-full animate-tx-pulse-terra" style={{ backgroundColor: C.terra }} />
                <div className="w-1.5 h-1.5 rounded-full animate-tx-pulse-sage"  style={{ backgroundColor: C.sage  }} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col" style={{ gap: "0" }}>

              {/* Chat thread */}
              <div className="flex flex-col gap-4 p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                {/* User msg */}
                <div className="flex gap-2.5 items-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold"
                    style={{ backgroundColor: C.bgRaised, color: C.textSecondary, border: `1px solid ${C.borderLight}` }}
                  >
                    US
                  </div>
                  <p className="text-[12px] pt-0.5 leading-relaxed" style={{ color: C.textPrimary }}>
                    Highlight the specific improvements in error correction and compare to last year.
                  </p>
                </div>

                {/* AI reply */}
                <div className="flex gap-2.5 items-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${C.stone}20`,
                      border: `1px solid ${C.stone}40`,
                    }}
                  >
                    <Sparkles className="w-3 h-3" style={{ color: C.stone }} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-[10px] font-semibold" style={{ color: C.textDim }}>Tx Coordinator</span>
                    <p className="text-[12px] leading-relaxed" style={{ color: C.textPrimary }}>
                      Research Agent scanned 412 preprints. Surface codes now achieve logical error rates of
                      10⁻⁶ — a <span style={{ color: C.stone, fontWeight: 600 }}>1,000x improvement</span> over
                      last year's 10⁻³ baseline. The key enabler is dynamic decoding via a neural net trained on
                      hardware noise profiles.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {["arXiv 2501.1448", "Nature Q. Inf.", "IBM QV 2024"].map(ref => (
                        <span
                          key={ref}
                          className="text-[9px] px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: C.bgRaised,
                            color: C.textSecondary,
                            border: `1px solid ${C.border}`,
                          }}
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Agents section */}
              <div className="flex flex-col gap-2 p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.textDim }}>
                    Active Agents
                  </span>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${C.sage}18`, color: C.sage, border: `1px solid ${C.sage}35` }}
                  >
                    2 running
                  </span>
                </div>
                {AGENTS.map(a => <AgentRow key={a.label} {...a} />)}
              </div>

              {/* Knowledge Graph */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.textDim }}>
                    Concept Graph
                  </span>
                  <span className="text-[9px]" style={{ color: C.textDim }}>8 nodes · live</span>
                </div>
                <div
                  className="flex-1 rounded-xl overflow-hidden relative"
                  style={{
                    backgroundColor: C.bg,
                    border: `1px solid ${C.border}`,
                    minHeight: "140px",
                  }}
                >
                  <svg viewBox="0 0 200 110" className="w-full h-full" style={{ display: "block" }}>
                    {/* Edges */}
                    {EDGES.map((e, i) => (
                      <line
                        key={i}
                        x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                        stroke={e.color}
                        strokeWidth="0.8"
                        className={e.anim || ""}
                      />
                    ))}
                    {/* Nodes */}
                    {NODES.map((n, i) => (
                      <g key={i}>
                        <circle cx={n.x} cy={n.y} r={n.r + 2} fill={n.color} fillOpacity="0.1" />
                        <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
                        <text
                          x={n.x} y={n.y - n.r - 2}
                          textAnchor="middle"
                          fontSize="4"
                          fill={n.color}
                          opacity="0.7"
                          fontFamily="Space Grotesk, sans-serif"
                        >
                          {n.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Status Bar ── */}
      <div
        className="h-7 flex items-center justify-between px-4 flex-shrink-0"
        style={{
          backgroundColor: C.bgPanel,
          borderTop: `1px solid ${C.border}`,
        }}
      >
        {/* Left stats */}
        <div className="flex items-center gap-3">
          {[
            { icon: BookOpen, label: "847 sources" },
            { icon: Bot,      label: "12 agents" },
            { icon: Workflow, label: "3 workflows" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1">
              <Icon className="w-3 h-3" style={{ color: C.textDim }} />
              <span className="text-[10px]" style={{ color: C.textSecondary }}>{label}</span>
              <span className="text-[10px] ml-1" style={{ color: C.borderLight }}>·</span>
            </div>
          ))}
        </div>

        {/* Center progress */}
        <div className="flex items-center gap-2">
          <div
            className="w-32 h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: C.bgRaised }}
          >
            <div
              className="h-full rounded-full animate-tx-progress"
              style={{
                backgroundImage: `linear-gradient(90deg, ${C.stone}, ${C.terra})`,
              }}
            />
          </div>
          <span className="text-[10px]" style={{ color: C.textDim }}>Indexing…</span>
        </div>

        {/* Right version */}
        <div className="flex items-center gap-2">
          <span className="text-[10px]" style={{ color: C.textDim }}>Project Tx v1.0 — Intelligence OS</span>
          <div
            className="w-1.5 h-1.5 rounded-full animate-tx-pulse-sage"
            style={{ backgroundColor: C.sage }}
          />
        </div>
      </div>
    </div>
  );
}
