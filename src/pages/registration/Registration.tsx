import styles from "./Registration.module.scss";

import Instructions from "./components/Instructions/Instructions";
import Register from "./components/Register/Register";
import Events from "./components/Events/Events";

import banner from "../../../public/images/registration/reg-banner.png";
import bgExtend from "../../../public/svgs/registration/bg-extended.svg";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Registration = () => {
  const { contextSafe } = useGSAP();
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("currentPage")
      ? parseInt(sessionStorage.getItem("currentPage")!)
      : 1
  );

  useEffect(() => {
    contextSafe(() => {
      gsap.set([elemRef1.current, elemRef2.current, elemRef3.current], {
        display: "none",
        opacity: 0,
      });
      switch (currentPage) {
        case 1:
          gsap.set(bgRef.current, { x: "-45%" });
          gsap.set(elemRef1.current, { display: "flex", opacity: 1 });
          break;
        case 2:
          gsap.set(bgRef.current, { x: "-22%" });
          gsap.set(elemRef2.current, { display: "block", opacity: 1 });
          break;
        case 3:
          gsap.set(bgRef.current, { x: "0%" });
          gsap.set(elemRef3.current, { display: "block", opacity: 1 });
          break;
      }
    })();
  }, []);

  const bgRef = useRef<HTMLImageElement>(null);
  const elemRef1 = useRef<HTMLDivElement>(null);
  const elemRef2 = useRef<HTMLFormElement>(null);
  const elemRef3 = useRef<HTMLDivElement>(null);

  const toFirstPage = () => {
    contextSafe(() => {
      gsap.to(bgRef.current, {
        x: "-45%",
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
          onComplete: () => {
            setCurrentPage(1), sessionStorage.setItem("currentPage", "1");
          },
        });
    })();
  };
  const toRegPage = (back: boolean) => {
    contextSafe(() => {
      gsap.to(bgRef.current, {
        x: "-22%",
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
          display: "block",
          ease: "power1.out",
        })
        .to(back ? elemRef2.current : elemRef2.current, {
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          onComplete: () => {
            setCurrentPage(2), sessionStorage.setItem("currentPage", "2");
          },
        });
    })();
  };
  const toEventPage = () => {
    contextSafe(() => {
      gsap.to(bgRef.current, {
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
          display: "block",
          ease: "power1.out",
        })
        .to(elemRef3.current, {
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          onComplete: () => {
            setCurrentPage(3), sessionStorage.setItem("currentPage", "3");
          },
        });
    })();
  };
  const onClickEvents = () => {
    contextSafe(() => {
      gsap.to(bgRef.current, {
        x: "0%",
        duration: 1.5,
        // ease: "power1.out",
      });
      const tl = gsap.timeline();
      tl.to(elemRef3.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      }).set(elemRef3.current, {
        display: "none",
        ease: "power1.out",
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

  return (
    <div className={styles.instrback}>
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
        onClick={backButtonHandler}
        className={currentPage === 1 ? styles.inActive : ""}
      >
        Back Button
      </button>
      <Instructions onGoogleSignIn={() => toRegPage(false)} ref={elemRef1} />
      <Register ref={elemRef2} onClickNext={toEventPage} />
      <Events ref={elemRef3} onClickNext={onClickEvents} />
    </div>
  );
};

export default Registration;
