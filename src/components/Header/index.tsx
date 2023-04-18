import { useContext } from 'react';
import { MdShoppingCart, MdLogout } from 'react-icons/md';

import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import { CartContext } from '../../contexts/CartContext';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';

import { StyledContainer } from '../../styles/grid';
import { UserContext } from '../../contexts/UserContext';

const Header = () => {
  const { cart, setOpenModal } = useContext(CartContext);
  const { logoutUser } = useContext(UserContext);

  const handleOpenCart = () => {
    setOpenModal(true);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img
            src={LogoKenzieBurguer}
            alt='Kenzie Burguer Logo'
            className='logo'
          />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button type='button' onClick={handleOpenCart}>
                {cart.length > 0 && <p>{cart.length}</p>}
                <MdShoppingCart size={28} />
              </button>
              <button type='button' onClick={handleLogout}>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
