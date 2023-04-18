import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface ProductsProviderProps {
  children: React.ReactNode;
}

interface ProductContextProps {
  productsList: Array<IProduct>;
  filteredProductsList: Array<IProduct>;
  setProductsList: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setFilteredProductsList: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
}

export const ProductsContext = createContext({} as ProductContextProps);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [productsList, setProductsList] = useState<Array<IProduct>>([]);
  const [filteredProductsList, setFilteredProductsList] = useState<
    Array<IProduct>
  >([]);

  const productsFetch = async () => {
    try {
      const token = localStorage.getItem('@TOKEN');
      const res = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProductsList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    productsFetch();
  }, []);
  return (
    <ProductsContext.Provider
      value={{
        productsList,
        filteredProductsList,
        setProductsList,
        setFilteredProductsList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
