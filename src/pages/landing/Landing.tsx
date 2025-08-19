import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

import styles from "./Landing.module.scss";
import useOverlayStore from "../../utils/store";

import Navbar from "../components/navbar/Navbar";
import tree from "/images/landing/tree1.png";
import landingImage from "/images/landing/background1.png";
import registerBtn from "/svgs/landing/registerBtn.svg";
import logo from "/svgs/logo.svg";
import insta from "/svgs/landing/insta.svg";
import twitter from "/svgs/landing/twitter.svg";
import linkedin from "/svgs/landing/linkden.svg";
import socialLinksBg from "/svgs/landing/socialLinkBg.svg";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// const TARGET_DATE = new Date("2025-11-05T00:00:00Z");

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
interface LandingProps {
  goToRegister: () => void;
}

export default function Landing({ goToRegister }: LandingProps) {
  const overlayIsActive = useOverlayStore((state) => state.isActive);
  const treeImageRef = useRef<HTMLImageElement>(null);
  const landingRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const registerBtnRef = useRef<HTMLDivElement>(null);

  const [showMask, setShowMask] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (scrollY >= vh) {
        // 100vh scrolled
        setShowMask(true);
      } else {
        setShowMask(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=800vh",
        scrub: 1.2,
        pin: `.${styles.treeContainer}`,
        markers: true,
      },
    });

    masterTimeline
      .to(
        treeImageRef.current,
        {
          scale: 1.2,
          duration: 4,
          ease: "power2.out",
        },
        0
      )
      .to(
        landingRef.current,
        {
          scale: 1.13,
          duration: 4,
          ease: "power2.out",
        },
        0
      )

      .to(
        treeImageRef.current,
        {
          y: "-50%",
          scale: 1.4,
          duration: 10,
          ease: "sine.in",
        },
        3
      )

      .to(
        landingRef.current,
        {
          y: "-40%",
          scale: 1.15,
          duration: 10,
          ease: "sine.in",
        },
        3.5
      );
  }, []);

  // const [timeLeft, setTimeLeft] = useState({
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });

  // useEffect(() => {
  //   const calculateTimeLeft = () => {
  //     const now = new Date();
  //     const difference = TARGET_DATE.getTime() - now.getTime();

  //     if (difference <= 0) {
  //       setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //       return;
  //     }

  //     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor(
  //       (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  //     setTimeLeft({ days, hours, minutes, seconds });
  //   };

  //   calculateTimeLeft();
  //   const timerId = setInterval(calculateTimeLeft, 1000);

  //   return () => clearInterval(timerId);
  // }, []);

  return (
    <>
      <div
        className={
          !overlayIsActive
            ? `${styles.pointerNoneEvent} ${styles.wrapper}`
            : styles.wrapper
        }
        ref={wrapperRef}
      >
        <div className={styles.landing}>
          <img
            src={landingImage}
            className={styles.landingImage}
            ref={landingRef}
          />
          <Navbar />

          <div className={styles.treeContainer}>
            <img
              src={tree}
              className={styles.tree}
              alt=""
              ref={treeImageRef}
              loading="eager"
              fetchPriority="high"
              style={{ contain: "none" }}
            />
          </div>
          <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo} alt="Logo" />
          </div>
          {/* <div className={styles.dateCountdown}>
            <div className={`${styles.daysLeft} ${styles.timeLeft}`}>
              <div className={styles.days}>
                {timeLeft.days > 10 ? (
                  <span>{timeLeft.days}</span>
                ) : (
                  <span>0{timeLeft.days}</span>
                )}
              </div>
              DAYS
            </div>
            :
            <div className={`${styles.hoursLeft} ${styles.timeLeft}`}>
              <div className={styles.hours}>
                {timeLeft.hours > 10 ? (
                  <span>{timeLeft.hours}</span>
                ) : (
                  <span>0{timeLeft.hours}</span>
                )}
              </div>
              HOURS
            </div>
            :
            <div className={`${styles.minutesLeft} ${styles.timeLeft}`}>
              <div className={styles.minutes}>
                {timeLeft.minutes > 10 ? (
                  <span>{timeLeft.minutes}</span>
                ) : (
                  <span>0{timeLeft.minutes}</span>
                )}
              </div>
              MINUTES
            </div>
          </div> */}
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
          <div
            className={styles.registerBtnContainer}
            style={{ maskImage: showMask ? "url('/videos/ink-spread-4.gif')" : "none" }}
            onClick={goToRegister}
            ref={registerBtnRef}
          >
            <img
              src={registerBtn}
              className={styles.registerBtn}
              alt="Register"
            />
            <div className={styles.registerBtnText}>Register</div>
          </div>
        </div>
      </div>
    </>
  );
}
