import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import Preloader from "./pages/registration/components/Preloader/Preloader";
import Homepage from "./Homepage";
import Registration from "./pages/registration/Registration";
import DoorTransition from "./pages/components/page-transition/DoorTransition";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  interface LocationState {
    startAnimation?: boolean;
  }

  const [currentPage, setCurrentPage] = useState<"home" | "register">(
    location.pathname === "/register" ? "register" : "home"
  );

  const [doorPhase, setDoorPhase] = useState<
    "idle" | "closing" | "waiting" | "opening"
  >("idle");

  const [isPreloading, setIsPreloading] = useState(
    location.pathname === "/register"
  );

  const navigatedFromHome = useRef(false);

  const handleDoorsClosed = () => {
    setDoorPhase("waiting");

    if (navigatedFromHome.current) {
      setCurrentPage("register");
    }

    setTimeout(() => {
      setDoorPhase("opening");
      if (navigatedFromHome.current) {
        navigate("/register", { state: { startAnimation: true } });
      }
    }, 500);
  };

  const handleDoorsOpened = () => {
    setDoorPhase("idle");
    navigatedFromHome.current = false;
  };

  const goToRegister = () => {
    navigatedFromHome.current = true;
    setDoorPhase("closing");
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
      <Routes>
        <Route path="/" element={null} />
        <Route path="/register" element={null} />
      </Routes>
    </>
  );
}
