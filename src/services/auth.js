import { supabase } from "./supabase";

// Signin function
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message); // Throw the error if login fails
  }

  return data.user; // Return the user object directly
};

// Signup function
export const signUpWithEmail = async (data) => {
  console.log(data);
  const { data: user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(error);
  }

  console.log("User is " + user);

  return { user };
};
