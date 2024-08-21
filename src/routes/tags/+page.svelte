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
    <div class="forms">
        <h2 style:grid-column="2 / 3">Create a tag:</h2>
        <form method="POST" action="?/createTag">
            <label for="tagName">
                Tag name:
                <input type="text" name="tagName">
            </label>
    
            <button type="submit">Create</button>
        </form>
    
        <h2 style:grid-column="4 / 5">Join a tag:</h2>
        <form method="POST" action="?/joinTag">
            <label for="tagHash">
                Tag hash:
                <input type="text" name="tagHash">
            </label>
    
            <button type="submit">Join</button>
        </form>
    
        {#if form?.success}
            <Notification text={"Tag created successfully!"}/>
        {/if}
    </div>

    {#if data?.success && data?.tags}
    <div class="tags">
        <h2>Tags you joined:</h2>
            {#each data.tags as tag}
                <Tag showHash={true} tag={tag}/>
            {/each}
        </div>
    {/if}
</main>


<style>
    .tags {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .forms {
        display: grid;
        grid-template-columns: 1fr 2fr 3fr 2fr 1fr;
        grid-template-rows: 1fr 1fr;
        border-bottom: 5px solid var(--accent-colour);
        padding: var(--size-l);
    }

    [action="?/createTag"] {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }

    [action="?/joinTag"] {
        grid-column: 4 / 5;
        grid-row: 2 / 3;
    }

    h2 {
        color: var(--accent-colour);
        font-size: var(--size-xl);
    }

    label {
        font-size: var(--size-l);
    }
</style>