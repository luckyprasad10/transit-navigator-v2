"use client";

import React from "react";
import { Train, Sparkles, Compass, ShieldCheck, MapPin, Radio } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 text-white shadow-xl shadow-red-600/25 ring-1 ring-white/20">
            <Train className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                Transit <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">Navigator</span>
              </span>
              <span className="rounded-full bg-gradient-to-r from-red-500/20 to-amber-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-amber-300 border border-amber-500/30">
                PRO 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
              Smart Alternative Route Discovery &amp; Travel Explorer
            </p>
          </div>
        </div>

        {/* Value Prop Badges */}
        <div className="hidden lg:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-semibold">Same-Train Quota Hacks</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-400 bg-blue-950/40 border border-blue-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Compass className="h-3.5 w-3.5" />
            <span className="font-semibold">2-Leg Connecting Hubs</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 bg-amber-950/40 border border-amber-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="font-semibold">IRCTC Linked PNR Guard</span>
          </div>
        </div>

        {/* Right Nav Links */}
        <div className="flex items-center gap-3">
          <a
            href="#explore-india"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition hover:text-white"
          >
            <MapPin className="h-3.5 w-3.5 text-red-400" />
            <span>Explore India</span>
          </a>
          <a
            href="https://www.irctc.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 px-3.5 py-1.5 text-xs font-bold text-white shadow-md transition hover:border-red-500/40 hover:bg-slate-700"
          >
            <span>Launch IRCTC</span>
            <span className="text-red-400">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
