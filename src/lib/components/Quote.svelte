<script lang="ts">
    import type { Quote_T, Tag_T, User_T } from "$lib/datatypes";
    import { createEventDispatcher } from "svelte";
    import TagManager from "./TagManager.svelte";
    import Mentions from "./Mentions.svelte";
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import { fade, fly } from "svelte/transition";
    import { quadInOut } from "svelte/easing";

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

<main out:fade={{easing: quadInOut}}>
    <!-- List of added/possible tags -->
    {#if toggled}
        <div transition:fly={{ x: "-50%" }} class="details">
            <TagManager user={user} quote={quote} quoteTags={quoteTags} on:addTag={addTag} on:removeTag={removeTag}/>
            <Mentions quote={quote}/>
            <p class="created-at">Created at: {new Date(quote.createdAt).toDateString()}</p>
        </div>
    {/if}

    <!-- Quote information -->
    <div class="content">
        <p class="text">{quote.text}</p>
        
        <div class="buttons">
            <CustomCheckbox width={"2em"} height={"2em"} bind:toggled/>
            {#if user.id === quote.creatorId}
                <button on:click={removeQuote}>X</button>
            {/if}
        </div>
    </div>
</main>


<style>
    .created-at {
        margin: var(--size-s);
    }

    main {
        width: 100%;
        align-self: center;
    }

    .text {
        display: inline-block;
        font-size: var(--size-l);
        width: fit-content;
        padding: var(--size-xs);
        margin: var(--size-s);
        white-space: pre-wrap;
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .buttons {
        display: flex;
        align-items: center;
    }

    button {
        width: 2em;
        height: 2em;
    }
</style>