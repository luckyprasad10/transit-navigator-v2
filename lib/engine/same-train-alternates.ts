import { findStationByCode } from "../data/stations";
import { TRAINS } from "../data/trains";
import { SameTrainAlternate, Station } from "../types";
import { generateAvailability, calculateBaseFare } from "./calculator";

export function findSameTrainAlternates(
  fromStations: Station[],
  toStations: Station[],
  travelDateStr: string,
  dayOfWeek: number
): SameTrainAlternate[] {
  const fromCodes = new Set(fromStations.map((s) => s.code));
  const toCodes = new Set(toStations.map((s) => s.code));

  const alternates: SameTrainAlternate[] = [];

  for (const train of TRAINS) {
    if (!train.runningDays.includes(dayOfWeek)) continue;

    const halts = train.halts;
    let actualFromIdx = -1;
    let actualToIdx = -1;

    for (let i = 0; i < halts.length; i++) {
      if (fromCodes.has(halts[i].stationCode) && actualFromIdx === -1) {
        actualFromIdx = i;
      }
      if (toCodes.has(halts[i].stationCode) && actualFromIdx !== -1) {
        actualToIdx = i;
        break;
      }
    }

    if (actualFromIdx === -1 || actualToIdx === -1 || actualToIdx <= actualFromIdx) {
      continue;
    }

    const actualFromHalt = halts[actualFromIdx];
    const actualToHalt = halts[actualToIdx];
    const actualFromStation = findStationByCode(actualFromHalt.stationCode)!;
    const actualToStation = findStationByCode(actualToHalt.stationCode)!;

    // Check direct status for primary class (3A or 2A or SL)
    const primaryClass = train.classes.includes("3A")
      ? "3A"
      : train.classes.includes("CC")
      ? "CC"
      : train.classes[0];

    const directStatus = generateAvailability(
      train.number,
      actualFromHalt.stationCode,
      actualToHalt.stationCode,
      travelDateStr,
      primaryClass
    );

    // Option 1: Book from Earlier Station (X -> B, board at A)
    if (actualFromIdx > 0) {
      const earlierHalt = halts[0]; // Usually origin station has the widest quota pool
      const earlierStation = findStationByCode(earlierHalt.stationCode);

      if (earlierStation && earlierHalt.stationCode !== actualFromHalt.stationCode) {
        const hackedStatus = generateAvailability(
          train.number,
          earlierHalt.stationCode,
          actualToHalt.stationCode,
          travelDateStr,
          primaryClass,
          true // High probability of confirmed seat under Origin Quota
        );

        const normalFare = calculateBaseFare(
          actualToHalt.distanceKm - actualFromHalt.distanceKm,
          primaryClass,
          train.type
        );
        const extendedFare = calculateBaseFare(
          actualToHalt.distanceKm - earlierHalt.distanceKm,
          primaryClass,
          train.type
        );
        const extraFare = Math.max(0, extendedFare - normalFare);

        alternates.push({
          id: `hack_earlier_${train.number}_${earlierHalt.stationCode}_${actualFromHalt.stationCode}`,
          train,
          originStation: actualFromStation,
          destStation: actualToStation,
          bookFromStation: earlierStation,
          bookToStation: actualToStation,
          boardingStation: actualFromStation,
          hackType: "BOOK_EARLIER_STATION",
          originalStatus: directStatus,
          newStatus: hackedStatus,
          extraFareCost: extraFare,
          howToBookInstructions: [
            `Search on IRCTC from "${earlierStation.name} (${earlierStation.code})" to "${actualToStation.name} (${actualToStation.code})"`,
            `Select Train #${train.number} - ${train.name}`,
            `On the passenger details page, CHANGE BOARDING POINT to "${actualFromStation.name} (${actualFromStation.code})"`,
            `Your seat will remain reserved exclusively for you, and TTE will NOT mark you as absent when boarding at ${actualFromStation.code}`,
          ],
        });
      }
    }

    // Option 2: Book to Further Station (A -> Y, deboard early at B)
    if (actualToIdx < halts.length - 1) {
      const furtherHalt = halts[halts.length - 1]; // Terminus station often has end-to-end quota
      const furtherStation = findStationByCode(furtherHalt.stationCode);

      if (furtherStation && furtherHalt.stationCode !== actualToHalt.stationCode) {
        const hackedStatus = generateAvailability(
          train.number,
          actualFromHalt.stationCode,
          furtherHalt.stationCode,
          travelDateStr,
          primaryClass,
          true
        );

        const normalFare = calculateBaseFare(
          actualToHalt.distanceKm - actualFromHalt.distanceKm,
          primaryClass,
          train.type
        );
        const extendedFare = calculateBaseFare(
          furtherHalt.distanceKm - actualFromHalt.distanceKm,
          primaryClass,
          train.type
        );
        const extraFare = Math.max(0, extendedFare - normalFare);

        alternates.push({
          id: `hack_further_${train.number}_${actualToHalt.stationCode}_${furtherHalt.stationCode}`,
          train,
          originStation: actualFromStation,
          destStation: actualToStation,
          bookFromStation: actualFromStation,
          bookToStation: furtherStation,
          boardingStation: actualFromStation,
          hackType: "BOOK_FURTHER_STATION",
          originalStatus: directStatus,
          newStatus: hackedStatus,
          extraFareCost: extraFare,
          howToBookInstructions: [
            `Search on IRCTC from "${actualFromStation.name} (${actualFromStation.code})" to "${furtherStation.name} (${furtherStation.code})"`,
            `Select Train #${train.number} - ${train.name}`,
            `Book the ticket directly under the End-to-End Terminus Quota`,
            `Simply deboard at your actual destination "${actualToStation.name} (${actualToStation.code})". Deboarding early is completely permitted by Indian Railways rules!`,
          ],
        });
      }
    }
  }

  return alternates;
}
