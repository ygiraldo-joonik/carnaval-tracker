import { type LatLng } from "react-native-maps";

export interface Travel {
  id: number;
  name: string;
  created_at: string;
  locations_count: number;
  finished_at?: string;
}

export interface TravelLocation extends LatLng {
  id: number;
  travel_id: number;
  created_at: string;
}
