import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
// import scrollToNewImages from 'services/scroll-to-new-images';
import {
  fetchImages,
  normalizeData,
  IMAGES_PER_PAGE,
} from 'services/PixabayAPI';
import NoImageAlert from './NoImageAlert/NoImageAlert';
import UseSearchMessage from './UseSearchMessage/UseSearchMessage';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

// const initialState = {
//   page: 1,
//   imageQuery: '',
//   imagesData: [],
//   imagesNumber: null,
//   pageHight: null,
//   status: Status.IDLE,
// };

export default function App() {
  const [page, setPage] = useState(1);
  const [imageQuery, setImageQuery] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const [imagesNumber, setImagesNumber] = useState(null);
  const [pageHight, setPageHight] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!imageQuery) return;
    setStatus(Status.PENDING);
    getImages(imageQuery, page);
  }, [imageQuery, page]);

  const getImages = async (imageQuery, page) => {
    try {
      const { hits, totalHits } = await fetchImages(imageQuery, page);

      if (totalHits === 0) {
        setStatus(Status.REJECTED);
        return;
      }

      const newImagesData = normalizeData(hits);
      setImagesData(prevData => [...prevData, ...newImagesData]);
      setImagesNumber(totalHits);
      setStatus(Status.RESOLVED);
    } catch (error) {
      console.log('error catched: ', error);
      setStatus(Status.REJECTED);
    }
  };

  const handleSearch = text => {
    if (!text) {
      console.log('initial');
      return;
    }

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
    setPageHight(document.body.scrollHeight);
  };

  const checkForNextPage = () => {
    const maxShownImages = page * IMAGES_PER_PAGE;
    return imagesNumber > maxShownImages;
  };

  return (
    <>
      <Searchbar onSearch={handleSearch} />
      <main>
        {status === Status.IDLE && <UseSearchMessage />}
        <ImageGallery imagesData={imagesData} />
        {status === Status.RESOLVED && checkForNextPage() && (
          <Button onClick={handleNextPage}>Load more</Button>
        )}
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && <NoImageAlert />}
      </main>
    </>
  );
}
