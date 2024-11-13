import { Travel } from "@/types/travels";
import apiClient, { ApiResponse } from "@/utils/apiClient";
import { AxiosResponse } from "axios";

const createTravelService = async (): Promise<
  AxiosResponse<ApiResponse<Travel>>
> => apiClient.post("/travels");

export default createTravelService;
