<script lang="ts">
    import type { PageData } from "./$types";
    import Header from "$lib/components/Header.svelte";
    import Quote from "$lib/components/Quote.svelte";
    import type { ActionData } from "./$types";
    import type { Quote_T } from "$lib/datatypes";
    import Notification from "$lib/components/Notification.svelte";
    import { flip } from "svelte/animate";
    import { quintInOut } from "svelte/easing";
    import "/src/style.css"

    export let form: ActionData;
    export let data: PageData;
    let quoteDeleted = false;

    const onQuoteDelete = (event: CustomEvent) => {
        const quote: Quote_T = event.detail;
        quoteDeleted = true;

        if (data.quotes != null) {
            data.quotes = data.quotes.filter(elem => elem.quote.id !== quote.id)
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
            {#each data.quotes as quoteData (quoteData)}
                <div style:width="100%" animate:flip={{ duration: 1500, easing: quintInOut }}>
                    <Quote quote={quoteData.quote} owned={quoteData.owned} on:destroy={onQuoteDelete}/>
                </div>
            {/each}
        </div>
    {:else}
        <div class="quotes">
            <Notification text={"Could not fetch quotes!"}/>
        </div>
    {/if}
</main>


<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .quotes {
        display: flex;
        height: fit-content;
        width: max(20em, 33vw);
        flex-direction: column;
    }

    form {
        display: grid;
        width: max(20em, 33vw);
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 2fr 1fr 1fr 1fr;
    }

    label {
        align-self: center;
    }

    .submit {
        width: 7.5em;
        height: 3em;
        font-size: var(--size-m);
        justify-self: center;
    }

    .create-quote {
        margin: var(--size-m);
        font-weight: bold;
        grid-column: 1 / 3;
        align-self: center;
    }

    input, textarea {
        width: 100%;
        margin: var(--size-s) 0;
    }

    textarea {
        height: var(--size-xxl);
    }

</style>