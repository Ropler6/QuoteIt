<script lang="ts">
    import type { Quote_T, Tag_T } from "$lib/datatypes";
    import { arrayDifference } from "$lib/utils";
    import Tag from "./Tag.svelte";
    import { createEventDispatcher, onMount } from "svelte";

    export let quote: Quote_T;
    export let quoteTags: Tag_T[] = [];
    let userTags: Tag_T[] = [];

    //TODO: fix this messy load
    onMount(() =>{
        userTags = JSON.parse(sessionStorage.getItem("userTags") || "[]") as Tag_T[];
    })
    const dispatch = createEventDispatcher();
    let addingTags = false;

    $: availableTags = arrayDifference<Tag_T>(userTags, quoteTags, (x: Tag_T, y: Tag_T) => x.id === y.id);

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
</script>

{#if addingTags}
    {#each availableTags as tag}
        <button on:click={() => addTagToQuote(tag)}>
            <Tag showHash={false} tag={tag}/>
        </button>
    {/each}
{/if}

<p>Tags:</p>
{#each quoteTags as tag}
    <Tag showHash={false} tag={tag} />
{/each}
<button on:click={() => addingTags = !addingTags}>+</button>