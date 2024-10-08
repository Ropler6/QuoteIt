import type { User_T } from "$lib/datatypes";
import { addFriendship, getFriends, removeFriendship } from "$lib/server/external/friends";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";


export const POST: RequestHandler = async ({ cookies, request }) => {
    const username = cookies.get("user") as string;
    const newFriend = await request.json() as User_T;

    const friendship = await addFriendship(username, newFriend.name);
    return friendship ? json(true) : json(false);
}

export const GET: RequestHandler = async ({ cookies }) => {
    const username = cookies.get("user") as string;
    const friends = await getFriends(username);

    return json(friends);
}

export const DELETE: RequestHandler = async ({ cookies, request }) => {
    const username = cookies.get("user") as string;
    const friend = await request.json() as User_T;

    const sucess = await removeFriendship(username, friend.name);
    return json(sucess);
}