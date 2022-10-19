import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axiosInstance from "../lib/http-client";

const getUserPermissions = async () => {
  try {
    const response = await axiosInstance.get<string[]>(`/users/permissions`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default function useGetUserPermissions(options: UseQueryOptions) {
  return useQuery({
    queryKey: ["getUserPermissions"],
    queryFn: getUserPermissions,
  });
}
