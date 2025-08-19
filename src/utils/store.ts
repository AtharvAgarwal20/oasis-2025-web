import { create } from "zustand";

type overlayActive ={
    isActive: boolean;
    removeGif: boolean;
    setActive: () => void;
    setRemoveGif: () => void;
}

const useOverlayStore = create<overlayActive>((set) => ({
    isActive: false,
    removeGif: false,
    setActive: () => set({ isActive: true }),
    setRemoveGif: () => set({ removeGif: true })
}));

export default useOverlayStore;
