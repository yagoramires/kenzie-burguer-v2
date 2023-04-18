import { createContext, useEffect, useState } from 'react';
import { IProduct } from '../pages/ShopPage';

interface CartProviderProps {
  children: React.ReactNode;
}

interface CartContextProps {
  total: number;
  cart: Array<IProduct>;
  openModal: boolean;
  addProductToCart: (product: IProduct) => void;
  removeProductFromCart: (product: IProduct) => void;
  removeAllProductsFromCart: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Array<IProduct>>([]);
  const [openModal, setOpenModal] = useState(false);
  const [total, setTotal] = useState(0);

  const addProductToCart = (product: IProduct) => {
    const verifyIfProductAlreadyInCart = cart.filter(
      (prod) => prod.id === product.id
    );

    if (verifyIfProductAlreadyInCart.length > 0) {
      return;
    }

    setCart([...cart, product]);
  };

  const removeProductFromCart = (product: IProduct) => {
    const removeProduct = cart.filter((prod) => prod.id !== product.id);

    setCart(removeProduct);
  };

  const removeAllProductsFromCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const totalSum = cart.reduce((acc, cur) => acc + cur.price, 0);
    setTotal(totalSum);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        total,
        cart,
        openModal,
        addProductToCart,
        removeProductFromCart,
        removeAllProductsFromCart,
        setOpenModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
