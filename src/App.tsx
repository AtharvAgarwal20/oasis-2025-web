import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, createContext } from "react";
import Preloader from "./pages/registration/components/Preloader/Preloader";
import Homepage from "./Homepage";
import Registration from "./pages/registration/Registration";
import DoorTransition from "./pages/components/page-transition/DoorTransition";
import AboutUs from "./pages/aboutus/AboutUs";
import Contact from "./pages/contact/ContactPage";
import ComingSoon from "./pages/comingSoon/ComingSoon";

export const navContext = createContext<{ goToPage?: (page: string) => void }>({});

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    startAnimation?: boolean;
  }

  const [currentPage, setCurrentPage] = useState<
    "home" | "register" | "events" | "aboutus" | "contact" | "comingSoon"
  >(
    location.pathname === "/"
      ? "home"
      : location.pathname === "/register"
      ? "register"
      : location.pathname === "/events"
      ? "events"
      : location.pathname === "/aboutus"
      ? "aboutus"
      : location.pathname === "/contact"
      ? "contact"
      : "comingSoon"
  );

  const [doorPhase, setDoorPhase] = useState<
    "idle" | "closing" | "waiting" | "opening"
  >("idle");

  const [isPreloading, setIsPreloading] = useState(location.pathname !== "/");

  const nextRoute = useRef<string | null>(null);
  const prevPathname = useRef(location.pathname);

  const determinePageState = (path: string) => {
    if (path === "/") return "home";
    if (path === "/register") return "register";
    if (path === "/events") return "events";
    if (path === "/aboutus") return "aboutus";
    if (path === "/contact") return "contact";
    return "comingSoon";
  };

  const shouldPreload = (path: string) => {
    return path === "/register" || path === "/events" || path === "/aboutus" || path === "/contact";
  };

  useEffect(() => {
    if (location.pathname !== prevPathname.current) {
      nextRoute.current = location.pathname;
      setDoorPhase("closing");
    }
  }, [location.pathname]);

  const handleDoorsClosed = () => {
    setDoorPhase("waiting");

    const targetRoute = nextRoute.current;

    if (targetRoute) {
      setIsPreloading(shouldPreload(targetRoute));
    }

    if (targetRoute && location.pathname !== targetRoute) {
      navigate(targetRoute, { state: { startAnimation: true } });
    }

    setTimeout(() => {
      setDoorPhase("opening");
      setCurrentPage(determinePageState(targetRoute ?? location.pathname));
      prevPathname.current = targetRoute ?? location.pathname;
    }, 500);
  };

  const handleDoorsOpened = () => {
    setDoorPhase("idle");
    nextRoute.current = null;
  };

  const goToPage = (path: string) => {
    if (location.pathname !== path) {
      nextRoute.current = path;
      setDoorPhase("closing");
    }
  };

  const handlePreloaderEnter = () => {
    setIsPreloading(false);

    if (location.pathname === "/register") {
      setTimeout(() => {
        setDoorPhase("opening");
      }, 300);
    }
  };

  return (
    <navContext.Provider value={{ goToPage }}>
      <DoorTransition
        phase={doorPhase}
        onClosed={handleDoorsClosed}
        onOpened={handleDoorsOpened}
        page={location.pathname}
      />

      {isPreloading && <Preloader onEnter={handlePreloaderEnter} />}

      {!isPreloading && currentPage === "home" && (
        <Homepage goToPage={goToPage} />
      )}

      {!isPreloading && currentPage === "register" && (
        <Registration
          goToPage={goToPage}
          startAnimation={
            (location.state as LocationState)?.startAnimation || false
          }
        />
      )}

      {!isPreloading && currentPage === "events" && <ComingSoon />}
      {!isPreloading && currentPage === "aboutus" && (
        <AboutUs goToPage={goToPage} />
      )}
      {!isPreloading && currentPage === "contact" && <Contact />}
      {!isPreloading && currentPage === "comingSoon" && <ComingSoon />}

      <Routes>
        <Route path="/" element={null} />
        <Route path="/register" element={null} />
        <Route path="/events" element={null} />
        <Route path="/aboutus" element={null} />
        <Route path="/contact" element={null} />
        <Route path="/comingSoon" element={null} />
      </Routes>
    </navContext.Provider>
  );
}
