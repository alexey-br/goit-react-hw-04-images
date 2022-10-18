import noImage from './not-found.png';
import Box from 'components/reusableComponents/Box/Box';

const NoImageAlert = () => {
  return (
    <Box m="auto" width="fit-content">
      <img src={noImage} alt="not found monster" />
    </Box>
  );
};

export default NoImageAlert;
