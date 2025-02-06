import { Link } from "expo-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Button, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <Router>
      <View style={styles.container}>
        <Link href="/lab_3">
          <Button title="Go to Lab 3" onPress={() => {}} />
        </Link>
      </View>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
