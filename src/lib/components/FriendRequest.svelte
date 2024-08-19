<script lang="ts">
    import type { IncomingFriendRequest_T } from "$lib/datatypes";

    export let incomingFriendRequest: IncomingFriendRequest_T;
</script>

<p>{incomingFriendRequest.user.name} has sent you a friend request! {incomingFriendRequest.createdAt}</p>