import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { userStore } from "./userStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });

    try {
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  subscribeToMessages: () => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    const socket = userStore.getState().socket;

    socket.on("sendNewMessage", (newMsg) => {
        const isMessageSentFromSelectedUser = newMsg.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

      set({ messages: [...messages, newMsg] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = userStore.getState().socket;
    socket.off("sendNewMessage");
  },
}));
