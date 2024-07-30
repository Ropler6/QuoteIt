<script lang="ts" defer>
    import { goto } from "$app/navigation";
    import Header from "../../Components/Header.svelte"
    import { browser } from "$app/environment";

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
        
        if (success && browser) goto("/app");
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

    <form>
        <label for="username">Username:
            <input bind:value={username} contenteditable="true" type="text" name="username">
        </label>
        
        <label for="password1">Password:
            <input bind:value={password1} contenteditable="true" type="text" name="password">
        </label>

        <label for="password2">Confirm password:
            <input bind:value={password2} contenteditable="true" type="text" name="password2">
        </label>
        
        <button on:click={submit} type="submit">Submit</button>
    </form>

    {#if userExists === false}
        <p>The username is already taken!</p>
    {/if}

    {#if diffPasswords}
        <p>The two passwords are different!</p>
    {/if}

</main>

<style>
    main {
        margin: 10px;
    }
</style>