"use client";

import React, { useState } from "react";
import { Train as TrainIcon, Clock, ShieldCheck, ChevronDown, ChevronUp, ExternalLink, ArrowRight } from "lucide-react";
import { DirectJourney } from "../../lib/types";
import { formatDuration } from "../../lib/engine/calculator";

interface DirectRouteCardProps {
  journey: DirectJourney;
  onBookGuide: (journey: DirectJourney, selectedClass: string) => void;
}

export function DirectRouteCard({ journey, onBookGuide }: DirectRouteCardProps) {
  const [selectedClass, setSelectedClass] = useState<string>(journey.train.classes[0]);
  const [showStops, setShowStops] = useState<boolean>(false);

  const train = journey.train;
  const currentAvail = journey.availabilityByClass[selectedClass];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg transition hover:border-slate-700">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 bg-slate-950/50 px-5 py-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-bold text-amber-400">
            #{train.number}
          </span>
          <span className="font-bold text-white text-sm">{train.name}</span>
          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
            {train.type}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="font-medium">{train.avgPunctualityScore}% Punctuality</span>
          </div>
          <span className="text-slate-400">
            Runs:{" "}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
              .filter((_, idx) => train.runningDays.includes(idx))
              .join(", ")}
          </span>
        </div>
      </div>

      {/* Main Timetable Body */}
      <div className="p-5">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-center">
          {/* Departure */}
          <div className="sm:col-span-3">
            <div className="text-2xl font-black text-white">{journey.departureTime}</div>
            <div className="font-bold text-slate-200">{journey.originHalt.stationName}</div>
            <div className="text-xs font-mono text-amber-400">{journey.originHalt.stationCode}</div>
          </div>

          {/* Duration Line */}
          <div className="flex flex-col items-center justify-center sm:col-span-6">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatDuration(journey.durationMinutes)}</span>
              <span>•</span>
              <span>{journey.distanceKm} km</span>
            </div>

            <div className="relative flex w-full items-center">
              <div className="h-2 w-2 rounded-full bg-red-500 ring-4 ring-red-500/20" />
              <div className="h-0.5 flex-1 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" />
              <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            </div>

            <button
              type="button"
              onClick={() => setShowStops(!showStops)}
              className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-slate-400 transition hover:text-slate-200"
            >
              <span>{train.halts.length} Halts</span>
              {showStops ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Arrival */}
          <div className="text-left sm:col-span-3 sm:text-right">
            <div className="flex items-center gap-1 sm:justify-end">
              <span className="text-2xl font-black text-white">{journey.arrivalTime}</span>
              {journey.daysSpan > 0 && (
                <span className="rounded bg-red-500/10 px-1 text-[11px] font-bold text-red-400 border border-red-500/20">
                  +{journey.daysSpan}D
                </span>
              )}
            </div>
            <div className="font-bold text-slate-200">{journey.destHalt.stationName}</div>
            <div className="text-xs font-mono text-amber-400">{journey.destHalt.stationCode}</div>
          </div>
        </div>

        {/* Classes & Live Seat Status Bar */}
        <div className="mt-5 border-t border-slate-800/80 pt-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Select Class & Availability
          </div>

          <div className="flex flex-wrap gap-2">
            {journey.train.classes.map((cls) => {
              const avail = journey.availabilityByClass[cls];
              const isSelected = selectedClass === cls;

              let statusBg = "border-slate-700 bg-slate-800/70 text-slate-300";
              let badgeColor = "text-slate-400";

              if (avail?.status === "AVAILABLE") {
                statusBg = isSelected
                  ? "border-emerald-500 bg-emerald-950/60 ring-2 ring-emerald-500/30"
                  : "border-emerald-800/40 bg-emerald-950/20 hover:border-emerald-600";
                badgeColor = "text-emerald-400 font-bold";
              } else if (avail?.status === "RAC") {
                statusBg = isSelected
                  ? "border-amber-500 bg-amber-950/60 ring-2 ring-amber-500/30"
                  : "border-amber-800/40 bg-amber-950/20 hover:border-amber-600";
                badgeColor = "text-amber-400 font-bold";
              } else if (avail?.status === "WL") {
                statusBg = isSelected
                  ? "border-red-500 bg-red-950/60 ring-2 ring-red-500/30"
                  : "border-red-800/40 bg-red-950/20 hover:border-red-600";
                badgeColor = "text-red-400 font-bold";
              }

              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`flex flex-col rounded-xl border p-2.5 text-left transition min-w-[105px] ${statusBg}`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-white text-sm">{cls}</span>
                    <span className="text-xs font-semibold text-slate-300">₹{avail?.fare}</span>
                  </div>
                  <div className={`text-xs mt-1 truncate ${badgeColor}`}>
                    {avail?.code || "REGRET"}
                  </div>
                  {avail?.status === "WL" && (
                    <div className="text-[10px] text-slate-400">
                      {avail.probability}% confirm
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3 text-xs">
          <div className="text-slate-400">
            Selected: <span className="font-bold text-white">{selectedClass}</span> • Fare:{" "}
            <span className="font-bold text-emerald-400">₹{currentAvail?.fare}</span> • Status:{" "}
            <span className="font-bold text-white">{currentAvail?.code}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onBookGuide(journey, selectedClass)}
              className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 font-bold text-white shadow transition hover:bg-red-500 active:scale-95"
            >
              <span>Booking Instructions</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Collapsible Halts Table */}
        {showStops && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Route & Stoppage Schedule
            </div>
            <div className="max-h-48 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-1.5 font-semibold">Station</th>
                    <th className="pb-1.5 font-semibold">Arr</th>
                    <th className="pb-1.5 font-semibold">Dep</th>
                    <th className="pb-1.5 font-semibold">Halt</th>
                    <th className="pb-1.5 font-semibold text-right">Distance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {train.halts.map((h, i) => (
                    <tr key={i} className="hover:bg-slate-900/50">
                      <td className="py-1.5 font-medium">
                        {h.stationName} <span className="text-amber-400 font-mono">({h.stationCode})</span>
                      </td>
                      <td className="py-1.5">{h.arrivalTime}</td>
                      <td className="py-1.5">{h.departureTime}</td>
                      <td className="py-1.5">{h.haltMinutes > 0 ? `${h.haltMinutes}m` : "--"}</td>
                      <td className="py-1.5 text-right font-mono">{h.distanceKm} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
