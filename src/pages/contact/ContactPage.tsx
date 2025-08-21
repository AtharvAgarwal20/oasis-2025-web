import ContactGallery from './components/contactGallery/ContactGallery';
import styles from './Contact.module.scss';
import doors from '/images/contact/DoorsCombined.png'

export default function Contact() {
    return (
        <div className={styles.contactPageWrapper}>
            <div className={styles.contactPage} style={{backgroundImage: `url(${doors})`}} >
                    {/* <div className={styles.contactBg}> */}
                    {/* <img className={styles.contactBgImg} src={door1} />
                    <img className={styles.contactBgImg} src={door2} /> */}
                    {/* <div className={styles.contactBgImg} style={{backgroundImage: door1}} />
                    <div className={styles.contactBgImg} style={{backgroundImage: door2}} />
                </div> */}
                <div className={styles.contactContent}>
                    <ContactGallery />
                </div>
            </div>
        </div>
    );
}