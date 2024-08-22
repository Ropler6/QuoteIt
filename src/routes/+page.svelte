<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import Header from "$lib/components/Header.svelte";
    import type { PageData } from "./$types";
    import "/src/style.css"

    export let data: PageData;
    if (data.redirect && browser) goto("/app");
</script>


<Header/>
<main>
    <h1>A website designed to satisfy all your quoting needs!</h1>
    <div class="buttons">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
</main>


<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    a {
        font-size: var(--size-xl);
        padding: var(--size-l);
        margin: var(--size-s);
        color: var(--secondary-colour);
    }

    h1 {
        color: var(--text-colour);
        padding: var(--size-l);
    }
</style>