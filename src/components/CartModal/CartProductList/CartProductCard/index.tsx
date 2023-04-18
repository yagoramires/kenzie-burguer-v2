import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext } from '../../../../contexts/CartContext';
import { IProduct } from '../../../ProductList';

interface CartProductCardProps {
  product: IProduct;
}

const CartProductCard = ({ product }: CartProductCardProps) => {
  const { removeProductFromCart } = useContext(CartContext);

  const handleRemove = () => {
    removeProductFromCart(product);
  };

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={product.img} alt='Hamburguer' />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <button type='button' aria-label='Remover' onClick={handleRemove}>
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
