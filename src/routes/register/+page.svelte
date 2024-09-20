<script lang="ts" defer>
    import { goto } from "$app/navigation";
    import Header from "$lib/components/Header.svelte"
    import { browser } from "$app/environment";
    import Notification from "$lib/components/Notification.svelte";
    import "/src/style.css"

    let diffPasswords = false;
    let userExists = true;
    let password1: string, password2: string, username: string;

    const submit = async () => {
        if (password1 !== password2) {
            diffPasswords = true;

            setTimeout(() => {
                diffPasswords = false;
            }, 5000);

            return;
        }

        const response = await fetch("?/register", {
            method: "POST",
            body: JSON.stringify({
                user: username,
                password1,
                password2,
            })
        });

        const json = await response.json();
        const success = JSON.parse(json.data)[0].success;
        
        if (success && browser) {
            sessionStorage.setItem("userTags", JSON.stringify([]));
            goto("/app");
        }
        
        if (!success) {
            userExists = true;
            setTimeout(() => {
                userExists = false;
            }, 5000);
        }
    }
</script>

<Header/>
<main>
    <h2 style:grid-row="1 / 2" style:grid-column="2 / 3">Register:</h2>
    <form>
        <label for="username">Username:</label>
        <input bind:value={username} contenteditable="true" type="text" name="username">
        
        <label for="password1">Password:</label>
        <input bind:value={password1} contenteditable="true" type="password" name="password">

        <label for="password2">Confirm password:</label>
        <input bind:value={password2} contenteditable="true" type="password" name="password2">
        
        <button on:click={submit} type="submit">Submit</button>
    </form>

    {#if userExists === false}
        <Notification text={"The username is already taken!"}/>
    {/if}

    {#if diffPasswords}
        <Notification text={"The two passwords are different!"}/>
    {/if}

</main>

<style>
    main {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 3fr;
    }

    form {
        display: grid;
        grid-column: 2 / 3;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
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
        grid-row: 4 / 5;
        width: 25%;
    }

    h2 {
        padding: var(--size-s);
        margin: var(--size-xxs) 0;
    }
</style>