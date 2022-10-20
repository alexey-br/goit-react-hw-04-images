import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

const Button = ({ onClick, refElem }) => {
  return (
    <LoadMoreBtn onClick={() => onClick()} ref={refElem}>
      Load more
    </LoadMoreBtn>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
