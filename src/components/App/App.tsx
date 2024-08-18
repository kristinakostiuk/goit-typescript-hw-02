import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchPhotos } from '../../photos-api';
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadmoreBtn/LoadmoreBtn';
import ImageModal from '../ImageModal/ImageModal';

interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleSearch = async (newPhoto:string) => {
    setPage(1);
    setPhotos([]);
    setTopic(newPhoto);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (topic === '') {
      return;
    }

    async function getPhotos() {
      try {
        setLoading(true);
        const data = await fetchPhotos(topic, page);
        if (data.length === 0) {
          toast.error('Nothing found!');
        } else {
         
            setPhotos(prevPhotos => [...prevPhotos, ...data]);
          
        }
        if (data.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        toast.error('Failed to fetch photos. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    getPhotos();
  }, [page, topic]);

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage('');
  };

  const openModal = (imageUrl:string) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {photos.length > 0 && (
        <ImageGallery items={photos} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {photos.length > 0 && !loading && hasMore && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
      />
      <Toaster position="bottom-center" />
    </div>
  );
}
