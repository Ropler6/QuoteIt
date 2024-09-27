<script lang="ts">
    import type { IncomingFriendRequest_T } from "$lib/datatypes";
    import { elapsedTimeString } from "$lib/utils";
    import User from "./User.svelte";

    export let incomingFriendRequest: IncomingFriendRequest_T;
    const requestDate = new Date(incomingFriendRequest.createdAt);
</script>

<div>
    <User user={incomingFriendRequest.user}/>
    <p style:font-size="1.25em">({elapsedTimeString(requestDate)})</p>
</div>


<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5em;
    }
</style>