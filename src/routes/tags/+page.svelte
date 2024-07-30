<script lang="ts">
    import type { PageData } from "./$types";
    import Header from "../../Components/Header.svelte";
    import type { ActionData } from "./$types"
    import Tag from "../../Components/Tag.svelte";
    import Notification from "../../Components/Notification.svelte";

    export let form: ActionData;
    export let data: PageData;
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
            <Tag tag={tag}/>
        {/each}
    {/if}
</main>