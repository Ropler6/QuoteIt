import type { Actions } from "./$types";
import { addSingleQuote } from "$lib/supabase";

export const actions = {
    addQuote: async ({ cookies, request }) => {
        const user = cookies.get("user") as string;
        const data = await request.formData();
        const text = data.get("text") as string;

        const result = await addSingleQuote(user, text);
        if (result === null) return { success: false };

        return { success: true };
    },

} satisfies Actions