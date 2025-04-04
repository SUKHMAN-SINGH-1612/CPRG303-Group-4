import supabase from './supabase';

// CREATE: Add a new user to the `users` table
export const createUser = async (uuid: string, email: string, name: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: uuid,
          email: email,
          name: name,
          created_at: new Date().toISOString(),
        },
      ]);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// READ: Get a user by UUID
export const getUserById = async (uuid: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', uuid)
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// READ: Get all users
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// UPDATE: Update user data by UUID
export const updateUser = async (uuid: string, updatedData: { name?: string; email?: string }) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updatedData)
      .eq('id', uuid);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// DELETE: Delete a user by UUID
export const deleteUser = async (uuid: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', uuid);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
