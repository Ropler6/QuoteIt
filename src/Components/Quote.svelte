<script lang="ts">
    import type { User_T } from "$lib/datatypes";

    export let content: string = "";
    export let authors: User_T[] = [];
    export let createdAt: Date = new Date();
</script>

<main>
    <p>{content}</p>
    <p>by
        {#each authors as author}
            {author.name}
        {/each}
    </p>
    <p>Created at: {createdAt.toDateString()}</p>
</main>