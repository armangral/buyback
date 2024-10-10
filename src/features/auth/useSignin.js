import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithEmail as loginApi } from "src/services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "src/services/supabase";

export function useSignin() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signin, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),

    onSuccess: async (user) => {
      // Store the user in query cache
      queryclient.setQueryData(["user"], user);

      try {
        // Fetch the user's role from the `users` table
        const { data: userRoleData, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)  // Use the user.id to query role
          .single();

        if (error) {
          toast.error("Error fetching user role: " + error.message);
          return;
        }

        const userRole = userRoleData?.role;

        // Redirect based on the user's role
        if (userRole === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/users/dashboard", { replace: true });
        }
      } catch (err) {
        toast.error("An error occurred: " + err.message);
      }
    },

    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password are incorrect!");
    },
  });

  return { signin, isLoading };  // Renamed `login` to `signin` here
}
