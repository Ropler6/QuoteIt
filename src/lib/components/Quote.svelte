<script lang="ts">
    import type { Quote_T, Tag_T, User_T } from "$lib/datatypes";
    import { createEventDispatcher } from "svelte";
    import VisibleOnHover from "./VisibleOnHover.svelte";
    import Tag from "./Tag.svelte";
    import TagSelector from "./TagSelector.svelte";

    export let quote: Quote_T;
    export let mentions: User_T[] = [];
    let quoteTags: Tag_T[] = [];
    let tagListVisible = false;
    const dispatch = createEventDispatcher();

    const removeQuote = async () => {
        const response = await fetch(`/api/quotes/${quote.id}`, {
            method: "DELETE",
        });

        const success = await response.json();

        if (success) {
            dispatch("destroy", { quote, mentions });
        }
    }

    const fetchQuoteTags = async () => {
        if (quoteTags.length) return;
        const response = await fetch(`api/quotes/${quote.id}/tags`, {
            method: "GET",
        })

        const json: Tag_T[] = await response.json();
        quoteTags = json || [];
    }

    const addTagToQuote = async (event: CustomEvent) => {
        const tag = event.detail as Tag_T;
        const response = await fetch(`/api/quotes/${quote.id}/tags`, {
            method: "POST",
            body: JSON.stringify(tag.id),
        });

        const success = await response.json();
        console.log(success);

        if (success) {
            quoteTags.push(tag);
            quoteTags = quoteTags; //to trigger the reactivity
        }
        else {
            console.warn("Could not add the tag!");
        }
    }

</script>

<main>
    
    <!-- List of added tags -->
    <VisibleOnHover on:reveal={fetchQuoteTags}>
        <!-- List of tags the user is part of -->
        {#if tagListVisible} 
            <TagSelector quoteTags={quoteTags} on:click={addTagToQuote}/>
        {/if}

        <p>Tags:</p>
        {#each quoteTags as tag}
            <Tag tag={tag} />
        {/each}
        <button on:click={() => tagListVisible = !tagListVisible}>+</button>
    </VisibleOnHover>

    <!-- Quote information -->
    <p>{quote.text}</p>
    <p>by
        {#each mentions as author}
            {author.name}
        {/each}
    </p>
    <p>Created at: {quote.createdAt.toDateString()}</p>

    <button on:click={removeQuote}>X</button>
</main>