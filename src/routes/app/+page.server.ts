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
        
        return { quote: result.quote, ownership: result.ownership, success: true };
    },

    removeQuote: async ({ request }) => {
        const jsonData = await request.json();
        const quoteId: number = jsonData.quoteId;

        const response = await removeSingleQuote(quoteId);
        return { success: response };
    }

} satisfies Actions