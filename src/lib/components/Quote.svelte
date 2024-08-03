<script lang="ts">
    import type { Quote_T, User_T } from "$lib/datatypes";
    import { createEventDispatcher } from "svelte";

    export let quote: Quote_T;
    export let mentions: User_T[] = [];
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

</script>

<main>
    <p>{quote.text}</p>
    <p>by
        {#each mentions as author}
            {author.name}
        {/each}
    </p>
    <p>Created at: {quote.createdAt.toDateString()}</p>

    <button on:click={removeQuote}>X</button>
</main>