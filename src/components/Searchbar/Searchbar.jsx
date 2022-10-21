import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';
import { MdSearch } from 'react-icons/md';
import { Formik } from 'formik';

const initialValues = {
  query: '',
};

const Searchbar = ({ onSearch, barRef }) => {
  useEffect(() => {
    barRef.offset = barRef.current.scrollHeight;
  }, [barRef]);

  const handleSubmit = (values, _) => {
    onSearch(values.query.trim());
  };

  return (
    <Wrapper ref={barRef}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchFormBtn type="submit">
            <MdSearch size={28} />
          </SearchFormBtn>

          <SearchFormInput
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Wrapper>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  barRef: PropTypes.shape({}).isRequired,
};
