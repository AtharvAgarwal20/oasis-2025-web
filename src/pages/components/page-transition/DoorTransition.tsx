import  { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./style.module.scss";
import Door1Image from "/images/doors/Door1.png";
import Door2Image from "/images/doors/Door2.png";
import Door3Image from "/images/doors/Door3.png";
import Door4Image from "/images/doors/Door4.png";

type Phase = "idle" | "closing" | "waiting" | "opening";

interface Props {
  phase: Phase;
  onClosed?: () => void;
  onOpened?: () => void;
}

export default function DoorTransition({ phase, onClosed, onOpened }: Props) {
  const c1 = useAnimation();
  const c2 = useAnimation();
  const c3 = useAnimation();
  const c4 = useAnimation();

  const START = {
    outerLeft: "-200%",
    innerLeft: "-300%",
    innerRight: "300%",
    outerRight: "200%",
  };

  useEffect(() => {
    let cancelled = false;

    const runClosing = async () => {
      await Promise.all([
        c1.set({ "--dx": START.outerLeft }),
        c2.set({ "--dx": START.innerLeft }),
        c3.set({ "--dx": START.innerRight }),
        c4.set({ "--dx": START.outerRight }),
      ]);
      if (cancelled) return;

      await Promise.all([
        c1.start({ "--dx": "0%", transition: { duration: 0.7, ease: "easeInOut" } }),
        c4.start({ "--dx": "0%", transition: { duration: 0.7, ease: "easeInOut" } }),
      ]);
      if (cancelled) return;

      await Promise.all([
        c2.start({ "--dx": "0%", transition: { duration: 0.9, ease: "easeInOut" } }),
        c3.start({ "--dx": "0%", transition: { duration: 0.9, ease: "easeInOut" } }),
      ]);

      if (!cancelled) onClosed?.();
    };

    const runOpening = async () => {
      await Promise.all([
        c2.start({ "--dx": START.innerLeft, transition: { duration: 0.7, ease: "easeInOut" } }),
        c3.start({ "--dx": START.innerRight, transition: { duration: 0.7, ease: "easeInOut" } }),
      ]);

      await Promise.all([
        c1.start({ "--dx": START.outerLeft, transition: { duration: 0.9, ease: "easeInOut" } }),
        c4.start({ "--dx": START.outerRight, transition: { duration: 0.9, ease: "easeInOut" } }),
      ]);

      if (!cancelled) onOpened?.();
    };

    if (phase === "closing") runClosing();
    if (phase === "opening") runOpening();

    return () => { cancelled = true; };
  }, [phase, c1, c2, c3, c4, onClosed, onOpened]);

  if (phase === "idle") return null;

  return (
    <div className={styles.cont} aria-hidden>
      <motion.img src={Door1Image} className={`${styles.door} ${styles.door1}`} style={{ "--dx": START.outerLeft } as any} animate={c1} />
      <motion.img src={Door2Image} className={`${styles.door} ${styles.door2}`} style={{ "--dx": START.innerLeft } as any} animate={c2} />
      <motion.img src={Door3Image} className={`${styles.door} ${styles.door3}`} style={{ "--dx": START.innerRight } as any} animate={c3} />
      <motion.img src={Door4Image} className={`${styles.door} ${styles.door4}`} style={{ "--dx": START.outerRight } as any} animate={c4} />
    </div>
  );
}
