import ajax from 'axios';

const API_KEY = '19834827-b752d1c95cba28ff11bc03641';
const BASE_URL = 'https://pixabay.com/api';
const imageRequest = ({ currentPage = 1, searchQuery = '', perPage = 12 }) => {
  return ajax
    .get(
      `${BASE_URL}/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
    )
    .then(response => response.data.hits);
};

export default imageRequest;
