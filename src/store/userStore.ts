import { defineStore } from "pinia";
import { User } from "@/types/types";
import axios from "axios";
import { ref } from "vue";

export const useUserStore = defineStore('userStore', () => {
    const user = ref(null as User | null);

    const fetchUser = async (name: string, phone: string) => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            const foundUser = res.data.find((user: User) => user.name === name && user.phone && phone);

            if (foundUser) {
                user.value = {
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

    return {
        user,
        fetchUser,
    };
})


















