import { User } from "@/types/auth";
import apiClient, { ApiResponse } from "@/utils/apiClient";

const getUserInfoService = async (token: string) => {
  console.log({ token });

  const response = await apiClient.get<ApiResponse<User>>("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.data;
};

export default getUserInfoService;
