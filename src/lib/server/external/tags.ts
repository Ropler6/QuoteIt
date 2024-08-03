import { _getUserByName } from "../internal/utils";
import { _addTagMembership, _addTag, _getTagsForUser, _addTagToQuote } from "../internal/tags";
import { _getFromId } from "../internal/utils";
import type { Quote_T, Tag_T } from "$lib/datatypes";

/**
 * Creates a new `tag` associated with the `user`
 * @param _user The name of the `user`
 * @param tagname The name of the `tag` to be created
 * @returns The `tag` and `tagMembership` objects or `null`
 */

//TODO: check if a tag with the same name exists already
//TODO: associated with the same user
export const addTag = async (_user: string, tagname: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    const tag = await _addTag(user.id, tagname);
    if (tag === null) return null;

    const tagMembership = await _addTagMembership(user.id, tag.id);
    if (tagMembership === null) return null;

    return { tag, tagMembership };
}

/**
 * Fetches the `tags` for the `user`
 * @param _user The name of the `user`
 * @returns The `tag`s created by the `user` or `null`
 */
export const getTagsForUser = async (_user: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    const tags = await _getTagsForUser(user.id);
    return tags;
}

/**
 * Adds a `tag` to a `quote` owned by the `user`
 * @param _user The name of the `user`
 * @param tagId The ID of the `tag`
 * @param quoteId The ID of the `quote`
 * @returns The `quoteTag` object
 */
//TODO: check if the user is part of the tag
export const addTagToQuote = async (_user: string, tagId: number, quoteId: number) => {
    const user = await _getUserByName(_user);
    if (!user) return null;

    const tag = await _getFromId<Tag_T>(tagId, "Tags");
    if (!tag) return null;

    const quote = await _getFromId<Quote_T>(quoteId, "Quotes");
    if (!quote) return null;

    if (quote.creatorId !== user.id) return null;

    const quoteMention = await _addTagToQuote(tagId, quoteId);
    return quoteMention;
}

