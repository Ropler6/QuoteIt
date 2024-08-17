<script lang="ts">
    import type { User_T } from "$lib/datatypes";
    import Notification from "./Notification.svelte";

    export let user: User_T;
    let friendName: string;
    let successMessageVisible = false;
    let errorMessageVisible = false;
    
    const sendFriendRequest = async () => {
        const success = await fetch(`api/users/${user.name}/friend-requests`, {
            method: "POST",
            body: JSON.stringify(friendName),
        });

        if (success) {
            successMessageVisible = true;
            setTimeout(() => {
                successMessageVisible = false;
            }, 5000);
        }
        else {
            errorMessageVisible = true;
            setTimeout(() => {
                errorMessageVisible = false;
            }, 5000);
        }
    }
</script>

<label for="friendName">
    Username:
    <input bind:value={friendName} type="text">
    <button on:click={sendFriendRequest}>Send friend request</button>
</label>

{#if successMessageVisible}
    <Notification text={"Friend request sent!"}/>
{/if}

{#if errorMessageVisible}
    <Notification text={"Could not send a friend request!"}/>
{/if}