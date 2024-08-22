<script lang="ts">
    import type { PageData } from "./$types";
    import Header from "$lib/components/Header.svelte";
    import Quote from "$lib/components/Quote.svelte";
    import type { ActionData } from "./$types";
    import type { Quote_T } from "$lib/datatypes";
    import Notification from "$lib/components/Notification.svelte";
    import { flip } from "svelte/animate";
    import { quintInOut } from "svelte/easing";

    export let form: ActionData;
    export let data: PageData;
    let quoteDeleted = false;

    const onQuoteDelete = (event: CustomEvent) => {
        const quote: Quote_T = event.detail;
        quoteDeleted = true;

        if (data.quotes != null) {
            data.quotes = data.quotes.filter(elem => elem.id != quote.id)
        }
        
        setTimeout(() => {
            quoteDeleted = false;
        }, 5000);
    }
</script>

<Header/>
<main>
    <form action="?/addQuote" method="POST">
        <h2 class="create-quote">Create a quote:</h2>
        <label style:grid-row="2 / 3" style:grid-column="1 / 2" for="text">Quote text:</label>
        <textarea style:grid-row="2 / 3" style:grid-column="2 / 3" name="text" style:resize="none"></textarea>

        <label style:grid-row="3 / 4" style:grid-column="1 / 2" for="mentions">Mentions:</label>
        <input style:grid-row="3 / 4" style:grid-column="2 / 3" type="text" name="mentions">

        <button class="submit" style:grid-column="1 / 3" style:grid-row="4 / 5" type="submit">Add quote</button>
    </form>
    
    {#if data?.success && data.quotes != null && data.user != null}
        <div class="quotes">
            {#if form?.success}
                <Notification text={"Quote added successfully to the database!"}/>
            {/if}
            {#if quoteDeleted}
                <Notification text={"Quote was deleted successfully!"}/>
            {/if}
            {#each data.quotes as quote (quote)}
                <div style:width="100%" animate:flip={{ duration: 1500, easing: quintInOut }}>
                    <Quote user={data.user} quote={quote} on:destroy={onQuoteDelete}/>
                </div>
            {/each}
        </div>
    {:else}
        <Notification text={"Could not fetch quotes!"}/>
    {/if}
</main>


<style>
    main {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr;
        grid-template-rows: 1fr 9fr;
    }

    .quotes {
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }

    form {
        display: grid;
        align-self: center;
        justify-self: center;
        width: 100%;
        grid-row: 1 / 2;
        grid-column: 2 / 3;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 2fr 1fr 1fr 1fr;
    }

    label {
        align-self: center;
        margin: 0 var(--size-m);
        font-size: var(--size-l);
    }

    input, textarea {
        width: 250px;
        margin: var(--size-xs);
    }

    .submit {
        width: 10em;
        font-size: var(--size-m);
        justify-self: center;
    }

    .create-quote {
        margin: var(--size-m);
        font-weight: bold;
        grid-column: 1 / 3;
        align-self: center;
    }
</style>