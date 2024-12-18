import {create} from 'zustand';

export const userStore = create((set) => ({
    user: null,
    setUser: (u) => set({user: u}),
}))