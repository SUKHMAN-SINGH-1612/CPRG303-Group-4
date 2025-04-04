import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to create a user record in the public.users table
async function createUserRecord(userId: string, email: string, name: string) {
  try {
    // Check if user already exists in the users table
    const { data: existingUser } = await supabase.from("users").select("id").eq("id", userId).single()

    // If user doesn't exist, create a new record
    if (!existingUser) {
      const { error } = await supabase.from("users").insert({
        id: userId,
        email: email,
        name: name,
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error creating user record:", error)
      }
    }
  } catch (error) {
    console.error("Error in createUserRecord:", error)
  }
}

export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
       
      },
    },
  })

  if (error) {
    throw error
  }

  // After successful signup, create a record in the users table
  if (data.user) {
    await createUserRecord(data.user.id, email, name)
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  // Ensure user exists in the users table
  if (data.user) {
    const { data: userData } = await supabase.from("users").select("*").eq("id", data.user.id).single()

    if (!userData) {
      // If user doesn't exist in users table, create a record
      await createUserRecord(
        data.user.id,
        data.user.email || "",
        data.user.user_metadata.name || data.user.email?.split("@")[0] || "User",
        
      )
    }
  }

  return data
}


export const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export const getCurrentUser = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  if (!session) {
    return null
  }

  return session.user
}



export default supabase

