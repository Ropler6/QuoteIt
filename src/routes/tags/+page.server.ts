import { addTag, getTagsForUser, joinTag } from "$lib/server/external/tags";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, request }) => {
    const user = cookies.get("user") as string;
    const tags = await getTagsForUser(user);

    if (tags !== null) return { success: true, tags };
    return { success: false };
}

export const actions = {
    createTag: async ({ cookies, request }) => {
        const user = cookies.get("user") as string;
        const data = await request.formData();
        const tagName = data.get("tagName") as string;

        const result = await addTag(user, tagName);
        if (result === null) return { success: false };

        return { tag: result.tag, tagMembership: result.tagMembership, success: true };
    },

    joinTag: async ({ cookies, request }) => {
        const user = cookies.get("user") as string;
        const data = await request.formData();
        const tagHash = data.get("tagHash") as string;

        const result = await joinTag(user, tagHash);
        if (!result) return { success: false };

        return { tag: result.tag, tagMembership: result.tagMembership, success: true };
    }
} satisfies Actions;