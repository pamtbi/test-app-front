/* eslint-disable @typescript-eslint/no-explicit-any */

import AuthPage from './pages/Login';
import QuizPage, { LogoutButton } from './pages/Quiz';
import Admin from './pages/Admin';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import {asyncScript} from "./utils/asyncScript"

export default function App() {

  useEffect(() => {
    const wind = window as any
    asyncScript("https://telegram.org/js/telegram-web-app.js").then(() => {
      const tg = wind.Telegram.WebApp;
      tg.ready();
      tg.expand();

      console.log(tg.initData);

      const user = tg.initDataUnsafe.user;
      console.log(user);
    });
  }, []);

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
}
