<script lang="ts">
    import FriendRequest from "./FriendRequest.svelte";
    import type { IncomingFriendRequest_T, User_T } from "$lib/datatypes";
    import { onMount } from "svelte";

    export let user: User_T;
    let incomingFriendRequests: IncomingFriendRequest_T[] = [];

    onMount(async () => {
        const response = await fetch(`api/users/${user.name}/friend-requests`, {
            method: "GET",
        });

        incomingFriendRequests = await response.json();
    });

</script>

{#each incomingFriendRequests as request}
    <FriendRequest user={request.user} friendRequest={request.friendRequest} />
{/each}