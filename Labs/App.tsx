import { Link } from "expo-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Button } from 'react-native';

export default function App() {
  return (
    <Router>
      <Link href="/lab_3">
        <Button title="Go to Lab 3" onPress={() => {}} />
      </Link>
    </Router>
  );
}
