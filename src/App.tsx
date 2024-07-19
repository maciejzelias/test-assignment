import { useContext } from "react";
import AuthContext from "./context/auth-context";
import LoginPage from "./pages/LoginPage";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return <>test</>;
}

export default App;
