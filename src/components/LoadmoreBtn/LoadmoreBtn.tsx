import css from './LoadmoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
