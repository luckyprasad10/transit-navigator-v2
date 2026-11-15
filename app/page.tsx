"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "../components/Navbar";
import { TrainVideoHero } from "../components/hero/TrainVideoHero";
import { SearchHeader } from "../components/search/SearchHeader";
import { FamousDestinations } from "../components/explore/FamousDestinations";
import { ComparisonMatrix } from "../components/explainer/ComparisonMatrix";
import { DirectRouteCard } from "../components/results/DirectRouteCard";
import { ConnectingRouteCard } from "../components/results/ConnectingRouteCard";
import { SameTrainHackCard } from "../components/results/SameTrainHackCard";
import { NearbyStationCard } from "../components/results/NearbyStationCard";
import { BookingGuideModal } from "../components/modal/BookingGuideModal";
import { searchRoutes } from "../lib/engine/router";
import { DirectJourney, ConnectingJourney, SameTrainAlternate, NearbyStationAlternative } from "../lib/types";
import { Train, Sparkles, Compass, MapPin, Filter, ArrowUpDown, Info, ShieldCheck, Zap, Activity } from "lucide-react";

export default function Home() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [fromStation, setFromStation] = useState<string>("DELHI");
  const [toStation, setToStation] = useState<string>("MUMBAI");
  const [travelDate, setTravelDate] = useState<string>(tomorrowStr);

  const [activeTab, setActiveTab] = useState<"DIRECT" | "HACKS" | "CONNECTING" | "NEARBY">("DIRECT");
  const [classFilter, setClassFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"DEPARTURE" | "DURATION" | "AVAILABILITY">("DEPARTURE");

  // Modal State
  const [modalData, setModalData] = useState<
    | { type: "DIRECT"; item: DirectJourney; selectedClass: string }
    | { type: "CONNECTING"; item: ConnectingJourney }
    | { type: "HACK"; item: SameTrainAlternate }
    | { type: "NEARBY"; item: NearbyStationAlternative }
    | null
  >(null);

  // Compute search results
  const searchResults = useMemo(() => {
    return searchRoutes(fromStation, toStation, travelDate);
  }, [fromStation, toStation, travelDate]);

  function handleSwap() {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  }

  function handleDestinationSelect(fromCluster: string, toCluster: string) {
    setFromStation(fromCluster);
    setToClusterHandler(toCluster);
  }

  function setToClusterHandler(toCluster: string) {
    setToStation(toCluster);
    // Smooth scroll to search area
    setTimeout(() => {
      const el = document.getElementById("search-results-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }

  // Filtered direct routes
  const filteredDirectRoutes = useMemo(() => {
    let routes = [...searchResults.directRoutes];
    if (classFilter !== "ALL") {
      routes = routes.filter((r) => r.train.classes.includes(classFilter));
    }
    if (sortBy === "DURATION") {
      routes.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === "AVAILABILITY") {
      routes.sort((a, b) => {
        const aStatus = Object.values(a.availabilityByClass)[0]?.status === "AVAILABLE" ? 1 : 0;
        const bStatus = Object.values(b.availabilityByClass)[0]?.status === "AVAILABLE" ? 1 : 0;
        return bStatus - aStatus;
      });
    }
    return routes;
  }, [searchResults.directRoutes, classFilter, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-500 selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 flex-1">
        {/* 2. Cinematic Train Video Hero with Kinetic Vande Bharat Simulation */}
        <TrainVideoHero />

        {/* 3. Search Header & Station Cluster Form */}
        <div id="search-section">
          <SearchHeader
            fromStation={fromStation}
            toStation={toStation}
            travelDate={travelDate}
            onFromChange={setFromStation}
            onToChange={setToStation}
            onDateChange={setTravelDate}
            onSearch={() => {
              const el = document.getElementById("search-results-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            onSwap={handleSwap}
          />
        </div>

        {/* 4. Resolved Search Meta Banner */}
        <div id="search-results-section" className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl px-5 py-3.5 text-xs shadow-lg">
          <div className="flex flex-wrap items-center gap-2 text-slate-300">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-red-400" />
              Active Route Corridor:
            </span>
            <span className="rounded bg-slate-800 px-2 py-0.5 text-amber-300 font-mono font-semibold">
              {fromStation} (
              {searchResults.searchMeta.resolvedFromStations.map((s) => s.code).join(", ")})
            </span>
            <span className="text-red-500 font-black">→</span>
            <span className="rounded bg-slate-800 px-2 py-0.5 text-amber-300 font-mono font-semibold">
              {toStation} (
              {searchResults.searchMeta.resolvedToStations.map((s) => s.code).join(", ")})
            </span>
            <span className="text-slate-400 font-mono">[{travelDate}]</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 badge-pulse" />
            <span className="font-medium text-emerald-300">Multi-Hop Routing &amp; Quota Engine Active</span>
          </div>
        </div>

        {/* 5. Alternative Discovery Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Trains Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("DIRECT")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === "DIRECT"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                  : "bg-slate-900/90 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Train className="h-4 w-4" />
              <span>Direct Trains</span>
              <span className="rounded-full bg-black/30 px-1.5 py-0.5 text-[10px]">
                {searchResults.directRoutes.length}
              </span>
            </button>

            {/* Same-Train Hacks Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("HACKS")}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === "HACKS"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105"
                  : "bg-slate-900/90 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Same-Train Quota Hacks</span>
              <span className="rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 text-[10px] font-bold">
                {searchResults.sameTrainAlternates.length}
              </span>
              {searchResults.sameTrainAlternates.length > 0 && (
                <span className="hidden sm:inline text-[9px] uppercase tracking-wider text-emerald-200 bg-emerald-900/80 px-1.5 py-0.5 rounded font-black">
                  Beat WL
                </span>
              )}
            </button>

            {/* Connecting Hubs Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("CONNECTING")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === "CONNECTING"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                  : "bg-slate-900/90 text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Connecting Hubs (2-Leg)</span>
              <span className="rounded-full bg-black/30 px-1.5 py-0.5 text-[10px]">
                {searchResults.connectingRoutes.length}
              </span>
            </button>

            {/* Nearby Stations Tab */}
            {searchResults.nearbyStationRoutes.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("NEARBY")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  activeTab === "NEARBY"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-105"
                    : "bg-slate-900/90 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span>Nearby Terminals</span>
                <span className="rounded-full bg-black/30 px-1.5 py-0.5 text-[10px]">
                  {searchResults.nearbyStationRoutes.length}
                </span>
              </button>
            )}
          </div>

          {/* Filter Toolbar (Active for Direct Trains) */}
          {activeTab === "DIRECT" && (
            <div className="flex items-center gap-3 text-xs">
              {/* Class Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-semibold">Class:</span>
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-900/90 px-2.5 py-1 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="ALL">All Classes</option>
                  <option value="1A">1A (First AC)</option>
                  <option value="2A">2A (Second AC)</option>
                  <option value="3A">3A (Third AC)</option>
                  <option value="SL">SL (Sleeper)</option>
                  <option value="CC">CC (Chair Car)</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-semibold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-slate-700 bg-slate-900/90 px-2.5 py-1 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="DEPARTURE">Departure Time</option>
                  <option value="DURATION">Shortest Duration</option>
                  <option value="AVAILABILITY">Confirmed Berths First</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 6. Tab Content Display */}
        <div className="mt-6 space-y-4">
          {/* DIRECT TRAINS TAB */}
          {activeTab === "DIRECT" && (
            <>
              {filteredDirectRoutes.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-12 text-center backdrop-blur-md">
                  <Train className="mx-auto h-12 w-12 text-slate-400 mb-3" />
                  <h3 className="text-lg font-bold text-white">No direct trains found</h3>
                  <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                    No direct trains operate on this date/day. Check our <strong>Same-Train Hacks</strong> or{" "}
                    <strong>Connecting Hubs</strong> tabs for guaranteed alternative paths!
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("CONNECTING")}
                    className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                  >
                    View 2-Leg Connecting Routes
                  </button>
                </div>
              ) : (
                filteredDirectRoutes.map((journey) => (
                  <DirectRouteCard
                    key={journey.id}
                    journey={journey}
                    onBookGuide={(j, cls) => setModalData({ type: "DIRECT", item: j, selectedClass: cls })}
                  />
                ))
              )}
            </>
          )}

          {/* SAME-TRAIN HACKS TAB */}
          {activeTab === "HACKS" && (
            <>
              {/* Explainer Banner */}
              <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-4 text-xs backdrop-blur-xl">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 shadow-md">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      How Same-Train Quota Hacks Work
                    </h4>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      Indian Railways allocates large remote quotas for origin and terminating stretches. When your chosen intermediate station shows <strong>Waitlist (WL)</strong>, booking from an earlier station or extending to the destination terminal unlocks <strong>Confirmed (AVAILABLE)</strong> seats!
                    </p>
                    <p className="text-emerald-400 mt-1 font-semibold">
                      You legally set your "Boarding Point" to your actual station on IRCTC. You do not change trains or change coaches!
                    </p>
                  </div>
                </div>
              </div>

              {searchResults.sameTrainAlternates.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-12 text-center text-slate-400 backdrop-blur-md">
                  No same-train quota hacks needed or available for this selection.
                </div>
              ) : (
                searchResults.sameTrainAlternates.map((hack) => (
                  <SameTrainHackCard
                    key={hack.id}
                    hack={hack}
                    onOpenGuide={(h) => setModalData({ type: "HACK", item: h })}
                  />
                ))
              )}
            </>
          )}

          {/* CONNECTING HUBS TAB */}
          {activeTab === "CONNECTING" && (
            <>
              {/* Protection & Layover Info Banner */}
              <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 p-4 text-xs backdrop-blur-xl">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 shadow-md">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      IRCTC Linked PNR &amp; Missed-Connection Refund Guarantee
                    </h4>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      If direct trains are full, travel via a central railway junction (like Kanpur, Bhopal, Nagpur, or Vadodara). Under official IRCTC commercial rules, when booking Train 2 using the <strong>&quot;Connecting Journey Booking&quot;</strong> option and entering your Train 1 PNR, you get a <strong>100% full refund on Train 2</strong> if Train 1 delays and causes a missed connection!
                    </p>
                  </div>
                </div>
              </div>

              {searchResults.connectingRoutes.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-12 text-center text-slate-400 backdrop-blur-md">
                  No 2-leg connecting trains found with safe layover safety buffers.
                </div>
              ) : (
                searchResults.connectingRoutes.map((conn) => (
                  <ConnectingRouteCard
                    key={conn.id}
                    journey={conn}
                    onBookGuide={(c) => setModalData({ type: "CONNECTING", item: c })}
                  />
                ))
              )}
            </>
          )}

          {/* NEARBY TERMINALS TAB */}
          {activeTab === "NEARBY" && (
            <>
              {searchResults.nearbyStationRoutes.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-12 text-center text-slate-400 backdrop-blur-md">
                  No nearby terminal alternatives for this selection.
                </div>
              ) : (
                searchResults.nearbyStationRoutes.map((alt) => (
                  <NearbyStationCard
                    key={alt.id}
                    alt={alt}
                    onBookGuide={(a) => setModalData({ type: "NEARBY", item: a })}
                  />
                ))
              )}
            </>
          )}
        </div>

        {/* 7. Explore India by Rail Showcase */}
        <div id="explore-india">
          <FamousDestinations onSelectDestination={handleDestinationSelect} />
        </div>

        {/* 8. Comparison Matrix: IRCTC vs Transit Navigator */}
        <div id="comparison-matrix">
          <ComparisonMatrix />
        </div>
      </main>

      {/* Booking Instructions Modal */}
      <BookingGuideModal
        isOpen={Boolean(modalData)}
        onClose={() => setModalData(null)}
        data={modalData}
      />

      {/* 9. Luxury Footer */}
      <footer className="mt-24 border-t border-white/10 bg-slate-950 py-12 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            {/* Col 1 */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 text-white font-black text-sm">
                  TN
                </div>
                <span className="text-lg font-black text-white">Transit Navigator</span>
                <span className="rounded bg-red-600/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 text-[9px] font-bold">
                  PRO
                </span>
              </div>
              <p className="mt-3 text-slate-400 max-w-md leading-relaxed">
                India's next-generation railway intelligence engine. Designed to eliminate the waitlist frustration with mathematical graph routing, same-train quota hacks, and full IRCTC-linked refund protections.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Routing Engines
              </h5>
              <ul className="space-y-2">
                <li><span className="text-slate-400 hover:text-white">Same-Train Quota Bypass</span></li>
                <li><span className="text-slate-400 hover:text-white">2-Leg Connecting Junctions</span></li>
                <li><span className="text-slate-400 hover:text-white">Metropolitan City Clusters</span></li>
                <li><span className="text-slate-400 hover:text-white">Satellite Terminal Discovery</span></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Compliance &amp; Safety
              </h5>
              <ul className="space-y-2">
                <li><span className="text-slate-400 hover:text-white">IRCTC Commercial Rule 142</span></li>
                <li><span className="text-slate-400 hover:text-white">Linked PNR Refund Guarantee</span></li>
                <li><span className="text-slate-400 hover:text-white">Official Boarding Point Rules</span></li>
                <li><span className="text-slate-400 hover:text-white">No Bot / No Auto-Captcha Scraping</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} <strong>Transit Navigator</strong>. All rights reserved. Indian Railways &amp; IRCTC are registered trademarks of their respective owners.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                All 7,325+ Stations Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
