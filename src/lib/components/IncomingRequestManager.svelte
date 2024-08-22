<script lang="ts">
    import FriendRequest from "./FriendRequest.svelte";
    import type { IncomingFriendRequest_T } from "$lib/datatypes";
    import { onMount } from "svelte";

    let incomingFriendRequests: IncomingFriendRequest_T[] = [];

    onMount(async () => {
        const response = await fetch(`/api/users/friend-requests`, {
            method: "GET",
        });

        incomingFriendRequests = await response.json();
    });

    const accept = async (request: IncomingFriendRequest_T) => {
        const response = await fetch(`/api/users/friends`, {
            method: "POST",
            body: JSON.stringify(request.user),
        });

        const success = await response.json();

        if (success) {
            incomingFriendRequests.splice(incomingFriendRequests.indexOf(request), 1);
            incomingFriendRequests = incomingFriendRequests;
        } 
    }

    const decline = async (request: IncomingFriendRequest_T) => {
        const response = await fetch(`/api/users/friend-requests`, {
            method: "DELETE",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const success = await response.json();

        if (success){
            incomingFriendRequests.splice(incomingFriendRequests.indexOf(request), 1);
            incomingFriendRequests = incomingFriendRequests;
        } 
    }

</script>

{#if incomingFriendRequests.length}    
    {#each incomingFriendRequests as request}
        <div class="request">
            <FriendRequest incomingFriendRequest={request} />
            <div class="buttons">
                <button on:click={() => accept(request)}>Accept</button>
                <button on:click={() => decline(request)}>Decline</button>
            </div>
        </div>
    {/each}
{:else}
    <p>You have no incoming friend requests!</p>
{/if}


<style>
    .request {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 25em;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    p {
        font-size: var(--size-l);
    }
</style>