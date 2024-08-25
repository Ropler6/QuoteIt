import * as crypto from "crypto"

/**
 * Internal function for generating salts for passwords
 * @returns A cryptographyically-secure salt
 */
export const _generateSalt = () => {
    return crypto.randomBytes(128).toString("base64");
}