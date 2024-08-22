<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import OutgoingRequestManager from "$lib/components/OutgoingRequestManager.svelte";
    import IncomingRequestManager from "$lib/components/IncomingRequestManager.svelte";
    import FriendsManager from "$lib/components/FriendsManager.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<Header/>
<main>
    {#if data.success && data.user}
        <div class="incoming">
            <h2>Incoming friend requests:</h2>
            <IncomingRequestManager/>
        </div>
        <div class="outgoing">
            <h2>Send a friend request:</h2>
            <OutgoingRequestManager/>
        </div>
        <div class="friends">
            <h2>Friends:</h2>
            <FriendsManager/>
        </div>
    {:else}
        <p>Could not detect the current user!</p>
    {/if}
</main>


<style>
    main {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    h2 {
        color: var(--accent-colour);
    }

    main > div {
        margin: var(--size-l);
    }

</style>