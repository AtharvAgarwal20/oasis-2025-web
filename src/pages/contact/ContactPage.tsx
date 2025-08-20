import ContactGallery from './components/contactGallery/ContactGallery';
import styles from './Contact.module.scss';
import door1 from '/images/contact/Door1.png';
import door2 from '/images/contact/Door2.png';

export default function Contact() {
    return (
        <div className={styles.contactPage}>
            <div className={styles.contactBg}>
                <img className={styles.contactBgImg} src={door1} />
                <img className={styles.contactBgImg} src={door2} />
            </div>
            <div className={styles.contactContent}>
                <ContactGallery />
            </div>
        </div>
    );
}