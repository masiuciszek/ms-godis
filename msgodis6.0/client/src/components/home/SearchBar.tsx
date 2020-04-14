/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
import * as React from 'react';

import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { searchByProduct, clearSearch } from '../../redux/shop/shop.actions';
import { selectFilteredProducts } from '../../redux/shop/shop.selector';
import { IProduct } from '../../redux/shop/shop.types';

interface Props {
  filteredProducts: null | IProduct[];
  searchByProduct: (text: string) => void;
  clearSearch: () => void;

}

const SearchBar: React.FC<Props> = ({ filteredProducts, searchByProduct, clearSearch }) => {
  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    if (filteredProducts === null || filteredProducts === []) {
      setSearch('');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value !== '') {
      searchByProduct(search);
    } else {
      clearSearch();
    }
  };

  return (
    <>
      <label htmlFor="Searchbar">
        <input type="text" id="Searchbar" name="search" value={search} onChange={handleChange} />
      </label>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  filteredProducts: selectFilteredProducts(state),
});


export default connect(mapStateToProps, { searchByProduct, clearSearch })(SearchBar);
