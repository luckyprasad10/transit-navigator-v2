import { resolveStationsForInput } from "../data/stations";
import { RouteSearchResult } from "../types";
import { findConnectingRoutes } from "./connecting-routes";
import { findDirectRoutes } from "./direct-routes";
import { findNearbyStationRoutes } from "./nearby-alternatives";
import { findSameTrainAlternates } from "./same-train-alternates";

export function searchRoutes(
  fromQuery: string,
  toQuery: string,
  travelDateStr: string
): RouteSearchResult {
  const fromStations = resolveStationsForInput(fromQuery);
  const toStations = resolveStationsForInput(toQuery);

  const travelDate = new Date(travelDateStr);
  const dayOfWeek = isNaN(travelDate.getTime()) ? new Date().getDay() : travelDate.getDay();

  if (fromStations.length === 0 || toStations.length === 0) {
    return {
      searchMeta: {
        fromQuery,
        toQuery,
        resolvedFromStations: fromStations,
        resolvedToStations: toStations,
        travelDate: travelDateStr,
        travelDayOfWeek: dayOfWeek,
      },
      directRoutes: [],
      connectingRoutes: [],
      sameTrainAlternates: [],
      nearbyStationRoutes: [],
    };
  }

  // 1. Direct Routes
  const directRoutes = findDirectRoutes(fromStations, toStations, travelDateStr, dayOfWeek);

  // 2. Connecting Routes via Major Hubs
  const connectingRoutes = findConnectingRoutes(fromStations, toStations, travelDateStr, dayOfWeek);

  // 3. Same-Train Quota Hacks
  const sameTrainAlternates = findSameTrainAlternates(fromStations, toStations, travelDateStr, dayOfWeek);

  // 4. Nearby Station Alternatives
  let nearbyStationRoutes: any[] = [];
  if (fromStations.length === 1 && toStations.length === 1) {
    nearbyStationRoutes = findNearbyStationRoutes(fromStations[0], toStations[0], travelDateStr, dayOfWeek);
  }

  return {
    searchMeta: {
      fromQuery,
      toQuery,
      resolvedFromStations: fromStations,
      resolvedToStations: toStations,
      travelDate: travelDateStr,
      travelDayOfWeek: dayOfWeek,
    },
    directRoutes,
    connectingRoutes,
    sameTrainAlternates,
    nearbyStationRoutes,
  };
}
