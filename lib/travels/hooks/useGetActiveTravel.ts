// use get travels swr
import { Travel } from "@/types/travels";
import { apiFetcher, ApiResponse } from "@/utils/apiClient";
import LocalStorage from "@/utils/localStorage";
import { useEffect } from "react";
import useSWR from "swr";
import { setActiveTravel, useActiveTravel } from "../storage/travelsStorage";
import { startBackgroundLocationTask } from "../tasks/backgroundLocationTask";

const useGetActiveTravel = (revalidateOnMount: boolean = true) => {
  const { data, error, isValidating, mutate } = useSWR<ApiResponse<Travel>>(
    `/travels/active`,
    apiFetcher,
    {
      revalidateOnMount,
    }
  );

  const activeTravel = useActiveTravel();

  useEffect(() => {
    const initiActiveTravelValue = async () => {
      const activeTravelFromStorage = await LocalStorage.getItem(
        LocalStorage.ACTIVE_TRAVEL
      );
      if (
        typeof activeTravelFromStorage === "object" &&
        activeTravelFromStorage
      ) {
        await setActiveTravel(activeTravelFromStorage as Travel);
        await startBackgroundLocationTask();
      }
    };

    initiActiveTravelValue();
  }, []);

  useEffect(() => {
    if (!isValidating) setActiveTravel(data?.data ?? null);
  }, [data, isValidating]);

  return {
    data: activeTravel,
    error,
    isLoading: !data && !error,
    mutate,
  };
};

export default useGetActiveTravel;
