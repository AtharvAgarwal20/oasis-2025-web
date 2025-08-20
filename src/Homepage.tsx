import Landing from "./pages/landing/Landing";
import DrawingPreloader from "./pages/components/drawingPreloader/DrawingPreloader";
import useOverlayStore from "./utils/store";

export default function Homepage({
  goToRegister,
}: {
  goToRegister: () => void;
}) {
  const removeGif = useOverlayStore((state) => state.removeGif);
  return (
    <div>
      <div
        style={
          removeGif ? { display: "none" } : { zIndex: 50, position: "relative" }
        }
      >
        <DrawingPreloader />
      </div>
      <div style={{ zIndex: 100, position: "relative" }}>
        <Landing goToRegister={goToRegister} />
      </div>
    </div>
  );
}
