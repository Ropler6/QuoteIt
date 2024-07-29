<script lang="ts">
    import type { Quote_T, User_T } from "$lib/datatypes";

    export let quote: Quote_T;
    export let authors: User_T[] = [];
</script>

<main>
    <p>{quote.text}</p>
    <p>by
        {#each authors as author}
            {author.name}
        {/each}
    </p>
    <p>Created at: {quote.createdAt.toDateString()}</p>
</main>