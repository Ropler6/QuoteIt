import { supabase } from "./supabase";
import type { User_T, Tag_T, TagMembership_T } from "$lib/datatypes";
import { randomUUID } from "crypto"

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

export const _getTagsForUser = async (userId: number) => {
    const { data, error } = await supabase
        .from("TagMemberships")
        .select("Tags(*)")
        .eq("userId", userId);

    if (error) return null;
    const tags: unknown[] = data.map(x => x.Tags);

    return tags as Tag_T[];
}