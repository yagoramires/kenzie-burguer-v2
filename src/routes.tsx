import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import { Loading } from './components/Loading';

const Router = () => {
  const { loading } = useContext(UserContext);

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/shop' element={<ShopPage />} />
    </Routes>
  );
};

export default Router;
