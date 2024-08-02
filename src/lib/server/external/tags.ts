import type { Tag_T, TagMembership_T } from "$lib/datatypes";
import { _getUserByName } from "../internal/utils";
import { _addTagMembership, _addTag, _getTagsForUser } from "../internal/tags";
import { _getFromId } from "../internal/utils";


export const addTag = async (_user: string, tagname: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    const tag: Tag_T = await _addTag(user, tagname);
    const tagMembership: TagMembership_T = await _addTagMembership(user, tag);

    return { tag, tagMembership };
}

export const getTagsForUser = async (_user: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    const tags = await _getTagsForUser(user);
    return tags;
}

