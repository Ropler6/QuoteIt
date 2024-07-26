<script lang="ts" defer>
    import { goto } from "$app/navigation";
    import Header from "../../Components/Header.svelte"
    import type { ActionData } from "./$types";
    import { browser } from "$app/environment";

    export let form: ActionData;
    if (form?.success)
        if (browser)
            goto("/app");
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

    {#if form?.success === false}
        <p>Incorrect username or password!</p>
    {/if}

</main>

<style>
    main {
        margin: 10px;
    }
</style>