<script lang="ts">
    import type { IncomingFriendRequest_T } from "$lib/datatypes";
    import { elapsedTimeString } from "$lib/utils";
    import User from "./User.svelte";

    export let incomingFriendRequest: IncomingFriendRequest_T;
    const requestDate = new Date(incomingFriendRequest.createdAt);
</script>


<User user={incomingFriendRequest.user}/>
<p>{elapsedTimeString(requestDate)}</p>
