<script lang="ts">
    import type { FriendRequest_T, User_T } from "$lib/datatypes";

    export let user: User_T;
    export let friendRequest: FriendRequest_T;
</script>

<p>{user.name} has sent you a friend request! {friendRequest.createdAt}</p>