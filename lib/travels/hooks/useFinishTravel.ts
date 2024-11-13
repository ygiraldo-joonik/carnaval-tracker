import { useState } from "react";
import finishTravelService from "../services/finishTravelService";
import { setActiveTravel } from "../storage/travelsStorage";
import useGetActiveTravel from "./useGetActiveTravel";
import useGetTravels from "./useGetTravels";
import { stopBackgroundLocationTask } from "../tasks/backgroundLocationTask";

const useFinishTravel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: refetchActiveTravel } = useGetActiveTravel(false);
  const { mutate: refetchTravels } = useGetTravels(false);

  const finishTravel = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const travel = await finishTravelService(id);

      if (travel) {
        await setActiveTravel(null);
      } else {
        setError("Something went wrong");
      }

      await stopBackgroundLocationTask();

      refetchActiveTravel();
      refetchTravels();
    } catch (e) {
      setError(`${JSON.stringify({ e }, null, 4)}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    finishTravel,
    loading,
    error,
  };
};

export default useFinishTravel;
