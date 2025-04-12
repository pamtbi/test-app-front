import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import style from "./style.module.sass";
import { link } from "@/utils/link";
import {post} from "@/utils/post";
import { useUser } from "@/providers/userProvider";
import {Button} from "@/components/Button"
import eye from "@/assets/eye-solid.svg";
import eyeSlash from "@/assets/eye-slash-solid.svg";
import WebApp from '@twa-dev/sdk';
import clsx from 'clsx';

interface FormData {
  username: string;
  password: string;
}

const AuthPage = () => {
  const initValues: FormData = { username: '', password: '' };
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>(initValues);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [initData, setInitData] = useState<string | null>(null);
  const userProvider = useUser();

  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setError('');
    setSuccess('');
    setFormData(initValues);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    setError('');
    setSuccess('');

    const endpoint = link(isLogin ? '/api/auth/login' : '/api/auth/register');

    const { response, data } = await post(endpoint, formData);

    setLoading(false);

    if (!response?.ok) {
      setError(data.message || 'Щось пішло не так');
      return;
    }

    setSuccess(data.message || 'Успішно!');

    userProvider?.setToken(data.token);
  };

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();

    setInitData(WebApp.initData)
  }, []);

  const loginWithTelegram = async () => {
    setLoading(true);
    try {
      const { response, data } = await post(link('/api/auth/telegram'), { initData });
  
      if (!response?.ok) {
        setError(data.message || 'Щось пішло не так');
        return;
      }
  
      userProvider?.setToken(data.token);
    } catch (err) {
      setError('Помилка при авторизації');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.container}>
      <h2>{isLogin ? 'Вхід' : 'Реєстрація'}</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          name="username"
          placeholder="Нікнейм"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <div className={style.password}>
          <input
            name="password"
            placeholder="Пароль"
            type={isPassword ? 'password' : 'text'}
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setIsPassword((prev) => !prev)}>
            <img src={isPassword ? eye : eyeSlash} alt="eye" />
          </button>
        </div>
        <Button type="submit" disabled={loading} className={style.button}>
          {loading && (
            <div className={clsx(style.loader, "loader__item")}></div>
          )}
          <span className={clsx(loading && style.hidden)}>{isLogin ? 'Увійти' : 'Зареєструватися'}</span>
        </Button>
        {initData && (
          <Button onClick={loginWithTelegram} type="button">
            Увійти через Telegram
          </Button>
        )}
      </form>
      <div className={style.switch}>
        {isLogin ? "Немає акаунта?" : "Вже є акаунт?"}
        <Button onClick={toggleMode}>
          {isLogin ? 'Зареєструватися' : 'Увійти'}
        </Button>
        <div className={style.message}>
          {error && <p style={{ color: 'red' }}>❌ {error}</p>}
          {success && <p style={{ color: 'green' }}>✅ {success}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
