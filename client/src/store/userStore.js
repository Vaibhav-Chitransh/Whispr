import { create } from "zustand";
import { io } from "socket.io-client";

export const userStore = create((set, get) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  socket: null,
  onlineUsers: [],

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io("http://localhost:2300", {
        query: {
            userId: user._id
        }
    });
    socket.connect();
    set({ socket: socket });

    socket.on('getOnlineUsers', (userIds) => {
        set({onlineUsers: userIds});
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
