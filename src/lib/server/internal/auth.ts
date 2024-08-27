import * as crypto from "crypto"
import { supabase } from "./supabase";

/**
 * Internal function for generating salts for passwords
 * @returns A cryptographyically-secure salt
 */
export const _generateSalt = () => {
    return crypto.randomBytes(128).toString("base64");
}

/**
 * Internal function for hashing passwords
 * @param password The password to be hashed
 * @param salt The salt associated with an `user`
 * @returns The hashed password as a string in base64
 */
export const _hash = (password: string, salt: string) => {
    return crypto.pbkdf2Sync(password, salt, 420, 512, "sha512").toString("base64");
}

/**
 * Internal function for fetching the salt associated with an `user`
 * @param userId The ID of the `user` to fetch the salt for
 * @returns The salt associated with the user
 */
export const _getSalt = async (userId: number) => {
    const { data, error } = await supabase
        .from("Users")
        .select("salt")
        .eq("id", userId);

    if (error) return null;
    return data[0].salt as string;
}