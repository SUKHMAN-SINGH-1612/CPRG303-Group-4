import supabase from "./supabase";

// Sign Up function
export const signUp = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return data.user;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

// Sign In function
export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data.user;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

// Sign Out function
export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        console.log('Signed out successfully');
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};