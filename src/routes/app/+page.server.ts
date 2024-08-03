import type { Actions, PageServerLoad } from "./$types";
import { addSingleQuote, getQuotesFromUser, removeSingleQuote } from "$lib/server/external/quotes";

export const load: PageServerLoad = async ({ cookies }) => {
    const userCookie = cookies.get("user") as string;
    const response = await getQuotesFromUser(userCookie);
    if (response === null) return { success: false };
    if (response.quotes === null) response.quotes = [];

    return { success: true, user: response.user, quotes: response.quotes };
}

export const actions = {
    addQuote: async ({ cookies, request }) => {
        const user = cookies.get("user") as string;
        const data = await request.formData();
        const text = data.get("text") as string;

        const result = await addSingleQuote(user, text);
        if (result === null) return { success: false };
        
        return { quote: result.quote, mention: result.mention, success: true };
    },

} satisfies Actions