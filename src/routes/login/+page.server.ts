import type { Actions } from "./$types"
import { login } from "$lib/server/external/auth";
import { getTagsForUser } from "$lib/server/external/tags";

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
                tags: await getTagsForUser(user) || [],
            };
        }


        return { success: false };
    },
} satisfies Actions;