import { login } from "$lib/supabase";
import type { Actions } from "./$types"

export const actions = {
    login: async ( { cookies, request } ) => {
        const data = await request.formData();
        const user = data.get("username") as string;
        const password = data.get("password") as string;

        if (await login(user, password))  {
            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 1); //after 1 month
            cookies.set("user", user, { expires: expirationDate, path: "/" });
            return {
                success: true,
                user: user,
            };
        }


        return { success: false };
    },
} satisfies Actions;