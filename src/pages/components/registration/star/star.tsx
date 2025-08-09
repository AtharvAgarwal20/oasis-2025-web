import React, { useEffect, useRef } from 'react'

import Star from "/svgs/registration/star.svg"
/*
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);*/
const star = () => {
 // const StarRef= useRef(null);
  /* useEffect(() => {
  gsap.to(StarRef.current, { x:"50vw",rotate:3000, opacity: 1, duration: 1 ,yoyo:true,repeat:1})})
  */return (
    <div>
      <img /*ref={StarRef}*/ src={Star} alt="" style={{width:'20px',position:"absolute",marginLeft:"-60px"}}/>
      

    </div>
  )
}

export default star
