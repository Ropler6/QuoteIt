<script lang="ts">
    import Notification from "./Notification.svelte";

    let friendName: string;
    let notifVisible = false;
    let notifMsg = "";
    const errorMsg = "Could not send a friend request!"
    const successMsg = "Friend request sent"
    
    const sendFriendRequest = async () => {
        const response = await fetch(`/api/users/friend-requests`, {
            method: "POST",
            body: JSON.stringify(friendName),
        });

        const success = await response.json();
        if (success) notifMsg = successMsg;
        else notifMsg = errorMsg;

        notifVisible = true;
        setTimeout(() => {
            notifVisible = false;
        }, 5000);
    }
</script>

<div>
    <label for="friendName">Username:</label>
    <input bind:value={friendName} type="text">
    <button on:click={sendFriendRequest}>Send friend request</button>
</div>

{#if notifVisible}
    <Notification text={notifMsg}/>
{/if}


<style>
    label {
        font-size: var(--size-l);
        margin: var(--size-xs);
    }
</style>