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

const Searchbar = ({ onSearch }) => {
  const handleSubmit = (values, _) => {
    onSearch(values.query.trim());
  };

  return (
    <Wrapper>
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
};
