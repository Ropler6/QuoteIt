import type { Actions } from "./$types";
import { register } from "$lib/server/supabase";

export const actions = {
    register: async ({ cookies, request }) => {
        const data = await request.json();
        const username = data.user as string;
        const password1 = data.password1 as string;
        const password2 = data.password2 as string;

        if (password1 !== password2) return { success: false };
        const success = await register(username, password1);

        if (success) {
            cookies.set("user", username, { path: "/" });
            return { success: true };
        }
        return { success: false };
    },
} satisfies Actions;