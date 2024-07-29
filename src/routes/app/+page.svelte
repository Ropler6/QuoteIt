<script lang="ts">
    import type { PageData } from "./$types";
    import Header from "../../Components/Header.svelte";
    import Quote from "../../Components/Quote.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;
    export let data: PageData;
</script>

<Header/>
<main>
    <form action="?/addQuote" method="POST">
        <label for="text">
            Quote text:
            <input type="text" name="text">
        </label>

        <button type="submit">Add quote</button>
        {#if form?.success}
            <p>Quote added successfully to the database!</p>
        {/if}
    </form>

    {#if data?.success && data.quotes != null && data.user != null}
        {#each data.quotes as quote}
            <Quote quote={quote} authors={[data.user]}/>
        {/each}
    {:else}
        <p>Could not fetch quotes!</p>
    {/if}

</main>