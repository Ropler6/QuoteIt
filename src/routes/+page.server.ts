import { goto } from "$app/navigation";
import { getUserByName } from "$lib/server/external/auth";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ cookies }) => {
    const username = cookies.get("user") as string;
    const user = await getUserByName(username);

    if (user) return { redirect: true };
    return { redirect: false };
}