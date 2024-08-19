import { useRef, useEffect } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Photo } from '../../types';

interface ImageGalleryProps {
  items: Photo[],
  onImageClick: (imageUrl: string) => void;
}

export default function ImageGallery({ items, onImageClick }: ImageGalleryProps) {
  const lastElementRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <ul className={css.list}>
      {items.map((item, index) => (
        <li
          className={css.item}
          key={item.id}
          ref={index === items.length - 1 ? lastElementRef : null}
          onClick={() => onImageClick(item.urls.regular)}
        >
          <ImageCard data={item} />
        </li>
      ))}
    </ul>
  );
}
