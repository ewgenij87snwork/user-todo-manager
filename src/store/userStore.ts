import { defineStore } from "pinia";
import { User } from "@/types/types";
import axios from "axios";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null as User | null,
    }),

    actions: {
        async fetchUser(name: string, phone: string) {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/users');
                const foundUser =  res.data.find((user: User) => user.name === name && user.phone && phone);

                if(foundUser) {
                    this.user = {
                        id: foundUser.id,
                        name: foundUser.name,
                        phone: foundUser.phone,
                        companyName: foundUser.company.name,
                    };
                }
            } catch (e) {
                console.log('Error on fetchUser:', e)
            }
        }
    }
})


















