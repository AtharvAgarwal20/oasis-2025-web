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
import mobileRegisterBtn from "/svgs/landing/mobileRegisterBtn.svg";
import logo from "/svgs/logo.svg";
import insta from "/svgs/landing/insta.svg";
import instaLamp from "/svgs/landing/instaLamp.svg";
import x from "/svgs/landing/x.svg";
import xLamp from "/svgs/landing/xLamp.svg";
import linkden from "/svgs/landing/linkden.svg";
import linkdenLamp from "/svgs/landing/linkdenLamp.svg";
import wire from "/svgs/landing/wire.svg";
import mobileMountains from "/images/landing/mobileMountains.png";
import mobileBackground from "/svgs/landing/mobileBackground.svg";
import { useGSAP } from "@gsap/react";
import { i } from "framer-motion/client";
i;

gsap.registerPlugin(ScrollTrigger);

const TARGET_DATE = new Date("2025-11-05T00:00:00Z");

const socialLinks = [
  {
    icon: x,
    lamp: xLamp,
    classNameDiv: styles.xDiv,
    classNameLamp: styles.xLamp,
    classNameIcon: styles.xIcon,
    url: "https://x.com/bitsoasis",
  },
  {
    icon: linkden,
    lamp: linkdenLamp,
    classNameDiv: styles.linkdenDiv,
    classNameLamp: styles.linkdenLamp,
    classNameIcon: styles.linkdenIcon,
    url: "https://www.linkedin.com/company/oasis24-bits-pilani/",
  },
  {
    icon: insta,
    lamp: instaLamp,
    classNameDiv: styles.instaDiv,
    classNameLamp: styles.instaLamp,
    classNameIcon: styles.instaIcon,
    url: "https://www.instagram.com/bitsoasis/",
  },
];
interface LandingProps {
  goToRegister: () => void;
}

export default function Landing({ goToRegister }: LandingProps) {
  //@ts-ignore
  const overlayIsActive = useOverlayStore((state) => state.isActive);
  const treeImageRef = useRef<HTMLImageElement>(null);
  const landingRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dateCountdownRef = useRef<HTMLDivElement>(null);
  const [removeGif, setRemoveGif] = useState(false);

  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=800vh",
        scrub: 1.2,
        pin: `.${styles.treeContainer}`,
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
          y: "-50%",
          scale: 1.4,
          duration: 10,
          ease: "sine.in",
        },
        3
      )

      .to(
        dateCountdownRef.current,
        {
          y: "-300%",
          duration: 1,
          ease: "sine.in",
        },
        0
      );
  }, []);

  useEffect(() => {
    if (overlayIsActive) {
      setTimeout(() => {
        setRemoveGif(true);
      }, 3620);
    }
  }, [overlayIsActive]);

  useEffect(() => {
    if (removeGif && wrapperRef.current) {
      wrapperRef.current.style.maskImage = "none";
    }
  }, [removeGif]);

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
    <>
      <div
        className={`${styles.wrapper} ${
          !removeGif ? styles.pointerNoneEvent : ""
        } ${overlayIsActive ? styles.mask : ""}`}
        ref={wrapperRef}
      >
        <div
          className={
            overlayIsActive ? ` ${styles.landing}` : `${styles.landing} `
          }
        >
          <img
            src={landingImage}
            className={styles.landingImage}
            ref={landingRef}
          />

          <img
            src={mobileMountains}
            className={styles.mobileMountains}
            alt=""
          />
          <img
            src={mobileBackground}
            alt=""
            className={styles.mobileBackground}
          />

          <Navbar />

          <div className={styles.treeContainer}>
            <div className={styles.tree} ref={treeImageRef}>
              <div className={styles.socialLinksContainer}>
                <div className={styles.wire}>
                  <img src={wire} alt="" />
                </div>
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`${styles.socialLinkContainer} ${link.classNameDiv}`}
                  >
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      <img
                        src={link.icon}
                        alt=""
                        className={`${styles.socialIcon} ${link.classNameIcon}`}
                      />
                      <img
                        src={link.lamp}
                        alt=""
                        className={`${styles.socialLamp} ${link.classNameLamp}`}
                      />
                    </a>
                  </div>
                ))}
              </div>
              <img
                src={tree}
                // className={styles.tree}
                alt=""
                loading="eager"
                fetchPriority="high"
                style={{ contain: "none" }}
              />
            </div>
            <div className={styles.treeExtender}></div>
          </div>
          <div className={styles.logoContainer}>
            <img src={logo} className={styles.logo} alt="Logo" />
          </div>
          <div className={styles.dateCountdown} ref={dateCountdownRef}>
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
          </div>

          <div className={styles.registerBtnContainer} onClick={goToRegister}>
            <img
              src={registerBtn}
              className={styles.registerBtn}
              alt="Register"
            />
            <img
              src={mobileRegisterBtn}
              className={styles.mobileRegisterBtn}
              alt=""
            />
            <div className={styles.registerBtnText}>Register</div>
          </div>
        </div>
      </div>
    </>
  );
}
