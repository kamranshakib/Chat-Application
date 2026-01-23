import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast"

export const useAuthStore = create((set)=>({
        authUser: null,
        isCheckingAuth: true,
        isSigningUp: false,
        isLoggingIN: false,

        checkAuth: async ()=>{
            try {
                const res = await axiosInstance.get("/auth/check");
                set({authUser: res.data});
                toast.success("You are login successfully!");
            }catch (error){
                toast.error(error.response.data.message);
                set({authUser:null});
            }finally {
                set({isCheckingAuth: false})
            };
        },
        signUp: async(data) =>{
            set({ isSigningUp: true});
            try {
                const res = await axiosInstance.post("/auth/signup", data);
                set({authUser: res.data});
                toast.success("Account created successfully!");
            } catch (error) {
                toast.error(error.response.data.message)
            } finally {
                set({isSigningUp: false});
            }
        },
        login: async(data) =>{
            set({ isLoggingIN: true});
            try {
                const res = await axiosInstance.post("/auth/login", data);
                set({authUser: res.data});
                toast.success("logged in successfully!");
            } catch (error) {
                toast.error(error.response.data.message)
            } finally {
                set({ isLoggingIN: false });
            }
        },
        logout: async() =>{
            try {
                await axiosInstance.post("/auth/logout");
                toast.success("logged out successsfully");
                set({authUser: null});
            } catch (error) {
                toast.error("Error logging out");
                console.log("Error Log out:",error)
            }
        },
        updateProfile: async (data) =>{
            try {
                const res = await axiosInstance.put("/auth/update-profile",data);
                set({ authUser: res.data});
                toast.success("Profile updated successfully!");
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
}));