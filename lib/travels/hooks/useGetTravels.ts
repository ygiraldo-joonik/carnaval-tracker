// use get travels swr
import { Travel } from "@/types/travels";
import { apiFetcher, ApiResponse } from "@/utils/apiClient";
import useSWR from "swr";
import sortTravelsDesc from "../callbacks/sortTravelsDesc";

const useGetTravels = (revalidateOnMount: boolean = true) => {
  const { data, error, mutate } = useSWR<ApiResponse<Travel[]>>(
    "/travels",
    apiFetcher,
    {
      revalidateOnMount,
    }
  );

  return {
    data: data?.data?.sort(sortTravelsDesc),
    isLoading: !error && !data,
    error,
    mutate,
  };
};

export default useGetTravels;
