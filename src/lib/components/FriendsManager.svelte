<script lang="ts">
    import type { User_T } from "$lib/datatypes";
    import { onMount } from "svelte";
    import User from "./User.svelte";
    import Notification from "./Notification.svelte";

    let friends: User_T[] = [];
    let friendRemoveFail = false;
    onMount(async () => {
        const response = await fetch(`/api/users/friends`, {
            method: "GET"
        });

        const data = await response.json();
        friends = data || [];
    });

    const removeFriend = async (friend: User_T) => {
        const response = await fetch(`/api/users/friends`, {
            method: "DELETE",
            body: JSON.stringify(friend),
        });

        const success = await response.json();
        if (success) {
            friends.splice(friends.indexOf(friend), 1);
            friends = friends;
        }
        else {
            friendRemoveFail = true;
            setTimeout(() => {
                friendRemoveFail = false;
            }, 5000);
        }
    }
</script>


{#if friends.length}
    {#if friendRemoveFail}
        <Notification text={"Could not remove the user from your friends!"}/>
    {/if}
    <div class="friends-list">
        {#each friends as friend}
            <User user={friend}/>
            <button on:click={() => removeFriend(friend)}>Remove friend</button>
        {/each}
    </div>
{:else}
    <p>You have no friends!</p>
{/if}


<style>
    .friends-list {
        display: flex;
        flex-direction: column;
    }
</style>