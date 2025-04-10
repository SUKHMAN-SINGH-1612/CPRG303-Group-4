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

// CREATE: Add a new transaction to the `transactions` table
export const createTransaction = async (
  userId: string,
  amount: number,
  categoryId: string,
  description: string,
  date: string
) => {
  try {
    const { data, error } = await supabase.from('transactions').insert([
      {
        user_id: userId,
        amount,
        category_id: categoryId,
        description,
        date,
      },
    ]);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

// READ: Get user preferences
export const getUserPreferences = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Use maybeSingle to handle no rows gracefully

    if (error) throw error;
    if (!data) {
      console.warn('No preferences found for user:', userId);
      return null; // Return null if no preferences exist
    }
    return data;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
};

// UPDATE: Update user preferences
export const updateUserPreferences = async (
  userId: string | null,
  preferences: { currency?: string; theme?: string; notification_enabled?: boolean }
) => {
  try {
    if (!userId) {
      throw new Error('User ID is required to update preferences.');
    }

    const { error } = await supabase
      .from('user_preferences')
      .upsert({ user_id: userId, ...preferences }, { onConflict: 'user_id' });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};
