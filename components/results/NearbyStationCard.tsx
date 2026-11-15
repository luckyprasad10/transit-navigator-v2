"use client";

import React from "react";
import { MapPin, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { NearbyStationAlternative } from "../../lib/types";
import { formatDuration } from "../../lib/engine/calculator";

interface NearbyStationCardProps {
  alt: NearbyStationAlternative;
  onBookGuide: (alt: NearbyStationAlternative) => void;
}

export function NearbyStationCard({ alt, onBookGuide }: NearbyStationCardProps) {
  const { train, altFrom, altTo, originalFrom, originalTo, journey, availability } = alt;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg transition hover:border-slate-700">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-400 border border-amber-500/20">
            NEARBY TERMINAL ROUTE
          </span>
          <span className="font-bold text-white text-sm">
            #{train.number} - {train.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
            {availability.code}
          </span>
          <span className="text-slate-400 font-semibold">₹{availability.fare}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
        {/* Origin */}
        <div className="sm:col-span-4">
          <div className="text-xl font-black text-white">{journey.departureTime}</div>
          <div className="font-bold text-slate-200">{altFrom.name}</div>
          <div className="text-xs text-amber-400 font-mono">
            {altFrom.code}
            {altFrom.code !== originalFrom.code && (
              <span className="text-slate-400 ml-1 font-sans">
                (~{alt.distanceFromOriginalKm || 12}km from {originalFrom.code})
              </span>
            )}
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col items-center justify-center sm:col-span-4">
          <span className="text-xs text-slate-400 mb-1">{formatDuration(journey.durationMinutes)}</span>
          <div className="flex w-full items-center">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <div className="h-0.5 flex-1 bg-slate-700" />
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[11px] text-slate-400 mt-1">{journey.distanceKm} km</span>
        </div>

        {/* Destination */}
        <div className="text-left sm:col-span-4 sm:text-right">
          <div className="text-xl font-black text-white">{journey.arrivalTime}</div>
          <div className="font-bold text-slate-200">{altTo.name}</div>
          <div className="text-xs text-amber-400 font-mono">
            {altTo.code}
            {altTo.code !== originalTo.code && (
              <span className="text-slate-400 ml-1 font-sans">
                (~{alt.distanceFromOriginalKm || 15}km from {originalTo.code})
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
        <div className="text-slate-400">
          Switching origin/destination terminal within city cluster unlocks available quotas.
        </div>

        <button
          type="button"
          onClick={() => onBookGuide(alt)}
          className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3.5 py-1.5 font-bold text-white transition hover:bg-slate-700 active:scale-95"
        >
          <span>Booking Details</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
