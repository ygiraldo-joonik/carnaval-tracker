import { Travel } from "@/types/travels";
import apiClient, { ApiResponse } from "@/utils/apiClient";
import { AxiosResponse } from "axios";

const finishTravelService = async (
  id: number
): Promise<AxiosResponse<ApiResponse<Travel>>> =>
  apiClient.put(`/travels/${id}/finish`);

export default finishTravelService;
