import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { removeSingleQuote } from "$lib/server/external/quotes";

export const DELETE: RequestHandler = async ({ params, cookies }) => {

    const username = cookies.get("user") as string;
    const quoteId = parseInt(params.quoteId);
    const response = await removeSingleQuote(username, quoteId);
    
    return json(response);
}