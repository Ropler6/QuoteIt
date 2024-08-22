<script lang="ts">
    import type { Quote_T, Tag_T, User_T } from "$lib/datatypes";
    import { arrayDifference } from "$lib/utils";
    import Tag from "./Tag.svelte";
    import { createEventDispatcher, onMount } from "svelte";

    export let user: User_T;
    export let quote: Quote_T;
    export let quoteTags: Tag_T[] = [];

    let userTags: Tag_T[] = [];
    const dispatch = createEventDispatcher();
    let addingTags = false;
    $: availableTags = arrayDifference<Tag_T>(userTags, quoteTags, (x: Tag_T, y: Tag_T) => x.id === y.id);

    //TODO: fix this messy load
    onMount(() =>{
        userTags = JSON.parse(sessionStorage.getItem("userTags") || "[]") as Tag_T[];
    })

    const addTagToQuote = async (tag: Tag_T) => {
        //add the tag to the quote in the database
        const response = await fetch(`/api/quotes/${quote.id}/tags`, {
            method: "POST",
            body: JSON.stringify(tag.id),
        });

        const success = await response.json();

        //if the operation was successful
        if (success) {
            //render the associated HTML
            dispatch("addTag", tag);
        }
        else {
            console.warn("Could not add the tag!");
        }
    }

    const removeTagFromQuote = async (tag: Tag_T) => {
        const response = await fetch(`/api/quotes/${quote.id}/tags/${tag.id}`, {
            method: "DELETE",
        });

        const success = await response.json();
        if (success) {
            dispatch("removeTag", tag);
        }
        else {
            console.warn("Could not remove the tag!")
        }
    }
</script>

<main>
    {#if user.id === quote.creatorId && addingTags}
        {#each availableTags as tag}
            <button on:click={() => addTagToQuote(tag)}>
                <Tag showHash={false} tag={tag}/>
            </button>
        {/each}
    {/if}
    
    <h3>Tags:</h3>
    {#each quoteTags as tag}
        <div class="tag">
            <Tag showHash={false} tag={tag} />
            {#if user.id === quote.creatorId}
                <button on:click={() => removeTagFromQuote(tag)}>X</button>
            {/if}
        </div>
    {/each}
    
    {#if user.id === quote.creatorId}
        <button on:click={() => addingTags = !addingTags}>+</button>
    {/if}
</main>

<style>
    main {
        margin: var(--size-xxs);
    }

    .tag {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        display: inline;
    }

    h3 {
        color: var(--accent-colour);
        display: inline-block;
        margin: var(--size-xxs);
    }
</style>