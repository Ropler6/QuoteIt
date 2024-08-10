<script lang="ts">
    import type { Quote_T, Tag_T, User_T } from "$lib/datatypes";
    import { createEventDispatcher } from "svelte";
    import VisibleOnHover from "./VisibleOnHover.svelte";
    import TagManager from "./TagManager.svelte";

    export let quote: Quote_T;
    export let mentions: User_T[] = [];
    let quoteTags: Tag_T[] = [];
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

    const addTag = (event: CustomEvent) => {
        const tag = event.detail as Tag_T;
        quoteTags.push(tag);
        quoteTags = quoteTags;
    }

    const removeTag = (event: CustomEvent) => {
        const tag = event.detail as Tag_T;
        quoteTags.splice(quoteTags.indexOf(tag), 1);
        quoteTags = quoteTags;
    }
</script>

<main>
    
    <!-- List of added/possible tags -->
    <VisibleOnHover on:reveal={fetchQuoteTags}>
        <TagManager quote={quote} quoteTags={quoteTags} on:addTag={addTag} on:removeTag={removeTag}/>
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