import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { removeSingleQuote } from "$lib/server/external/quotes";

export const DELETE: RequestHandler = async ({ params }) => {

    const quoteId = parseInt(params.quoteId);
    const response = await removeSingleQuote(quoteId);
    
    return json(response);
}