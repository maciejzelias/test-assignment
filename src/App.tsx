import { useContext } from 'react';
import AuthContext from './context/auth-context';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import Layout from './components/layout/Layout';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <TasksPage />
    </Layout>
  );
}

export default App;
