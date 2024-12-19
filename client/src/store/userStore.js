import { create } from "zustand";
import { io } from "socket.io-client";

export const userStore = create((set, get) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  socket: null,

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io("http://localhost:2300");
    socket.connect();
    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
