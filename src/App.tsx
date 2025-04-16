 
import AuthPage from './pages/Login';
import QuizPage, { LogoutButton } from './pages/Quiz';
import Admin from './pages/Admin';
import { Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <>
      <LogoutButton/>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<QuizPage />} />
      </Routes>
    </>
  );
};

export default App;