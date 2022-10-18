import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';
import { ModalImage } from '../ModalImage/ModalImage';

export default class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { previewURL, imageURL, tags } = this.props;
    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryImage src={previewURL} alt={tags} />
        </GalleryItem>
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <ModalImage src={imageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  previewURL: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
