"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { SameTrainAlternate } from "../../lib/types";

interface SameTrainHackCardProps {
  hack: SameTrainAlternate;
  onOpenGuide: (hack: SameTrainAlternate) => void;
}

export function SameTrainHackCard({ hack, onOpenGuide }: SameTrainHackCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { train, originStation, destStation, bookFromStation, bookToStation, hackType, originalStatus, newStatus, extraFareCost } = hack;

  function copyInstructions() {
    const text = hack.howToBookInstructions.join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-xl shadow-emerald-950/20 transition hover:border-emerald-500/70">
      {/* Top Value Prop Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-amber-400">#{train.number}</span>
              <span className="font-bold text-white text-sm">{train.name}</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400">
              {hackType === "BOOK_EARLIER_STATION"
                ? "Book from Earlier Station • Board at Your Station"
                : "Book to Further Station • Deboard Early"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
            Confirmed Berth Available
          </span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Direct Booking (Waitlisted) */}
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-red-400 mb-1">
            Normal Direct Search (Blocked)
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-slate-200">
              {originStation.code} → {destStation.code}
            </span>
            <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-400">
              {originalStatus.code}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {originalStatus.probability}% confirmation probability. High risk of journey cancellation.
          </p>
        </div>

        {/* Same-Train Hack (Guaranteed) */}
        <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/20 p-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            Same-Train Quota Hack (Guaranteed)
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-white">
              {bookFromStation.code} → {bookToStation.code}
            </span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">
              {newStatus.code}
            </span>
          </div>
          <p className="mt-1 text-xs text-emerald-300/80">
            Board at <strong className="text-white">{originStation.name}</strong> • Extra Fare:{" "}
            <strong className="text-white font-bold">₹{extraFareCost}</strong>
          </p>
        </div>
      </div>

      {/* Step by step action bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3 text-xs">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 font-semibold text-slate-300 hover:text-white"
        >
          <span>How this hack works on IRCTC</span>
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyInstructions}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied Steps!" : "Copy Booking Steps"}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenGuide(hack)}
            className="rounded-lg bg-emerald-600 px-4 py-1.5 font-bold text-white transition hover:bg-emerald-500"
          >
            Open Booking Guide
          </button>
        </div>
      </div>

      {/* Expanded Instruction Steps */}
      {expanded && (
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs">
          <div className="font-bold text-white mb-2">Step-by-Step IRCTC Execution:</div>
          <ol className="space-y-1.5 text-slate-300">
            {hack.howToBookInstructions.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/50 text-[10px]">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
