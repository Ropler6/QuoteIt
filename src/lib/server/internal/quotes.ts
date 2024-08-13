import { supabase } from "./supabase";
import type { Quote_T, QuoteMention_T } from "$lib/datatypes";

/**
 * Internal function for adding a quote to the database
 * @param creatorId The ID of the `user` that made the quote`
 * @param text The text content of the `quote`
 * @returns The `quote` that has been added to the database or null
 */
export const _addQuote = async (creatorId: number, text: string) => {
    const { data, error } = await supabase
        .from("Quotes")
        .insert([
            { createdAt: new Date(), text, creatorId }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as Quote_T;
}

/**
 * Internal function for adding a `quoteMention` to the database
 * @param userId The ID of the `user` mentioned in the quote
 * @param quoteId The ID of the `quote`
 * @returns The `quoteMention` object
 */
export const _addQuoteMention = async (userId: number, quoteId: number) => {
    const { data, error } = await supabase
        .from("QuoteMentions")
        .insert([
            { userId: userId, quoteId: quoteId }
        ])
        .select();

    if (error) return null;
    if (data === null) return null;
    return data[0] as QuoteMention_T;
}

/**
 * Internal function for fetching the `quote`s created by an `user` from the database
 * @param userId The ID of the `user`
 * @param limit How many quotes should be removed
 * @returns An array of `quote`s
 */
export const _getQuotesFromUser = async(userId: number, limit: number = 50) => {
    const { data, error } = await supabase
        .from("QuoteMentions")
        .select("Quotes(*)")
        .eq("userId", userId);

    if (error) return null;
    
    const quotes: unknown[] = data.map(x => x.Quotes);
    for (let quote of (quotes as Quote_T[])) {
        quote.createdAt = new Date(quote.createdAt);
    }

    return quotes as Quote_T[];
}

/**
 * Internal function for fetching the most recent quotes the user can see
 * @param userId The ID of the `user`
 * @param limit How many quotes should be fetched
 * @returns The latest `limit` (default is `50`) `quote`s which the `user` can see
 * based on the `tag`s they are part of
 */
export const _getQuotesVisibleToUser = async (userId: number, limit = 50) => {

    //get all tagIds from tags which the user is a member of
    const tagIds = await supabase
        .from("TagMemberships")
        .select("tagId")
        .eq("userId", userId);
    if (tagIds.error) return null;

    //get all quoteIds from those tags
    const quoteIds = await supabase
        .from("QuoteTags")
        .select("quoteId")
        .in("tagId", tagIds.data.map(x => x.tagId));
    if (quoteIds.error) return null;

    //get all quotes
    const quotes = await supabase
        .from("Quotes")
        .select("*")
        .in("id", quoteIds.data.map(x => x.quoteId));
    if (quotes.error) return null;

    for (let quote of ( quotes.data as Quote_T[])) {
        quote.createdAt = new Date(quote.createdAt);
    }

    return quotes.data as Quote_T[];
}