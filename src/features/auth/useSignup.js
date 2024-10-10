import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signUpWithEmail } from "src/services/auth";
import { supabase } from "src/services/supabase";  // Import Supabase client

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signUpWithEmail,

    onSuccess: async (response) => {
      console.log("Supabase signup response:", response);  // Log the response to inspect its structure

      try {
        const user = response.user.user;  // Correctly extract the user data

        if (!user) {
          throw new Error("User data not found");
        }

        // Insert the new user into the users table with a default role of 'user'
        const { data, error } = await supabase
          .from("users")
          .insert([
            { id: user.id, email: user.email, role: "user" } 
          ]);

        if (error) {
          throw error;
        }

        toast.success(
          "Account successfully created! Please verify the new account from the user's email address."
        );
      } catch (err) {
        toast.error("Error adding user to database: " + err.message);
      }
    },

    onError: (err) => {
      if (err.message.includes("User already registered")) {
        toast.error("User already exists. Please try logging in.");
      } else {
        toast.error(err.message);
      }
    },
  });

  return { signup, isPending };
}
