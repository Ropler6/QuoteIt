import { _getFromId, _getUserByName } from "../internal/utils";
import { _getQuotesFromUser, _addQuote, _addQuoteMentions, _getQuotesVisibleToUser, _removeSingleQuote, _getMentions, _countQuotes, _countTags, _countMentions } from "../internal/quotes";
import { arrayIntersection, arrayUnion } from "$lib/utils";
import type { Quote_T } from "$lib/datatypes";
import { _getFriends } from "../internal/friends";

/**
 * Fetches the `quotes` created by the `user`
 * @param username The name of the `user`
 * @returns The `quotes` and the `user` that made them or null
 */
export const getQuotesFromUser = async (username: string) => {
    const user = await _getUserByName(username);
    if (user === null) return null;

    return await _getQuotesFromUser(user.id);
}

/**
 * Removes a `quote` from the database
 * @param quoteId The id of the `quote` to be removed
 * @returns `true` if the operation has been successful, `false` otherwise
 */
export const removeSingleQuote = async (username: string, quoteId: number) => {
    const [user, quote] = await Promise.all([_getUserByName(username), _getFromId<Quote_T>(quoteId, "Quotes")])

    if (!user || !quote) return false;
    if (user.id !== quote.creatorId) return false;

    return await _removeSingleQuote(quoteId);
}


export const getQuotesVisibleToUser = async (username: string, limit: number = 50) => {
    const user = await _getUserByName(username);
    if (!user) return null;

    const [allQuotes, ownQuotes] = await Promise.all([_getQuotesVisibleToUser(user.id, limit), _getQuotesFromUser(user.id, limit)])
    if (!allQuotes || !ownQuotes) return null;

    return arrayUnion(allQuotes, ownQuotes, (x, y) => x.id === y.id);
}

/**
 * Fetches the `user`s mentioned in the `quote`
 * @param username The name of the `user`
 * @param quoteId The ID of the `quote`
 * @returns An array containing the `user`s mentioned in the `quote`
 */
export const getMentions = async (username: string, quoteId: number) => {
    const [user, quote] = await Promise.all([_getUserByName(username), _getFromId<Quote_T>(quoteId, "Quotes")]);
    if (!user || !quote) return null;
    
    return await _getMentions(quote.id);
}

/**
 * Adds a `quote` to the database and adds all `user`s to its mentions as long
 * as they are friends with the creator
 * @param creatorName The username of the `user` which made the quote
 * @param mentionedName The usernames of the `user`s to be mentioned
 * @param text The text contents of the `quote`
 * @returns 
 */
export const addQuote = async (creatorName: string, mentionedName: string[], text: string) => {
    
    //remove extra spaces from names && remove null values/empty strings
    mentionedName = mentionedName.filter(x => x.length > 0 && x !== null)
                                 .map(x => x.trim());
    
    const [creator, possibleMentioned] = await Promise.all([
        _getUserByName(creatorName),
        Promise.all(mentionedName.map(name => _getUserByName(name))),
    ]);

    if (!creator || !possibleMentioned) return null;

    const mentioned = possibleMentioned.filter(x => x !== null);
    if (mentioned.length !== possibleMentioned.length) return null; //some users do not exist


    if (mentioned.length > 0) { //quote with mentions
        const friends = await _getFriends(creator.id);
        if (!friends) return null; //no friends => no users to mention
    
        //if at least one of the mentioned users isnt a friend, return null
        if (arrayIntersection(mentioned, friends, (x, y) => x.id === y.id).length !== mentioned.length) return null;
    
        const quote = await _addQuote(creator.id, text);
        if (!quote) return null;
    
        const mentions = await _addQuoteMentions(mentioned.map(x => x.id).concat(creator.id), quote.id);
        return { quote, mentions };
    }
    else { //solo quote
        const quote = await _addQuote(creator.id, text);
        if (!quote) return null;
        const mentions = await _addQuoteMentions([creator.id], quote.id);

        return { quote, mentions };
    }
}

/**
 * Fetches relevant data about the user and their activity on the app
 * @param username The name of the `user`
 * @returns The number of `quote`s, `tag`s and `mention`s associated with the `user`
 */
export const getDataForUser = async (username: string) => {
    const user = await _getUserByName(username);
    if (!user) return null;

    const [quoteCount, tagCount, mentionCount] = await Promise.all([
        _countQuotes(user.id), _countTags(user.id), _countMentions(user.id)
    ]);

    return {
        quotes: quoteCount,
        tags: tagCount,
        mentions: mentionCount
    };
}