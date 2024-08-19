import type { Actions, PageServerLoad } from "./$types";
import { addQuoteMentions, addSingleQuote } from "$lib/server/external/quotes";
import { getQuotesVisibleToUser } from "$lib/server/external/quotes";
import { getUserByName } from "$lib/server/external/auth";

export const load: PageServerLoad = async ({ cookies }) => {
    const userCookie = cookies.get("user") as string;
    const user = await getUserByName(userCookie);
    const quotes = await getQuotesVisibleToUser(userCookie);

    if (!user || !quotes) return { success: false };

    return { success: true, user, quotes };
}

export const actions = {
    addQuote: async ({ cookies, request }) => {
        const username = cookies.get("user") as string;
        const data = await request.formData();
        
        const text = data.get("text") as string;
        const mentionedUsers = data.get("mentions") as string;

        const result = await addSingleQuote(username, text);
        if (result === null) return { success: false };
        addQuoteMentions(username, mentionedUsers.split(","), result.quote.id);
        
        return { quote: result.quote, mention: result.mention, success: true };
    },

} satisfies Actions