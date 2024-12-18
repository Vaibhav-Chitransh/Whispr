import {create} from 'zustand';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({isUsersLoading: true});

        try {
            const response = await axiosInstance.get('/message/users');
            set({users: response.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true});

        try {
            const response = await axios.get(`/message/${userId}`);
            set({messages: response.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isMessagesLoading: false});
        }
    },

    setSelectedUser: (user) => set({selectedUser: user})
}))