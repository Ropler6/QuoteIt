import type { DBUser_T, FriendRequest_T, Friendship_T, IncomingFriendRequest_T } from "$lib/datatypes";
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
 * Internal function for fetching a `friendship` between two `user`s
 * @param userId1 The ID of one `user`
 * @param userId2 The ID of the other `user`
 * @returns The `friendship` object
 */
export const _getFriendship = async (userId1: number, userId2: number) => {
    const { data, error } = await supabase
    .from("Friendships")
    .select("*")
    .in("userId1", [userId1, userId2])
    .in("userId2", [userId1, userId2])

    if (error) return null;
    return data[0] as Friendship_T;
}

/**
 * Internal function for removing friend requests from the database
 * @param friendshipId The ID of the `friendship`
 * @returns `true` if the `friendship` was removed, `false` otherwise
 */
export const _removeFriendship = async (friendshipId: number) => {
    const { data, error } = await supabase
    .from("Friendships")
    .delete()
    .eq("id", friendshipId)

    if (error) return false;
    return true;
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
    return data as IncomingFriendRequest_T[];
}

/**
 * Internal function for fetching a `friendRequest` between two users
 * @param userId1 The ID of one `user`
 * @param userId2 The ID of the other `user`
 * @returns The `friendRequest` sent between them (if it exists)
 */
export const _getFriendRequest = async (userId1: number, userId2: number) => {
    const { data, error } = await supabase
        .from("FriendRequests")
        .select("*")
        .in("senderId", [userId1, userId2])
        .in("receiverId", [userId1, userId2]);

    if (error) return null;
    return data[0] as FriendRequest_T;
}

/**
 * Internal function for fetching the friends of an `user`
 * @param userId The ID of the `user`
 * @returns An array of `user`s which are friends with the desired `user`
 */
//TODO: make this less (horrendously) inefficient
export const _getFriends = async (userId: number) => {
    const [response1, response2] = await Promise.all([
        supabase.from("Friendships")
                .select("userId2(*)")
                .eq("userId1", userId),

        supabase.from("Friendships")
                .select("userId1(*)")
                .eq("userId2", userId),
    ]);

    if (response1.error || response2.error) return null;
    const arr1 = response2.data.map(x => x.userId1);
    const arr2 = response1.data.map(x => x.userId2);
    
    return (arr2.concat(arr1) as unknown[]) as DBUser_T[];
}