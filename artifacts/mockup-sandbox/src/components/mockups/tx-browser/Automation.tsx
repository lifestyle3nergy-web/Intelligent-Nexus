import React, { useState } from "react";
import {
  Zap, Bot, Globe, Database, Mail, Webhook,
  Play, Pause, RotateCcw, Plus, Settings,
  ChevronRight, CheckCircle2, AlertCircle, Clock,
  Layers, Workflow, Network, BarChart3,
  Home, Microscope, MessageSquare, PenTool,
  Hexagon, UserCircle, Bell, LayoutDashboard,
  ShieldCheck, Sparkles, Activity, Search,
  BrainCircuit, FileText, ArrowRight
} from "lucide-react";
import "./_group.css";

/* ─── Stone palette ─────────────────────────────────────────── */
const C = {
  bg:           "#100e0c",
  bgPanel:      "#191612",
  bgRaised:     "#211d19",
  bgHover:      "#2a2520",
  border:       "#302b25",
  borderLight:  "#3d3730",
  stone:        "#c4a882",
  terra:        "#c4714a",
  sage:         "#7fa882",
  ochre:        "#c49a3c",
  textPrimary:  "#ede6db",
  textSecondary:"#8a7e72",
  textDim:      "#5c534a",
};

/* ─── Workflow nodes ─────────────────────────────────────────── */
type NodeStatus = "idle" | "running" | "done" | "error";

interface WFNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: "trigger" | "agent" | "action" | "output";
  label: string;
  sublabel: string;
  icon: React.ElementType;
  iconColor: string;
  status: NodeStatus;
}

const NODES: WFNode[] = [
  {
    id: "n1", x: 32,  y: 140, w: 160, h: 88,
    kind: "trigger", label: "Webhook Trigger", sublabel: "POST /api/research",
    icon: Webhook, iconColor: C.ochre, status: "done",
  },
  {
    id: "n2", x: 260, y: 80,  w: 160, h: 88,
    kind: "agent",   label: "Research Agent",  sublabel: "Query · 412 papers",
    icon: Search,   iconColor: C.stone, status: "done",
  },
  {
    id: "n3", x: 260, y: 198, w: 160, h: 88,
    kind: "agent",   label: "Synthesis Agent", sublabel: "Summarise · GPT-4o",
    icon: Layers,   iconColor: C.terra, status: "running",
  },
  {
    id: "n4", x: 490, y: 80,  w: 160, h: 88,
    kind: "action",  label: "Fact Check",      sublabel: "Verify · 98 claims",
    icon: ShieldCheck, iconColor: C.sage, status: "idle",
  },
  {
    id: "n5", x: 490, y: 198, w: 160, h: 88,
    kind: "action",  label: "Knowledge Graph", sublabel: "Index · 63 nodes",
    icon: Network,  iconColor: C.stone, status: "idle",
  },
  {
    id: "n6", x: 718, y: 140, w: 160, h: 88,
    kind: "output",  label: "Publish Brief",   sublabel: "Markdown + Citations",
    icon: FileText, iconColor: C.ochre, status: "idle",
  },
];

/* Bezier edge definitions: [fromNode, toNode, color] */
const EDGES: [string, string, string][] = [
  ["n1", "n2", C.stone],
  ["n1", "n3", C.terra],
  ["n2", "n4", C.sage],
  ["n3", "n5", C.stone],
  ["n4", "n6", C.ochre],
  ["n5", "n6", C.ochre],
];

/* ─── Execution log entries ──────────────────────────────────── */
const LOGS = [
  { time: "04:51:03", level: "ok",   msg: "Webhook received — payload 2.4 KB",           node: "Webhook Trigger" },
  { time: "04:51:04", level: "ok",   msg: "Research Agent dispatched — 412 sources queued", node: "Research Agent" },
  { time: "04:51:09", level: "ok",   msg: "arXiv batch complete — 187 papers scored",     node: "Research Agent" },
  { time: "04:51:11", level: "ok",   msg: "Nature.com batch complete — 98 scored",        node: "Research Agent" },
  { time: "04:51:14", level: "ok",   msg: "Research Agent finished — top 12 selected",    node: "Research Agent" },
  { time: "04:51:15", level: "run",  msg: "Synthesis Agent started — 3,840 tokens",       node: "Synthesis Agent" },
  { time: "04:51:22", level: "run",  msg: "Generating executive summary…",                node: "Synthesis Agent" },
  { time: "04:51:22", level: "warn", msg: "Rate limit headroom 14 % — throttling",        node: "Synthesis Agent" },
];

/* ─── Active agent roster ────────────────────────────────────── */
const AGENT_ROSTER = [
  { label: "Research Agent",   status: "done",    icon: Search,       color: C.stone, tokens: "18.4 K", latency: "10.2 s" },
  { label: "Synthesis Agent",  status: "running", icon: Layers,       color: C.terra, tokens: "3.8 K",  latency: "—" },
  { label: "Fact Check Agent", status: "idle",    icon: ShieldCheck,  color: C.sage,  tokens: "—",       latency: "—" },
  { label: "Index Agent",      status: "idle",    icon: Network,      color: C.stone, tokens: "—",       latency: "—" },
];

/* ─── Helper: node centre ────────────────────────────────────── */
function centre(n: WFNode) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
}

/* ─── Status badge ───────────────────────────────────────────── */
function StatusBadge({ status }: { status: NodeStatus }) {
  const map: Record<NodeStatus, { label: string; color: string; bg: string }> = {
    done:    { label: "Done",    color: C.sage,  bg: `${C.sage}18`  },
    running: { label: "Running", color: C.ochre, bg: `${C.ochre}18` },
    idle:    { label: "Idle",    color: C.textDim, bg: C.bgRaised   },
    error:   { label: "Error",   color: C.terra, bg: `${C.terra}18` },
  };
  const s = map[status];
  return (
    <span
      className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
      style={{ color: s.color, backgroundColor: s.bg, border: `1px solid ${s.color}40` }}
    >
      {s.label}
    </span>
  );
}

/* ─── Log level dot ──────────────────────────────────────────── */
function LogDot({ level }: { level: string }) {
  const c = level === "ok" ? C.sage : level === "run" ? C.stone : C.ochre;
  return <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: c }} />;
}

/* ─── Sidebar nav (reused) ───────────────────────────────────── */
const NAV = [
  { icon: Home,         label: "Home" },
  { icon: Globe,        label: "Browser" },
  { icon: Microscope,   label: "Research" },
  { icon: MessageSquare,label: "AI Chat" },
  { icon: Network,      label: "Knowledge" },
  { icon: Workflow,     label: "Automation", active: true },
  { icon: PenTool,      label: "Creator" },
  { icon: BarChart3,    label: "Analytics" },
];

/* ─── SVG canvas dimensions ──────────────────────────────────── */
const SVG_W = 920;
const SVG_H = 340;

/* ─── Main component ─────────────────────────────────────────── */
export function Automation() {
  const [running, setRunning] = useState(true);

  /* Build edge paths */
  const edgePaths = EDGES.map(([fromId, toId, color]) => {
    const from = NODES.find(n => n.id === fromId)!;
    const to   = NODES.find(n => n.id === toId)!;
    const fx = from.x + from.w;
    const fy = from.y + from.h / 2;
    const tx = to.x;
    const ty = to.y + to.h / 2;
    const cx = (fx + tx) / 2;
    const path = `M ${fx} ${fy} C ${cx} ${fy}, ${cx} ${ty}, ${tx} ${ty}`;
    const isDone = from.status === "done";
    return { path, color, isDone };
  });

  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col font-tx"
      style={{ backgroundColor: C.bg, color: C.textPrimary }}
    >
      {/* ── Top bar ── */}
      <div
        className="h-12 flex-shrink-0 flex items-center px-4 gap-4"
        style={{ backgroundColor: C.bgPanel, borderBottom: `1px solid ${C.border}` }}
      >
        <div className="flex items-center gap-2 w-14 flex-shrink-0">
          <Hexagon className="w-5 h-5" style={{ color: C.stone, fill: `${C.stone}22` }} />
          <span className="font-bold text-lg tracking-tight" style={{ color: C.stone }}>Tx</span>
        </div>

        {/* Workflow title */}
        <div className="flex items-center gap-2 flex-1">
          <Workflow className="w-4 h-4" style={{ color: C.stone }} />
          <span className="text-sm font-semibold" style={{ color: C.textPrimary }}>
            Research Pipeline v2.4
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${C.ochre}18`, color: C.ochre, border: `1px solid ${C.ochre}35` }}
          >
            LIVE
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRunning(r => !r)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{
              backgroundColor: running ? `${C.terra}18` : `${C.sage}18`,
              border: `1px solid ${running ? C.terra : C.sage}40`,
              color: running ? C.terra : C.sage,
            }}
          >
            {running ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {running ? "Pause" : "Resume"}
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold"
            style={{
              backgroundColor: C.bgRaised,
              border: `1px solid ${C.borderLight}`,
              color: C.textSecondary,
            }}
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold"
            style={{
              backgroundColor: `${C.stone}18`,
              border: `1px solid ${C.stone}40`,
              color: C.stone,
            }}
          >
            <Plus className="w-3 h-3" /> Add Node
          </button>
          <div className="w-px h-5 mx-1" style={{ backgroundColor: C.border }} />
          <LayoutDashboard className="w-4 h-4 cursor-pointer" style={{ color: C.textSecondary }} />
          <Bell className="w-4 h-4 cursor-pointer" style={{ color: C.textSecondary }} />
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: C.bgRaised, border: `1px solid ${C.stone}55` }}
          >
            <UserCircle className="w-5 h-5" style={{ color: C.textSecondary }} />
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left sidebar */}
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
          <div className="pb-2">
            <div
              title="Settings"
              className="p-2 rounded-lg cursor-pointer"
              style={{ color: C.textDim }}
            >
              <Settings className="w-[18px] h-[18px]" />
            </div>
          </div>
        </div>

        {/* ── Centre: Workflow canvas + log ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Workflow canvas */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{ backgroundColor: C.bg }}
          >
            {/* Grid dots background */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: 0.25 }}
            >
              <defs>
                <pattern id="grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill={C.textDim} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Workflow SVG */}
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="absolute"
              style={{
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(100%, 920px)",
                height: "auto",
                overflow: "visible",
              }}
            >
              {/* Edges */}
              {edgePaths.map((e, i) => (
                <g key={i}>
                  <path
                    d={e.path}
                    fill="none"
                    stroke={e.isDone ? e.color : C.border}
                    strokeWidth={e.isDone ? 1.5 : 1}
                    strokeDasharray={e.isDone ? "none" : "5 4"}
                    opacity={e.isDone ? 0.7 : 0.4}
                    className={e.isDone ? "animate-tx-line-slow" : ""}
                  />
                  {/* Arrow head */}
                  {(() => {
                    const to = NODES.find(n => EDGES[i][1] === n.id)!;
                    const ax = to.x;
                    const ay = to.y + to.h / 2;
                    return (
                      <polygon
                        points={`${ax},${ay} ${ax-6},${ay-4} ${ax-6},${ay+4}`}
                        fill={e.isDone ? e.color : C.border}
                        opacity={e.isDone ? 0.7 : 0.4}
                      />
                    );
                  })()}
                </g>
              ))}

              {/* Nodes */}
              {NODES.map(node => {
                const isRunning = node.status === "running";
                const isDone    = node.status === "done";
                const Icon = node.icon;
                const kindLabel: Record<string, string> = {
                  trigger: "TRIGGER", agent: "AGENT", action: "ACTION", output: "OUTPUT"
                };
                const kindColor: Record<string, string> = {
                  trigger: C.ochre, agent: C.stone, action: C.terra, output: C.sage
                };
                return (
                  <g key={node.id}>
                    {/* Glow halo for running */}
                    {isRunning && (
                      <rect
                        x={node.x - 4} y={node.y - 4}
                        width={node.w + 8} height={node.h + 8}
                        rx={14} ry={14}
                        fill="none"
                        stroke={node.iconColor}
                        strokeWidth="1"
                        opacity="0.25"
                        className="animate-tx-pulse"
                      />
                    )}

                    {/* Card background */}
                    <rect
                      x={node.x} y={node.y} width={node.w} height={node.h}
                      rx={10} ry={10}
                      fill={C.bgRaised}
                      stroke={isRunning ? node.iconColor : isDone ? `${node.iconColor}60` : C.border}
                      strokeWidth={isRunning ? 1.5 : 1}
                    />

                    {/* Kind label */}
                    <text
                      x={node.x + 10} y={node.y + 16}
                      fontSize="6"
                      fontFamily="Space Grotesk, sans-serif"
                      fontWeight="700"
                      fill={kindColor[node.kind]}
                      opacity="0.8"
                      letterSpacing="1.5"
                    >
                      {kindLabel[node.kind]}
                    </text>

                    {/* Icon circle */}
                    <circle
                      cx={node.x + 22} cy={node.y + 46} r={13}
                      fill={`${node.iconColor}18`}
                      stroke={`${node.iconColor}40`}
                      strokeWidth="1"
                    />

                    {/* Status indicator */}
                    <circle
                      cx={node.x + node.w - 12} cy={node.y + 14} r={4}
                      fill={isDone ? C.sage : isRunning ? C.ochre : C.textDim}
                      className={isRunning ? "animate-tx-pulse" : ""}
                    />

                    {/* Label text */}
                    <text
                      x={node.x + 40} y={node.y + 42}
                      fontSize="9"
                      fontFamily="Space Grotesk, sans-serif"
                      fontWeight="600"
                      fill={C.textPrimary}
                    >
                      {node.label}
                    </text>

                    {/* Sub-label text */}
                    <text
                      x={node.x + 40} y={node.y + 55}
                      fontSize="7.5"
                      fontFamily="Space Grotesk, sans-serif"
                      fill={C.textSecondary}
                    >
                      {node.sublabel}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Workflow stats strip */}
            <div
              className="absolute bottom-0 left-0 right-0 h-9 flex items-center px-5 gap-6"
              style={{ backgroundColor: `${C.bgPanel}cc`, borderTop: `1px solid ${C.border}` }}
            >
              {[
                { label: "6 nodes", color: C.textSecondary },
                { label: "2 done",  color: C.sage  },
                { label: "1 running", color: C.ochre },
                { label: "3 idle",  color: C.textDim },
                { label: "Run #14", color: C.stone  },
                { label: "Started 04:51:03", color: C.textDim },
              ].map(({ label, color }) => (
                <span key={label} className="text-[10px] font-medium" style={{ color }}>
                  {label}
                </span>
              ))}
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <div
                  className="w-24 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: C.bgRaised }}
                >
                  <div
                    className="h-full rounded-full animate-tx-progress"
                    style={{ backgroundImage: `linear-gradient(90deg, ${C.stone}, ${C.terra})` }}
                  />
                </div>
                <span className="text-[10px]" style={{ color: C.textDim }}>Running…</span>
              </div>
            </div>
          </div>

          {/* Execution log panel */}
          <div
            className="h-52 flex-shrink-0 flex flex-col"
            style={{ backgroundColor: C.bgPanel, borderTop: `1px solid ${C.border}` }}
          >
            {/* Log header */}
            <div
              className="h-9 flex items-center justify-between px-4 flex-shrink-0"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" style={{ color: C.stone }} />
                <span className="text-[11px] font-semibold" style={{ color: C.textPrimary }}>Execution Log</span>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full animate-tx-pulse"
                  style={{
                    backgroundColor: `${C.ochre}18`, color: C.ochre,
                    border: `1px solid ${C.ochre}40`
                  }}
                >
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px]" style={{ color: C.textDim }}>
                  {LOGS.length} events
                </span>
                <button
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{ backgroundColor: C.bgRaised, color: C.textSecondary, border: `1px solid ${C.border}` }}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Log entries */}
            <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1.5" style={{ fontFamily: "'Fira Code', monospace" }}>
              {LOGS.map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[10px] flex-shrink-0 pt-px" style={{ color: C.textDim }}>
                    {log.time}
                  </span>
                  <LogDot level={log.level} />
                  <span
                    className="text-[10px] flex-shrink-0"
                    style={{ color: C.textDim, minWidth: "108px" }}
                  >
                    [{log.node}]
                  </span>
                  <span className="text-[10px]" style={{ color: C.textSecondary }}>
                    {log.msg}
                    {i === LOGS.length - 1 && (
                      <span
                        className="inline-block w-[6px] h-[10px] ml-1 align-middle animate-tx-blink rounded-sm"
                        style={{ backgroundColor: C.stone }}
                      />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Agent Orchestration Sidebar ── */}
        <div
          className="w-64 flex-shrink-0 flex flex-col"
          style={{ backgroundColor: C.bgPanel, borderLeft: `1px solid ${C.border}` }}
        >
          {/* Header */}
          <div
            className="h-12 flex items-center justify-between px-4 flex-shrink-0"
            style={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.bgRaised }}
          >
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" style={{ color: C.stone }} />
              <span className="text-[12px] font-semibold" style={{ color: C.textPrimary }}>Agent Orchestration</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full animate-tx-pulse" style={{ backgroundColor: C.stone }} />
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col">

            {/* Agent roster */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.textDim }}>
                  Agents
                </span>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${C.sage}18`, color: C.sage, border: `1px solid ${C.sage}35` }}
                >
                  4 assigned
                </span>
              </div>

              {AGENT_ROSTER.map(agent => {
                const Icon = agent.icon;
                const isRunning = agent.status === "running";
                const isDone    = agent.status === "done";
                return (
                  <div
                    key={agent.label}
                    className="rounded-xl p-3 flex flex-col gap-2"
                    style={{
                      backgroundColor: C.bgRaised,
                      border: `1px solid ${isRunning ? agent.color + "50" : C.border}`,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${agent.color}18`, border: `1px solid ${agent.color}35` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: agent.color }} />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[11px] font-semibold" style={{ color: C.textPrimary }}>
                          {agent.label}
                        </span>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${isRunning ? "animate-tx-pulse-terra" : ""}`}
                            style={{
                              backgroundColor: isDone ? C.sage : isRunning ? C.ochre : C.textDim
                            }}
                          />
                          <span className="text-[9px] capitalize" style={{ color: C.textSecondary }}>
                            {agent.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Tokens", value: agent.tokens },
                        { label: "Latency", value: agent.latency },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-lg px-2 py-1.5"
                          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
                        >
                          <div className="text-[8px] uppercase tracking-wider mb-0.5" style={{ color: C.textDim }}>
                            {label}
                          </div>
                          <div className="text-[11px] font-semibold" style={{ color: C.textPrimary }}>
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="mx-4 h-px" style={{ backgroundColor: C.border }} />

            {/* Workflow metadata */}
            <div className="p-4 flex flex-col gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.textDim }}>
                Workflow Info
              </span>
              {[
                { label: "Version",   value: "v2.4" },
                { label: "Trigger",   value: "Webhook" },
                { label: "Schedule",  value: "On demand" },
                { label: "Last run",  value: "04:51:03" },
                { label: "Avg time",  value: "38.4 s" },
                { label: "Success",   value: "94 %" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-[11px]" style={{ color: C.textSecondary }}>{label}</span>
                  <span className="text-[11px] font-semibold" style={{ color: C.textPrimary }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-4 h-px" style={{ backgroundColor: C.border }} />

            {/* Quick actions */}
            <div className="p-4 flex flex-col gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: C.textDim }}>
                Quick Actions
              </span>
              {[
                { label: "View run history",  icon: BarChart3 },
                { label: "Export workflow",   icon: FileText  },
                { label: "Add notification",  icon: Bell      },
                { label: "Clone workflow",    icon: RotateCcw },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left transition-all"
                  style={{
                    backgroundColor: C.bgRaised,
                    border: `1px solid ${C.border}`,
                    color: C.textSecondary,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: C.stone }} />
                  <span className="text-[11px]">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom status */}
          <div
            className="h-8 flex items-center justify-between px-4 flex-shrink-0"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            <span className="text-[10px]" style={{ color: C.textDim }}>Project Tx v1.0</span>
            <div className="w-1.5 h-1.5 rounded-full animate-tx-pulse-sage" style={{ backgroundColor: C.sage }} />
          </div>
        </div>
      </div>
    </div>
  );
}
