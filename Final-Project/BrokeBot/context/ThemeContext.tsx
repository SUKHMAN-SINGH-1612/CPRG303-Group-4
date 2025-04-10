import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import supabase from '../lib/supabase';
import { getUserPreferences, updateUserPreferences } from '../lib/supabase_crud';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  isThemeLoading: boolean;
  updateTheme: (newTheme: Theme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = Appearance.getColorScheme() ?? 'light';
  const [theme, setTheme] = useState<Theme>(systemTheme);
  const [isThemeLoading, setIsThemeLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Get user ID on auth state change
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUserId = session?.user?.id ?? null;
      setUserId(currentUserId);
    });

    // Fetch initial user ID
    supabase.auth.getSession().then(({ data: { session } }) => {
       setUserId(session?.user?.id ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch theme preference when userId is available
  useEffect(() => {
    const fetchTheme = async () => {
      if (userId) {
        setIsThemeLoading(true);
        try {
          const preferences = await getUserPreferences(userId);
          if (preferences?.theme) {
            setTheme(preferences.theme as Theme);
          } else {
            // If no preference stored, use system theme
            setTheme(systemTheme);
          }
        } catch (error) {
          console.error('Failed to fetch theme preference:', error);
          setTheme(systemTheme); // Fallback to system theme on error
        } finally {
          setIsThemeLoading(false);
        }
      } else {
        // No user logged in, use system theme and finish loading
        setTheme(systemTheme);
        setIsThemeLoading(false);
      }
    };

    fetchTheme();
  }, [userId, systemTheme]);

  const updateTheme = async (newTheme: Theme) => {
    if (!userId) {
        console.warn('Cannot update theme preference: User not logged in.');
        setTheme(newTheme); // Update local state anyway for immediate feedback
        return;
    }
    try {
      setTheme(newTheme); // Update state immediately for responsiveness
      await updateUserPreferences(userId, { theme: newTheme });
    } catch (error) { // Revert if DB update fails? Consider strategy.
      console.error('Failed to update theme preference:', error);
      // Optionally revert theme state here if desired
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isThemeLoading, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 