import css from './ImageCard.module.css';
import { Photo } from '../../types';

interface ImageCardProps {
  data: Omit<Photo, 'id' | 'urls.regular'>
}

export default function ImageCard({ data }: ImageCardProps ) {
  return <img className={css.img} src={data.urls.small} alt={data.alt_description} />;
}
