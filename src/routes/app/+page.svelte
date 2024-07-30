<script lang="ts">
    import type { PageData } from "./$types";
    import Header from "../../Components/Header.svelte";
    import Quote from "../../Components/Quote.svelte";
    import type { ActionData } from "./$types";
    import type { Quote_T } from "$lib/datatypes";
    import Notification from "../../Components/Notification.svelte";

    export let form: ActionData;
    export let data: PageData;
    let quoteDeleted = false;

    const onQuoteDelete = (event: CustomEvent) => {
        const quote: Quote_T = event.detail.quote;
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

    {#if quoteDeleted}
        <p>Quote was deleted successfully!</p>
    {/if}

    <form action="?/addQuote" method="POST">
        <label for="text">
            Quote text:
            <input type="text" name="text">
        </label>

        <button type="submit">Add quote</button>
        {#if form?.success}
            <Notification text={"Quote added successfully to the database!"}/>
        {/if}
    </form>

    {#if data?.success && data.quotes != null && data.user != null}
        {#each data.quotes as quote}
            <Quote quote={quote} authors={[data.user]} on:destroy={onQuoteDelete}/>
        {/each}
    {:else}
        <Notification text={"Could not fetch quotes!"}/>
    {/if}

</main>