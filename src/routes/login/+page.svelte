<script lang="ts" defer>
    import Header from "../../Components/Header.svelte"
    import type { ActionData } from "./$types";
    import type { PageData } from "./$types";

    // export let data: PageData;
    export let form: ActionData;
</script>

<Header/>
<main>

    <form action="?/login" method="post">
        <label for="username">Username:
            <input type="text" name="username">
        </label>
        
        <label for="password">Password:
            <input type="text" name="password">
        </label>
        
        <button type="submit">Submit</button>
    </form>

    {#if form?.success}
        <p>Successfully logged in as {form.user}</p>
    {/if}

</main>

<style>
    main {
        margin: 10px;
    }
</style>