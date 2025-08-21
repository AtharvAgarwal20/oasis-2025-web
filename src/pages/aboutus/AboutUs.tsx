import { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./AboutUs.module.scss";
import Header from "/svgs/aboutus/header.svg";
import fan from "/svgs/aboutus/fan.png";
const icons = [
  "/svgs/aboutus/letter1.svg",
  "/svgs/aboutus/letter2.svg",
  "/svgs/aboutus/letter3.svg",
  "/svgs/aboutus/letter4.svg",
];

const AboutUs = () => {
  useEffect(() => {
    gsap.set(`.${styles.fan2}`, {
      xPercent: 100,
      yPercent: -100,
    });
  }, []);

  useEffect(() => {
    gsap.to(`.${styles.fan1}`, {
      
      rotateX:-5,
      rotateY:-5,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    gsap.to(`.${styles.fan2}`, {
      
      duration: 0.5,
       
      rotateX:-5,
      rotateY:-5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    const spawnIcon = (fanSelector: string, isFan1: boolean) => {
      const fanEl = document.querySelector(fanSelector) as HTMLElement;
      if (!fanEl || !fanEl.parentElement) return;

      const rect = fanEl.getBoundingClientRect();
      const parentRect = fanEl.parentElement.getBoundingClientRect();

      const startX = rect.left - parentRect.left + rect.width / 2;
      const startY = rect.top - parentRect.top + rect.height / 2;

      const iconSrc = icons[Math.floor(Math.random() * icons.length)];
      const img = document.createElement("img");
      img.src = iconSrc;
      img.className = styles.flyingIcon;
      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      fanEl.parentElement.appendChild(img);

      let angle;
      if (isFan1) {
        angle = Math.random() * (Math.PI / 2);
      } else {
        angle = Math.PI + Math.random() *2* (Math.PI / 3); 
      }

      const distance =  Math.random() * 100;
      const dx = Math.cos(angle) * distance;
      const dy = -Math.sin(angle) * distance;

      gsap.fromTo(
        img,
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: 1,
          x: dx,
          y: dy,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(img, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => img.remove(),
            });
          },
        }
      );
    };
    const spawnIcon2 = (fanSelector: string, isFan1: boolean) => {
      const fanEl = document.querySelector(fanSelector) as HTMLElement;
      if (!fanEl || !fanEl.parentElement) return;

      const rect = fanEl.getBoundingClientRect();
      const parentRect = fanEl.parentElement.getBoundingClientRect();

      const startX = rect.left - parentRect.left + rect.width / 2;
      const startY = rect.top - parentRect.top + rect.height / 2 - 100;

      const iconSrc = icons[Math.floor(Math.random() * icons.length)];
      const img = document.createElement("img");
      img.src = iconSrc;
      img.className = styles.flyingIcon;
      img.style.left = `${startX}px`;
      img.style.top = `${startY}px`;

      fanEl.parentElement.appendChild(img);

      let angle;
      if (isFan1) {
        angle = Math.random() *2* (Math.PI / 3);
      } else {
        angle = Math.PI + Math.random() *2* (Math.PI / 3); 
      }

      const distance =  Math.random() * 100;
      const dx = Math.cos(angle) * distance;
      const dy = -Math.sin(angle) * distance;

      gsap.fromTo(
        img,
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: 1,
          x: dx,
          y: dy,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(img, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => img.remove(),
            });
          },
        }
      );
    };

   let interval: number;


    const startSpawning = () => {
      interval = setInterval(() => {
        spawnIcon2(`.${styles.fan1}`, true);
        spawnIcon(`.${styles.fan2}`, false);
      }, 400);
    };

    const stopSpawning = () => clearInterval(interval);

    const handleVisibility = () => {
      if (document.hidden) {
        stopSpawning();
      } else {
        startSpawning();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // start initially
    startSpawning();

    return () => {
      stopSpawning();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className={styles.AboutContainer}>
      <div className={styles.header}>
        <img src={Header} alt="About Us" />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.vid}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Ogio7ZJSb9g?autoplay=0&amp;mute=0&amp;controls=0&amp;origin=https%3A%2F%2Fwww.bits-oasis.org&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1&amp;forigin=https%3A%2F%2Fwww.bits-oasis.org%2F&amp;aoriginsup=1&amp;gporigin=https%3A%2F%2Fwww.google.com%2F&amp;vf=6"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ objectFit: "cover" }}
          ></iframe>

          {/* Fans */}
          <img src={fan} alt="" className={styles.fan1} />
          <img src={fan} alt="" className={styles.fan2} />
        </div>
      </div>
      <div className={styles.abt}>
        <div className={styles.aboutback}>
          <p>Oasis, the annual cultural extravaganza of Birla Institute of Technology and Science, Pilani, has been a vibrant part of India's cultural tapestry since 1971. Managed entirely by students, it's a dazzling showcase of talent in Dance, Drama, Literature, Comedy, Fashion, and Music. It's where dreams come alive, laughter fills the air, and creativity knows no bounds. Step into the world of Oasis, where youth's boundless potential shines.</p>
        </div>
        
        <p></p>
      </div>
      
    </div>
  );
};

export default AboutUs;
