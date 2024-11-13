import { useState } from "react";
import createTravelService from "../services/createTravelService";
import { setActiveTravel } from "../storage/travelsStorage";
import useGetActiveTravel from "./useGetActiveTravel";
import useGetTravels from "./useGetTravels";
import { startBackgroundLocationTask } from "../tasks/backgroundLocationTask";

const useCreateTravel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: refetchActiveTravel } = useGetActiveTravel(false);
  const { mutate: refetchTravels } = useGetTravels(false);

  const createTravel = async () => {
    setLoading(true);
    try {
      const response = await createTravelService();
      if (response.data?.data) await setActiveTravel(response.data.data);

      await startBackgroundLocationTask();

      refetchActiveTravel();
      refetchTravels();
    } catch (e) {
      console.log({ e });
      setError(`Error to create travel: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    createTravel,
    loading,
    error,
  };
};

export default useCreateTravel;
