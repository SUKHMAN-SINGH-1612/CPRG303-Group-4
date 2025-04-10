import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import supabase from '../../lib/supabase';
import { getUserPreferences, updateUserPreferences } from '../../lib/supabase_crud';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function PreferencesPage() {
  const { theme, updateTheme, isThemeLoading } = useTheme();
  const router = useRouter();
  const [localPreferences, setLocalPreferences] = useState<{
    currency: string;
    notification_enabled: boolean;
  } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const colors = Colors[theme];

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsInitialLoading(true);
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          const currentUserId = session.session.user.id;
          setUserId(currentUserId);

          const userPreferences = await getUserPreferences(currentUserId);
          if (userPreferences) {
            setLocalPreferences({
              currency: userPreferences.currency || 'USD',
              notification_enabled: userPreferences.notification_enabled === undefined ? true : userPreferences.notification_enabled,
            });
          } else {
            setLocalPreferences({ currency: 'USD', notification_enabled: true });
          }
        } else {
          setLocalPreferences({ currency: 'USD', notification_enabled: true });
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
        setLocalPreferences({ currency: 'USD', notification_enabled: true });
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSavePreferences = async () => {
    if (!userId || !localPreferences) {
      console.error('User ID or local preferences not available.');
      return;
    }

    try {
      await updateUserPreferences(userId, {
        currency: localPreferences.currency,
        notification_enabled: localPreferences.notification_enabled,
      });
      console.log('Preferences updated successfully.');
      alert('Preferences Saved!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences.');
    }
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
        alert('Logout failed: ' + error.message);
      } else {
        router.replace('/auth/login');
      }
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      alert('An unexpected error occurred during logout.');
    }
  };

  if (isInitialLoading || isThemeLoading || !localPreferences) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  const themedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    title: {
      color: colors.text,
    },
    label: {
      color: colors.text,
    },
    pickerContainer: {
      borderColor: theme === 'light' ? '#ccc' : '#555',
      backgroundColor: colors.background,
    },
    picker: {
      color: colors.text,
    },
    pickerItem: {
    },
    themeValue: {
      color: colors.tint,
    },
    saveButton: {
      backgroundColor: colors.tint,
    },
    saveButtonText: {
      color: theme === 'light' ? '#fff' : colors.background,
    },
  });

  return (
    <View style={[styles.container, themedStyles.container]}>
      <Text style={[styles.title, themedStyles.title]}>App Preferences</Text>

      <View style={styles.preferenceItem}>
        <Text style={[styles.label, themedStyles.label]}>Currency</Text>
        <View style={[styles.pickerContainer, themedStyles.pickerContainer]}>
          <Picker
            selectedValue={localPreferences.currency}
            style={[styles.picker, themedStyles.picker]}
            itemStyle={themedStyles.pickerItem}
            dropdownIconColor={colors.text}
            onValueChange={(itemValue) =>
              setLocalPreferences((prev) => ({ ...prev!, currency: itemValue }))
            }
          >
            <Picker.Item label="USD" value="USD" color={colors.text} />
            <Picker.Item label="EUR" value="EUR" color={colors.text} />
            <Picker.Item label="GBP" value="GBP" color={colors.text} />
            <Picker.Item label="CAD" value="CAD" color={colors.text} />
            <Picker.Item label="AUD" value="AUD" color={colors.text} />
          </Picker>
        </View>
      </View>

      <View style={styles.preferenceItem}>
        <Text style={[styles.label, themedStyles.label]}>Theme</Text>
        <TouchableOpacity onPress={handleThemeChange}>
          <Text style={[styles.value, themedStyles.themeValue]}>
            {theme}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.preferenceItem}>
        <Text style={[styles.label, themedStyles.label]}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: colors.tint }}
          thumbColor={localPreferences.notification_enabled ? (theme === 'dark' ? colors.background : '#f4f3f4') : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          value={localPreferences.notification_enabled}
          onValueChange={(value) =>
            setLocalPreferences((prev) => ({ ...prev!, notification_enabled: value }))
          }
        />
      </View>

      <TouchableOpacity style={[styles.buttonBase, themedStyles.saveButton]} onPress={handleSavePreferences}>
        <Ionicons name="save-outline" size={20} color={themedStyles.saveButtonText.color} />
        <Text style={[styles.saveButtonText, themedStyles.saveButtonText]}>Save Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonBase, styles.logoutButton]} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  pickerContainer: {
    flex: 1,
    marginLeft: 100,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  value: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  buttonBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  logoutButton: {
    backgroundColor: '#DC3545',
  },
  logoutButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  saveButtonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
});
