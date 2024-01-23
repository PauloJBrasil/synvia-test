import { getCookie } from "../config/cookies";

interface User {
    nome?: string;
    email?: string;
}

export const useLoggedUser = (): User | null => {
    const user = getCookie('@user');
    
    if(!user) return null;

    return JSON.parse(user);
};