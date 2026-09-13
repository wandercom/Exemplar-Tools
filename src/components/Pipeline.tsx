import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield, Brain, Sparkles,
  ChevronRight, ChevronDown, ExternalLink,
} from "lucide-react";

/* ─── Utility: scroll-triggered fade-in ─── */
function A({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

const stages = [
  {
    id: "specify",
    label: "SPECIFY",
    color: "governance",
    projects: [
      { name: "Constrain", desc: "Interactive constraint elicitation. Interviews users to extract project boundaries." },
      { name: "Ledger", desc: "Schema registry and data obligation manager. Field-level classifications." },
      { name: "Covenant", desc: "Runtime contract validation with environment policies and violation budgets." },
    ],
  },
  {
    id: "build",
    label: "BUILD",
    color: "governance",
    projects: [
      { name: "Pact", desc: "Contract-first multi-agent framework. 10-phase pipeline, 1,814 tests." },
      { name: "Stack Smoke", desc: "Cross-stack smoke tests prove the tool suite works together." },
    ],
  },
  {
    id: "deploy",
    label: "DEPLOY",
    color: "governance",
    projects: [
      { name: "Baton", desc: "Cloud-agnostic circuit orchestration. Pre-wired topologies, canary promotion, self-healing. 804 tests." },
      { name: "Aegis", desc: "Timeouts, fallbacks, and structured budgets for blocking calls." },
      { name: "Scram", desc: "Emergency kill-switch when rollback must be immediate." },
    ],
  },
  {
    id: "observe",
    label: "OBSERVE",
    color: "governance",
    projects: [
      { name: "Sentinel", desc: "Production attribution via PACT keys. Spawns LLM fixer agents." },
      { name: "Arbiter", desc: "Trust enforcement. Append-only ledger, blast-radius classification." },
      { name: "Vigil", desc: "Sub-threshold anomaly detection across event streams and traces." },
      { name: "Witness", desc: "Human-in-the-loop approvals with rationale and audit trails." },
      { name: "Kindex", desc: "Persistent knowledge graph. Shared memory for the entire agent ecosystem." },
    ],
  },
  {
    id: "tighten",
    label: "TIGHTEN",
    color: "governance",
    projects: [
      { name: "Pact", desc: "Tightened contracts pushed back from production. Bug classes become non-recurring." },
    ],
  },
];

export default function Pipeline() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pipeline" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 grid-texture opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <A className="text-center mb-4">
          <span className="font-mono text-xs text-governance uppercase tracking-widest">The Pipeline</span>
        </A>
        <A className="text-center mb-6" delay={0.05}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Production drives specification forward
          </h2>
        </A>
        <A className="text-center mb-16" delay={0.1}>
          <p className="text-muted max-w-xl mx-auto">
            Not a waterfall. Not a cycle. A closed loop where every production incident tightens the contract that caused it.
          </p>
        </A>

        {/* Pipeline stages */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-px bg-border hidden lg:block" />
          {inView && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="absolute top-[52px] left-[10%] right-[10%] h-px bg-gradient-to-r from-governance/60 via-governance/40 to-governance/60 origin-left hidden lg:block"
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stages.map((stage, i) => {
              const isActive = active === stage.id;
              return (
                <A key={stage.id} delay={0.15 + i * 0.08}>
                  <button
                    onClick={() => setActive(isActive ? null : stage.id)}
                    className={`
                      w-full text-left rounded-lg border transition-all duration-300 group
                      ${isActive
                        ? "bg-card-hover border-governance/40 shadow-[0_0_30px_rgba(16,185,129,0.06)]"
                        : "bg-card border-border hover:border-border-bright hover:bg-card-hover"
                      }
                    `}
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-mono text-[11px] font-medium tracking-widest ${isActive ? "text-governance" : "text-muted"}`}>
                          {stage.label}
                        </span>
                        <span className="font-mono text-[10px] text-dim">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        {stage.projects.map((p) => (
                          <span key={p.name} className="bg-surface px-2 py-0.5 rounded font-mono text-[11px]">
                            {p.name}
                          </span>
                        ))}
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-dim mt-3 mx-auto transition-transform ${isActive ? "rotate-180 text-governance" : ""}`} />
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-border">
                            {stage.projects.map((p) => (
                              <div key={p.name} className="mt-4">
                                <h4 className="text-sm font-semibold mb-1">{p.name}</h4>
                                <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Arrow between stages (desktop) */}
                  {i < stages.length - 1 && (
                    <div className="hidden lg:flex justify-center mt-2">
                      <ChevronRight className="w-4 h-4 text-dim" />
                    </div>
                  )}
                </A>
              );
            })}
          </div>

          {/* Loop-back arrow */}
          <A delay={0.7}>
            <div className="flex items-center justify-center mt-8 gap-3">
              <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-governance/30" />
              <div className="flex items-center gap-2 font-mono text-[11px] text-governance/70 uppercase tracking-widest">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 4M4 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Closed Loop
              </div>
              <div className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-governance/30" />
            </div>
          </A>

          {/* Spanning layers */}
          <A delay={0.8}>
            <div className="mt-12 space-y-3">
              <div className="flex items-center gap-4 px-4 py-3 rounded-md border border-signet/20 bg-signet-dim">
                <Shield className="w-4 h-4 text-signet shrink-0" />
                <div className="flex-1">
                  <span className="font-mono text-[11px] text-signet uppercase tracking-widest">Trust Layer</span>
                  <span className="text-xs text-muted ml-3">Signet — cryptographic vault, ZK proofs, policy enforcement across every stage</span>
                </div>
                <a href="https://signet.tools" target="_blank" rel="noopener noreferrer" className="text-signet hover:text-signet/80 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="flex items-center gap-4 px-4 py-3 rounded-md border border-kindex/20 bg-kindex-dim">
                <Brain className="w-4 h-4 text-kindex shrink-0" />
                <div className="flex-1">
                  <span className="font-mono text-[11px] text-kindex uppercase tracking-widest">Intelligence</span>
                  <span className="text-xs text-muted ml-3">Kindex — persistent knowledge graph feeding context to every stage</span>
                </div>
                <a href="https://kindex.tools" target="_blank" rel="noopener noreferrer" className="text-kindex hover:text-kindex/80 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="flex items-center gap-4 px-4 py-3 rounded-md border border-optimize/20 bg-optimize-dim">
                <Sparkles className="w-4 h-4 text-optimize shrink-0" />
                <div className="flex-1">
                  <span className="font-mono text-[11px] text-optimize uppercase tracking-widest">Optimization Layer</span>
                  <span className="text-xs text-muted ml-3">Transmogrifier — register-aware prompt normalization across Constrain, Pact, and all downstream LLM calls</span>
                </div>
                <a href="https://github.com/wandercom/transmogrifier" target="_blank" rel="noopener noreferrer" className="text-optimize hover:text-optimize/80 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </A>
        </div>
      </div>
    </section>
  );
}
