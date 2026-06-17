/**
 * Project Tx — Stress Test & Resilience Refinement
 *
 * FAILURE MODES UNDER TEST (all firing simultaneously):
 *  [1] Rate limit hit — 3 requests queued
 *  [2] Synthesis Agent FAILED mid-run — needs retry
 *  [3] Context window at 87% — pressure warning
 *  [4] 10,247 sources indexed — cognitive-load truncation
 *  [5] Low-credibility source detected (score: 34)
 *  [6] One source stale — cached 4 h ago
 *  [7] Tab overflow — 7 open tabs, "+3" overflow chip
 *  [8] Long session — 4 h 23 m, fatigue warning
 *  [9] Fact-Check Agent reconnecting after drop
 * [10] Auto-save draft — "saved 2 m ago"
 *
 * RESILIENCE PRINCIPLES APPLIED:
 *  • Errors are calm and contained — never full-screen takeovers
 *  • Every warning has exactly one clear action (retry / dismiss / save)
 *  • Under pressure the UI REDUCES noise — focus mode available
 *  • Critical issues (agent fail) surface above the fold; cosmetic ones (stale cache) stay inline
 *  • Context meter lives in one corner — visible but never intrusive
 *  • Information density adapts: "top 24 of 10,247" prevents overload
 */

import React, { useState } from "react";
import {
  Home, Globe, MessageSquare, Microscope, Network, Settings,
  Workflow, PenTool, Sparkles, Bot, Hexagon, Search,
  UserCircle, Bell, LayoutDashboard, ShieldCheck,
  BrainCircuit, Activity, Layers, BookOpen, Cpu,
  CheckCircle2, Clock, ChevronRight, X, Plus,
  FileText, Zap, BarChart3, AlertTriangle, AlertCircle,
  RefreshCw, WifiOff, Save, EyeOff, Filter,
  TrendingDown, Database
} from "lucide-react";
import "./_group.css";

/* ─── Stone palette ─────────────────────────────────────────── */
const C = {
  bg:           "#100e0c",
  bgPanel:      "#191612",
  bgRaised:     "#211d19",
  border:       "#302b25",
  borderLight:  "#3d3730",
  stone:        "#c4a882",
  terra:        "#c4714a",
  sage:         "#7fa882",
  ochre:        "#c49a3c",
  crimson:      "#c45a5a",  // error / failure
  textPrimary:  "#ede6db",
  textSecondary:"#8a7e72",
  textDim:      "#5c534a",
};

/* ─── Sidebar nav ───────────────────────────────────────────── */
const NAV = [
  { icon: Home,          label: "Home" },
  { icon: Globe,         label: "Browser" },
  { icon: Microscope,    label: "Research Hub", active: true },
  { icon: MessageSquare, label: "AI Chat" },
  { icon: Network,       label: "Knowledge" },
  { icon: Workflow,      label: "Automation" },
  { icon: PenTool,       label: "Creator" },
  { icon: BarChart3,     label: "Analytics" },
];

/* ─── Sources — stress scenario includes one low-score, one stale ── */
const SOURCES = [
  {
    title: "Topological Qubits at Scale",
    source: "Nature.com",
    score: 98, scoreColor: C.sage, scoreBg: `${C.sage}18`,
    stale: false, flagged: false,
  },
  {
    title: "Surface Code Error Correction Limits",
    source: "MIT Technology Review",
    score: 94, scoreColor: C.sage, scoreBg: `${C.sage}18`,
    stale: true, flagged: false,                          // [6] stale
  },
  {
    title: "Quantum Supremacy Claims Revisited",
    source: "quantumhype.io",
    score: 34, scoreColor: C.crimson, scoreBg: `${C.crimson}18`,
    stale: false, flagged: true,                          // [5] low credibility
  },
];

/* ─── Agent roster — one failed, one reconnecting ──────────── */
const AGENTS = [
  {
    icon: Search,      label: "Research",   color: C.stone,
    status: "done" as const,
    statusLabel: "Complete",
    anim: "",
  },
  {
    icon: Layers,      label: "Synthesis",  color: C.crimson,
    status: "error" as const,               // [2] failed
    statusLabel: "Failed — token overflow",
    anim: "",
  },
  {
    icon: ShieldCheck, label: "Fact Check", color: C.ochre,
    status: "reconnecting" as const,        // [9] reconnecting
    statusLabel: "Reconnecting…",
    anim: "animate-tx-pulse",
  },
];

/* ─── Tab data — 7 tabs, show 4 + "+3" overflow ────────────── */
const TABS = [
  { label: "Quantum Research",      icon: Microscope,    active: true  },
  { label: "Architecture Planning", icon: MessageSquare, active: false },
  { label: "Market Intelligence",   icon: BarChart3,     active: false },
  { label: "User Data Models",      icon: FileText,      active: false },
  // overflow: 3 more hidden
];
const OVERFLOW_COUNT = 3;

/* ─── Context window meter [3] ──────────────────────────────── */
const CTX_PCT = 87;

/* ─── Tiny helper components ────────────────────────────────── */

function StressChip({
  icon: Icon, label, color, bg, border, action, actionLabel
}: {
  icon: React.ElementType; label: string;
  color: string; bg: string; border: string;
  action?: () => void; actionLabel?: string;
}) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
      style={{ backgroundColor: bg, border: `1px solid ${border}` }}
    >
      <Icon className="w-3 h-3 flex-shrink-0" style={{ color }} />
      <span className="text-[11px] font-medium" style={{ color }}>{label}</span>
      {actionLabel && (
        <button
          className="text-[10px] font-semibold ml-1 underline underline-offset-2"
          style={{ color }}
          onClick={action}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function CtxMeter({ pct }: { pct: number }) {
  const color = pct > 90 ? C.crimson : pct > 75 ? C.ochre : C.sage;
  return (
    <div className="flex items-center gap-2" title={`Context window ${pct}% used`}>
      <Database className="w-3 h-3 flex-shrink-0" style={{ color }} />
      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.bgRaised }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[10px] font-semibold" style={{ color }}>{pct}%</span>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export function BrowserStress() {
  const [agentError, setAgentError] = useState(true);   // [2]
  const [rateLimitDismissed, setRateLimitDismissed] = useState(false); // [1]
  const [focusMode, setFocusMode] = useState(false);    // resilience toggle

  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col font-tx"
      style={{ backgroundColor: C.bg, color: C.textPrimary }}
    >
      {/* ══ [1] Rate-limit banner — dismissable, one action ══ */}
      {!rateLimitDismissed && (
        <div
          className="flex-shrink-0 flex items-center justify-between px-4 py-1.5"
          style={{
            backgroundColor: `${C.ochre}14`,
            borderBottom: `1px solid ${C.ochre}40`,
          }}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.ochre }} />
            <span className="text-[11px] font-medium" style={{ color: C.ochre }}>
              API rate limit reached — 3 requests queued. Estimated wait: 18 s.
            </span>
          </div>
          <button onClick={() => setRateLimitDismissed(true)}>
            <X className="w-3.5 h-3.5" style={{ color: C.textDim }} />
          </button>
        </div>
      )}

      {/* ══ Top Navigation Bar ══ */}
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
              className="w-full max-w-xl h-8 rounded-full flex items-center px-3 gap-2"
              style={{ backgroundColor: C.bgRaised, border: `1px solid ${C.borderLight}` }}
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.sage }} />
              <span className="text-[12px] flex-1 truncate" style={{ color: C.textSecondary }}>
                <span style={{ color: C.stone }}>tx://</span>research/quantum-computing
              </span>
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.stone, opacity: 0.6 }} />
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* [8] Long session */}
            <StressChip
              icon={Clock}
              label="4 h 23 m"
              color={C.ochre}
              bg={`${C.ochre}12`}
              border={`${C.ochre}35`}
              actionLabel="Save & rest"
            />
            {/* [10] Auto-save */}
            <div className="flex items-center gap-1.5">
              <Save className="w-3 h-3" style={{ color: C.textDim }} />
              <span className="text-[10px]" style={{ color: C.textDim }}>Saved 2 m ago</span>
            </div>
            {/* [3] Context meter */}
            <CtxMeter pct={CTX_PCT} />
            {/* Focus mode toggle */}
            <button
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all"
              style={{
                backgroundColor: focusMode ? `${C.stone}22` : C.bgRaised,
                border: `1px solid ${focusMode ? C.stone : C.borderLight}`,
                color: focusMode ? C.stone : C.textSecondary,
              }}
              onClick={() => setFocusMode(f => !f)}
            >
              <EyeOff className="w-3 h-3" />
              {focusMode ? "Focused" : "Focus"}
            </button>
            <div className="w-px h-5 mx-0.5" style={{ backgroundColor: C.border }} />
            {/* Model chip */}
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{ backgroundColor: C.bgRaised, border: `1px solid ${C.borderLight}` }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-tx-pulse" style={{ backgroundColor: C.stone }} />
              <span className="text-[11px] font-medium" style={{ color: C.textPrimary }}>Gemini Ultra</span>
              <Cpu className="w-3 h-3" style={{ color: C.textDim }} />
            </div>
            <LayoutDashboard className="w-4 h-4 cursor-pointer" style={{ color: C.textSecondary }} />
            <Bell className="w-4 h-4 cursor-pointer relative" style={{ color: C.textSecondary }} />
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: C.bgRaised, border: `1px solid ${C.stone}55` }}
            >
              <UserCircle className="w-5 h-5" style={{ color: C.textSecondary }} />
            </div>
          </div>
        </div>

        {/* [7] Tab row — overflow */}
        <div
          className="flex items-end gap-0.5 px-4"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          {TABS.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className="h-7 px-3 rounded-t-md flex items-center gap-2 text-[11px] font-medium relative cursor-pointer"
              style={{
                backgroundColor: active ? C.bgRaised : "transparent",
                color: active ? C.textPrimary : C.textSecondary,
                borderTop:    active ? `1px solid ${C.borderLight}` : "1px solid transparent",
                borderLeft:   active ? `1px solid ${C.borderLight}` : "1px solid transparent",
                borderRight:  active ? `1px solid ${C.borderLight}` : "1px solid transparent",
              }}
            >
              <Icon className="w-3 h-3 flex-shrink-0" />
              <span>{label}</span>
              {active && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t"
                  style={{ backgroundColor: C.stone }} />
              )}
            </div>
          ))}
          {/* Overflow chip */}
          <div
            className="h-7 mb-0.5 px-2.5 rounded-md flex items-center gap-1 text-[10px] font-semibold cursor-pointer"
            style={{
              backgroundColor: `${C.stone}18`,
              border: `1px solid ${C.stone}35`,
              color: C.stone,
            }}
          >
            <Plus className="w-3 h-3" />
            {OVERFLOW_COUNT} more
          </div>
          <div
            className="mb-0.5 ml-1 p-1 rounded cursor-pointer"
            style={{ color: C.textDim }}
          >
            <Plus className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* ══ Body ══ */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Sidebar */}
        <div
          className="w-14 flex-shrink-0 flex flex-col items-center py-3 justify-between"
          style={{ backgroundColor: C.bgPanel, borderRight: `1px solid ${C.border}` }}
        >
          <div className="flex flex-col gap-1 w-full px-2">
            {NAV.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                title={label}
                className="relative w-full flex items-center justify-center p-2 rounded-lg cursor-pointer"
                style={{
                  backgroundColor: active ? `${C.stone}18` : "transparent",
                  color: active ? C.stone : C.textDim,
                }}
              >
                <Icon className="w-[18px] h-[18px]" />
                {active && (
                  <div
                    className="absolute left-0 inset-y-1 w-0.5 rounded-r-full"
                    style={{ backgroundColor: C.stone }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 px-2 pb-1">
            <div className="w-full h-px" style={{ backgroundColor: C.border }} />
            {/* Agent indicators — crimson for failed */}
            {[
              { color: C.stone,   anim: "", title: "Research Agent — Done" },
              { color: C.crimson, anim: "", title: "Synthesis Agent — Failed" },
              { color: C.ochre,   anim: "animate-tx-pulse-ochre", title: "Fact Check — Reconnecting" },
            ].map(({ color, anim, title }) => (
              <div
                key={title}
                title={title}
                className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: C.bgRaised, border: `1px solid ${color}50` }}
              >
                <Bot className="w-3.5 h-3.5" style={{ color }} />
                <div
                  className={`absolute top-0 right-0 w-2 h-2 rounded-full ${anim}`}
                  style={{ backgroundColor: color, border: `1.5px solid ${C.bgPanel}` }}
                />
              </div>
            ))}
            <div className="w-full h-px mt-1" style={{ backgroundColor: C.border }} />
            <div title="Settings" className="p-2 rounded-lg cursor-pointer w-full flex justify-center" style={{ color: C.textDim }}>
              <Settings className="w-[18px] h-[18px]" />
            </div>
          </div>
        </div>

        {/* ══ Main content ══ */}
        <div className="flex-1 flex overflow-hidden">

          {/* Left 60% — Research */}
          <div
            className="flex flex-col overflow-y-auto"
            style={{ width: "60%", padding: "16px 20px", gap: "14px", display: "flex", flexDirection: "column" }}
          >
            {/* Deep Research Banner */}
            <div
              className="rounded-xl flex items-center justify-between px-4 py-2.5 relative overflow-hidden flex-shrink-0"
              style={{ backgroundColor: `${C.stone}0d`, border: `1px solid ${C.stone}40` }}
            >
              <div className="absolute inset-0 animate-tx-shimmer pointer-events-none" />
              <div className="relative flex items-center gap-3">
                <Activity className="w-4 h-4" style={{ color: C.stone }} />
                <span className="text-[12px] font-semibold" style={{ color: C.stone }}>Deep Research Mode</span>
                {/* [4] 10,247 sources — truncated */}
                <span className="text-[11px]" style={{ color: C.textSecondary }}>
                  Top <span style={{ color: C.textPrimary, fontWeight: 600 }}>24</span> of{" "}
                  <span style={{ color: C.stone, fontWeight: 600 }}>10,247</span> sources
                </span>
              </div>
              <button
                className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold"
                style={{ backgroundColor: C.bgRaised, border: `1px solid ${C.borderLight}`, color: C.textSecondary }}
              >
                <Filter className="w-3 h-3" /> Filter
              </button>
            </div>

            {/* Article header */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${C.ochre}18`, color: C.ochre, border: `1px solid ${C.ochre}40` }}
                >
                  Auto-Brief
                </span>
                <span className="text-[10px]" style={{ color: C.textDim }}>Updated 4 h ago</span>
              </div>
              <h1
                className="text-3xl font-bold tracking-tight leading-tight"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${C.textPrimary} 60%, ${C.textSecondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Quantum Computing<br />Breakthroughs 2025
              </h1>
            </div>

            {/* [5, 6] Source cards — flagged + stale */}
            <div className="grid grid-cols-3 gap-3 flex-shrink-0">
              {SOURCES.map((s, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3 flex flex-col gap-2 cursor-pointer transition-all"
                  style={{
                    backgroundColor: C.bgRaised,
                    border: `1px solid ${s.flagged ? C.crimson + "50" : s.stale ? C.ochre + "40" : C.border}`,
                  }}
                >
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: C.textDim }}>
                      {s.source}
                    </span>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                      style={{ color: s.scoreColor, backgroundColor: s.scoreBg }}
                    >
                      {s.score}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium leading-snug" style={{ color: s.flagged ? C.crimson : C.textPrimary }}>
                    {s.title}
                  </p>
                  {/* Stress indicators */}
                  {s.flagged && (
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" style={{ color: C.crimson }} />
                      <span className="text-[9px]" style={{ color: C.crimson }}>Low credibility — excluded</span>
                    </div>
                  )}
                  {s.stale && !s.flagged && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 flex-shrink-0" style={{ color: C.ochre }} />
                      <span className="text-[9px]" style={{ color: C.ochre }}>Cached 4 h ago</span>
                      <button className="text-[9px] underline ml-1" style={{ color: C.stone }}>Refresh</button>
                    </div>
                  )}
                  {!s.flagged && !s.stale && (
                    <div className="flex items-center gap-1" style={{ color: C.textDim }}>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-[9px]">Open source</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* AI Synthesis — partial content (agent failed mid-write) */}
            <div
              className="flex-1 rounded-xl flex flex-col overflow-hidden"
              style={{ backgroundColor: C.bgPanel, border: `1px solid ${C.border}`, minHeight: "200px" }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
                style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.bgRaised }}
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" style={{ color: C.crimson }} />
                  <span className="text-[12px] font-semibold" style={{ color: C.textPrimary }}>AI Synthesis</span>
                  {/* [2] Failure indicator inline */}
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${C.crimson}18`, color: C.crimson, border: `1px solid ${C.crimson}40` }}
                  >
                    INTERRUPTED
                  </span>
                </div>
                {agentError && (
                  <button
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold"
                    style={{
                      backgroundColor: `${C.stone}18`,
                      border: `1px solid ${C.stone}40`,
                      color: C.stone,
                    }}
                    onClick={() => setAgentError(false)}
                  >
                    <RefreshCw className="w-3 h-3" /> Retry
                  </button>
                )}
              </div>

              <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                {/* Partial synthesis content — cuts off */}
                <p className="text-[13px] leading-relaxed" style={{ color: C.textSecondary }}>
                  Recent advances in 2025 have shifted the quantum computing paradigm away from noisy
                  intermediate-scale quantum (NISQ) devices toward fault-tolerant architectures capable of
                  commercial workloads.
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: C.textSecondary }}>
                  The pivotal breakthrough involves topological qubits achieving coherence time improvements
                  of <span style={{ color: C.stone, fontWeight: 600 }}>400×</span> over prior benchmarks,
                  enabled by non-Abelian anyon braiding in 2D electron gas heterostructures…
                </p>
                {/* [2] Error callout — contained, actionable */}
                {agentError && (
                  <div
                    className="rounded-xl p-4 flex items-start gap-3"
                    style={{
                      backgroundColor: `${C.crimson}0c`,
                      border: `1px solid ${C.crimson}35`,
                    }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.crimson }} />
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-semibold" style={{ color: C.crimson }}>
                        Synthesis Agent failed — token overflow (context 87%)
                      </span>
                      <span className="text-[11px]" style={{ color: C.textSecondary }}>
                        The summary is incomplete. Retry with a shorter context window, or reduce sources to top 10.
                      </span>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                          style={{ backgroundColor: `${C.stone}18`, border: `1px solid ${C.stone}40`, color: C.stone }}
                          onClick={() => setAgentError(false)}
                        >
                          Retry (top 10 sources)
                        </button>
                        <button
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                          style={{ backgroundColor: C.bgRaised, border: `1px solid ${C.border}`, color: C.textSecondary }}
                        >
                          Use partial draft
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right 40% — Intelligence Panel */}
          <div
            className="flex flex-col flex-shrink-0 overflow-hidden"
            style={{ width: "40%", backgroundColor: C.bgPanel, borderLeft: `1px solid ${C.border}` }}
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
              {/* [4] queue pressure */}
              <span
                className="text-[9px] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${C.ochre}18`, color: C.ochre, border: `1px solid ${C.ochre}40` }}
              >
                4 queued
              </span>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col">

              {/* Chat thread */}
              <div className="flex flex-col gap-4 p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div className="flex gap-2.5 items-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold"
                    style={{ backgroundColor: C.bgRaised, color: C.textSecondary, border: `1px solid ${C.borderLight}` }}
                  >
                    US
                  </div>
                  <p className="text-[12px] pt-0.5 leading-relaxed" style={{ color: C.textPrimary }}>
                    Highlight the improvements in error correction and compare to last year.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${C.stone}20`, border: `1px solid ${C.stone}40` }}
                  >
                    <Sparkles className="w-3 h-3" style={{ color: C.stone }} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-[10px] font-semibold" style={{ color: C.textDim }}>Tx Coordinator</span>
                    <p className="text-[12px] leading-relaxed" style={{ color: C.textPrimary }}>
                      Research Agent found 1,000× improvement in logical error rates. Synthesis interrupted
                      at 87% context — partial draft saved.{" "}
                      <span style={{ color: C.crimson, fontWeight: 600 }}>Recommend reducing to top 10 sources</span>{" "}
                      and retrying.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {["arXiv 2501.1448", "Nature Q. Inf.", "IBM QV 2024"].map(ref => (
                        <span
                          key={ref}
                          className="text-[9px] px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: C.bgRaised, color: C.textSecondary, border: `1px solid ${C.border}` }}
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Agents — stress states */}
              <div className="flex flex-col gap-2 p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.textDim }}>
                    Active Agents
                  </span>
                  {/* [2] error count badge */}
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${C.crimson}18`, color: C.crimson, border: `1px solid ${C.crimson}35` }}
                  >
                    1 failed
                  </span>
                </div>

                {AGENTS.map(agent => {
                  const Icon = agent.icon;
                  const isError   = agent.status === "error";
                  const isDone    = agent.status === "done";
                  const isRecon   = agent.status === "reconnecting";
                  const dotColor  = isError ? C.crimson : isDone ? C.sage : C.ochre;
                  return (
                    <div
                      key={agent.label}
                      className="rounded-lg p-2.5 flex items-center gap-3 transition-all"
                      style={{
                        backgroundColor: C.bgRaised,
                        border: `1px solid ${isError ? C.crimson + "40" : isRecon ? C.ochre + "40" : C.border}`,
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${agent.color}18`, border: `1px solid ${agent.color}35` }}
                      >
                        {isRecon
                          ? <WifiOff className="w-3.5 h-3.5" style={{ color: C.ochre }} />
                          : <Icon className="w-3.5 h-3.5" style={{ color: agent.color }} />
                        }
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[11px] font-semibold" style={{ color: C.textPrimary }}>
                          {agent.label} Agent
                        </span>
                        <span className="text-[10px] truncate" style={{ color: isError ? C.crimson : isRecon ? C.ochre : C.textSecondary }}>
                          {agent.statusLabel}
                        </span>
                      </div>
                      {isError && agentError && (
                        <button
                          className="flex items-center gap-1 px-2 py-1 rounded text-[9px] font-semibold flex-shrink-0"
                          style={{ backgroundColor: `${C.stone}18`, border: `1px solid ${C.stone}35`, color: C.stone }}
                          onClick={() => setAgentError(false)}
                        >
                          <RefreshCw className="w-2.5 h-2.5" /> Retry
                        </button>
                      )}
                      {isRecon && (
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${agent.anim}`} style={{ backgroundColor: dotColor }} />
                      )}
                      {isDone && <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: C.sage }} />}
                    </div>
                  );
                })}
              </div>

              {/* Knowledge Graph — with [3] context pressure overlay */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.textDim }}>
                    Concept Graph
                  </span>
                  <div className="flex items-center gap-2">
                    {/* [3] Context warning inline in graph header */}
                    <span className="text-[9px] flex items-center gap-1" style={{ color: C.ochre }}>
                      <TrendingDown className="w-3 h-3" /> Context 87%
                    </span>
                    <span className="text-[9px]" style={{ color: C.textDim }}>8 nodes</span>
                  </div>
                </div>
                <div
                  className="flex-1 rounded-xl overflow-hidden relative"
                  style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, minHeight: "130px" }}
                >
                  <svg viewBox="0 0 200 110" className="w-full h-full" style={{ display: "block" }}>
                    {/* Edges */}
                    {[
                      { x1:100,y1:56, x2:50, y2:30, stroke:C.border,         anim:""                    },
                      { x1:100,y1:56, x2:155,y2:28, stroke:C.stone,          anim:"animate-tx-line"     },
                      { x1:100,y1:56, x2:148,y2:76, stroke:C.crimson,        anim:"animate-tx-line"     },
                      { x1:100,y1:56, x2:58, y2:82, stroke:C.border,         anim:""                    },
                      { x1:155,y1:28, x2:176,y2:50, stroke:C.border,         anim:""                    },
                      { x1:50, y1:30, x2:26, y2:56, stroke:C.border,         anim:""                    },
                      { x1:148,y1:76, x2:108,y2:96, stroke:C.ochre,          anim:"animate-tx-line-slow"},
                    ].map((e,i) => (
                      <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                        stroke={e.stroke} strokeWidth="0.8" className={e.anim} />
                    ))}
                    {/* Nodes */}
                    {[
                      { x:100,y:56, r:5, color:C.stone,           label:"Quantum"     },
                      { x:50, y:30, r:3, color:C.textSecondary,   label:"Coherence"   },
                      { x:155,y:28, r:3, color:C.terra,           label:"Error Corr." },
                      { x:148,y:76, r:3, color:C.crimson,         label:"FAILED"      },
                      { x:58, y:82, r:2, color:C.textDim,         label:"NISQ"        },
                      { x:176,y:50, r:2, color:C.textDim,         label:"Anyon"       },
                      { x:26, y:56, r:2, color:C.textDim,         label:"Fidelity"    },
                      { x:108,y:96, r:2, color:C.ochre,           label:"Atom Array"  },
                    ].map((n,i) => (
                      <g key={i}>
                        <circle cx={n.x} cy={n.y} r={n.r+2} fill={n.color} fillOpacity="0.1" />
                        <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
                        <text x={n.x} y={n.y-n.r-2} textAnchor="middle" fontSize="4"
                          fill={n.color} opacity="0.7" fontFamily="Space Grotesk, sans-serif">
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

      {/* ══ Bottom Status Bar ══ */}
      <div
        className="h-7 flex items-center justify-between px-4 flex-shrink-0"
        style={{ backgroundColor: C.bgPanel, borderTop: `1px solid ${C.border}` }}
      >
        <div className="flex items-center gap-3">
          {[
            { icon: BookOpen, label: "10,247 sources",  color: C.textSecondary },
            { icon: Bot,      label: "3 agents",        color: C.textSecondary },
            { icon: AlertCircle, label: "1 error",      color: C.crimson       },
            { icon: Workflow, label: "4 queued",        color: C.ochre         },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-1">
              <Icon className="w-3 h-3" style={{ color }} />
              <span className="text-[10px] font-medium" style={{ color }}>{label}</span>
              <span className="text-[10px] ml-1" style={{ color: C.border }}>·</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.bgRaised }}>
            <div className="h-full rounded-full" style={{
              width: `${CTX_PCT}%`,
              backgroundImage: `linear-gradient(90deg, ${C.stone}, ${C.ochre})`,
            }} />
          </div>
          <span className="text-[10px]" style={{ color: C.ochre }}>Context {CTX_PCT}%</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px]" style={{ color: C.textDim }}>Project Tx v1.0 — Intelligence OS</span>
          {/* System is degraded, not fully online */}
          <div className="w-1.5 h-1.5 rounded-full animate-tx-pulse-ochre" style={{ backgroundColor: C.ochre }} />
        </div>
      </div>
    </div>
  );
}
