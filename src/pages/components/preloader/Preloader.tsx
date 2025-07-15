import { useState, useEffect } from 'react';
import styles from './Preloader.module.scss';

const imagesToPreload = [
  '/images/landing/smallMountains.png',
  '/images/landing/bigMountain.png',
  '/images/landing/tree.png',
  '/images/landing/cloud.png',
  '/images/landing/sun.png',
  '/svgs/landing/registerBtn.svg',
  '/svgs/logo.svg'
];

interface PreloaderProps {
  onEnter: () => void;
}

export default function Preloader({ onEnter }: PreloaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedImages = 0;

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages++;
          setProgress((loadedImages / imagesToPreload.length) * 100);
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    Promise.all(imagesToPreload.map(preloadImage))
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.error('Error preloading images:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.preloader}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.percentage}>{Math.round(progress)}%</div>
        </div>
      ) : (
        <button className={styles.enterButton} onClick={onEnter}>
          Enter
        </button>
      )}
    </div>
  );
}

