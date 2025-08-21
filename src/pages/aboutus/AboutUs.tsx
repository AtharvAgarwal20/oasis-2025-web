import { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./AboutUs.module.scss";
import Header from "/svgs/aboutus/header.svg";
import fan from "/svgs/aboutus/fan.svg";
import Dagger from "/svgs/aboutus/dagger.svg"
// import Lantern from "/svgs/aboutus/lantern.svg"
const icons = [
  "/svgs/aboutus/letter1.svg",
  "/svgs/aboutus/letter2.svg",
  "/svgs/aboutus/letter3.svg",
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
      rotation: 10,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    gsap.to(`.${styles.fan2}`, {
      rotation: "+=10",
      duration: 0.5,
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
        angle = Math.PI + Math.random() * (Math.PI / 2); 
      }

      const distance = 150 + Math.random() * 100;
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
        spawnIcon(`.${styles.fan1}`, true);
        spawnIcon(`.${styles.fan2}`, false);
      }, 600);
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
            src="https://www.youtube.com/embed/fizPRMJfBzk"
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
        
        <div className={styles.lantern}><svg width="197" height="219" viewBox="0 0 197 219" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3670_3802)">
<path d="M137.107 115.84C136.914 114.228 136.406 112.682 135.585 111.18C139.221 109.859 141.613 106.02 141.112 101.922C140.919 100.31 140.411 98.7648 139.59 97.2619C143.226 95.9414 145.618 92.1024 145.117 88.0044C144.78 85.2724 143.572 82.7424 141.412 80.3022C142.446 78.6431 142.947 76.6165 142.692 74.5244C141.414 64.1131 125.683 56.4696 116.184 53.6373C106.686 50.805 89.3945 48.5649 82.8105 56.6335C81.4886 58.2618 80.8326 60.2359 80.8261 62.1996C77.717 63.0651 75.3523 64.5358 73.6352 66.6465C71.041 69.8306 71.0148 74.3713 73.3765 77.4787C71.8918 78.2934 70.6433 79.3096 69.6301 80.5641C67.0359 83.7482 67.0097 88.289 69.3714 91.3963C67.8868 92.211 66.6382 93.2272 65.625 94.4818C63.0308 97.6659 63.0047 102.207 65.3664 105.314C63.8817 106.129 62.6332 107.145 61.62 108.399C59.0258 111.583 58.9996 116.124 61.3613 119.232C59.8766 120.046 58.6281 121.062 57.6149 122.317C55.0207 125.501 54.9945 130.042 57.3562 133.149C55.8716 133.964 54.623 134.98 53.6098 136.235C50.6575 139.853 51.0342 145.225 54.4437 148.256C57.5113 150.974 61.9867 150.875 65.0027 148.203C67.591 147.51 76.2449 147.698 88.1087 151.244C99.9606 154.79 107.352 159.393 109.161 161.396C109.955 164.163 112.05 166.245 114.631 167.013C115.694 167.331 116.846 167.429 118.017 167.246C122.492 166.582 125.664 162.257 125.092 157.593C124.898 155.981 124.391 154.435 123.57 152.932C127.206 151.612 129.598 147.773 129.097 143.675C128.903 142.063 128.396 140.518 127.575 139.015C131.211 137.694 133.603 133.855 133.102 129.757C132.909 128.145 132.401 126.6 131.58 125.097C135.216 123.777 137.608 119.938 137.107 115.84Z" fill="white"/>
</g>
<path d="M133.308 71.7694C132.155 65.5707 121.26 60.5971 114.737 58.6516C108.214 56.7061 96.4084 54.8917 92.1605 59.476C91.2987 60.4024 90.9132 61.5478 90.9721 62.715L132.597 75.1539C133.255 74.1985 133.545 73.0142 133.308 71.7694Z" fill="url(#paint0_radial_3670_3802)"/>
<path d="M94.4461 52.8488L92.8986 58.228L134.165 70.5608L135.726 65.1328C136.624 61.9979 135.326 58.6191 132.535 57.0121C120.599 50.1258 108.41 48.254 101.542 47.7861C98.3004 47.5563 95.3565 49.6773 94.4458 52.861L94.4461 52.8488Z" fill="url(#paint1_radial_3670_3802)"/>
<path d="M138.537 116.226C138.32 114.589 137.789 113.019 136.92 111.49C140.676 110.184 143.141 106.31 142.582 102.137C142.365 100.5 141.833 98.9299 140.965 97.4014C144.721 96.0959 147.185 92.2216 146.626 88.0487C146.266 85.2793 144.987 82.6987 142.732 80.2074C143.79 78.5365 144.304 76.4856 144.013 74.356C142.619 63.7826 126.231 55.9162 116.362 52.9654C106.493 50.0146 88.5323 47.6127 81.7544 55.7507C80.3841 57.3903 79.7276 59.389 79.7323 61.3897C76.515 62.2528 74.0782 63.722 72.3007 65.8437C69.6339 69.0508 69.6422 73.6659 72.1107 76.8369C70.578 77.6506 69.2931 78.6783 68.2439 79.932C65.565 83.1388 65.5853 87.7542 68.0539 90.9252C66.5211 91.7389 65.2362 92.7666 64.187 94.0204C61.5202 97.2274 61.5284 101.843 63.997 105.014C62.4643 105.827 61.1794 106.855 60.1301 108.109C57.4633 111.316 57.4716 115.931 59.9401 119.102C58.4074 119.916 57.1225 120.943 56.0733 122.197C53.4064 125.404 53.4147 130.019 55.8833 133.19C54.3505 134.004 53.0657 135.032 52.0164 136.285C48.9794 139.926 49.4021 145.397 52.9788 148.482C56.1773 151.264 60.8204 151.192 63.9328 148.51C66.617 147.832 75.594 148.088 87.924 151.767C100.254 155.446 107.944 160.178 109.847 162.233C110.7 165.037 112.879 167.171 115.567 167.966C116.678 168.297 117.867 168.396 119.085 168.226C123.728 167.578 126.985 163.217 126.354 158.478C126.137 156.841 125.606 155.271 124.737 153.743C128.493 152.437 130.958 148.563 130.399 144.39C130.182 142.753 129.651 141.182 128.782 139.654C132.538 138.348 135.003 134.474 134.444 130.301C134.227 128.664 133.696 127.094 132.827 125.565C136.583 124.26 139.048 120.386 138.489 116.213L138.537 116.226Z" fill="url(#paint2_linear_3670_3802)"/>
<g opacity="0.15">
<path d="M72.0221 77.1046C87.1435 72.3753 104.001 73.5382 118.434 80.0735C127.09 84.0168 134.835 90.0882 140.978 97.4014C136.506 92.886 131.578 88.8885 126.263 85.5576C110.185 75.6359 90.2937 72.9467 72.0221 77.1046Z" fill="#F4F4F4"/>
</g>
<g opacity="0.15">
<path d="M79.5817 61.6594C93.4452 57.2711 108.922 58.3304 122.152 64.3365C130.094 67.9574 137.188 73.536 142.802 80.2732C138.695 76.1462 134.156 72.5007 129.292 69.4497C114.542 60.3791 96.3411 57.9229 79.5817 61.6594Z" fill="#F4F4F4"/>
</g>
<g opacity="0.15">
<path d="M67.9713 91.2062C83.0928 86.4769 99.9505 87.6397 114.383 94.1751C123.04 98.1183 130.785 104.19 136.927 111.503C132.456 106.975 127.528 102.99 122.213 99.6592C106.134 89.7375 86.2429 87.0483 67.9713 91.2062Z" fill="#F4F4F4"/>
</g>
<g opacity="0.15">
<path d="M63.9127 105.294C79.0342 100.565 95.8919 101.728 110.324 108.263C118.981 112.206 126.726 118.278 132.869 125.591C128.397 121.063 123.469 117.078 118.154 113.747C102.075 103.825 82.1843 101.136 63.9127 105.294Z" fill="#F4F4F4"/>
</g>
<g opacity="0.15">
<path d="M59.8619 119.384C74.9834 114.655 91.8411 115.817 106.274 122.353C114.93 126.296 122.675 132.367 128.818 139.681C124.346 135.153 119.418 131.168 114.103 127.837C98.0245 117.915 78.1335 115.226 59.8619 119.384Z" fill="#F4F4F4"/>
</g>
<g opacity="0.15">
<path d="M55.8189 133.446C70.9404 128.717 87.7981 129.88 102.231 136.415C110.887 140.359 118.632 146.43 124.775 153.743C120.303 149.216 115.375 145.23 110.06 141.899C93.9816 131.978 74.0906 129.289 55.8189 133.446Z" fill="#F4F4F4"/>
</g>
<path d="M118.189 167.213C117.162 170.762 102.041 169.367 84.4062 164.1C66.7716 158.833 53.3024 151.681 54.3292 148.131C55.356 144.582 70.4771 145.977 88.1118 151.244C105.746 156.511 119.216 163.664 118.189 167.213Z" fill="url(#paint3_linear_3670_3802)"/>
<mask id="mask0_3670_3802" style={{maskType:"luminance" }}maskUnits="userSpaceOnUse" x="54" y="146" width="65" height="24">
<path d="M118.189 167.217C117.162 170.766 102.041 169.371 84.4062 164.104C66.7716 158.837 53.3024 151.685 54.3292 148.135C55.356 144.586 70.4771 145.981 88.1118 151.248C105.746 156.515 119.216 163.667 118.189 167.217Z" fill="white"/>
</mask>
<g mask="url(#mask0_3670_3802)">
<path d="M53.457 154.447L117.522 162.364" stroke="#861A26" stroke-width="0.73" stroke-miterlimit="10"/>
<path d="M114.547 172.708L56.4375 144.104" stroke="#861A26" stroke-width="0.73" stroke-miterlimit="10"/>
</g>
<path d="M118.189 167.213C117.162 170.762 102.041 169.367 84.4062 164.1C66.7716 158.833 53.3024 151.681 54.3292 148.131C55.356 144.582 70.4771 145.977 88.1118 151.244C105.746 156.511 119.216 163.664 118.189 167.213Z" stroke="#861A26" stroke-width="0.73" stroke-miterlimit="10"/>
<path d="M81.7505 151.563C80.8947 153.324 80.5493 155.39 81.3145 157.26C82.1595 159.328 84.4762 160.63 86.7679 160.864C89.5035 161.144 91.1029 159.473 91.8238 157.279C92.1327 156.341 92.3815 155.401 92.5708 154.436L81.7508 151.55L81.7505 151.563Z" fill="#FAEFD6"/>
<path d="M118.193 167.215C117.777 168.678 114.925 169.304 110.479 169.159C113.425 169.173 115.263 168.722 115.549 167.722C116.381 164.831 103.795 158.52 87.4273 153.624C71.0713 148.729 57.1214 147.113 56.2892 150.004C56.003 151.004 57.2956 152.395 59.7979 154.008C55.9761 151.691 53.9051 149.596 54.3336 148.133C55.3604 144.583 70.4818 145.966 88.1162 151.246C105.751 156.512 119.22 163.677 118.205 167.227L118.193 167.215Z" fill="url(#paint4_radial_3670_3802)"/>
<path d="M115.548 167.721C114.716 170.612 100.778 168.997 84.4102 164.101C68.0421 159.206 55.4563 152.907 56.2887 150.003C57.1209 147.113 71.0588 148.728 87.4269 153.623C103.795 158.519 116.381 164.818 115.548 167.721Z" stroke="#861A26" stroke-width="0.73" stroke-miterlimit="10"/>
<path style={{mixBlendMode:"color-dodge"}} d="M142.775 128.92C151.61 98.2066 138.793 67.3377 114.148 59.9727C89.5037 52.6077 62.363 71.5356 53.5282 102.249C44.6933 132.963 57.5098 163.832 82.1546 171.197C106.799 178.562 133.94 159.634 142.775 128.92Z" fill="url(#paint5_radial_3670_3802)"/>
<defs>
<filter id="filter0_d_3670_3802" x="0.741093" y="0.162968" width="195.323" height="218.055" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="25.44"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.862745 0 0 0 0 0.278431 0 0 0 0 0.501961 0 0 0 0.65 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3670_3802"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3670_3802" result="shape"/>
</filter>
<radialGradient id="paint0_radial_3670_3802" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(112.214 65.7771) rotate(1.24065) scale(16.3019 16.6393)">
<stop stop-color="#DD502E"/>
<stop offset="0.23" stop-color="#D94C33"/>
<stop offset="0.53" stop-color="#CF4143"/>
<stop offset="0.86" stop-color="#BE2F5E"/>
<stop offset="0.99" stop-color="#B7276B"/>
</radialGradient>
<radialGradient id="paint1_radial_3670_3802" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(114.501 59.0886) rotate(1.24065) scale(17.0833 17.4369)">
<stop stop-color="#DD502E"/>
<stop offset="0.23" stop-color="#D94C33"/>
<stop offset="0.53" stop-color="#CF4143"/>
<stop offset="0.86" stop-color="#BE2F5E"/>
<stop offset="0.99" stop-color="#B7276B"/>
</radialGradient>
<linearGradient id="paint2_linear_3670_3802" x1="116.462" y1="52.6185" x2="86.6253" y2="152.459" gradientUnits="userSpaceOnUse">
<stop stop-color="#CC50A3"/>
<stop offset="0.36" stop-color="#D2638E"/>
<stop offset="1" stop-color="#E18E61"/>
</linearGradient>
<linearGradient id="paint3_linear_3670_3802" x1="88.1381" y1="151.072" x2="83.6928" y2="165.947" gradientUnits="userSpaceOnUse">
<stop stop-color="#CC50A3"/>
<stop offset="0.36" stop-color="#D2638E"/>
<stop offset="1" stop-color="#E18E61"/>
</linearGradient>
<radialGradient id="paint4_radial_3670_3802" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(86.2574 157.674) rotate(1.24065) scale(23.984 24.4804)">
<stop stop-color="#DD502E"/>
<stop offset="0.23" stop-color="#D94C33"/>
<stop offset="0.53" stop-color="#CF4143"/>
<stop offset="0.86" stop-color="#BE2F5E"/>
<stop offset="0.99" stop-color="#B7276B"/>
</radialGradient>
<radialGradient id="paint5_radial_3670_3802" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(98.9322 116.682) rotate(16.6385) scale(46.6983 57.9912)">
<stop stop-color="#595959"/>
<stop offset="0.65" stop-color="#1B1B1B"/>
<stop offset="1"/>
</radialGradient>
</defs>
</svg>
</div>
         <img src={Dagger} alt="" className={styles.dagger1} />
       
      </div>
      
    </div>
  );
};

export default AboutUs;
