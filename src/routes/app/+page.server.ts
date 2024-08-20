import type { Actions, PageServerLoad } from "./$types";
import { addQuote } from "$lib/server/external/quotes";
import { getQuotesVisibleToUser } from "$lib/server/external/quotes";
import { getUserByName } from "$lib/server/external/auth";

export const load: PageServerLoad = async ({ cookies }) => {
    const userCookie = cookies.get("user") as string;
    const [user, quotes] = await Promise.all([getUserByName(userCookie), getQuotesVisibleToUser(userCookie)]);

    if (!user || !quotes) return { success: false };

    return { success: true, user, quotes };
}

export const actions = {
    addQuote: async ({ cookies, request }) => {
        const username = cookies.get("user") as string;
        const data = await request.formData();
        
        const text = data.get("text") as string;
        const mentionedUsers = data.get("mentions") as string;

        const result = await addQuote(username, mentionedUsers.split(","), text);
        if (!result) return { success: false };

        return { success: true };
    },

} satisfies Actions