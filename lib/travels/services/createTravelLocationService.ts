import { TravelLocation } from "@/types/travels";
import apiClient, { ApiResponse } from "@/utils/apiClient";
import { AxiosResponse } from "axios";

interface CreateTravelLocationPros {
  travel_id: number;
  latitude: number;
  longitude: number;
}

const createTravelLocationService = async ({
  travel_id,
  latitude,
  longitude,
}: CreateTravelLocationPros): Promise<
  AxiosResponse<ApiResponse<TravelLocation>>
> =>
  apiClient.post("/travel-locations", {
    travel_id,
    latitude,
    longitude,
  });

export default createTravelLocationService;
