<script lang="ts" defer>
    import { goto } from "$app/navigation";
    import Header from "$lib/components/Header.svelte"
    import type { ActionData } from "./$types";
    import { browser } from "$app/environment";
    import Notification from "$lib/components/Notification.svelte";

    export let form: ActionData;
    if (form?.success)
        if (browser) {
            sessionStorage.setItem("userTags", JSON.stringify(form.tags));
            goto("/app");
        }
</script>

<Header/>
<main>
    <h2 style:grid-row="1 / 2" style:grid-column="2 / 3">Login:</h2>
    <form action="?/login" method="post">
        <label for="username">Username:</label>
        <input type="text" name="username">
        
        <label for="password">Password:</label>
        <input type="text" name="password">
        
        <button type="submit">Submit</button>
    </form>

    {#if form?.success === false}
        <Notification text={"Incorrect username or password!"}/>
    {/if}

</main>

<style>
    main {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 3fr;
        margin: 10px;
    }

    form {
        display: grid;
        grid-column: 2 / 3;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        align-items: center;
        justify-items: center;
        width: fit-content;
    }

    label {
        grid-column: 1 / 2;
        justify-self: flex-start;
    }

    input {
        grid-column: 2 / 3;
    }

    button {
        grid-column: 1 / 3;
        grid-row: 3 / 4;
        width: 25%;
    }

    h2 {
        padding: var(--size-s);
        margin: var(--size-xxs) 0;
    }
</style>