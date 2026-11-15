import { findStationByCode } from "../data/stations";
import { ConnectingJourney, ConnectionSafety, DirectJourney, SeatStatus, Station } from "../types";
import { parseTimeToMinutes } from "./calculator";
import { findDirectRoutes } from "./direct-routes";

export function findConnectingRoutes(
  fromStations: Station[],
  toStations: Station[],
  travelDateStr: string,
  dayOfWeek: number
): ConnectingJourney[] {
  const fromCodes = new Set(fromStations.map((s) => s.code));
  const toCodes = new Set(toStations.map((s) => s.code));

  // Common transit hubs
  const CANDIDATE_HUBS = [
    "CNB", // Kanpur Central
    "NGP", // Nagpur Junction
    "BPL", // Bhopal
    "RKMP", // Rani Kamlapati
    "ET", // Itarsi Junction
    "VGLJ", // Jhansi
    "DDU", // Pt Deen Dayal Upadhyaya
    "BRC", // Vadodara
    "ST", // Surat
    "KOTA", // Kota
    "RTM", // Ratlam
    "BZA", // Vijayawada
    "SC", // Secunderabad
    "PUNE", // Pune
    "PRYJ", // Prayagraj
  ];

  const connectingJourneys: ConnectingJourney[] = [];

  for (const hubCode of CANDIDATE_HUBS) {
    // If hub is in origin or destination, skip
    if (fromCodes.has(hubCode) || toCodes.has(hubCode)) continue;

    const hubStation = findStationByCode(hubCode);
    if (!hubStation) continue;

    // 1. Find all Leg 1 routes: fromStations -> hubStation
    const leg1Routes = findDirectRoutes(fromStations, [hubStation], travelDateStr, dayOfWeek);
    if (leg1Routes.length === 0) continue;

    // 2. Find all Leg 2 routes: hubStation -> toStations
    // Leg 2 may start on same day or next day depending on leg 1 arrival
    const leg2RoutesSameDay = findDirectRoutes([hubStation], toStations, travelDateStr, dayOfWeek);
    const nextDayOfWeek = (dayOfWeek + 1) % 7;
    const leg2RoutesNextDay = findDirectRoutes([hubStation], toStations, travelDateStr, nextDayOfWeek);

    const allLeg2Routes = [...leg2RoutesSameDay, ...leg2RoutesNextDay];

    for (const leg1 of leg1Routes) {
      const leg1ArrMinutes = parseTimeToMinutes(leg1.destHalt.arrivalTime, leg1.destHalt.dayCount);

      for (const leg2 of allLeg2Routes) {
        // Prevent same train being used for both legs
        if (leg1.train.number === leg2.train.number) continue;

        let leg2DepMinutes = parseTimeToMinutes(leg2.originHalt.departureTime, leg2.originHalt.dayCount);

        // Adjust if leg 2 is evaluated on the subsequent day
        if (leg2DepMinutes < leg1ArrMinutes) {
          leg2DepMinutes += 24 * 60;
        }

        const layoverMinutes = leg2DepMinutes - leg1ArrMinutes;

        // Valid layover window: 45 minutes to 360 minutes (6 hours)
        if (layoverMinutes >= 45 && layoverMinutes <= 360) {
          let safetyScore: ConnectionSafety = "OPTIMAL";
          let safetyReason = "Optimal buffer: Relaxed platform transfer with strong delay cushion.";

          if (layoverMinutes < 75) {
            safetyScore = "RISKY";
            safetyReason = "Tight transfer: Delay of more than 30 mins in Train 1 risks missing Train 2.";
          } else if (layoverMinutes < 105) {
            safetyScore = "MODERATE";
            safetyReason = "Standard transfer: Sufficient for platform change, moderate delay buffer.";
          } else if (layoverMinutes > 210) {
            safetyScore = "LONG";
            safetyReason = "Extended layover: Ample time to utilize IRCTC Executive Lounge / Retiring Rooms.";
          }

          // IRCTC Official Connecting PNR eligibility:
          // Must have between 1 hour and 5 hours buffer at intermediate junction
          const isPnrLinkable = layoverMinutes >= 60 && layoverMinutes <= 300;

          const leg1PrimaryClass = leg1.train.classes[0];
          const leg2PrimaryClass = leg2.train.classes[0];
          const leg1Fare = leg1.availabilityByClass[leg1PrimaryClass]?.fare || 500;
          const leg2Fare = leg2.availabilityByClass[leg2PrimaryClass]?.fare || 500;
          const totalFareEstimate = leg1Fare + leg2Fare;

          const leg1Avail = leg1.availabilityByClass[leg1PrimaryClass]?.status || "AVAILABLE";
          const leg2Avail = leg2.availabilityByClass[leg2PrimaryClass]?.status || "AVAILABLE";

          let combinedStatus: SeatStatus = "AVAILABLE";
          if (leg1Avail === "REGRET" || leg2Avail === "REGRET") {
            combinedStatus = "REGRET";
          } else if (leg1Avail === "WL" || leg2Avail === "WL") {
            combinedStatus = "WL";
          } else if (leg1Avail === "RAC" || leg2Avail === "RAC") {
            combinedStatus = "RAC";
          }

          const totalDuration = leg1.durationMinutes + layoverMinutes + leg2.durationMinutes;

          connectingJourneys.push({
            id: `conn_${leg1.train.number}_${hubCode}_${leg2.train.number}`,
            leg1,
            leg2,
            hubStation,
            layoverMinutes,
            totalDurationMinutes: totalDuration,
            safetyScore,
            safetyReason,
            isPnrLinkable,
            totalFareEstimate,
            combinedAvailabilityStatus: combinedStatus,
          });
        }
      }
    }
  }

  // Sort by combination of safety score and total duration
  return connectingJourneys.sort((a, b) => {
    // Prioritize OPTIMAL over RISKY
    const scoreWeight: Record<ConnectionSafety, number> = {
      OPTIMAL: 0,
      MODERATE: 1,
      LONG: 2,
      RISKY: 3,
    };
    if (scoreWeight[a.safetyScore] !== scoreWeight[b.safetyScore]) {
      return scoreWeight[a.safetyScore] - scoreWeight[b.safetyScore];
    }
    return a.totalDurationMinutes - b.totalDurationMinutes;
  });
}
