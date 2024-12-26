import { create } from "zustand";
import { io } from "socket.io-client";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const userStore = create((set, get) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  socket: null,
  onlineUsers: [],
  isUpdatingProfile: false,

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io("http://localhost:2300", {
      query: {
        userId: user._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.on('profileUpdated', (updatedUser) => {
      if(updatedUser._id === get().user._id) set({user: updatedUser});
    })
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({socket: null});
    }
  },

  updateProfile: async (data) => {
    set({isUpdatingProfile: true});
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({user: res.data});
      toast.success("Profile updated successfully");
      get().socket.emit('profileUpdated', res.data);
    } catch (error) {
      console.log("error in update profile:", error);
      const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      set({isUpdatingProfile: false});
    }
  }
}));
