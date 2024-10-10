import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { LogoutUser } from "src/services/auth";

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: LogoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.reload();
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  return { logout, isLoading };
}
