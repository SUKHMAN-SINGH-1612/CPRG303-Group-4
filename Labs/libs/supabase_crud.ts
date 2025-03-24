
import supabase from './supabase'; // Import the initialized Supabase client

const Table_Name = "sampledatabase";

// Fetch users from the table
export async function getUsers() {
  const { data, error } = await supabase
    .from(Table_Name)
    .select("*");

  if (error) {
    console.error("Supabase Error: ", error);
    throw error;
  }
  return data;
}