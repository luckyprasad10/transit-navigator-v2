"use client";

import React from "react";
import { Compass, Sparkles, MapPin, ArrowRight, Train, Clock, ShieldCheck } from "lucide-react";

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  fromCluster: string;
  toCluster: string;
  fromName: string;
  toName: string;
  durationApprox: string;
  distanceKm: number;
  highlightTrains: string[];
  imageUrl: string;
  tag: string;
  tagColor: string;
  description: string;
}

export const FAMOUS_DESTINATIONS: Destination[] = [
  {
    id: "taj-mahal",
    title: "Taj Mahal & Agra Fort",
    subtitle: "The Monument of Eternal Love",
    location: "Agra, Uttar Pradesh",
    fromCluster: "DELHI",
    toCluster: "AGC",
    fromName: "New Delhi / Nizamuddin",
    toName: "Agra Cantt (AGC)",
    durationApprox: "1h 40m",
    distanceKm: 188,
    highlightTrains: ["Gatimaan Superfast", "Taj Express", "Vande Bharat"],
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    tag: "UNESCO World Heritage",
    tagColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    description: "Experience India's pride on high-speed rail. Gatimaan Express covers the distance with onboard breakfast in just 100 minutes.",
  },
  {
    id: "varanasi-ghats",
    title: "Varanasi & Dashashwamedh Ghat",
    subtitle: "The Spiritual Capital of India",
    location: "Varanasi, Uttar Pradesh",
    fromCluster: "DELHI",
    toCluster: "VARANASI",
    fromName: "New Delhi (NDLS)",
    toName: "Varanasi Cantt / DDU",
    durationApprox: "8h 00m",
    distanceKm: 760,
    highlightTrains: ["Vande Bharat 22436", "Kashi Vishwanath SF"],
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    tag: "Spiritual Sanctuary",
    tagColor: "border-orange-500/40 bg-orange-500/10 text-orange-300",
    description: "Evening Ganga Aarti and ancient ghats. India's inaugural Vande Bharat connects the capital to Varanasi at record speeds.",
  },
  {
    id: "pink-city-jaipur",
    title: "Hawa Mahal & Amber Palace",
    subtitle: "The Royal Pink City",
    location: "Jaipur, Rajasthan",
    fromCluster: "DELHI",
    toCluster: "JP",
    fromName: "Delhi Cantt / Sarai Rohilla",
    toName: "Jaipur Jn (JP)",
    durationApprox: "3h 25m",
    distanceKm: 308,
    highlightTrains: ["Ajmer Vande Bharat", "Swarna Jayanti Shatabdi"],
    imageUrl: "https://images.unsplash.com/photo-1705861145715-3c6faa47d1be?auto=format&fit=crop&w=800&q=80",
    tag: "Royal Forts & Culture",
    tagColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    description: "Centuries-old Rajput palaces, astronomical observatories, and vibrant bazaars accessible on premier express corridors.",
  },
  {
    id: "katra-vaishno-devi",
    title: "Vaishno Devi & Kashmir Gateway",
    subtitle: "Pristine Shivalik Foothills",
    location: "Katra, Jammu & Kashmir",
    fromCluster: "DELHI",
    toCluster: "SVDK",
    fromName: "New Delhi (NDLS)",
    toName: "Shri Mata Vaishno Devi (SVDK)",
    durationApprox: "8h 00m",
    distanceKm: 655,
    highlightTrains: ["Vande Bharat 22439", "Shri Shakti AC SF"],
    imageUrl: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    tag: "Himalayan Foothills",
    tagColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    description: "Breathtaking mountain tunnels and deep gorges. Travel right up to the Holy Shrine base in world-class comfort.",
  },
  {
    id: "goa-beaches",
    title: "Goa & Konkan Coastal Rail",
    subtitle: "Tropical Beaches & Portuguese Architecture",
    location: "Madgaon / Vasco, Goa",
    fromCluster: "MUMBAI",
    toCluster: "GOA",
    fromName: "CSMT / Panvel",
    toName: "Madgaon Jn (MAO)",
    durationApprox: "7h 45m",
    distanceKm: 586,
    highlightTrains: ["CSMT Madgaon Vande Bharat", "Tejas Express"],
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    tag: "Konkan Scenic Wonder",
    tagColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    description: "One of the most engineering marvel railway routes in the world, traversing emerald cliffs, waterfalls, and long tunnels.",
  },
  {
    id: "kerala-backwaters",
    title: "Kerala Backwaters & Fort Kochi",
    subtitle: "God's Own Country",
    location: "Kochi & Alleppey, Kerala",
    fromCluster: "BENGALURU",
    toCluster: "KOCHI",
    fromName: "SMVT Bengaluru",
    toName: "Ernakulam Jn (ERS)",
    durationApprox: "8h 20m",
    distanceKm: 587,
    highlightTrains: ["Bengaluru - Ernakulam Vande Bharat", "Island Express"],
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    tag: "Coastal Tranquility",
    tagColor: "border-teal-500/40 bg-teal-500/10 text-teal-300",
    description: "Cruise tranquil lagoons, spice plantations, and historic Portuguese colonies with scenic vistas through the Western Ghats.",
  },
  {
    id: "amritsar-golden-temple",
    title: "Golden Temple & Wagah Border",
    subtitle: "The Spiritual Sanctum of Punjab",
    location: "Amritsar, Punjab",
    fromCluster: "DELHI",
    toCluster: "ASR",
    fromName: "Delhi Old (DLI) / NDLS",
    toName: "Amritsar Jn (ASR)",
    durationApprox: "5h 30m",
    distanceKm: 448,
    highlightTrains: ["Amritsar Vande Bharat", "Amritsar Shatabdi"],
    imageUrl: "https://images.unsplash.com/photo-1588096344356-788862cfc23a?auto=format&fit=crop&w=800&q=80",
    tag: "Architectural Miracle",
    tagColor: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
    description: "Marvel at the gilded Harmandir Sahib gleaming over the Amrit Sarovar lake and savor world-famous Punjabi culinary heritage.",
  },
  {
    id: "mumbai-city",
    title: "Mumbai Financial Capital & Marine Drive",
    subtitle: "The City of Dreams",
    location: "Mumbai, Maharashtra",
    fromCluster: "DELHI",
    toCluster: "MUMBAI",
    fromName: "New Delhi (NDLS)",
    toName: "Mumbai Central (MMCT) / CSMT",
    durationApprox: "15h 32m",
    distanceKm: 1386,
    highlightTrains: ["Mumbai Rajdhani", "Tejas Rajdhani", "August Kranti"],
    imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=800&q=80",
    tag: "Premier Trunk Line",
    tagColor: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
    description: "India's highest density corridor. High-speed 160 km/h WAP-7 hauled Rajdhani Express with smart quota splits along Kota & Vadodara.",
  },
];

interface FamousDestinationsProps {
  onSelectDestination: (fromCluster: string, toCluster: string) => void;
}

export function FamousDestinations({ onSelectDestination }: FamousDestinationsProps) {
  return (
    <section className="relative mt-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />

      {/* Section Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-300 backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 text-red-400" />
            <span>Curated Rail Expeditions</span>
          </div>
          <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl md:text-4xl tracking-tight">
            Explore India by Rail
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            Click any iconic Indian landmark to instantly discover direct high-speed trains, scenic multi-hop junctions, and confirmed seat hacks.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span>Real-time Indian Railways Timetables</span>
        </div>
      </div>

      {/* Destination Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FAMOUS_DESTINATIONS.map((dest) => (
          <div
            key={dest.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-600/15"
          >
            {/* Image Container with Zoom Effect */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={dest.imageUrl}
                alt={dest.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${dest.tagColor}`}
                >
                  {dest.tag}
                </span>
              </div>

              {/* Location Tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                <div className="flex items-center gap-1 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{dest.location}</span>
                </div>
                <div className="flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-slate-300 backdrop-blur-sm">
                  <Clock className="h-3 w-3 text-amber-400" />
                  <span>{dest.durationApprox}</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                  {dest.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                {/* Highlight Trains Badges */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {dest.highlightTrains.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-700/60 bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                    >
                      <Train className="h-2.5 w-2.5 text-blue-400" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* 1-Click Action Button */}
              <div className="mt-5 border-t border-slate-800/80 pt-3">
                <button
                  type="button"
                  onClick={() => onSelectDestination(dest.fromCluster, dest.toCluster)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600/90 to-amber-600/90 px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-red-950/40 transition-all hover:from-red-500 hover:to-amber-500 active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-200" />
                  <span>Search {dest.toName}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
