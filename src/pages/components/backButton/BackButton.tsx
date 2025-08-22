import { useContext } from 'react';
import styles from './BackButton.module.scss';
import { navContext } from '../../../App';

export default function BackButton() {
    const { goToPage } = useContext(navContext);

    return (
        <div className={styles.backButton} onClick={() => {if(goToPage) goToPage("/")}} />
    )
}