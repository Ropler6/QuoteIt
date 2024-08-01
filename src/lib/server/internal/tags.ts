import { supabase } from "./supabase";
import type { User_T, Tag_T } from "$lib/datatypes";
import { randomUUID } from "crypto"

export const _addTagMembership = async (user: User_T, tag: Tag_T) => {
    const { data, error } = await supabase
        .from("TagMemberships")
        .insert([{
            userId: user.id,
            tagId: tag.id,
        }])
        .select();

    if (error) return null;
    return data[0];
}

export const _addTag = async (user: User_T, tagName: string) => {
    const { data, error } = await supabase
        .from("Tags")
        .insert([{
            hash: randomUUID(),
            createdAt: new Date(),
            creatorId: user.id,
            name: tagName,
        }])
        .select();

    if (error) return null;
    return data[0];
}

export const _getTagsForUser = async (user: User_T) => {
    const { data: tagIds, error: error1 } = await supabase
        .from("TagMemberships")
        .select("tagId")
        .eq("userId", user.id);

    if (error1) return null;
    if (tagIds === null) return null;
    const ids: number[] = tagIds.map(a => a.tagId);

    let tags: Tag_T[] = []

    for (const id of ids) {
        const { data, error } = await supabase
            .from("Tags")
            .select("*")
            .eq("id", id);

        if (!error && data !== null)
            tags.push({
                id: data[0].id,
                hash: data[0].hash,
                createdAt: new Date(data[0].createdAt),
                creatorId: data[0].creatorId,
                name: data[0].name,
            });
    }

    return tags;
}