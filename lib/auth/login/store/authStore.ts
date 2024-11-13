import { User } from "@/types/auth";
import { Store } from "pullstate";
import { set } from "../../../../node_modules/immer/src/utils/common";

interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isValidated: boolean;
}

const authStore = new Store<AuthStore>({
  token: null,
  user: null,
  isAuthenticated: false,
  isValidated: false,
});

export const setAuthUser = (user: User | null) =>
  authStore.update((s) => {
    s.user = user;
  });

export const setIsAuthenticated = (isAuthenticated: boolean) =>
  authStore.update((s) => {
    s.isAuthenticated = isAuthenticated;
  });

export const setToken = (token: string | null) =>
  authStore.update((s) => {
    s.token = token;
  });

export const setIsValidated = (isValidated: boolean) =>
  authStore.update((s) => {
    s.isValidated = isValidated;
  });

export const useAuthStore = () => authStore.useState((s) => s);

export default authStore;
