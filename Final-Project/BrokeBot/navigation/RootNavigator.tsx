import PreferencesPage from '../app/(tabs)/preferencesPage';

// ...other imports...
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

<Stack.Navigator>
  {/* Other screens */}
  <Stack.Screen name="Preferences" component={PreferencesPage} />
</Stack.Navigator>
