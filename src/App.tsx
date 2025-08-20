import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Preloader from "./pages/registration/components/Preloader/Preloader";
import Homepage from "./Homepage";
import Registration from "./pages/registration/Registration";
import DoorTransition from "./pages/components/page-transition/DoorTransition";
import AboutUs from "./pages/aboutus/AboutUs";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    startAnimation?: boolean;
  }

  const [currentPage, setCurrentPage] = useState<
    "home" | "register" | "events" | "aboutus"
  >(
    location.pathname === "/register"
      ? "register"
      : location.pathname === "/events"
      ? "events"
      : location.pathname === "/aboutus"
      ? "aboutus"
      : "home"
  );

  const [doorPhase, setDoorPhase] = useState<
    "idle" | "closing" | "waiting" | "opening"
  >("idle");

  const [isPreloading, setIsPreloading] = useState(
    location.pathname !== "/"
  );

  const nextRoute = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setCurrentPage("home");
    } else if (path === "/register") {
      setCurrentPage("register");
      setIsPreloading(true);
    } else if (path === "/events") {
      setCurrentPage("events");
      setIsPreloading(true);
    } else if (path === "/aboutus") {
      setCurrentPage("aboutus");
      setIsPreloading(true);
    }
  }, [location.pathname]);

  const handleDoorsClosed = () => {
    setDoorPhase("waiting");

    if (nextRoute.current) {
     navigate(nextRoute.current, { state: { startAnimation: true } });
    }

    setTimeout(() => {
      setDoorPhase("opening");
    }, 500);
  };

  const handleDoorsOpened = () => {
    setDoorPhase("idle");
    nextRoute.current = null; 
  };

  const goToRegister = () => {
  const path = "/register";
  if (location.pathname !== path) {
    nextRoute.current = path;
    setDoorPhase("closing");
  }
};


  const handlePreloaderEnter = () => {
    setIsPreloading(false);
  };

  return (
    <>
      <DoorTransition
        phase={doorPhase}
        onClosed={handleDoorsClosed}
        onOpened={handleDoorsOpened}
        page={location.pathname}
      />

      {isPreloading && <Preloader onEnter={handlePreloaderEnter} />}

      {!isPreloading && currentPage === "home" && (
        <Homepage goToRegister={goToRegister} />
      )}
      {!isPreloading && currentPage === "register" && (
        <Registration
          startAnimation={(location.state as LocationState)?.startAnimation || false}
        />
      )}
      {!isPreloading && currentPage === "events" && <div>Events Page</div>}
      {!isPreloading && currentPage === "aboutus" && (
        <AboutUs/>
      )}

      <Routes>
        <Route path="/" element={null} />
        <Route path="/register" element={null} />
        <Route path="/events" element={null} />
        <Route path="/aboutus" element={null} />
      </Routes>
    </>
  );
}
