<script lang="ts">
    import type { Quote_T, User_T } from "$lib/datatypes";
    import { onMount } from "svelte";
    import User from "./User.svelte";

    export let quote: Quote_T;
    let mentions: User_T[] = [];

    onMount(async () => {
        const response = await fetch(`/api/quotes/${quote.id}/mentions`, {
            method: "GET",
        });

        mentions = await response.json() || [];
    });

</script>

<div>
    <p>by</p>
    {#each mentions as user}
        <User user={user}/>
    {/each}
</div>


<style>
    div {
        margin: var(--size-xxs);
    }

    p {
        color: var(--accent-colour);
        display: inline-block;
        margin: var(--size-xs);
    }
</style>