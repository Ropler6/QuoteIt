import { addTagToQuote, getTagsForQuote } from "$lib/server/external/tags";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, cookies }) => {
    const quoteId = parseInt(params.slug);
    const username = cookies.get("user") as string;

    const tags = await getTagsForQuote(username, quoteId);

    return json(tags);
}

export const POST: RequestHandler = async ({ params, cookies, request }) => {

    const quoteId = parseInt(params.slug);
    const tagId = await request.json();
    const username = cookies.get("user") as string;

    const quoteTag = await addTagToQuote(username, tagId, quoteId);

    return quoteTag ? json(true) : json(false);
}