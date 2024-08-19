import { getMentions } from "$lib/server/external/quotes";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies, params }) => {
    const username = cookies.get("user") as string;
    const quoteId = parseInt(params.quoteId);

    return json(await getMentions(username, quoteId) || []);
}