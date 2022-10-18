import axios from 'axios';

export const IMAGES_PER_PAGE = 12;
const KEY = '29248812-56480c4f477581b48a8b2d913';

axios.defaults.baseURL = 'https://pixabay.com';

export async function fetchImages(query, page) {
  const params = {
    q: query,
    page: page,
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: IMAGES_PER_PAGE,
  };

  const response = await axios.get('/api/', { params });
  return response.data;
}

export function normalizeData(data) {
  return data.map(({ id, webformatURL, largeImageURL, tags }) => ({
    id,
    webformatURL,
    largeImageURL,
    tags,
  }));
}
