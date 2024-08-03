import { supabase } from "./supabase";
import type { Tag_T, TagMembership_T, QuoteTag_T } from "$lib/datatypes";
import { randomUUID } from "crypto"

/**
 * Internal function for adding a `tagMembership` for an `user`
 * @param userId The ID of the `user`
 * @param tagId The ID of the `tag`
 * @returns The `tagMembership` object
 */
export const _addTagMembership = async (userId: number, tagId: number) => {
    const { data, error } = await supabase
        .from("TagMemberships")
        .insert([{
            userId: userId,
            tagId: tagId,
        }])
        .select();

    if (error) return null;
    return data[0] as TagMembership_T;
}

/**
 * Internal function for adding a `tag` to the database 
 * @param userId The ID of the `user`
 * @param tagName The name of the `tag`
 * @returns The `tag` object
 */
export const _addTag = async (userId: number, tagName: string) => {
    const { data, error } = await supabase
        .from("Tags")
        .insert([{
            hash: randomUUID(),
            createdAt: new Date(),
            creatorId: userId,
            name: tagName,
        }])
        .select();

    if (error) return null;
    return data[0] as Tag_T;
}

/**
 * Internal function for getting all `tag`s associated with an `user`
 * @param userId The ID of the user
 * @returns The `tag` object
 */
export const _getTagsForUser = async (userId: number) => {
    const { data, error } = await supabase
        .from("TagMemberships")
        .select("Tags(*)")
        .eq("userId", userId);

    if (error) return null;
    const tags: unknown[] = data.map(x => x.Tags);

    return tags as Tag_T[];
}

/**
 * Internal function for adding a `tag` to a `quote`
 * @param tagId The ID of the `tag` to be added
 * @param quoteId athe ID of the `quote`
 * @returns `true` if the operation has been successful, `false` otherwise
 */
export const _addTagToQuote = async (tagId: number, quoteId: number) => {
    const { data, error } = await supabase
        .from("QuoteTags")
        .insert([{
            quoteId: quoteId,
            tagId: tagId,
        }])
        .select();

    if (error) return null;
    return data[0] as QuoteTag_T;
}