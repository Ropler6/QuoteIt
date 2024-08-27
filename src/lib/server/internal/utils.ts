import { supabase, type Table_T } from "./supabase";
import type { DBUser_T } from "$lib/datatypes";

/**
 * Internal function for fetching an `user` from the database
 * based on their name
 * @param name The name of the `user`
 * @returns The `user` object
 */
export const _getUserByName = async (name: string) => {
    const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("name", name);

    if (error) return null;
    if (data === null || !data[0]) return null;
    return data[0] as DBUser_T;
}

/**
 * Internal function for fetching an object of type `T` from the database
 * @param id The ID of the object
 * @param table The database table from which to fetch the data
 * @returns The object whose ID is `id
 */
export const _getFromId = async <T> (id: number, table: Table_T)=> {
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id);

    if (error) return null;
    if (!data || !data[0]) return null;

    return data[0] as T;
}