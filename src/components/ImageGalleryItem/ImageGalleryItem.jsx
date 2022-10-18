import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';
import { ModalImage } from '../ModalImage/ModalImage';

export default function ImageGalleryItem({ previewURL, imageURL, tags }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <GalleryImage src={previewURL} alt={tags} />
      </GalleryItem>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <ModalImage src={imageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  previewURL: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
