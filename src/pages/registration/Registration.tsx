import styles from "./Registration.module.scss";

import Instructions from "../../pages/registration/components/Instructions/Instructions";
import Register from "../../pages/registration/components/Register/Register";
import Events from "../../pages/registration/components/Events/Events";

import banner from "/images/registration/reg-banner.png";
import bgExtend from "/svgs/registration/bg-extended.svg";
import sun from "/svgs/registration/sun.svg";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Registration = () => {
  const { contextSafe } = useGSAP();
  const [currentPage, setCurrentPage] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [isAnim, setisAnim] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [_cookies, setCookies] = useCookies([
    "Authorization",
    "user-auth",
    "Access_token",
  ]);

  const bgRef = useRef<HTMLImageElement>(null);
  const elemRef1 = useRef<HTMLDivElement>(null);
  const elemRef2 = useRef<HTMLDivElement>(null);
  const elemRef3 = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLImageElement>(null);

  const toFirstPage = () => {
    contextSafe(() => {
      gsap.to(bgRef.current, {
        x: "-42.5%",
        duration: 1.5,
        // ease: "power1.out",
        onStart: () => setisAnim(true),
        onComplete: () => setisAnim(false),
      });
      gsap.to(sunRef.current, {
        left: "-5%",
        bottom: "17vw",
        x: "0%",
        duration: 1.5,
        // ease: "power1.out",
      });
      const tl = gsap.timeline();
      tl.to(elemRef2.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      })
        .set(elemRef2.current, {
          display: "none",
          ease: "power1.out",
        })
        .set(elemRef1.current, {
          display: "flex",
          ease: "power1.out",
        })
        .to(elemRef1.current, {
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          onComplete: () => setCurrentPage(1),
        });
    })();
  };
  const toRegPage = (back: boolean) => {
    contextSafe(() => {
      gsap.to(bgRef.current, {
        x: "-16.5%",
        duration: 1.5,
        // ease: "power1.out",
        onStart: () => setisAnim(true),
        onComplete: () => setisAnim(false),
      });
      gsap.to(sunRef.current, {
        left: "50%",
        bottom: "33svh",
        x: "-49.5%",
        duration: 1.5,
        // ease: "power1.out",
      });
      const tl = gsap.timeline();
      tl.to(back ? elemRef3.current : elemRef1.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      })
        .set(back ? elemRef3.current : elemRef1.current, {
          display: "none",
          ease: "power1.out",
        })
        .set(back ? elemRef2.current : elemRef2.current, {
          display: "flex",
          ease: "power1.out",
        })
        .to(back ? elemRef2.current : elemRef2.current, {
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          onComplete: () => setCurrentPage(2),
        });
    })();
  };
  //  useEffect(() => {
  //    toRegPage(false);
  //    setTimeout(() => {
  //      toEventPage();
  //    }, 2500);
  //  }, []);
  const toEventPage = () => {
    contextSafe(() => {
      gsap.to(bgRef.current, {
        x: "-1%",
        duration: 1.5,
        // ease: "power1.out",
        onStart: () => setisAnim(true),
        onComplete: () => setisAnim(false),
      });
      gsap.to(sunRef.current, {
        left: "67%",
        bottom: "17vw",
        x: "0%",
        duration: 1.5,
        // ease: "power1.out",
      });
      const tl = gsap.timeline();
      tl.to(elemRef2.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      })
        .set(elemRef2.current, {
          display: "none",
          ease: "power1.out",
        })
        .set(elemRef3.current, {
          display: "flex",
          ease: "power1.out",
        })
        .to(elemRef3.current, {
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          onComplete: () => setCurrentPage(3),
        });
    })();
  };
  const backButtonHandler = () => {
    switch (currentPage) {
      case 1:
        return;
      case 2:
        toFirstPage();
        break;
      case 3:
        toRegPage(true);
        break;
    }
  };
  const onGoogleSignIn = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .post(
          "https://bits-oasis.org/2025/main/registrations/google-reg/",
          {
            access_token: response.access_token,
          }
        )
        .then((res) => {
          setCookies("Access_token", response.access_token);
          if (res.data.exists) {
            setCookies("user-auth", res.data);
            setCookies("Authorization", res.data.tokens.access);
            window.location.href = `https://bits-oasis.org/2025/main/registrations?token=${res.data.tokens.access}`;
            setUserEmail(res.data.email);
          } else {
            setCookies("user-auth", res.data);
            // setUserState({
            //   ...res.data,
            //   access_token: response.access_token,
            // });
            setUserEmail(res.data.email);
            if (res.data.email) toRegPage(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // onFailure: () => {
    //   console.error("Login failed");
    // },
  });

  return (
    <div className={styles.instrback}>
      <img src={sun} alt="sun" className={styles.sun} ref={sunRef} />
      <img
        src={bgExtend}
        alt="background"
        className={styles.backgroundImage}
        ref={bgRef}
      />
      <div className={styles.birds}>
        <img src={banner} alt="banner" className={styles.bannerImage} />
      </div>
      <button
        disabled={isAnim}
        onClick={backButtonHandler}
        className={
          styles.backBtn + " " + (currentPage === 1 ? styles.inActive : "")
        }
      >
        Back -&gt;
      </button>
      <Instructions onGoogleSignIn={onGoogleSignIn} ref={elemRef1} />
      <Register
        ref={elemRef2}
        onClickNext={toEventPage}
        userEmail={userEmail}
        setUserData={setUserData}
      />
      <Events ref={elemRef3} userData={userData} setUserData={setUserData} />
    </div>
  );
};

export default Registration;
