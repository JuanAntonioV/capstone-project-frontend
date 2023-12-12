import { createStore } from 'zustand';

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
};

export const useAuth = createStore((set) => ({
    ...initialState,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));
