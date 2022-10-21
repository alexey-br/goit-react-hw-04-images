import { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import {
  fetchImages,
  normalizeData,
  addFirstOnPageFlag,
  IMAGES_PER_PAGE,
} from 'services/PixabayAPI';
import NoImageAlert from './NoImageAlert/NoImageAlert';
import UseSearchMessage from './UseSearchMessage/UseSearchMessage';
import scrollToNextPage from 'services/scrollToNextPage';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [page, setPage] = useState(1);
  const [imageQuery, setImageQuery] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const [imagesNumber, setImagesNumber] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const firstOnPageRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (!imageQuery) return;
    getImages(imageQuery, page);
  }, [imageQuery, page]);

  useEffect(() => {
    if (imagesData.length <= IMAGES_PER_PAGE) return;

    scrollToNextPage(firstOnPageRef.current, barRef, 8);
  }, [imagesData]);

  const getImages = async (imageQuery, page) => {
    setStatus(Status.PENDING);
    try {
      const { hits, totalHits } = await fetchImages(imageQuery, page);

      if (totalHits === 0) {
        setStatus(Status.REJECTED);
        return;
      }

      const newImagesData = normalizeData(hits);
      const dataWithFirstFlag = addFirstOnPageFlag(newImagesData);
      setImagesData(prevData => [...prevData, ...dataWithFirstFlag]);
      setImagesNumber(totalHits);
      setStatus(Status.RESOLVED);
    } catch (error) {
      console.log('error catched: ', error);
      setStatus(Status.REJECTED);
    }
  };

  const handleSearch = text => {
    if (!text) return;

    setImageQuery(prevQuery => {
      if (text !== prevQuery) {
        setImagesData([]);
        setPage(1);
      }
      return text;
    });
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const checkForNextPage = () => {
    const maxShownImages = page * IMAGES_PER_PAGE;
    return imagesNumber > maxShownImages;
  };

  return (
    <>
      <Searchbar onSearch={handleSearch} barRef={barRef} />
      <main>
        {status === Status.IDLE && <UseSearchMessage />}
        <ImageGallery imagesData={imagesData} firstRef={firstOnPageRef} />
        {status === Status.RESOLVED && checkForNextPage() && (
          <Button onClick={handleNextPage} />
        )}
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && <NoImageAlert />}
      </main>
    </>
  );
}
