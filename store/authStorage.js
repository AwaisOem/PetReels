import {persist} from "zustand/middleware";
import create from "zustand";
import axios from "axios"
const authStore  = (set)=>({
    userProfile: null,
    verifiedUsers : [],
    addUser: (user)=>set({userProfile:user}),
    removeUser: ()=>set({userProfile: null}),
    fetchVerifiedUsers : async () =>{
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/verified`;
        const response = await axios.get(url);
        set({verifiedUsers: response.data});
    }
});
const useAuthStore= create(persist(authStore , {name:'auth'}))
export default useAuthStore