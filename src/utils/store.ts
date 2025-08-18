import { create } from "zustand";

type overlayActive ={
    isActive: boolean;
    setActive: () => void;
}

const useOverlayStore = create<overlayActive>((set) => ({
    isActive: false,
    setActive: () => set({ isActive: true }),
}));

export default useOverlayStore;
