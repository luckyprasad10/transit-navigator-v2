import { TRAINS } from "../data/trains";
import { DirectJourney, Station, Train } from "../types";
import { generateAvailability, parseTimeToMinutes, calculateBaseFare } from "./calculator";

export function findDirectRoutes(
  fromStations: Station[],
  toStations: Station[],
  travelDateStr: string,
  dayOfWeek: number
): DirectJourney[] {
  const fromCodes = new Set(fromStations.map((s) => s.code));
  const toCodes = new Set(toStations.map((s) => s.code));

  const results: DirectJourney[] = [];

  for (const train of TRAINS) {
    // Check if train runs on requested day of week
    if (!train.runningDays.includes(dayOfWeek)) {
      continue;
    }

    const halts = train.halts;
    let fromIdx = -1;
    let toIdx = -1;

    for (let i = 0; i < halts.length; i++) {
      if (fromCodes.has(halts[i].stationCode) && fromIdx === -1) {
        fromIdx = i;
      }
      if (toCodes.has(halts[i].stationCode) && fromIdx !== -1) {
        toIdx = i;
        break;
      }
    }

    if (fromIdx !== -1 && toIdx !== -1 && toIdx > fromIdx) {
      const originHalt = halts[fromIdx];
      const destHalt = halts[toIdx];

      const startMin = parseTimeToMinutes(originHalt.departureTime, originHalt.dayCount);
      const endMin = parseTimeToMinutes(destHalt.arrivalTime, destHalt.dayCount);
      const durationMinutes = Math.max(0, endMin - startMin);
      const distanceKm = Math.max(0, destHalt.distanceKm - originHalt.distanceKm);
      const daysSpan = destHalt.dayCount - originHalt.dayCount;

      const availabilityByClass: Record<string, any> = {};
      for (const cls of train.classes) {
        const avail = generateAvailability(
          train.number,
          originHalt.stationCode,
          destHalt.stationCode,
          travelDateStr,
          cls
        );
        avail.fare = calculateBaseFare(distanceKm, cls, train.type);
        availabilityByClass[cls] = avail;
      }

      results.push({
        id: `${train.number}_${originHalt.stationCode}_${destHalt.stationCode}`,
        train,
        originHalt,
        destHalt,
        departureTime: originHalt.departureTime,
        arrivalTime: destHalt.arrivalTime,
        durationMinutes,
        distanceKm,
        daysSpan,
        availabilityByClass,
      });
    }
  }

  // Sort by departure time or duration
  return results.sort((a, b) => {
    const aTime = parseTimeToMinutes(a.departureTime, 1);
    const bTime = parseTimeToMinutes(b.departureTime, 1);
    return aTime - bTime;
  });
}
