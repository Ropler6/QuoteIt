import type { User_T } from "$lib/datatypes";
import { _addFriendRequest, _addFriendship, _getFriendRequest, _getFriends, _getFriendship, _getIncomingFriendRequests, _removeFriendRequest, _removeFriendship } from "../internal/friends";
import { _getUserByName } from "../internal/utils"

/**
 * Adds a friend request between two `user`s
 * @param senderUsername The username of the initiator of the request
 * @param receiverUsername The username of the receiver of the request
 * @returns The `friendReuqest` object if the operation was successful, `null` otherwise
 */
//TODO: check if they are already friends
export const addFriendRequest = async (senderUsername: string, receiverUsername: string) => {
    const [sender, receiver] = await Promise.all([_getUserByName(senderUsername), _getUserByName(receiverUsername)])

    if (!sender || !receiver) return null;
    return await _addFriendRequest(sender.id, receiver.id);
}

/**
 * Adds a friendship between two `user`s
 * @param username1 The username of the first `user`
 * @param username2 The username of the second `user`
 * @returns The `friendship` object if the operation was successful, `null` otherwise
 */
//TODO: check if they are already friends
export const addFriendship = async (username1: string, username2: string) => {
    const [user1, user2] = await Promise.all([_getUserByName(username1), _getUserByName(username2)]);
    if (!user1 || !user2) return null;
    
    const request = await _getFriendRequest(user1.id, user2.id)
    if (!request) return null;

    _removeFriendRequest(request.id);
    return await _addFriendship(user1.id, user2.id);
}

/**
 * Removes a `friendship` between two `user`s from the database
 * @param username1 The name of one `user`
 * @param username2 The name of the other `user`
 * @returns `true` if the operation was successful, `false` otherwise
 */
export const removeFriendship = async (username1: string, username2: string) => {
    const [user1, user2] = await Promise.all([_getUserByName(username1), _getUserByName(username2)]);
    if (!user1 || !user2) return false;

    const friendship = await _getFriendship(user1.id, user2.id);
    if (!friendship) return false;

    return await _removeFriendship(friendship.id);
}

/**
 * Fetches the incoming friend requests for an `user`
 * @param username The username of the `user`
 * @returns The incoming friend requests for that user as `IncomingFriendRequest_T`
 */
export const getIncomingFriendRequests = async (username: string) => {
    const user = await _getUserByName(username);
    if (!user) return null;

    return await _getIncomingFriendRequests(user.id);
}

/**
 * Removes the `friendRequest` with the given ID
 * @param requestId The ID of the `friendRequest`
 * @returns `true` if the operation has been successful, `false` otherwise
 */
export const removeFriendRequest = async (requestId: number) => {
    return await _removeFriendRequest(requestId);
}

/**
 * Fetches the friends of a given `user`
 * @param username The name of the `user`
 * @returns An array of `user`s with whom the target `user` is friends
 */
export const getFriends = async (username: string) => {
    const user = await _getUserByName(username);
    if (!user) return null;

    const friends = await _getFriends(user.id);
    if (!friends) return [];

    return friends.map(x => {
        return {
            name: x.name,
            createdAt: x.createdAt,
        };
    }) as User_T[];
}