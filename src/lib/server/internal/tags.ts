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
    const { data, error } = await supabase
        .from("TagMemberships")
        .select("Tags(*)")
        .eq("userId", user.id);

    if (error) return null;
    const tags = data.map(x => x.Tags);

    return tags;
}