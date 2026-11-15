import { CityCluster, Station } from "../types";

export const CITY_CLUSTERS: CityCluster[] = [
  {
    id: "DELHI",
    name: "Delhi (All Stations)",
    stationCodes: ["NDLS", "DLI", "NZM", "ANVT", "DEE", "GZB"],
  },
  {
    id: "MUMBAI",
    name: "Mumbai (All Stations)",
    stationCodes: ["CSMT", "MMCT", "BDTS", "LTT", "DR", "BVI", "PNVL", "TNA", "KYN"],
  },
  {
    id: "KOLKATA",
    name: "Kolkata (All Stations)",
    stationCodes: ["HWH", "SDAH", "KOAA", "SHM", "SRC"],
  },
  {
    id: "BENGALURU",
    name: "Bengaluru (All Stations)",
    stationCodes: ["SBC", "YPR", "SMVB", "BNC", "KJM"],
  },
  {
    id: "CHENNAI",
    name: "Chennai (All Stations)",
    stationCodes: ["MAS", "MS", "TBM", "PER"],
  },
  {
    id: "HYDERABAD",
    name: "Hyderabad (All Stations)",
    stationCodes: ["SC", "HYB", "KCG", "LPI"],
  },
  {
    id: "PUNE",
    name: "Pune (All Stations)",
    stationCodes: ["PUNE", "SVJR", "KK"],
  },
  {
    id: "AHMEDABAD",
    name: "Ahmedabad (All Stations)",
    stationCodes: ["ADI", "SBT"],
  },
  {
    id: "PATNA",
    name: "Patna (All Stations)",
    stationCodes: ["PNBE", "DNR", "PPTA", "RJPB"],
  },
  {
    id: "LUCKNOW",
    name: "Lucknow (All Stations)",
    stationCodes: ["LKO", "LJN"],
  },
  {
    id: "VARANASI",
    name: "Varanasi (All Stations)",
    stationCodes: ["BSB", "DDU", "BSBS"],
  },
  {
    id: "BHOPAL",
    name: "Bhopal (All Stations)",
    stationCodes: ["BPL", "RKMP"],
  },
  {
    id: "NAGPUR",
    name: "Nagpur (All Stations)",
    stationCodes: ["NGP", "AJNI"],
  },
  {
    id: "GOA",
    name: "Goa (All Stations)",
    stationCodes: ["MAO", "THVM", "KRMI"],
  },
  {
    id: "KOCHI",
    name: "Kochi (All Stations)",
    stationCodes: ["ERS", "ERN"],
  },
];

export const STATIONS: Station[] = [
  // Delhi
  { code: "NDLS", name: "New Delhi", city: "Delhi", state: "Delhi", lat: 28.6424, lng: 77.2195, clusterId: "DELHI", isMajorHub: true },
  { code: "DLI", name: "Delhi Old Junction", city: "Delhi", state: "Delhi", lat: 28.6606, lng: 77.2294, clusterId: "DELHI", isMajorHub: true },
  { code: "NZM", name: "Hazrat Nizamuddin", city: "Delhi", state: "Delhi", lat: 28.5888, lng: 77.2536, clusterId: "DELHI", isMajorHub: true },
  { code: "ANVT", name: "Anand Vihar Terminal", city: "Delhi", state: "Delhi", lat: 28.6502, lng: 77.3153, clusterId: "DELHI", isMajorHub: true },
  { code: "DEE", name: "Delhi Sarai Rohilla", city: "Delhi", state: "Delhi", lat: 28.6657, lng: 77.1837, clusterId: "DELHI", isMajorHub: false },
  { code: "GZB", name: "Ghaziabad Junction", city: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lng: 77.4538, clusterId: "DELHI", isMajorHub: true },

  // Mumbai
  { code: "CSMT", name: "Chhatrapati Shivaji Maharaj Terminus", city: "Mumbai", state: "Maharashtra", lat: 18.9402, lng: 72.8354, clusterId: "MUMBAI", isMajorHub: true },
  { code: "MMCT", name: "Mumbai Central", city: "Mumbai", state: "Maharashtra", lat: 18.9696, lng: 72.8194, clusterId: "MUMBAI", isMajorHub: true },
  { code: "BDTS", name: "Bandra Terminus", city: "Mumbai", state: "Maharashtra", lat: 19.0628, lng: 72.8406, clusterId: "MUMBAI", isMajorHub: true },
  { code: "LTT", name: "Lokmanya Tilak Terminus", city: "Mumbai", state: "Maharashtra", lat: 19.0697, lng: 72.8906, clusterId: "MUMBAI", isMajorHub: true },
  { code: "DR", name: "Dadar Central", city: "Mumbai", state: "Maharashtra", lat: 19.0178, lng: 72.8436, clusterId: "MUMBAI", isMajorHub: true },
  { code: "BVI", name: "Borivali", city: "Mumbai", state: "Maharashtra", lat: 19.2291, lng: 72.8573, clusterId: "MUMBAI", isMajorHub: false },
  { code: "PNVL", name: "Panvel Junction", city: "Mumbai", state: "Maharashtra", lat: 18.9894, lng: 73.1206, clusterId: "MUMBAI", isMajorHub: true },
  { code: "TNA", name: "Thane", city: "Thane", state: "Maharashtra", lat: 19.1860, lng: 72.9759, clusterId: "MUMBAI", isMajorHub: false },
  { code: "KYN", name: "Kalyan Junction", city: "Kalyan", state: "Maharashtra", lat: 19.2364, lng: 73.1306, clusterId: "MUMBAI", isMajorHub: true },

  // Kolkata
  { code: "HWH", name: "Howrah Junction", city: "Kolkata", state: "West Bengal", lat: 22.5839, lng: 88.3433, clusterId: "KOLKATA", isMajorHub: true },
  { code: "SDAH", name: "Sealdah", city: "Kolkata", state: "West Bengal", lat: 22.5697, lng: 88.3712, clusterId: "KOLKATA", isMajorHub: true },
  { code: "KOAA", name: "Kolkata Terminal", city: "Kolkata", state: "West Bengal", lat: 22.6022, lng: 88.3739, clusterId: "KOLKATA", isMajorHub: true },
  { code: "SHM", name: "Shalimar", city: "Kolkata", state: "West Bengal", lat: 22.5594, lng: 88.3184, clusterId: "KOLKATA", isMajorHub: false },

  // Bengaluru
  { code: "SBC", name: "KSR Bengaluru City", city: "Bengaluru", state: "Karnataka", lat: 12.9781, lng: 77.5696, clusterId: "BENGALURU", isMajorHub: true },
  { code: "YPR", name: "Yesvantpur Junction", city: "Bengaluru", state: "Karnataka", lat: 13.0238, lng: 77.5503, clusterId: "BENGALURU", isMajorHub: true },
  { code: "SMVB", name: "SMVT Bengaluru", city: "Bengaluru", state: "Karnataka", lat: 13.0039, lng: 77.6533, clusterId: "BENGALURU", isMajorHub: true },
  { code: "BNC", name: "Bengaluru Cantt", city: "Bengaluru", state: "Karnataka", lat: 12.9936, lng: 77.5986, clusterId: "BENGALURU", isMajorHub: false },
  { code: "KJM", name: "Krishnarajapuram", city: "Bengaluru", state: "Karnataka", lat: 13.0012, lng: 77.6775, clusterId: "BENGALURU", isMajorHub: false },

  // Chennai
  { code: "MAS", name: "MGR Chennai Central", city: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2755, clusterId: "CHENNAI", isMajorHub: true },
  { code: "MS", name: "Chennai Egmore", city: "Chennai", state: "Tamil Nadu", lat: 13.0782, lng: 80.2608, clusterId: "CHENNAI", isMajorHub: true },
  { code: "TBM", name: "Tambaram", city: "Chennai", state: "Tamil Nadu", lat: 12.9249, lng: 80.1197, clusterId: "CHENNAI", isMajorHub: false },

  // Hyderabad
  { code: "SC", name: "Secunderabad Junction", city: "Hyderabad", state: "Telangana", lat: 17.4344, lng: 78.5015, clusterId: "HYDERABAD", isMajorHub: true },
  { code: "HYB", name: "Hyderabad Deccan (Nampally)", city: "Hyderabad", state: "Telangana", lat: 17.3926, lng: 78.4688, clusterId: "HYDERABAD", isMajorHub: true },
  { code: "KCG", name: "Kacheguda", city: "Hyderabad", state: "Telangana", lat: 17.3917, lng: 78.5028, clusterId: "HYDERABAD", isMajorHub: true },

  // Major Central & North-South Junction Hubs
  { code: "CNB", name: "Kanpur Central", city: "Kanpur", state: "Uttar Pradesh", lat: 26.4547, lng: 80.3507, isMajorHub: true },
  { code: "NGP", name: "Nagpur Junction", city: "Nagpur", state: "Maharashtra", lat: 21.1524, lng: 79.0888, clusterId: "NAGPUR", isMajorHub: true },
  { code: "BPL", name: "Bhopal Junction", city: "Bhopal", state: "Madhya Pradesh", lat: 23.2662, lng: 77.4085, clusterId: "BHOPAL", isMajorHub: true },
  { code: "RKMP", name: "Rani Kamlapati", city: "Bhopal", state: "Madhya Pradesh", lat: 23.2056, lng: 77.4389, clusterId: "BHOPAL", isMajorHub: true },
  { code: "ET", name: "Itarsi Junction", city: "Itarsi", state: "Madhya Pradesh", lat: 22.6128, lng: 77.7606, isMajorHub: true },
  { code: "DDU", name: "Pt. Deen Dayal Upadhyaya Junction", city: "Mughal Sarai", state: "Uttar Pradesh", lat: 25.2819, lng: 83.1189, clusterId: "VARANASI", isMajorHub: true },
  { code: "VGLJ", name: "Virangana Lakshmibai Jhansi", city: "Jhansi", state: "Uttar Pradesh", lat: 25.4484, lng: 78.5685, isMajorHub: true },
  { code: "BRC", name: "Vadodara Junction", city: "Vadodara", state: "Gujarat", lat: 22.3107, lng: 73.1812, isMajorHub: true },
  { code: "ST", name: "Surat", city: "Surat", state: "Gujarat", lat: 21.2051, lng: 72.8407, isMajorHub: true },
  { code: "KOTA", name: "Kota Junction", city: "Kota", state: "Rajasthan", lat: 25.2201, lng: 75.8778, isMajorHub: true },
  { code: "RTM", name: "Ratlam Junction", city: "Ratlam", state: "Madhya Pradesh", lat: 23.3429, lng: 75.0457, isMajorHub: true },
  { code: "BZA", name: "Vijayawada Junction", city: "Vijayawada", state: "Andhra Pradesh", lat: 16.5186, lng: 80.6199, isMajorHub: true },
  { code: "AGC", name: "Agra Cantt", city: "Agra", state: "Uttar Pradesh", lat: 27.1578, lng: 77.9904, isMajorHub: true },
  { code: "GWL", name: "Gwalior Junction", city: "Gwalior", state: "Madhya Pradesh", lat: 26.2163, lng: 78.1884, isMajorHub: true },
  { code: "PUNE", name: "Pune Junction", city: "Pune", state: "Maharashtra", lat: 18.5284, lng: 73.8744, clusterId: "PUNE", isMajorHub: true },
  { code: "ADI", name: "Ahmedabad Junction", city: "Ahmedabad", state: "Gujarat", lat: 23.0273, lng: 72.6011, clusterId: "AHMEDABAD", isMajorHub: true },
  { code: "JP", name: "Jaipur Junction", city: "Jaipur", state: "Rajasthan", lat: 26.9196, lng: 75.7878, isMajorHub: true },
  { code: "LKO", name: "Lucknow Charbagh", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8317, lng: 80.9234, clusterId: "LUCKNOW", isMajorHub: true },
  { code: "BSB", name: "Varanasi Junction", city: "Varanasi", state: "Uttar Pradesh", lat: 25.3283, lng: 82.9863, clusterId: "VARANASI", isMajorHub: true },
  { code: "PNBE", name: "Patna Junction", city: "Patna", state: "Bihar", lat: 25.6022, lng: 85.1376, clusterId: "PATNA", isMajorHub: true },
  { code: "DNR", name: "Danapur", city: "Patna", state: "Bihar", lat: 25.6267, lng: 85.0425, clusterId: "PATNA", isMajorHub: true },
  { code: "PRYJ", name: "Prayagraj Junction", city: "Prayagraj", state: "Uttar Pradesh", lat: 25.4437, lng: 81.8267, isMajorHub: true },
  { code: "GHY", name: "Guwahati", city: "Guwahati", state: "Assam", lat: 26.1822, lng: 91.7516, isMajorHub: true },
  { code: "BBS", name: "Bhubaneswar", city: "Bhubaneswar", state: "Odisha", lat: 20.2666, lng: 85.8436, isMajorHub: true },
  { code: "PURI", name: "Puri", city: "Puri", state: "Odisha", lat: 19.8135, lng: 85.8312, isMajorHub: true },
  { code: "VSKP", name: "Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.7215, lng: 83.2872, isMajorHub: true },
  { code: "MAO", name: "Madgaon Junction", city: "Madgaon", state: "Goa", lat: 15.2736, lng: 73.9782, clusterId: "GOA", isMajorHub: true },
  { code: "THVM", name: "Thivim", city: "Mapusa", state: "Goa", lat: 15.6175, lng: 73.8656, clusterId: "GOA", isMajorHub: false },
  { code: "SVDK", name: "Shri Mata Vaishno Devi Katra", city: "Katra", state: "Jammu and Kashmir", lat: 32.9912, lng: 74.9312, isMajorHub: true },
  { code: "JAT", name: "Jammu Tawi", city: "Jammu", state: "Jammu and Kashmir", lat: 32.7061, lng: 74.8797, isMajorHub: true },
  { code: "ASR", name: "Amritsar Junction", city: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, isMajorHub: true },
  { code: "CDG", name: "Chandigarh", city: "Chandigarh", state: "Chandigarh", lat: 30.7016, lng: 76.8213, isMajorHub: true },
  { code: "ERS", name: "Ernakulam Junction (South)", city: "Kochi", state: "Kerala", lat: 9.9679, lng: 76.2891, clusterId: "KOCHI", isMajorHub: true },
  { code: "TVC", name: "Thiruvananthapuram Central", city: "Thiruvananthapuram", state: "Kerala", lat: 8.4871, lng: 76.9532, isMajorHub: true },
  { code: "CBE", name: "Coimbatore Junction", city: "Coimbatore", state: "Tamil Nadu", lat: 11.0016, lng: 76.9665, isMajorHub: true },
  { code: "MDU", name: "Madurai Junction", city: "Madurai", state: "Tamil Nadu", lat: 9.9195, lng: 78.1114, isMajorHub: true },
];

export function findStationByCode(code: string): Station | undefined {
  return STATIONS.find((s) => s.code.toUpperCase() === code.toUpperCase());
}

export function searchStations(query: string): (Station | CityCluster)[] {
  const q = query.trim().toUpperCase();
  if (!q) return [];

  const matchedClusters = CITY_CLUSTERS.filter(
    (c) => c.name.toUpperCase().includes(q) || c.id.includes(q)
  );

  const matchedStations = STATIONS.filter(
    (s) =>
      s.code.includes(q) ||
      s.name.toUpperCase().includes(q) ||
      s.city.toUpperCase().includes(q)
  );

  return [...matchedClusters, ...matchedStations].slice(0, 10);
}

export function resolveStationsForInput(query: string): Station[] {
  const q = query.trim().toUpperCase();
  if (!q) return [];

  // 1. Is it a cluster ID? (e.g. "DELHI")
  const cluster = CITY_CLUSTERS.find((c) => c.id === q || c.name.toUpperCase().includes(q));
  if (cluster) {
    return cluster.stationCodes.map((code) => findStationByCode(code)!).filter(Boolean);
  }

  // 2. Exact code match
  const exact = findStationByCode(q);
  if (exact) {
    // If it belongs to a cluster, also include sibling cluster stations
    if (exact.clusterId) {
      const parentCluster = CITY_CLUSTERS.find((c) => c.id === exact.clusterId);
      if (parentCluster) {
        return parentCluster.stationCodes.map((code) => findStationByCode(code)!).filter(Boolean);
      }
    }
    return [exact];
  }

  // 3. Name or city match
  const matches = STATIONS.filter(
    (s) => s.name.toUpperCase().includes(q) || s.city.toUpperCase().includes(q)
  );
  if (matches.length > 0) {
    return matches;
  }

  return [];
}
