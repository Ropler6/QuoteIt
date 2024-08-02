import { supabase, type Table_T } from "./supabase";
import type { User_T } from "$lib/datatypes";

export const _getUserByName = async (name: string) => {
    const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("name", name);

    if (error) return null;
    if (data === null || !data[0]) return null;
    return data[0] as User_T;
}

export const _getFromId = async <T> (id: number, table: Table_T)=> {
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id);

    if (error) return null;
    if (!data || !data[0]) return null;

    return data[0] as T;
}