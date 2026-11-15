"use client";

import React from "react";
import { Check, X, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, Zap, HelpCircle } from "lucide-react";

interface ComparisonRow {
  capability: string;
  category: string;
  irctcStatus: boolean;
  irctcText: string;
  navigatorStatus: boolean;
  navigatorText: string;
  impact: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    capability: "Multi-Station Metropolitan Clustering",
    category: "Search Intelligence",
    irctcStatus: false,
    irctcText: "Only searches 1 strict station code at a time (e.g. miss trains running from NZM if searching NDLS).",
    navigatorStatus: true,
    navigatorText: "Automatically aggregates all city terminals (Delhi: 6 terminals, Mumbai: 9 terminals) in 1 click.",
    impact: "Unlocks 300% more trains per search query.",
  },
  {
    capability: "Same-Train Quota Workarounds (Waitlist Bypass)",
    category: "Seat Allocation Hacks",
    irctcStatus: false,
    irctcText: "Shows 'WL 140' and blocks you from seeing remote-station unreserved quotas on that same train.",
    navigatorStatus: true,
    navigatorText: "Scans origin and terminating quotas. Suggests booking from station -1 with legal boarding point change.",
    impact: "Converts Waitlisted tickets into Confirmed (CNF) berths.",
  },
  {
    capability: "2-Leg Connecting Hubs with IRCTC Linked PNR",
    category: "Alternative Routing",
    irctcStatus: false,
    irctcText: "No intelligent transfer suggestions if direct trains are fully booked.",
    navigatorStatus: true,
    navigatorText: "Graph-routed intermediate junctions (Kanpur, Bhopal, Vadodara) with official full refund guarantee if missed.",
    impact: "Guaranteed travel even during peak festive rush (Diwali / Chhath).",
  },
  {
    capability: "Nearby Satellite Terminal Discovery",
    category: "Smart Geography",
    irctcStatus: false,
    irctcText: "Fails to suggest adjacent junctions just 15-30km away with confirmed seats.",
    navigatorStatus: true,
    navigatorText: "Calculates distance to alternate terminals (e.g. Borivali / Thane / Ghaziabad) with local transit advice.",
    impact: "Saves hours of futile refresh cycles.",
  },
  {
    capability: "Visual Interface & Modern Experience",
    category: "User Experience",
    irctcStatus: false,
    irctcText: "Cluttered with ad banners, timeout disconnects, and aggressive anti-bot captchas.",
    navigatorStatus: true,
    navigatorText: "Ultra-fast glassmorphic UI, cinematic train telemetry, zero ads, and instant sub-10ms queries.",
    impact: "Effortless, delightful rail discovery on desktop & mobile.",
  },
  {
    capability: "Actionable IRCTC Step-by-Step Booking Guide",
    category: "Execution",
    irctcStatus: false,
    irctcText: "Leaves the traveler guessing how to apply complex railway rules.",
    navigatorStatus: true,
    navigatorText: "Generates 1-click copy codes, official rules, and exact boarding point instructions for IRCTC.",
    impact: "100% compliant with Indian Railways commercial rules.",
  },
];

export function ComparisonMatrix() {
  return (
    <section className="relative mt-20 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-2xl sm:p-10">
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-semibold text-amber-300">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span>Why We Built Transit Navigator</span>
        </div>
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl md:text-4xl tracking-tight">
          Standard IRCTC vs. Transit Navigator PRO
        </h2>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          See how our intelligent multi-hop routing, quota optimization, and city clustering solve the age-old frustrations of booking train tickets in India.
        </p>
      </div>

      {/* Comparison Table / Cards */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="pb-4 pt-2 font-bold uppercase tracking-wider text-slate-300 w-1/4">
                Capability
              </th>
              <th className="pb-4 pt-2 font-bold uppercase tracking-wider text-red-400/90 w-3/8">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-red-500" />
                  <span>Standard IRCTC Search</span>
                </div>
              </th>
              <th className="pb-4 pt-2 font-bold uppercase tracking-wider text-emerald-400 w-3/8">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 badge-pulse" />
                  <span>Transit Navigator PRO</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {COMPARISON_DATA.map((row, idx) => (
              <tr
                key={idx}
                className="group transition-colors hover:bg-slate-800/30"
              >
                {/* Capability & Category */}
                <td className="py-4 pr-4 align-top">
                  <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                    {row.capability}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-slate-400">
                    {row.category}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 rounded bg-slate-800/80 px-2 py-0.5 text-[10px] text-amber-300/90">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>{row.impact}</span>
                  </div>
                </td>

                {/* IRCTC Flaw */}
                <td className="py-4 pr-4 align-top">
                  <div className="rounded-xl border border-red-900/30 bg-red-950/20 p-3.5">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                        <X className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span className="text-slate-300 leading-relaxed font-normal">
                        {row.irctcText}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Transit Navigator Solution */}
                <td className="py-4 align-top">
                  <div className="rounded-xl border border-emerald-800/40 bg-gradient-to-r from-emerald-950/30 to-slate-900/60 p-3.5 shadow-sm">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span className="text-emerald-200 leading-relaxed font-medium">
                        {row.navigatorText}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Guarantee Banner */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-blue-800/30 bg-blue-950/20 p-4 text-xs text-blue-200">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-blue-400 shrink-0" />
          <div>
            <span className="font-bold text-white">100% Legal & IRCTC Compliant:</span> We do not bypass IRCTC ticketing or use automated scrapers. We calculate mathematical graph routes and official commercial quota loopholes, and you book safely on IRCTC directly.
          </div>
        </div>
      </div>
    </section>
  );
}
