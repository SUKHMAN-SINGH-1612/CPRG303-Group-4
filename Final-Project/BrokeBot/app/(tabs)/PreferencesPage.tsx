import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import supabase from '../../lib/supabase';
import { getUserPreferences, updateUserPreferences } from '../../lib/supabase_crud';

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    currency: 'USD',
    theme: 'light',
    notification_enabled: true,
  });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          const userId = session.session.user.id;
          setUserId(userId);

          const userPreferences = await getUserPreferences(userId);
          if (userPreferences) {
            setPreferences(userPreferences);
          }
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  const handleSavePreferences = async () => {
    try {
      if (!userId) {
        console.error('User ID is not available.');
        return;
      }

      await updateUserPreferences(userId, preferences);
      console.log('Preferences updated successfully.');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Preferences</Text>

      <View style={styles.preferenceItem}>
        <Text style={styles.label}>Currency</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={preferences.currency}
            style={styles.picker}
            onValueChange={(itemValue) =>
              setPreferences((prev) => ({ ...prev, currency: itemValue }))
            }
          >
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="CAD" value="CAD" />
            <Picker.Item label="AUD" value="AUD" />
          </Picker>
        </View>
      </View>

      <View style={styles.preferenceItem}>
        <Text style={styles.label}>Theme</Text>
        <TouchableOpacity
          onPress={() =>
            setPreferences((prev) => ({
              ...prev,
              theme: prev.theme === 'light' ? 'dark' : 'light',
            }))
          }
        >
          <Text style={[styles.value, preferences.theme === 'dark' && styles.darkTheme]}>
            {preferences.theme}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.preferenceItem}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          value={preferences.notification_enabled}
          onValueChange={(value) =>
            setPreferences((prev) => ({ ...prev, notification_enabled: value }))
          }
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
        <Ionicons name="save-outline" size={20} color="white" />
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
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
    color: '#333',
  },
  pickerContainer: {
    flex: 1,
    marginLeft: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 60,
  },
  value: {
    fontSize: 18,
    color: 'blue',
    textTransform: 'capitalize',
  },
  darkTheme: {
    color: '#555',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  saveButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
});
