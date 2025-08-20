import styles from './ContactGallery.module.scss';
import contacts from './contacts';
import contactBanner from '/images/contact/contact-banner.png'

export default function ContactGallery() {

    return (
        <div className={styles.contactContent}>
            <div className={styles.contactHeading}>
                <img className={styles.contactBanner} src={contactBanner}></img>
            </div>
            <div className={styles.contactGalleryContainer}>
                <div className={styles.contactGallery}>
                    {Array(4).fill(null).map((_, index) => <div className={styles.contactGalleryItem} key={index} />)}
                </div>
                <div className={styles.contactGallery}>
                    {Array(4).fill(null).map((_, index) => <div className={styles.contactGalleryItem} key={index} />)}
                </div>
            </div>
        </div>
    )
}
