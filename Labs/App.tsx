import { Link } from "expo-router";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Link href="/lab_3">
        <button>Go to Lab 3</button>
      </Link>
    </Router>
  );
}
