import { findStationByCode, CITY_CLUSTERS } from "../data/stations";
import { NearbyStationAlternative, Station } from "../types";
import { findDirectRoutes } from "./direct-routes";

export function findNearbyStationRoutes(
  primaryFrom: Station,
  primaryTo: Station,
  travelDateStr: string,
  dayOfWeek: number
): NearbyStationAlternative[] {
  // If either station belongs to a cluster, find siblings
  const fromCluster = primaryFrom.clusterId
    ? CITY_CLUSTERS.find((c) => c.id === primaryFrom.clusterId)
    : null;
  const toCluster = primaryTo.clusterId
    ? CITY_CLUSTERS.find((c) => c.id === primaryTo.clusterId)
    : null;

  if (!fromCluster && !toCluster) return [];

  const fromCandidates = fromCluster
    ? fromCluster.stationCodes.map(findStationByCode).filter((s): s is Station => Boolean(s && s.code !== primaryFrom.code))
    : [];
  const toCandidates = toCluster
    ? toCluster.stationCodes.map(findStationByCode).filter((s): s is Station => Boolean(s && s.code !== primaryTo.code))
    : [];

  const alternatives: NearbyStationAlternative[] = [];

  // Check sibling origin to primary dest, or primary origin to sibling dest, or sibling to sibling
  const testPairs: { from: Station[]; to: Station[] }[] = [];
  if (fromCandidates.length > 0) {
    testPairs.push({ from: fromCandidates, to: [primaryTo] });
  }
  if (toCandidates.length > 0) {
    testPairs.push({ from: [primaryFrom], to: toCandidates });
  }
  if (fromCandidates.length > 0 && toCandidates.length > 0) {
    testPairs.push({ from: fromCandidates, to: toCandidates });
  }

  for (const pair of testPairs) {
    const directRoutes = findDirectRoutes(pair.from, pair.to, travelDateStr, dayOfWeek);
    for (const journey of directRoutes) {
      const altFrom = findStationByCode(journey.originHalt.stationCode)!;
      const altTo = findStationByCode(journey.destHalt.stationCode)!;

      const primaryClass = journey.train.classes[0];
      const availability = journey.availabilityByClass[primaryClass];

      alternatives.push({
        id: `nearby_${journey.train.number}_${altFrom.code}_${altTo.code}`,
        originalFrom: primaryFrom,
        originalTo: primaryTo,
        altFrom,
        altTo,
        distanceFromOriginalKm: 12, // Approximate inter-city station distance
        train: journey.train,
        journey,
        availability,
      });
    }
  }

  return alternatives;
}
