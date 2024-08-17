import { getUserByName } from "$lib/server/external/auth";
import { _getIncomingFriendRequests } from "$lib/server/internal/friends";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const username = cookies.get("user") as string;
    const user = await getUserByName(username);

    if (!user) return { success: false }
    return { success: true, user };
}