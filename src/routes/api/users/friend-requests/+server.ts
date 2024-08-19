import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { addFriendRequest, getIncomingFriendRequests, removeFriendRequest } from "$lib/server/external/friends";
import type { FriendRequest_T } from "$lib/datatypes";


export const POST: RequestHandler = async ({ cookies, request }) => {
    const friendname = await request.json();
    const username = cookies.get("user") as string;
    
    const friendship = await addFriendRequest(username, friendname);
    return friendship ? json(true) : json(false);
}

export const GET: RequestHandler = async ({ cookies }) => {
    const username = cookies.get("user") as string;
    return json(await getIncomingFriendRequests(username) || []);
}

export const DELETE: RequestHandler = async ({ request }) => {
    const friendRequest = await request.json() as FriendRequest_T;

    return json(await removeFriendRequest(friendRequest.id));
}