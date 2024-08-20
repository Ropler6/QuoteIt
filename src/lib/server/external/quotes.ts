import { _getFromId, _getUserByName } from "../internal/utils";
import { _getQuotesFromUser, _addQuote, _addQuoteMentions, _getQuotesVisibleToUser, _removeSingleQuote, _getMentions } from "../internal/quotes";
import { arrayUnion } from "$lib/utils";
import type { Quote_T } from "$lib/datatypes";

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
 * Creates a `quote` and adds it to the database
 * @param username The name of the `user`
 * @param text The text content of the `quote`
 * @returns The `quote` and `mention` objects or `null`
 */
export const addSingleQuote = async (username: string, text: string) => {
    const user = await _getUserByName(username);
    if (user === null) return null;

    const quote = await _addQuote(user.id, text);
    if (quote === null) return null;

    const mention = await _addQuoteMentions([user.id], quote.id);
    if (mention === null) return null;

    return { quote, mention };
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
 * 
 * @param creatorName The username of the `user` which made the quote
 * @param mentionedName The username of the `user` to be mentioned
 * @param quoteId The ID of the `quote`
 * @returns 
 */
export const addQuoteMentions = async (creatorName: string, mentionedName: string[], quoteId: number) => {
    const [creator, possibleMentioned, quote] = await Promise.all([
        _getUserByName(creatorName),
        Promise.all(mentionedName.map(name => _getUserByName(name))),
        _getFromId<Quote_T>(quoteId, "Quotes")
    ]);

    if (!creator || !possibleMentioned || !quote) return null;
    if (creator.id !== quote.creatorId) return null;

    const mentioned = possibleMentioned.filter(x => x !== null)

    return await _addQuoteMentions(mentioned.map(user => user.id), quoteId);
}