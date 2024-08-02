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