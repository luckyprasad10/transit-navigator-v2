"use client";

import React, { useState } from "react";
import { X, ExternalLink, Check, Copy, ShieldCheck, AlertCircle, Train, ArrowRight } from "lucide-react";
import { ConnectingJourney, DirectJourney, SameTrainAlternate, NearbyStationAlternative } from "../../lib/types";

interface BookingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  data:
    | { type: "DIRECT"; item: DirectJourney; selectedClass: string }
    | { type: "CONNECTING"; item: ConnectingJourney }
    | { type: "HACK"; item: SameTrainAlternate }
    | { type: "NEARBY"; item: NearbyStationAlternative }
    | null;
}

export function BookingGuideModal({ isOpen, onClose, data }: BookingGuideModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  let title = "IRCTC Booking Copilot";
  let steps: string[] = [];
  let tip = "";

  if (data.type === "DIRECT") {
    const { item, selectedClass } = data;
    title = `Direct Booking: #${item.train.number} ${item.train.name} (${selectedClass})`;
    steps = [
      `Go to IRCTC portal (irctc.co.in) and log into your account.`,
      `In the search box, enter From: "${item.originHalt.stationCode}" and To: "${item.destHalt.stationCode}".`,
      `Select your journey date and class: "${selectedClass}".`,
      `Locate Train #${item.train.number} (${item.train.name}) departing at ${item.departureTime}.`,
      `Click 'Book Now', fill in passenger details, and complete payment.`,
    ];
    tip = `Booking opens 120 days in advance at 08:00 AM IST for General Quota and 10:00 AM (AC) / 11:00 AM (Non-AC) for Tatkal.`;
  } else if (data.type === "CONNECTING") {
    const { item } = data;
    title = `2-Leg Connecting Journey via ${item.hubStation.name} (${item.hubStation.code})`;
    steps = [
      `Login to IRCTC (irctc.co.in). You will book TWO linked tickets under your user ID.`,
      `Leg 1: Search "${item.leg1.originHalt.stationCode}" to "${item.hubStation.code}" on Train #${item.leg1.train.number}. Book and note the PNR number.`,
      `Leg 2 (Connecting PNR): Search "${item.hubStation.code}" to "${item.leg2.destHalt.stationCode}" on Train #${item.leg2.train.number}.`,
      `CRITICAL: On the Leg 2 search page, CHECK the box "Connecting Journey Booking" and enter your Leg 1 PNR!`,
      `Complete the booking for Train 2.`,
    ];
    tip = `PROTECTION GUARANTEE: When you link PNRs via IRCTC Connecting Journey, if Train 1 runs late causing you to miss Train 2, Indian Railways gives you a 100% full refund on Train 2 without cancellation charges!`;
  } else if (data.type === "HACK") {
    const { item } = data;
    title = `Same-Train Quota Hack: Train #${item.train.number}`;
    steps = item.howToBookInstructions;
    tip = `WHY THIS WORKS: Indian Railways divides coach berths into distinct quota pools (Remote Location Quota vs Origin Quota). By booking from ${item.bookFromStation.code} and setting your Boarding Point to ${item.boardingStation.code}, you utilize the larger quota while boarding legally at your chosen station.`;
  } else if (data.type === "NEARBY") {
    const { item } = data;
    title = `Alternative Station Route: #${item.train.number}`;
    steps = [
      `Head to IRCTC and enter Origin: "${item.altFrom.name} (${item.altFrom.code})" instead of the primary station.`,
      `Enter Destination: "${item.altTo.name} (${item.altTo.code})".`,
      `Select Train #${item.train.number} (${item.train.name}) which has confirmed seat availability.`,
      `Book normally. This station is located ~12km within the same metropolitan cluster.`,
    ];
    tip = `Metro rail and local suburban trains connect all terminals in this cluster within 25–40 minutes.`;
  }

  function handleCopy() {
    const text = `${title}\n\nSteps:\n${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nTip: ${tip}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
              <Train className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">{title}</h3>
              <p className="text-xs text-slate-400">Step-by-step IRCTC booking walkthrough</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="mt-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Booking Instructions:
          </div>
          <ol className="space-y-2.5">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-950 text-red-400 font-bold border border-red-800/40 text-[10px]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tip Box */}
        {tip && (
          <div className="mt-5 rounded-2xl border border-emerald-800/40 bg-emerald-950/30 p-3.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Pro Tip & Official Indian Railways Rule</span>
            </div>
            <p className="text-emerald-200/90 leading-relaxed">{tip}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied to Clipboard!" : "Copy Instructions"}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href="https://www.irctc.co.in/nget/train-search"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/20 transition hover:from-red-500 hover:to-amber-500 active:scale-95"
            >
              <span>Open IRCTC Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
