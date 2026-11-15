"use client";

import React from "react";
import { ArrowLeftRight, Calendar, Search, Sparkles, Navigation, Flame } from "lucide-react";
import { StationSelector } from "./StationSelector";

interface SearchHeaderProps {
  fromStation: string;
  toStation: string;
  travelDate: string;
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  onDateChange: (val: string) => void;
  onSearch: () => void;
  onSwap: () => void;
}

export function SearchHeader({
  fromStation,
  toStation,
  travelDate,
  onFromChange,
  onToChange,
  onDateChange,
  onSearch,
  onSwap,
}: SearchHeaderProps) {
  // Quick date shortcuts
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(today.getDate() + 2);

  const formatDateValue = (d: Date) => d.toISOString().split("T")[0];

  const popularCorridors = [
    { label: "Delhi ⇄ Mumbai", from: "DELHI", to: "MUMBAI" },
    { label: "Delhi ⇄ Agra", from: "DELHI", to: "AGC" },
    { label: "Delhi ⇄ Varanasi", from: "DELHI", to: "VARANASI" },
    { label: "Delhi ⇄ Katra", from: "DELHI", to: "SVDK" },
    { label: "Mumbai ⇄ Goa", from: "MUMBAI", to: "GOA" },
    { label: "Bengaluru ⇄ Kochi", from: "BENGALURU", to: "KOCHI" },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl transition-all hover:border-red-500/30">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-amber-600/15 blur-3xl" />

      {/* Top Header & Popular Corridors */}
      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-300">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>High-Speed Graph Search</span>
          </div>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl tracking-tight">
            Plan Your Journey
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Search multi-station clusters, quota bypass loopholes, and verified junction connections.
          </p>
        </div>

        {/* Quick popular routes */}
        <div className="hidden xl:flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <span className="text-slate-400 font-semibold mr-1">Hot Routes:</span>
          {popularCorridors.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onFromChange(c.from);
                onToChange(c.to);
                setTimeout(onSearch, 50);
              }}
              className="rounded-full border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-slate-300 transition-all hover:border-red-500/50 hover:bg-slate-700 hover:text-white"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Search Inputs Grid */}
      <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
        {/* From Station */}
        <div className="lg:col-span-4">
          <StationSelector
            label="From (Origin / City Cluster)"
            placeholder="Type city (e.g. Delhi) or station code"
            value={fromStation}
            onChange={onFromChange}
          />
        </div>

        {/* Swap Button */}
        <div className="flex items-center justify-center lg:col-span-1 lg:mb-1.5">
          <button
            type="button"
            onClick={onSwap}
            aria-label="Swap Stations"
            className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-800/80 text-slate-300 shadow-lg backdrop-blur-md transition-all hover:border-red-500 hover:bg-slate-700 hover:text-white active:scale-95"
          >
            <ArrowLeftRight className="h-4 w-4 transition duration-300 group-hover:rotate-180 text-amber-400" />
          </button>
        </div>

        {/* To Station */}
        <div className="lg:col-span-4">
          <StationSelector
            label="To (Destination / City Cluster)"
            placeholder="Type city (e.g. Mumbai) or station code"
            value={toStation}
            onChange={onToChange}
          />
        </div>

        {/* Travel Date */}
        <div className="lg:col-span-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Journey Date
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Calendar className="h-4 w-4 text-red-400" />
            </div>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => onDateChange(e.target.value)}
              min={formatDateValue(today)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/90 py-3 pl-10 pr-3 text-sm font-semibold text-white shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>
      </div>

      {/* Date Shortcuts & Search Action Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
        {/* Quick Date Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Date:</span>
          <button
            type="button"
            onClick={() => onDateChange(formatDateValue(today))}
            className={`rounded-xl px-3 py-1.5 font-bold transition-all ${
              travelDate === formatDateValue(today)
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => onDateChange(formatDateValue(tomorrow))}
            className={`rounded-xl px-3 py-1.5 font-bold transition-all ${
              travelDate === formatDateValue(tomorrow)
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Tomorrow
          </button>
          <button
            type="button"
            onClick={() => onDateChange(formatDateValue(dayAfter))}
            className={`rounded-xl px-3 py-1.5 font-bold transition-all ${
              travelDate === formatDateValue(dayAfter)
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Day After
          </button>
        </div>

        {/* Search CTA Button */}
        <button
          type="button"
          onClick={onSearch}
          className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 px-7 py-3 text-sm font-black text-white shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02] hover:from-red-500 hover:to-amber-500 active:scale-95"
        >
          <Search className="h-4 w-4" />
          <span>Discover Alternative Routes</span>
        </button>
      </div>
    </div>
  );
}
