import { _getUserByName } from "../internal/utils";
import { _addTagMembership, _addTag, _getTagsForUser } from "../internal/tags";
import { _getFromId } from "../internal/utils";


export const addTag = async (_user: string, tagname: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    const tag = await _addTag(user.id, tagname);
    if (tag === null) return null;

    const tagMembership = await _addTagMembership(user.id, tag.id);
    if (tagMembership === null) return null;

    return { tag, tagMembership };
}

export const getTagsForUser = async (_user: string) => {
    const user = await _getUserByName(_user);
    if (user === null) return null;

    const tags = await _getTagsForUser(user.id);
    return tags;
}

