import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { addFriendRequest, getIncomingFriendRequests } from "$lib/server/external/friends";


export const POST: RequestHandler = async ({ params, request }) => {
    const friendname = await request.json();
    const username = params.user;
    
    const friendship = await addFriendRequest(username, friendname);
    return friendship ? json(true) : json(false);
}

export const GET: RequestHandler = async ({ params }) => {
    const username = params.user;
    return json(await getIncomingFriendRequests(username) || []);
}