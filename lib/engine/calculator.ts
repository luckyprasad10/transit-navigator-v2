import { Availability, SeatStatus, TrainType } from "../types";

export function parseTimeToMinutes(timeStr: string, dayCount: number = 1): number {
  if (!timeStr || timeStr === "--") return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return (dayCount - 1) * 24 * 60 + h * 60 + m;
}

export function formatMinutesToTime(totalMinutes: number): { time: string; dayOffset: number } {
  const normalized = totalMinutes % (24 * 60);
  const dayOffset = Math.floor(totalMinutes / (24 * 60));
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  return { time, dayOffset };
}

export function formatDuration(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const mins = durationMinutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

// Pseudo-random but deterministic availability generator based on inputs
export function generateAvailability(
  trainNumber: string,
  fromCode: string,
  toCode: string,
  travelDateStr: string,
  trainClass: string,
  isSameTrainHack: boolean = false
): Availability {
  // Hash the parameters to create a stable seed
  const str = `${trainNumber}_${fromCode}_${toCode}_${travelDateStr}_${trainClass}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash) % 100;

  // Same-train hacks have a much higher probability of being AVAILABLE
  if (isSameTrainHack) {
    const seats = 15 + (seed % 35);
    return {
      status: "AVAILABLE",
      code: `AVAILABLE-${seats}`,
      probability: 98,
      fare: calculateBaseFare(800, trainClass, "SUPERFAST"),
    };
  }

  // General availability distribution:
  // 40% Available, 25% RAC, 30% Waiting List, 5% Regret
  let status: SeatStatus;
  let code: string;
  let probability: number;

  if (seed < 40) {
    const seats = 5 + (seed % 40);
    status = "AVAILABLE";
    code = `AVAILABLE-${seats}`;
    probability = 100;
  } else if (seed < 65) {
    const rac = 1 + (seed % 20);
    status = "RAC";
    code = `RAC-${rac}`;
    probability = 85 - rac * 2;
  } else if (seed < 95) {
    const wl = 1 + (seed % 60);
    status = "WL";
    code = `WL-${wl}`;
    probability = Math.max(15, 75 - wl);
  } else {
    status = "REGRET";
    code = "REGRET";
    probability = 0;
  }

  return {
    status,
    code,
    probability,
    fare: calculateBaseFare(1000, trainClass, "SUPERFAST"),
  };
}

export function calculateBaseFare(distanceKm: number, trainClass: string, trainType: TrainType): number {
  let ratePerKm = 0.45; // default Sleeper

  switch (trainClass) {
    case "1A":
      ratePerKm = 2.4;
      break;
    case "2A":
      ratePerKm = 1.45;
      break;
    case "3A":
      ratePerKm = 1.05;
      break;
    case "EC":
      ratePerKm = 2.1;
      break;
    case "CC":
      ratePerKm = 1.15;
      break;
    case "SL":
    default:
      ratePerKm = 0.45;
      break;
  }

  if (trainType === "RAJDHANI" || trainType === "TEJAS") {
    ratePerKm *= 1.35;
  } else if (trainType === "VANDE BHARAT") {
    ratePerKm *= 1.4;
  } else if (trainType === "SUPERFAST") {
    ratePerKm *= 1.1;
  }

  const base = Math.round(distanceKm * ratePerKm + 50);
  // Round to nearest 5
  return Math.ceil(base / 5) * 5;
}
