<script lang="ts">
    import type { PageData } from "./$types";
    import Header from "$lib/components/Header.svelte";
    import type { ActionData } from "./$types"
    import Tag from "$lib/components/Tag.svelte";
    import Notification from "$lib/components/Notification.svelte";
    import type { Tag_T } from "$lib/datatypes";
    import { browser } from "$app/environment";
    import "/src/style.css"

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

    {#if data?.success && data?.tags}
    <div class="tags">
        <h2>Tags you joined:</h2>
            {#each data.tags as tag}
                <Tag showHash={true} tag={tag}/>
            {/each}
        </div>
    {/if}

    <div class="forms">
        <div class="create">
            <h2>Create a tag:</h2>
            <form method="POST" action="?/createTag">
                <label for="tagName">Tag name:</label>
                <input type="text" name="tagName">
                <button type="submit">Create</button>
            </form>
            {#if form?.success}
                <Notification text={"Tag created successfully!"}/>
            {/if}
        </div>
    
        <div class="join">
            <h2>Join a tag:</h2>
            <form method="POST" action="?/joinTag">
                <label for="tagHash">Tag hash:</label>
                <input type="text" name="tagHash">
        
                <button type="submit">Join</button>
            </form>
        </div>
    
    </div>

</main>


<style>
    main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .tags {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .forms {
        display: flex;
        flex-direction: column;
        padding: var(--size-l);
    }
    
    label {
        margin: var(--size-xs);
    }
</style>