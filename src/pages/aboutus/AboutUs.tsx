import React, { useEffect, useRef } from 'react'
 import styles from "./AboutUs.module.scss"
 import Header from "/svgs/aboutus/header.svg"
const AboutUs = () => {
    const VidRef = useRef<HTMLVideoElement | null>(null);
/*
    const VidPlay =()=>{
        if(VidRef.current)
        {
            VidRef.current.play();
        }
    }
    const VidPause =()=>{
        if(VidRef.current)
        {
            VidRef.current.pause();
        }
    }
    */
  return (
    <div className={styles.AboutContainer}>
      <div className={styles.header}>
        
      <img src={Header} alt="About Us" />
        </div>
        <div className={styles.tree}>
    
      <div className={styles.floor}>
        <img src="/svgs/aboutus/lines.svg" alt="" style={{objectFit:"cover"}}/>
      </div>
     <div className={styles.vid}>
  <iframe
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/gGnki-6IZEc?autoplay=1&mute=1&loop=1&playlist=gGnki-6IZEc"
    title="YouTube video player"
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
    style={{objectFit:"cover"}}
  ></iframe>
</div>
  </div>


      <h1>Hi</h1>
    </div>
  )
}

export default AboutUs
