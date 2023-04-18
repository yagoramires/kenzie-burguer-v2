import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MdSearch, MdClose } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { ProductsContext } from '../../../contexts/ProductsContext';

type TSearchValue = {
  search: string;
};

const SearchForm = () => {
  const { register, handleSubmit, setValue } = useForm<TSearchValue>();

  const { productsList, filteredProductsList, setFilteredProductsList } =
    useContext(ProductsContext);

  const handleSearch: SubmitHandler<TSearchValue> = (formData) => {
    if (formData.search.length > 0) {
      const productsFilter = productsList.filter((product) =>
        product.name.toLowerCase().includes(formData.search.toLowerCase())
      );

      setFilteredProductsList(productsFilter);
    }
  };

  const handleCleanSearch = () => {
    if (filteredProductsList.length > 0) {
      setValue('search', '');
      setFilteredProductsList([]);
    }
  };

  return (
    <StyledSearchForm onSubmit={handleSubmit(handleSearch)}>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        {...register('search')}
      />
      {filteredProductsList.length === 0 ? (
        <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
          <MdSearch />
        </StyledButton>
      ) : (
        <StyledButton
          type='submit'
          $buttonSize='medium'
          $buttonStyle='green'
          style={{ background: 'red' }}
          onClick={handleCleanSearch}
        >
          <MdClose />
        </StyledButton>
      )}
    </StyledSearchForm>
  );
};

export default SearchForm;
