import styles from './Contect.module.scss';
import { useRef } from 'react';
import door1 from '/images/contact/Door1.png';
import door2 from '/images/contact/Door2.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface ContactDoorsProps {
    aboutUsRef: React.RefObject<HTMLDivElement | null>,
    treeContRef?: React.RefObject<HTMLDivElement | null>,
    bottomContentRef?: React.RefObject<HTMLDivElement | null>,
}

export default function ContectDoors({ aboutUsRef, treeContRef, bottomContentRef }: ContactDoorsProps) {
    const door1Ref = useRef<HTMLDivElement>(null);
    const door2Ref = useRef<HTMLDivElement>(null);
    // const scrollerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        console.log(treeContRef?.current, aboutUsRef?.current)
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(door1Ref.current, {
            x: "-100%",
            scrollTrigger: {
                trigger: door1Ref.current,
                start: "top top",
                end: `+=${window.innerHeight}`,
                scrub: 0.5,
                pin: bottomContentRef?.current,
                pinType: "transform",
                markers: true,
                pinnedContainer: treeContRef?.current,
            }
        })
        gsap.from(door2Ref.current, {
            x: "100%",
            scrollTrigger: {
                trigger: door2Ref.current,
                start: "top top",
                end: `+=${window.innerHeight}`,
                scrub: 0.5,
                pin: bottomContentRef?.current,
                pinType: "transform",
                markers: true,
                pinnedContainer: treeContRef?.current,
            }
        })
    });

    return (
        <div className={styles.contactDoors}>
            <div className={styles.contactDoor} ref={door1Ref}>
                <img className={styles.contactDoorImg} src={door1} />
            </div>
            <div className={styles.contactDoor} ref={door2Ref}>
                <img className={styles.contactDoorImg} src={door2} />
            </div>
        </div>
    )
}
