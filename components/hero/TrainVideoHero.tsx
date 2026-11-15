"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Radio, Zap, Shield, Sparkles } from "lucide-react";

export function TrainVideoHero() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  function togglePlay() {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function toggleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl mb-8">
      {/* 1. Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-35 mix-blend-screen pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center filter contrast-125 brightness-90"
          src="https://upload.wikimedia.org/wikipedia/commons/3/33/Passing_train_in_Kolkata.webm"
        />
      </div>

      {/* 2. Gradient Overlays for Readability & Cinematic Mood */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent via-slate-950/60 to-slate-950 pointer-events-none" />

      {/* 3. Hero Content Container */}
      <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:py-20">
        {/* Top Telemetry & Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Live Telemetry Pill */}
          <div className="flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1.5 text-xs backdrop-blur-md">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 badge-pulse" />
            <span className="font-mono font-bold text-emerald-300">LIVE IRCTC RADAR</span>
            <span className="text-emerald-500">•</span>
            <span className="text-emerald-200">KAVACH Safety System Active</span>
          </div>

          {/* Video Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-300 backdrop-blur-sm transition hover:bg-slate-800 hover:text-white"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-300 backdrop-blur-sm transition hover:bg-slate-800 hover:text-white"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 mb-4 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Beat The 100+ Waiting List Trap</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
            Outsmart The Waitlist.{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Travel Anywhere
            </span>{" "}
            In India.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            When IRCTC says <strong className="text-red-400">“NO SEATS AVAILABLE”</strong>,{" "}
            <strong className="text-white">Transit Navigator</strong> discovers confirmed berths on the same train via quota extensions, or connects you via high-speed transit hubs with full IRCTC refund protection.
          </p>
        </div>

        {/* 4. Kinetic Animated Train Simulation Track */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>TRAIN 22436 • VANDE BHARAT EXPRESS</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">160 km/h</span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline">25 kV AC 50Hz</span>
            </div>
          </div>

          {/* Kinetic Track Container */}
          <div className="relative h-14 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
            {/* Moving Track Bed */}
            <div className="absolute inset-x-0 bottom-1 h-3 animated-track" />
            {/* Steel Rail Lines */}
            <div className="absolute inset-x-0 bottom-3 h-0.5 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <div className="absolute inset-x-0 bottom-1 h-0.5 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />

            {/* Gliding High-Speed Train SVG */}
            <div className="absolute bottom-2 left-0 w-80 train-glider pointer-events-none">
              <svg viewBox="0 0 320 40" className="w-full h-auto drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)]">
                {/* Headlight Beam */}
                <polygon points="310,24 350,15 350,33 310,24" fill="rgba(254,240,138,0.25)" />
                {/* Aerodynamic Locomotive Body */}
                <path
                  d="M10,28 L270,28 Q300,28 315,22 Q320,16 300,10 L270,8 L10,8 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                {/* Saffron & Navy Blue Vande Bharat Stripes */}
                <path d="M10,13 L280,13 Q295,13 305,17 L300,19 Q290,15 L10,15 Z" fill="#0284c7" />
                <path d="M10,19 L295,19 Q305,21 310,23 L305,25 L10,25 Z" fill="#f97316" />
                {/* Windshield */}
                <path d="M285,11 L305,15 Q308,18 300,19 L280,15 Z" fill="#0f172a" />
                {/* Windows */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <rect
                    key={i}
                    x={25 + i * 20}
                    y={12}
                    width={13}
                    height={7}
                    rx={2}
                    fill="#1e293b"
                    stroke="#94a3b8"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Headlight LED */}
                <circle cx={313} cy={22} r={2.5} fill="#fef08a" />
                {/* Pantograph */}
                <polyline points="70,8 80,2 90,2 100,8" fill="none" stroke="#64748b" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Glowing Speed Lines */}
            <div className="absolute inset-0 speed-lines pointer-events-none bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
