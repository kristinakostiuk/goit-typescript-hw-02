import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com'

interface FetchPhotosResponse {
  results: {
    id: string;
    urls: {
      small: string;
      regular: string;
    };
    alt_description: string;
  }[];
}

export const fetchPhotos = async (query:string, currentPage:number) => {
  const response = await axios.get("/search/photos",
    {
    params: {
        query,
        client_id: 'w4BqlWAY-rBQ0eMGKqctvUGuMqzaVv8BR_OQAFUTFTo',
        page: currentPage,
        per_page: 10
    }}
    )
    return response.data.results
}