<script lang="ts">
    import Notification from "./Notification.svelte";

    let friendName: string;
    let notifVisible = false;
    let notifMsg = "";
    const errorMsg = "Could not send a friend request!"
    const successMsg = "Friend request sent"
    
    const sendFriendRequest = async () => {
        const success = await fetch(`/api/users/friend-requests`, {
            method: "POST",
            body: JSON.stringify(friendName),
        });

        notifVisible = true;
        setTimeout(() => {
            notifVisible = false;
        }, 5000);

        if (success) notifMsg = successMsg;
        else notifMsg = errorMsg;
    }
</script>

<label for="friendName">
    Username:
    <input bind:value={friendName} type="text">
    <button on:click={sendFriendRequest}>Send friend request</button>
</label>

{#if notifVisible}
    <Notification text={notifMsg}/>
{/if}