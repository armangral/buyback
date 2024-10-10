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

export async function getCurrentUser() {
  // Get the current session
  const { data: session } = await supabase.auth.getSession();

  // If there is no session, return null
  if (!session.session) return null;

  // Get the current user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log(userData);

  // If there was an error fetching user data, throw an error
  if (userError) throw new Error(userError.message);

  // Get user ID
  const userId = userData?.user?.id;

  // Fetch user role from your database (adjust this to your actual database structure)
  const { data: roleData, error: roleError } = await supabase
    .from("users") // Replace with your actual roles table name
    .select("role")
    .eq("id", userId) // Assuming you have user_id column
    .single(); // Assuming each user has a single role

  // If there was an error fetching role data, throw an error
  if (roleError) throw new Error(roleError.message);

  console.log("userfournd", userData, roleData.role);

  const data = {
    user: userData.user,
    user_role: roleData ? roleData.role : null,
  };

  console.log("newdata", data);

  // Create and return the user object with the role
  return data;
}

export async function LogoutUser() {
  console.log("saad2");

  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
