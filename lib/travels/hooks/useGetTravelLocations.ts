// use get travels swr
import { TravelLocation } from "@/types/travels";
import { apiFetcher, ApiResponse } from "@/utils/apiClient";
import useSWR from "swr";

const useGetTravelLocations = (
  id: number,
  revalidateOnMount: boolean = true
) => {
  const { data, error, mutate } = useSWR<ApiResponse<TravelLocation[]>>(
    `/travel-locations/${id}`,
    apiFetcher,
    {
      revalidateOnMount,
    }
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    error,
    mutate,
  };
};

export default useGetTravelLocations;
