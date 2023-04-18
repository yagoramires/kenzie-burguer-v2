import { useContext, useEffect } from 'react';
import { StyledShopPage } from './style';

import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { ProductsContext } from '../../contexts/ProductsContext';

const ShopPage = () => {
  const { productsFetch } = useContext(ProductsContext);

  useEffect(() => {
    productsFetch();
  }, []);

  return (
    <StyledShopPage>
      <CartModal />
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};
export default ShopPage;
