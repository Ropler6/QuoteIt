import { supabase } from "../internal/supabase";
import { _getUserByName } from "../internal/utils";
import { _getQuotesFromUser, _addQuote, _addQuoteMention, _getQuotesVisibleToUser } from "../internal/quotes";
import { arrayUnion } from "$lib/utils";

/**
 * Fetches the `quotes` created by the `user`
 * @param _user The name of the `user`
 * @returns The `quotes` and the `user` that made them or null
 */
export const getQuotesFromUser = async (_user: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    return await _getQuotesFromUser(user.id);
}

/**
 * Creates a `quote` and adds it to the database
 * @param _user The name of the `user`
 * @param text The text content of the `quote`
 * @returns The `quote` and `mention` objects or `null`
 */
export const addSingleQuote = async (_user: string, text: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    const quote = await _addQuote(user.id, text);
    if (quote === null) return null;

    const mention = await _addQuoteMention(user.id, quote.id);
    if (mention === null) return null;

    return { quote, mention };
}

/**
 * Removes a `quote` from the database
 * @param quoteId The id of the `quote` to be removed
 * @returns `true` if the operation has been successful, `false` otherwise
 */
export const removeSingleQuote = async (quoteId: number) => {
    const quotesResponse = await supabase
        .from("Quotes")
        .delete()
        .eq("id", quoteId);

    const ownershipResponse = await supabase
        .from("QuoteMentions")
        .delete()
        .eq("quoteId", quoteId);

    if (quotesResponse.error || ownershipResponse.error) return false;
    return true;
}


export const getQuotesVisibleToUser = async (username: string, limit: number = 50) => {
    const user = await _getUserByName(username);
    if (!user) return null;

    const allQuotes = await _getQuotesVisibleToUser(user.id, limit);
    const ownQuotes = await _getQuotesFromUser(user.id, limit);

    if (!allQuotes || !ownQuotes) return null;

    return arrayUnion(allQuotes, ownQuotes, (x, y) => x.id === y.id);
}