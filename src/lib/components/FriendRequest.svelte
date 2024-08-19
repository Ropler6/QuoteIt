<script lang="ts">
    import type { IncomingFriendRequest_T } from "$lib/datatypes";
    import User from "./User.svelte";

    export let incomingFriendRequest: IncomingFriendRequest_T;
</script>

<User user={incomingFriendRequest.user}/>
<p>has sent you a friend request! {new Date(incomingFriendRequest.createdAt).toDateString()}</p>