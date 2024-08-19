<script lang="ts">
    import type { User_T } from "$lib/datatypes";
    import { onMount } from "svelte";
    import User from "./User.svelte";

    let friends: User_T[] = [];
    onMount(async () => {
        const response = await fetch(`/api/users/friends`, {
            method: "GET"
        });

        const data = await response.json();
        friends = data || [];
    })
</script>

<p>Friends:</p>
{#each friends as friend}
    <User user={friend}/>
{/each}