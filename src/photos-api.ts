import axios from "axios";
import { Photo } from "./types";

axios.defaults.baseURL = 'https://api.unsplash.com'

interface FetchPhotosResponse {
  results: Photo[];
};

export const fetchPhotos = async (query:string, currentPage:number) => {
  const response = await axios.get<FetchPhotosResponse>("/search/photos",
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