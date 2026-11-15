"use client";

import React, { useState } from "react";
import { ArrowRight, Clock, ShieldCheck, AlertTriangle, Coffee, Info, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { ConnectingJourney } from "../../lib/types";
import { formatDuration } from "../../lib/engine/calculator";

interface ConnectingRouteCardProps {
  journey: ConnectingJourney;
  onBookGuide: (journey: ConnectingJourney) => void;
}

export function ConnectingRouteCard({ journey, onBookGuide }: ConnectingRouteCardProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const { leg1, leg2, hubStation, layoverMinutes, safetyScore, safetyReason, isPnrLinkable } = journey;

  let safetyBadge = {
    bg: "bg-emerald-950/60 border-emerald-800/40 text-emerald-400",
    icon: <ShieldCheck className="h-4 w-4" />,
    label: "Safe Connection",
  };

  if (safetyScore === "RISKY") {
    safetyBadge = {
      bg: "bg-red-950/60 border-red-800/40 text-red-400",
      icon: <AlertTriangle className="h-4 w-4" />,
      label: "Tight Connection (<75m)",
    };
  } else if (safetyScore === "MODERATE") {
    safetyBadge = {
      bg: "bg-blue-950/60 border-blue-800/40 text-blue-400",
      icon: <Clock className="h-4 w-4" />,
      label: "Moderate Buffer",
    };
  } else if (safetyScore === "LONG") {
    safetyBadge = {
      bg: "bg-amber-950/60 border-amber-800/40 text-amber-400",
      icon: <Coffee className="h-4 w-4" />,
      label: "Extended Layover",
    };
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl transition hover:border-slate-700">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 bg-slate-950/60 px-5 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-400 border border-blue-500/20">
            2-LEG CONNECTING ROUTE
          </span>
          <span className="font-semibold text-slate-300">
            via <strong className="text-white">{hubStation.name} ({hubStation.code})</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${safetyBadge.bg}`}>
            {safetyBadge.icon}
            <span>{safetyBadge.label} ({formatDuration(layoverMinutes)})</span>
          </div>

          <div className="text-slate-400">
            Total: <strong className="text-white">{formatDuration(journey.totalDurationMinutes)}</strong>
          </div>
        </div>
      </div>

      {/* Main Multi-Leg Timeline */}
      <div className="p-5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-11 lg:items-center">
          {/* Leg 1: Train 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 lg:col-span-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono font-bold text-amber-400">#{leg1.train.number}</span>
              <span className="font-bold text-white truncate max-w-[150px]">{leg1.train.name}</span>
              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">{leg1.train.type}</span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div>
                <div className="text-lg font-black text-white">{leg1.departureTime}</div>
                <div className="text-xs font-semibold text-slate-300">{leg1.originHalt.stationName}</div>
                <div className="text-[10px] font-mono text-amber-400">{leg1.originHalt.stationCode}</div>
              </div>

              <div className="flex flex-col items-center px-2">
                <span className="text-[11px] text-slate-400 mb-1">{formatDuration(leg1.durationMinutes)}</span>
                <div className="h-0.5 w-16 bg-gradient-to-r from-red-500 to-blue-500" />
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-white">{leg1.destHalt.arrivalTime}</div>
                <div className="text-xs font-semibold text-slate-300">{leg1.destHalt.stationName}</div>
                <div className="text-[10px] font-mono text-amber-400">{leg1.destHalt.stationCode}</div>
              </div>
            </div>
          </div>

          {/* Hub Transfer Indicator */}
          <div className="flex flex-col items-center justify-center lg:col-span-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold text-blue-300 mt-1 whitespace-nowrap">
              {formatDuration(layoverMinutes)} layover
            </span>
          </div>

          {/* Leg 2: Train 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 lg:col-span-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono font-bold text-amber-400">#{leg2.train.number}</span>
              <span className="font-bold text-white truncate max-w-[150px]">{leg2.train.name}</span>
              <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">{leg2.train.type}</span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div>
                <div className="text-lg font-black text-white">{leg2.departureTime}</div>
                <div className="text-xs font-semibold text-slate-300">{leg2.originHalt.stationName}</div>
                <div className="text-[10px] font-mono text-amber-400">{leg2.originHalt.stationCode}</div>
              </div>

              <div className="flex flex-col items-center px-2">
                <span className="text-[11px] text-slate-400 mb-1">{formatDuration(leg2.durationMinutes)}</span>
                <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-emerald-500" />
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-white">{leg2.destHalt.arrivalTime}</div>
                <div className="text-xs font-semibold text-slate-300">{leg2.destHalt.stationName}</div>
                <div className="text-[10px] font-mono text-amber-400">{leg2.destHalt.stationCode}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Protection Banner & Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3 text-xs">
          <div className="flex items-center gap-2">
            {isPnrLinkable ? (
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="h-4 w-4" />
                IRCTC Linked PNR Protected (100% Refund if Train 1 Delays)
              </span>
            ) : (
              <span className="text-slate-400 flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                {safetyReason}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-slate-400">
              Est. Total Fare: <strong className="text-white text-sm">₹{journey.totalFareEstimate}</strong>
            </div>

            <button
              type="button"
              onClick={() => onBookGuide(journey)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 font-bold text-white shadow transition hover:bg-blue-500 active:scale-95"
            >
              <span>Booking & PNR Guide</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
