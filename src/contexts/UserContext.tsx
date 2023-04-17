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
  loading: boolean;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (userData: TLoginValues) => {
    setLoading(true);

    try {
      const res = await api.post('/login', userData);

      localStorage.setItem('@TOKEN', res.data.accessToken);

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

  const validateToken = async () => {
    try {
      const token = localStorage.getItem('@TOKEN');

      await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/shop');
    } catch (e) {
      navigate('/');
      console.log(e);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, registerUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
