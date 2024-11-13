import { TaskManagerTaskBody } from "expo-task-manager";
import { LocationTaskData } from "../tasks/backgroundLocationTask";
import LocalStorage from "@/utils/localStorage";
import createTravelLocationService from "../services/createTravelLocationService";
import { Travel } from "@/types/travels";

const registerActiveTravelLocationCallback = async ({
  data,
  error,
}: TaskManagerTaskBody<LocationTaskData>) => {
  if (error) {
    console.error({ locationTaskError: error });
    return;
  }
  if (data) {
    const { locations } = data;
    const activeTravel = (await LocalStorage.getItem(
      LocalStorage.ACTIVE_TRAVEL
    )) as Travel | null;

    if (locations.length && activeTravel) {
      const [location] = locations;
      const { coords } = location;

      await createTravelLocationService({
        travel_id: activeTravel.id,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  }
};
export default registerActiveTravelLocationCallback;
