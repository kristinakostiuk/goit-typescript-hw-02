import css from './ImageCard.module.css';

interface ImageCardProps {
  data: {
    urls: {
      small: string;
    };
    alt_description: string;
  };
}

export default function ImageCard({ data }: ImageCardProps ) {
  return <img className={css.img} src={data.urls.small} alt={data.alt_description} />;
}
