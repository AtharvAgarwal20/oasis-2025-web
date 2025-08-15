import Landing from "./pages/landing/Landing";
import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";

export default function Homepage() {
  return (
    <div>
      <div style={{ zIndex: 100, position: "relative" }}>
        <DrawingPreloader />
      </div>
      <div style={{ zIndex: 50, position: "relative" }}>
        <Landing />
      </div>
    </div>
  );
}
