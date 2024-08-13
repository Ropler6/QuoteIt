import { _getUserByName } from "../internal/utils";
import { _addTagMembership, _addTag, _getTagsForUser, _addTagToQuote, _getTagsForQuote, _removeTagFromQuote, _deleteTag, _getTagByHash, _getTagMembership } from "../internal/tags";
import { _getFromId } from "../internal/utils";
import type { Quote_T, Tag_T } from "$lib/datatypes";
import { arrayIntersection } from "$lib/utils";

/**
 * Creates a new `tag` associated with the `user`
 * @param username The name of the `user`
 * @param tagname The name of the `tag` to be created
 * @returns The `tag` and `tagMembership` objects or `null`
 */

//TODO: check if a tag with the same name exists already
//TODO: associated with the same user
export const addTag = async (username: string, tagname: string) => {
    const user = await _getUserByName(username);
    if (user === null) return null;

    const tag = await _addTag(user.id, tagname);
    if (tag === null) return null;

    const tagMembership = await _addTagMembership(user.id, tag.id);
    if (tagMembership === null) return null;

    return { tag, tagMembership };
}

/**
 * Fetches the `tags` for the `user`
 * @param username The name of the `user`
 * @returns The `tag`s created by the `user` or `null`
 */
export const getTagsForUser = async (username: string) => {
    const user = await _getUserByName(username);
    if (user === null) return null;

    const tags = await _getTagsForUser(user.id);
    return tags;
}

/**
 * Adds a `tag` to a `quote` owned by the `user`
 * @param username The name of the `user`
 * @param tagId The ID of the `tag`
 * @param quoteId The ID of the `quote`
 * @returns The `quoteTag` object
 */
export const addTagToQuote = async (username: string, tagId: number, quoteId: number) => {
    const user = await _getUserByName(username);
    if (!user) return null;

    const tag = await _getFromId<Tag_T>(tagId, "Tags");
    if (!tag) return null;

    const quote = await _getFromId<Quote_T>(quoteId, "Quotes");
    if (!quote) return null;

    if (quote.creatorId !== user.id) return null;

    const membership = await _getTagMembership(user.id, tag.id);
    if (!membership) return null;

    const quoteMention = await _addTagToQuote(tagId, quoteId);
    return quoteMention;
}

/**
 * Fetches the tags associated with a `quote` which the current `user` can see
 * @param username The name of the `user`
 * @param quoteId The ID of the `quote`
 * @returns The tags associated with the quote
 */
export const getTagsForQuote = async (username: string, quoteId: number) => {
    const user = await _getUserByName(username);
    if (!user) return null;

    const quote = await _getFromId<Quote_T>(quoteId, "Quotes");
    if (!quote) return null;

    const userTags = await _getTagsForUser(user.id);
    if (!userTags || userTags?.length === 0) return null;

    const quoteTags = await _getTagsForQuote(quoteId);
    if (!quoteTags || quoteTags?.length === 0) return null;

    return arrayIntersection<Tag_T>(userTags, quoteTags, (x: Tag_T, y: Tag_T) => x.id === y.id);
}

/**
 * Removes a `tag` from the database
 * @param username The name of the `user` that made the `tag`
 * @param tagId The ID of the `tag`
 * @returns `true` if the operation was successful, `false` otherwise
 */
export const deleteTag = async (username: string, tagId: number) => {
    const user = await _getUserByName(username);
    if (!user) return false;

    const tag = await _getFromId<Tag_T>(tagId, "Tags");
    if (!tag) return false;

    if (tag.creatorId !== user.id) return false;

    return await _deleteTag(tagId);
}

/**
 * Removes a `tag` a `quote`
 * @param username The name of the `user` that made the `quote`
 * @param tagId The ID of the `tag`
 * @param quoteId the ID of the `quote`
 * @returns `true` if the operation was successful, `false` otherwise
 */
export const removeTagFromQuote = async (username: string, tagId: number, quoteId: number) => {
    const user = await _getUserByName(username);
    if (!user) return false;

    const quote = await _getFromId<Quote_T>(quoteId, "Quotes");
    if (!quote) return false;

    if (quote.creatorId !== user.id) return false;

    return await _removeTagFromQuote(tagId, quoteId);
}

/**
 * Adds an `user` to a `tag
 * @param username The name of the `user`
 * @param tagHash The hash of the `tag`
 * @returns The `tagMembership` object
 */
export const joinTag = async (username: string, tagHash: string) => {
    const user = await _getUserByName(username);
    if (!user) return null;

    const tag = await _getTagByHash(tagHash);
    if (!tag) return null;

    const membership = await _getTagMembership(user.id, tag.id);
    if (membership) return null;

    const tagMembership = await _addTagMembership(user.id, tag.id);
    return { tag, tagMembership }; 
}