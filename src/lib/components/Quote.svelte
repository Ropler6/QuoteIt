<script lang="ts">
    import type { Quote_T, Tag_T, User_T } from "$lib/datatypes";
    import { createEventDispatcher } from "svelte";
    import TagManager from "./TagManager.svelte";
    import Mentions from "./Mentions.svelte";
    import CustomCheckbox from "./CustomCheckbox.svelte";

    export let quote: Quote_T; //the quote object
    export let user: User_T; //the user currently viewing the quote
    let quoteTags: Tag_T[] = [];
    const dispatch = createEventDispatcher();
    let toggled = false;
    $: if (toggled) fetchQuoteTags();

    const removeQuote = async () => {
        const response = await fetch(`/api/quotes/${quote.id}`, {
            method: "DELETE",
        });

        const success = await response.json();

        if (success) {
            dispatch("destroy", quote);
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
    {#if toggled}
        <TagManager user={user} quote={quote} quoteTags={quoteTags} on:addTag={addTag} on:removeTag={removeTag}/>
        <Mentions quote={quote}/>
        <p class="created-at">Created at: {new Date(quote.createdAt).toDateString()}</p>
    {/if}

    <!-- Quote information -->
    <p class="text">{quote.text}</p>
    
    <CustomCheckbox bind:toggled/>
    {#if user.id === quote.creatorId}
        <button on:click={removeQuote}>X</button>
    {/if}
</main>


<style>
    .created-at {
        margin: var(--size-s);
    }

    main {
        width: 100%;
        align-self: center;
        justify-self: center;
    }

    .text {
        display: inline-block;
    }
</style>