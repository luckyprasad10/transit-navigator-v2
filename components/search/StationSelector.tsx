"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Building2, ChevronDown, X } from "lucide-react";
import { searchStations, CITY_CLUSTERS, STATIONS } from "../../lib/data/stations";
import { Station, CityCluster } from "../../lib/types";

interface StationSelectorProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}

export function StationSelector({
  label,
  placeholder,
  value,
  onChange,
  icon,
}: StationSelectorProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = query ? searchStations(query) : [
    ...CITY_CLUSTERS.slice(0, 4),
    ...STATIONS.filter((s) => s.isMajorHub).slice(0, 6),
  ];

  function handleSelect(item: Station | CityCluster) {
    if ("stationCodes" in item) {
      // It's a city cluster
      onChange(item.id);
      setQuery(item.name);
    } else {
      // Station
      onChange(item.code);
      setQuery(`${item.name} (${item.code})`);
    }
    setIsOpen(false);
  }

  function handleClear() {
    setQuery("");
    onChange("");
    setIsOpen(true);
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          {icon || <MapPin className="h-4 w-4" />}
        </div>
        <input
          type="text"
          className="w-full rounded-xl border border-slate-700 bg-slate-900/90 py-3 pl-10 pr-9 text-sm font-semibold text-white placeholder-slate-500 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl backdrop-blur-xl">
          <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {query ? "Search Results" : "Popular Destinations & Clusters"}
          </div>

          {suggestions.length === 0 ? (
            <div className="p-3 text-center text-xs text-slate-400">
              No stations found. Try searching by city name (e.g., Delhi, Mumbai, Kanpur).
            </div>
          ) : (
            suggestions.map((item) => {
              const isCluster = "stationCodes" in item;
              return (
                <button
                  key={isCluster ? `cluster_${item.id}` : `station_${item.code}`}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    {isCluster ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-950/60 text-red-400 border border-red-800/40">
                        <Building2 className="h-3.5 w-3.5" />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                        <MapPin className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white">
                        {item.name}
                        {isCluster && (
                          <span className="ml-2 rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/20">
                            ALL STATIONS
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        {isCluster
                          ? `Includes: ${item.stationCodes.join(", ")}`
                          : `${item.city}, ${item.state}`}
                      </div>
                    </div>
                  </div>
                  {!isCluster && (
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-800/30 px-2 py-0.5 rounded">
                      {item.code}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
