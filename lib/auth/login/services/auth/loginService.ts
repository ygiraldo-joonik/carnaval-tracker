import { LoginResponse, User } from "@/types/auth";
import apiClient, { ApiResponse } from "@/utils/apiClient";

const loginService = async (email: string, password: string) => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>("/login", {
    email,
    password,
  });

  console.log({ response });

  return response.data?.data;
};

export default loginService;
