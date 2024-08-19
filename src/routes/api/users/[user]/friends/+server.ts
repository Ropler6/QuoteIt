import type { User_T } from "$lib/datatypes";
import { addFriendship } from "$lib/server/external/friends";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";


export const POST: RequestHandler = async ({ params, request }) => {
    const username = params.user;
    const newFriend = await request.json() as User_T;

    const friendship = await addFriendship(username, newFriend.name);
    return friendship ? json(true) : json(false);
}
