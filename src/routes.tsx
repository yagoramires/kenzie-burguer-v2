import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';

const Router = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Loading ..</p>;

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/shop' element={<ShopPage />} />
    </Routes>
  );
};

export default Router;
