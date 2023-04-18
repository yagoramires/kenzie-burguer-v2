import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TLoginValues } from '../components/Form/LoginForm/LoginSchema';
import { TRegisterValues } from '../components/Form/RegisterForm/RegisterSchema';
import { api } from '../services/api';

interface UserProviderProps {
  children: React.ReactNode;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface UserContextProps {
  user: IUser | undefined;
  loginUser: (userData: TLoginValues) => Promise<void>;
  registerUser: (userData: TRegisterValues) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (userData: TLoginValues) => {
    setLoading(true);

    try {
      const res = await api.post('/login', userData);

      localStorage.setItem('@TOKEN', res.data.accessToken);
      localStorage.setItem('@USER', JSON.stringify(res.data.user));

      const data = {
        id: res.data.user.id,
        email: res.data.user.email,
        name: res.data.user.name,
      };

      setUser(data);
      navigate('/shop');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData: TRegisterValues) => {
    setLoading(true);

    try {
      const res = await api.post('/users ', userData);

      localStorage.setItem('@TOKEN', res.data.accessToken);
      localStorage.setItem('@USER', JSON.stringify(res.data.user));

      const data = {
        id: res.data.user.id,
        email: res.data.user.email,
        name: res.data.user.name,
      };

      setUser(data);
      navigate('/shop');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USER');

    navigate('/');
  };

  const validateToken = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('@TOKEN');
      const data = localStorage.getItem('@USER');

      if (data) {
        setUser(JSON.parse(data));
      }

      if (data && token) {
        await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        navigate('/shop');
      }
    } catch (e) {
      navigate('/');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loginUser, registerUser, logoutUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
