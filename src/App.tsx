 
import AuthPage from './pages/Login';
import QuizPage, { LogoutButton } from './pages/Quiz';
import Admin from './pages/Admin';
import { Routes, Route } from 'react-router-dom';


export default function App() {
  

  return (
    <>
    {/* {user ? (
        <div>
          <p>Имя: {user.first_name}</p>
          <p>Фамилия: {user.last_name}</p>
          <p>Юзернейм: @{user.username}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>Загрузка данных пользователя...</p>
      )} */}
      <LogoutButton/>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<QuizPage />} />
      </Routes>
    </>
  );
}
