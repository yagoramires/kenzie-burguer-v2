import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { ProductsContext } from '../../contexts/ProductsContext';

const ProductList = () => {
  const { productsList, filteredProductsList } = useContext(ProductsContext);
  return (
    <StyledProductList>
      {filteredProductsList.length === 0
        ? productsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : filteredProductsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </StyledProductList>
  );
};

export default ProductList;
