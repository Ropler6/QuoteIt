<script lang="ts">
    import Header from "../../Components/Header.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<Header/>
<main>
    <form action="?/addQuote" method="POST">
        <label for="text">
            Quote text:
            <input type="text" name="text">
        </label>

        <button type="submit">Add quote</button>
    </form>

    {#if form?.success}
        <p>Quote added successfully to the database!</p>
    {/if}
</main>