import type { User } from "$lib/datatypes";
import { login } from "$lib/supabase";
import type { Actions, PageServerLoad } from "./$types"

// export const load: PageServerLoad = async ({ cookies }) => {
//     //TODO: login the user
//     let user: User = {
//         name: "Gigel",
//         password: "1234",
//         created_at: new Date(),
//     };
//     return user;
// }

export const actions = {
    login: async ( { cookies, request } ) => {
        const data = await request.formData();
        const user = data.get("username") as string;
        const password = data.get("password") as string;

        if (await login(user, password)) return {
            success: true,
            user: user,
        };
        return { success: false };
    },
} satisfies Actions;