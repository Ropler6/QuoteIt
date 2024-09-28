import type { Actions } from "./$types";
import { register } from "$lib/server/external/auth";

export const actions = {
    register: async ({ cookies, request }) => {
        const data = await request.json();
        const username = data.user as string;
        const password1 = data.password1 as string;
        const password2 = data.password2 as string;

        if (password1 !== password2) return { success: false };
        const success = await register(username, password1);

        if (success) {
            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 1); //after 1 month
            cookies.set("user", username, { expires: expirationDate, path: "/", });
            return { success: true };
        }
        return { success: false };
    },
} satisfies Actions;