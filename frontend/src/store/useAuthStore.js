import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set,get)=>({
        authUser: null,
        isCheckingAuth: true,
        isSigningUp: false,
        isLoggingIN: false,
        socket: null,
        onlineUsers: [],

        checkAuth: async ()=>{
            try {
                const res = await axiosInstance.get("/auth/check");
                set({authUser: res.data});
                get().connectSocket();
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
                get().connectSocket();
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
                get().connectSocket()
            } catch (error) {
                toast.error(error.response.data.message)
            } finally {
                set({ isLoggingIN: false });
            }
        },
        logout: async() =>{
            try {
                await axiosInstance.post("/auth/logout");
                set({authUser: null});
                toast.success("logged out successsfully");
                get().disconnectSocket();
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
        },
        connectSocket: ()=>{
            const {authUser} = get();
            if(!authUser || get().socket?.connected) return

            const socket = io(BASE_URL,{
                withCredentials: true
            })
            socket.connect()
            set({socket})

            socket.on("getOnlineUsers", (userIds)=>{
                set({onlineUsers:userIds})
            })
        },
        disconnectSocket: ()=>{
            if(get().socket?.connected) get().socket.disconnect();
        }
}));