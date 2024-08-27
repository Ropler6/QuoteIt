import { supabase } from "./supabase";
import type { Quote_T, QuoteMention_T, User_T } from "$lib/datatypes";

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
 * Internal function for adding `quoteMention`s to the database
 * @param userIds The array of ID of the `user`s mentioned in the quote
 * @param quoteId The ID of the `quote`
 * @returns An array with all `quoteMention`s
 */
export const _addQuoteMentions = async (userIds: number[], quoteId: number) => {
    const mentions = userIds.map(id => {
        return {
            userId: id,
            quoteId
        }
    });

    const { data, error } = await supabase
        .from("QuoteMentions")
        .insert(mentions)
        .select();

    if (error) return null;
    if (data === null) return null;
    return data as QuoteMention_T[];
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
    return (data as any[]).map(x => x.Quotes) as Quote_T[];
}

export const _removeSingleQuote = async (quoteId: number) => {
    const [quotesResponse, ownershipResponse] = await Promise.all([
        supabase.from("Quotes")
                .delete()
                .eq("id", quoteId),

        supabase.from("QuoteMentions")
                .delete()
                .eq("quoteId", quoteId)
    ]);

    if (quotesResponse.error || ownershipResponse.error) return false;
    return true;
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

    return quotes.data as Quote_T[];
}

/**
 * Internal function for fetching the `user`s mentioned in a `quote`
 * @param quoteId The ID of the `quote`
 * @returns An array of `user`s which are mentioned in the `quote`
 */
export const _getMentions = async (quoteId: number) => {
    const { data, error } = await supabase
        .from("QuoteMentions")
        .select("user: userId(name, createdAt)")
        .eq("quoteId", quoteId);

    if (error) return null;
    return (data as any[]).map(x => x.user) as User_T[];
}

/**
 * Internal function for counting the amount of `quote`s an `user` has in the database
 * @param userId The ID of the `user`
 * @returns The amount of `quote`s
 */
export const _countQuotes = async (userId: number) => {
    const { data, error } = await supabase
        .from("Quotes")
        .select("count", { count: "estimated" })
        .eq("creatorId", userId);

    if (error) return null;
    return (data[0].count as unknown) as number;
}

/**
 * Internal function for counting the amount of `tag`s an `user` is a member of
 * @param userId The ID of the `user`
 * @returns The amount of `tag`s
 */
export const _countTags = async (userId: number) => {
    const { data, error } = await supabase
        .from("TagMemberships")
        .select("count", { count: "estimated" })
        .eq("userId", userId);

    if (error) return null;
    return (data[0].count as unknown) as number;
}

/**
 * Internal function for counting the amount of `mention`s an `user` has
 * @param userId The ID of the `user`
 * @returns The amount of `mention`s
 */
export const _countMentions = async (userId: number) => {
    const { data, error } = await supabase
        .from("QuoteMentions")
        .select("count", { count: "estimated" })
        .eq("userId", userId);

    if (error) return null;
    return (data[0].count as unknown) as number;
}