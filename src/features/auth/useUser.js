import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "src/services/auth";

export function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  console.log("ahhaha", data);

  return {
    isLoading,
    user: data,
    isAuthenticated: data?.user?.role === "authenticated",
  };
}
