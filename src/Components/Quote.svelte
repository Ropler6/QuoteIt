<script lang="ts">
    import type { Quote_T, User_T } from "$lib/datatypes";
    import { createEventDispatcher } from "svelte";

    export let quote: Quote_T;
    export let authors: User_T[] = [];
    const dispatch = createEventDispatcher();

    const removeQuote = async () => {
        const response = await fetch("?/removeQuote", {
            method: "POST",
            body: JSON.stringify({quoteId: quote.id}),
        });

        const json = await response.json();
        const success = JSON.parse(json.data)[0].success;

        if (success) {
            dispatch("destroy", { quote, authors });
        }
    }

</script>

<main>
    <p>{quote.text}</p>
    <p>by
        {#each authors as author}
            {author.name}
        {/each}
    </p>
    <p>Created at: {quote.createdAt.toDateString()}</p>

    <button on:click={removeQuote}>X</button>
</main>