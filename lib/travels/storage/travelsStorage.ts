import { Travel } from "@/types/travels";
import LocalStorage from "@/utils/localStorage";
import { Store } from "pullstate";

export interface TravelsStore {
  activeTravel: Travel | null;
}

const travelsStore = new Store<TravelsStore>({
  activeTravel: null,
});

export const useActiveTravel = () =>
  travelsStore.useState((s) => s.activeTravel);

export const setActiveTravel = async (travel: Travel | null) => {
  travelsStore.update((s) => {
    s.activeTravel = travel;
  });
  await LocalStorage.setItem(LocalStorage.ACTIVE_TRAVEL, travel);
};

export default travelsStore;
