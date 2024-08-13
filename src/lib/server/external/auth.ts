import { supabase } from "../internal/supabase";
import { _getUserByName } from "../internal/utils";

/**
 * Registers a new `user` into the database
 * @param name The name of the `user`
 * @param password The password typed by the `user`
 * @returns `true` if the account has been created successfully, `false` otherwise
 */
export const register = async (name: string, password: string) => {
    const user = await _getUserByName(name);
    if (user !== null) return false;

    const { error } = await supabase
        .from("Users")
        .insert([{
            name,
            password,
            createdAt: new Date(),
        }])
        .select();

    if (error) return false;
    return true;
}

/**
 * Attempts to log in an `user` based on the password they have provided
 * @param name The name of the `user`
 * @param password The password typed by the `user`
 * @returns `true` if the `user` has logged in successfully, `false` otherwise
 */
export const login = async (name: string, password: string) => {
    const user = await _getUserByName(name);
    if (user === null) return false;
    if (user.password === password) return true;
    return false;
}

/**
 * Fetches an `user` from the database based on their name
 * @param name The name of the `user`
 * @returns The `user` object
 */
export const getUserByName = async (name: string) => {
    return await _getUserByName(name);
}