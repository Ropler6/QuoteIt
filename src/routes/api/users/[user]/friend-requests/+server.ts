import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { addFriendRequest, getIncomingFriendRequests, removeFriendRequest } from "$lib/server/external/friends";
import type { FriendRequest_T } from "$lib/datatypes";


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

export const DELETE: RequestHandler = async ({ request }) => {
    const friendRequest = await request.json() as FriendRequest_T;

    return json(await removeFriendRequest(friendRequest.id));
}