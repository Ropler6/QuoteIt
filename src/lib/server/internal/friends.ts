import type { FriendRequest_T, Friendship_T, IncomingFriendRequest_T, User_T } from "$lib/datatypes";
import { supabase } from "./supabase"

/**
 * Internal function for adding `friendRequest`s to the database
 * @param senderId The ID of the `user` that will send the request
 * @param receiverId The ID of the `user` that will receive the request
 * @returns The `friendRequest` object
 */
export const _addFriendRequest = async (senderId: number, receiverId: number) => {
    const { data, error } = await supabase
        .from("FriendRequests")
        .insert([{
            senderId,
            receiverId,
            createdAt: new Date(),
        }])
        .select();

    if (error) return null;
    return data[0] as FriendRequest_T;
}

/**
 * Internal function for removing `friendRequest`s from the database
 * @param requestId The ID of the `friendRequest` object to be removed
 * @returns `true` if the operation has been successful, `false` otherwise
 */
export const _removeFriendRequest = async (requestId: number) => {
    const { error } = await supabase
        .from("FriendRequests")
        .delete()
        .eq("id", requestId);

    if (error) return false;
    return true;
}

/**
 * Internal function for adding a friendship between two users
 * @param userId1 The ID of the first `user`
 * @param userID2 The ID of the second `user`
 * @returns 
 */
export const _addFriendship = async (userId1: number, userId2: number) => {
    const { data, error } = await supabase
        .from("Friendships")
        .insert([{
            userId1,
            userId2,
        }])
        .select();

    if (error) return null;
    return data[0] as Friendship_T;
}

/**
 * Internal function for fetching the incoming friend requests for an `user
 * @param userId The ID of the `user`
 * @returns The incoming friend requests as an array of `IncomingFriendRequest_T`
 */
export const _getIncomingFriendRequests = async (userId: number) => {
    const { data, error } = await supabase
        .from("FriendRequests")
        .select(`
            *,
            user:senderId(*)
        `)
        .eq("receiverId", userId);

    if (error) return null;

    //peak inefficiency
    return data.map(x => {
        const { user, ...friendRequest } = x;
        return { user, friendRequest } as IncomingFriendRequest_T
    });
}