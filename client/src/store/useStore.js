import {create} from 'zustand';

export const useStore = create((set) => ({
    user: null,
    messages: [],
    setUser: (user) => set({user}),
    addMessage: message => set((state) => ({messages: [...state.messages, message]}))
}))