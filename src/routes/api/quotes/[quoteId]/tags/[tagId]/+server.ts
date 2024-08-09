import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { removeTagFromQuote } from "$lib/server/external/tags";

export const DELETE: RequestHandler = async ({ params, cookies }) => {
    const tagId = parseInt(params.tagId);
    const quoteId = parseInt(params.quoteId)
    const username = cookies.get("user") as string;

    const response = await removeTagFromQuote(username, tagId, quoteId);

    return json(response);
}