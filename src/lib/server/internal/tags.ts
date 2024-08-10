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

/**
 * Internal function for fetching all `tag`s associated with a `quote`
 * @param quoteId The ID of thq `quote`
 * @returns All `tag`s associated with the `quote`
 */
export const _getTagsForQuote = async (quoteId: number) => {
    const { data, error } = await supabase
        .from("QuoteTags")
        .select("Tags(*)")
        .eq("quoteId", quoteId);

    if (error) return null;
    const tags: unknown = data.map(x => x.Tags)

    return tags as Tag_T[];
}

/**
 * Internal function for removing a `tag` from the database
 * @param tagId The ID of thq `tag`
 * @returns `true` if the operation has been successful, `false` otherwise
 */
export const _deleteTag = async (tagId: number) => {
    const { data, error } = await supabase
        .from("Tags")
        .delete()
        .eq("tagId", tagId);

    if (error) return false;
    return true;
}

/**
 * Internal function for removing a `tag` from a `quote`
 * @param tagId The ID of thq `tag`
 * @param quoteId The ID of the `quote`
 * @returns `true` if the operation has been successful, `false` otherwise
 */
export const _removeTagFromQuote = async (tagId: number, quoteId: number) => {
    const { data, error } = await supabase
        .from("QuoteTags")
        .delete()
        .eq("tagId", tagId)
        .eq("quoteId", quoteId);

    if (error) return false;
    return true;
}

/**
 * Internal function for fetching a `tag` based on its `hash`
 * @param hash The `hash` of the `tag`
 * @returns The `tag` object associated with the `hash`
 */
export const _getTagByHash = async (hash: string) => {
    const { data, error } = await supabase
        .from("Tags")
        .select("*")
        .eq("hash", hash)

    if (error) return null;
    return data[0] as Tag_T;
}