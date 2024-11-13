import LocalStorage from "@/utils/localStorage";
import {
  setAuthUser,
  setIsAuthenticated,
  setIsValidated,
  setToken,
  useAuthStore,
} from "../store/authStore";
import { isUser, User } from "@/types/auth";
import { useEffect } from "react";

const useAuth = () => {
  const authStore = useAuthStore();

  /**
   *
   * Sets the user in the store and saves it to local storage
   * if user is null, it will remove the user from local storage and state
   * @param user User | null
   */
  const setUser = async (user: User | null) => {
    await LocalStorage.setItem(LocalStorage.AUTH_USER, user);
    setAuthUser(user);
  };

  /**
   * Validates the user from local storage
   */
  const validate = async () => {
    const user = await LocalStorage.getItem(LocalStorage.AUTH_USER);

    if (isUser(user)) {
      await setUser(user);
    }

    setIsAuthenticated(user != null);
    setIsValidated(true);
  };

  const logOut = async () => {
    await LocalStorage.setItem(LocalStorage.AUTH_TOKEN, null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    ...authStore,
    setAuthUser,
    setIsAuthenticated,
    setIsValidated,
    setToken,
    validate,
    setUser,
    logOut,
  };
};

export default useAuth;
