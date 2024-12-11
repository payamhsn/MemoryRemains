import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  notes: [],
  accounts: [],
  trustedPerson: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // console.log("Logging in...");
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  clearUserData: () =>
    set({ notes: [], accounts: [], isLoading: false, error: null }),

  updateProfile: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/auth/update-profile`,
        userData
      );
      set((state) => ({
        user: { ...state.user, ...response.data.user },
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating profile",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/auth/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
      useAuthStore.getState().clearUserData();
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/auth/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  // Functions for notes

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/notes`);
      set({ notes: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching notes",
        isLoading: false,
      });
    }
  },

  createNote: async (noteData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/notes`, noteData);
      set((state) => ({
        notes: [...state.notes, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error creating note",
        isLoading: false,
      });
    }
  },

  updateNote: async (noteId, noteData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/notes/${noteId}`, noteData);
      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === noteId ? response.data : note
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating note",
        isLoading: false,
      });
    }
  },

  deleteNote: async (noteId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/notes/${noteId}`);
      set((state) => ({
        notes: state.notes.filter((note) => note._id !== noteId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error deleting note",
        isLoading: false,
      });
    }
  },
  fetchAccounts: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/accounts`);
      set({ accounts: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message });
    }
  },

  createAccount: async (accountData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/accounts`, accountData);
      set((state) => ({
        accounts: [...state.accounts, response.data],
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message });
    }
  },

  updateAccount: async (id, accountData) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(
        `${API_URL}/accounts/${id}`,
        accountData
      );
      set((state) => ({
        accounts: state.accounts.map((account) =>
          account._id === id ? response.data : account
        ),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message });
    }
  },

  deleteAccount: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${API_URL}/accounts/${id}`);
      set((state) => ({
        accounts: state.accounts.filter((account) => account._id !== id),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message });
    }
  },

  // Trusted Person functions
  fetchTrustedPerson: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/trusted-person`);
      set({ trustedPerson: response.data.trustedPerson, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching trusted person",
        isLoading: false,
      });
    }
  },

  saveTrustedPerson: async (trustedPersonData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/trusted-person`,
        trustedPersonData
      );
      set({ trustedPerson: response.data.trustedPerson, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error saving trusted person",
        isLoading: false,
      });
    }
  },

  updateTrustedPerson: async (trustedPersonData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/trusted-person`,
        trustedPersonData
      );
      set({ trustedPerson: response.data.trustedPerson, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating trusted person",
        isLoading: false,
      });
    }
  },

  deleteTrustedPerson: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/trusted-person`);
      set({ trustedPerson: null, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error deleting trusted person",
        isLoading: false,
      });
    }
  },

  fetchInactivityPeriod: async () => {
    try {
      const response = await axios.get(`${API_URL}/inactivity-period`);
      set((state) => ({
        user: {
          ...state.user,
          inactivityPeriod: response.data.inactivityPeriod,
        },
      }));
      return response.data.inactivityPeriod;
    } catch (error) {
      console.error("Error fetching inactivity period:", error);
      return null;
    }
  },

  updateInactivityPeriod: async (period) => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/inactivity-period`, {
        inactivityPeriod: period,
      });
      set((state) => ({
        user: {
          ...state.user,
          inactivityPeriod: period,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error updating inactivity period:", error);
      set({ isLoading: false });
    }
  },
}));
