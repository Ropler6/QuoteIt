import { getUserByName } from "$lib/server/external/auth";
import { getDataForUser } from "$lib/server/external/quotes";
import { _getIncomingFriendRequests } from "$lib/server/internal/friends";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const username = cookies.get("user") as string;
    const user = await getUserByName(username);
    const userData = await getDataForUser(username);

    if (!user) return { success: false }
    if (!userData) return { success: true, user };

    return { success: true, user, userData };
}

export const actions = {
    logout: async ({ cookies }) => {
        cookies.delete("user", { path: "/" });

        return { success: true };
    }
} satisfies Actions;