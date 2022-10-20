import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImagesList } from './ImageGallery.styled';

const ImageGallery = ({ imagesData, firstRef }) => {
  return (
    <ImagesList>
      {imagesData.map(({ id, webformatURL, largeImageURL, tags, first }) => {
        return (
          <li key={id} ref={first && firstRef}>
            <ImageGalleryItem
              previewURL={webformatURL}
              imageURL={largeImageURL}
              tags={tags}
            />
          </li>
        );
      })}
    </ImagesList>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
