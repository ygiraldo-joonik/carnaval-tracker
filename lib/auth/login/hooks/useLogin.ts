import { useState } from "react";
import loginService from "../services/auth/loginService";
import useAuth from "../../../../lib/auth/login/hooks/useAuth";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import getUserInfoService from "../services/auth/getUserInfoService";
import LocalStorage from "@/utils/localStorage";

const useLogin = () => {
  const { setUser, setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      const loginResponse = await loginService(email, password);
      if (loginResponse?.access_token) {
        // set token in local storage
        await LocalStorage.setItem(
          LocalStorage.AUTH_TOKEN,
          loginResponse.access_token
        );

        const user = await getUserInfoService(loginResponse.access_token);

        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        } else {
          setError(`Error to login`);
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (e: any) {
      console.error(`${JSON.stringify({ e }, null, 4)}`);
      setError(
        e.response?.data?.message || "An error occurred, please try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
  };
};

export default useLogin;
