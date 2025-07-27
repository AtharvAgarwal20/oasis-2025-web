import { useEffect, useState } from "react";

import styles from "./Landing.module.scss";

import Navbar from "../components/navbar/Navbar";
// import Drawing from "../components/Background/Drawing";

// import smallMountains from "/images/landing/smallMountains.png";
// import bigMountain from "/images/landing/bigMountain.png";
// import cloud from "/images/landing/cloud.png";
// import sun from "/images/landing/sun.png";
import tree from "/images/landing/tree.png";
import registerBtn from "/svgs/landing/registerBtn.svg";
import logo from "/svgs/logo.svg";
import insta from "/svgs/landing/insta.svg";
import twitter from "/svgs/landing/twitter.svg";
import linkedin from "/svgs/landing/linkden.svg";
import socialLinksBg from "/svgs/landing/socialLinkBg.svg";

const TARGET_DATE = new Date("2025-11-05T00:00:00Z");

const socialLinks = [
  {
    icon: twitter,
    url: "https://x.com/bitsoasis",
  },
  {
    icon: linkedin,
    url: "https://www.linkedin.com/company/oasis24-bits-pilani/",
  },
  {
    icon: insta,
    url: "https://www.instagram.com/bitsoasis/",
  },
];

export default function Landing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={styles.landing}>
      <Navbar />

      {/* <div className={styles.cloudContainer}>
        <img src={cloud} className={styles.cloud} alt="" />
      </div>
      <div className={styles.sunContainer}>
        <img src={sun} className={styles.sun} alt="" />
      </div>
      <div className={styles.bigMountainContainer}>
        <img src={bigMountain} className={styles.bigMountain} alt="" />
      </div>
      <div className={styles.smallMountainsContainer}>
        <img src={smallMountains} className={styles.smallMountains} alt="" />
      </div> */}

      {/* <div className={styles.background}>
        <Drawing className={styles.backgroundSvg} />
      </div> */}
      <div className={styles.treeContainer}>
        <img src={tree} className={styles.tree} alt="" />
      </div>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} alt="Logo" />
      </div>
      <div className={styles.dateCountdown}>
        <div className={`${styles.daysLeft} ${styles.timeLeft}`}>
          <div className={styles.days}>{timeLeft.days}</div>
          DAYS
        </div>
        :
        <div className={`${styles.hoursLeft} ${styles.timeLeft}`}>
          <div className={styles.hours}>{timeLeft.hours}</div>
          HOURS
        </div>
        :
        <div className={`${styles.minutesLeft} ${styles.timeLeft}`}>
          <div className={styles.minutes}>{timeLeft.minutes}</div>
          MINUTES
        </div>
        :
        <div className={`${styles.secondsLeft} ${styles.timeLeft}`}>
          <div className={styles.seconds}>{timeLeft.seconds}</div>
          SECONDS
        </div>
      </div>
      <div className={styles.socialLinksContainer}>
        <div className={styles.linkBackground}>
          <img src={socialLinksBg} alt="" />
        </div>
        <div className={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <img src={link.icon} alt="" />
            </a>
          ))}
        </div>
      </div>
      <div className={styles.registerBtnContainer}>
        <img src={registerBtn} className={styles.registerBtn} alt="Register" />
        <div className={styles.registerBtnText}>Register</div>
      </div>
    </div>
  );
}
