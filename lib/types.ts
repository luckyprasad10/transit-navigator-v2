export type SeatStatus = "AVAILABLE" | "RAC" | "WL" | "REGRET";

export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  clusterId?: string;
  isMajorHub: boolean;
  division?: string;
}

export interface CityCluster {
  id: string;
  name: string;
  stationCodes: string[];
}

export interface TrainHalt {
  stationCode: string;
  stationName: string;
  arrivalTime: string; // "HH:mm" or "--"
  departureTime: string; // "HH:mm" or "--"
  haltMinutes: number;
  dayCount: number; // 1, 2, 3...
  distanceKm: number;
}

export type TrainType =
  | "VANDE BHARAT"
  | "RAJDHANI"
  | "SHATABDI"
  | "DURONTO"
  | "TEJAS"
  | "SUPERFAST"
  | "MAIL/EXPRESS"
  | "GARIB RATH";

export interface Train {
  number: string;
  name: string;
  type: TrainType;
  runningDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  classes: string[]; // ["1A", "2A", "3A", "SL", "CC", "EC"]
  sourceStation: string;
  destStation: string;
  totalDistanceKm: number;
  avgPunctualityScore: number; // 0 to 100
  halts: TrainHalt[];
}

export interface Availability {
  status: SeatStatus;
  code: string; // e.g. "AVAILABLE-42", "WL-12", "RAC-8"
  probability: number; // 0 to 100% confirmation chance
  fare: number; // Estimated in INR
}

export interface DirectJourney {
  id: string;
  train: Train;
  originHalt: TrainHalt;
  destHalt: TrainHalt;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  distanceKm: number;
  daysSpan: number;
  availabilityByClass: Record<string, Availability>;
}

export type ConnectionSafety = "OPTIMAL" | "MODERATE" | "RISKY" | "LONG";

export interface ConnectingJourney {
  id: string;
  leg1: DirectJourney;
  leg2: DirectJourney;
  hubStation: Station;
  layoverMinutes: number;
  totalDurationMinutes: number;
  safetyScore: ConnectionSafety;
  safetyReason: string;
  isPnrLinkable: boolean;
  totalFareEstimate: number;
  combinedAvailabilityStatus: SeatStatus;
}

export interface SameTrainAlternate {
  id: string;
  train: Train;
  originStation: Station;
  destStation: Station;
  bookFromStation: Station;
  bookToStation: Station;
  boardingStation: Station;
  hackType: "BOOK_EARLIER_STATION" | "BOOK_FURTHER_STATION" | "SPLIT_SEAT_SAME_TRAIN";
  originalStatus: Availability;
  newStatus: Availability;
  extraFareCost: number;
  howToBookInstructions: string[];
}

export interface NearbyStationAlternative {
  id: string;
  originalFrom: Station;
  originalTo: Station;
  altFrom: Station;
  altTo: Station;
  distanceFromOriginalKm: number;
  train: Train;
  journey: DirectJourney;
  availability: Availability;
}

export interface RouteSearchResult {
  searchMeta: {
    fromQuery: string;
    toQuery: string;
    resolvedFromStations: Station[];
    resolvedToStations: Station[];
    travelDate: string;
    travelDayOfWeek: number;
  };
  directRoutes: DirectJourney[];
  connectingRoutes: ConnectingJourney[];
  sameTrainAlternates: SameTrainAlternate[];
  nearbyStationRoutes: NearbyStationAlternative[];
}
