import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

export const LOCATION_TASK_NAME = "background-location-task";

export interface LocationTaskData {
  locations: Location.LocationObject[];
}

export const registerBackgroundLocationTask = (
  executor: TaskManager.TaskManagerTaskExecutor<LocationTaskData>
) => TaskManager.defineTask<LocationTaskData>(LOCATION_TASK_NAME, executor);

export const startBackgroundLocationTask = async () =>
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 30 * 1000,
    showsBackgroundLocationIndicator: true,
    distanceInterval: 0,
    foregroundService: {
      notificationTitle: "Location Tracking",
      notificationBody: "Your location is being tracked in the background.",
    },
  });

export const stopBackgroundLocationTask = async () =>
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
