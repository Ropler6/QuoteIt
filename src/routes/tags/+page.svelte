<script lang="ts">
    import type { PageData } from "./$types";
    import Header from "$lib/components/Header.svelte";
    import type { ActionData } from "./$types"
    import Tag from "$lib/components/Tag.svelte";
    import Notification from "$lib/components/Notification.svelte";
    import type { Tag_T } from "$lib/datatypes";
    import { browser } from "$app/environment";

    export let form: ActionData;
    export let data: PageData;

    if (form?.success && form?.tag && browser) {
        const userTags = JSON.parse(sessionStorage.getItem("userTags") || "[]") as Tag_T[];
        userTags.push(form.tag);
        sessionStorage.setItem("userTags", JSON.stringify(userTags));
    }
</script>

<Header/>
<main>
    <form method="POST" action="?/createTag">
        <label for="tagName">
            Tag name:
            <input type="text" name="tagName">
        </label>

        <button type="submit">Create</button>
    </form>

    {#if form?.success}
        <Notification text={"Tag created successfully!"}/>
    {/if}

    {#if data?.success && data?.tags}
        {#each data.tags as tag}
            <Tag showHash={true} tag={tag}/>
        {/each}
    {/if}
</main>