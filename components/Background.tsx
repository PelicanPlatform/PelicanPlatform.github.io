import styles from '@/app/page.module.css';
import ExportedImage from 'next-image-export-optimizer';

export const BackgroundPage = ({ image }: any) => {
  return (
    <div>
      <div className={styles.bgWrap}>
        <ExportedImage
          alt='Mountains'
          src={image}
          placeholder='blur'
          fill
          sizes='100vw'
          style={{
            objectFit: 'cover',
            opacity: '50%',
          }}
        />
      </div>
    </div>
  );
};
