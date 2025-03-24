import supabase from "./supabase";

const Table_Name = "user_details";

// Fetch a specific user by their userId
export async function getUsers() {
  const { 
    data: {user},
    error: authError , 
  } = await supabase.auth.getUser();
     // Use single() to return a single record

  if (authError || !user) {
    throw new Error("User not found");

  }
  let {data,error} = await supabase
  .from(Table_Name)
    .select("*")
    .eq("UUID", user.id)  ;
    if (error) {
      throw error;
}
  return data;
}

// Create a new user in the table
export async function createUser(user: Record<string, any>) {
  const { data, error } = await supabase
    .from(Table_Name)
    .insert([user]);

  if (error) {
    console.error("Supabase Error: ", error);
    throw error;
  }
  return data;
}

// Update an existing user in the table
export async function updateUser(userId: string, updates: Record<string, any>) {
  const { data, error } = await supabase
    .from(Table_Name)
    .update(updates)
    .eq("id", userId);

  if (error) {
    console.error("Supabase Error: ", error);
    throw error;
  }
  return data;
}

// Delete a user from the table
export async function deleteUser(userId: string) {
  const { data, error } = await supabase
    .from(Table_Name)
    .delete()
    .eq("id", userId);

  if (error) {
    console.error("Supabase Error: ", error);
    throw error;
  }
  return data;
}
