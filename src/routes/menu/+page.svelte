<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import OutgoingRequestManager from "$lib/components/OutgoingRequestManager.svelte";
    import IncomingRequestManager from "$lib/components/IncomingRequestManager.svelte";
    import FriendsManager from "$lib/components/FriendsManager.svelte";
    import User from "$lib/components/User.svelte";
    import type { ActionData, PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import "/src/style.css"

    export let data: PageData;
    export let form: ActionData;

    if (form?.success && browser) {
        goto("/")
    }
</script>

<Header/>
<main>
    {#if data.success && data.user}
        <div class="profile">
            <div class="user-info">
                <User fontSize={"1.5em"} user={data.user}/>
                <form action="?/logout" method="POST">
                    <button type="submit">Logout</button>
                </form>
            </div>
            <div class="user-data">
                <p>{data.userData?.quotes ?? "N/A"} Quotes</p>
                <p>{data.userData?.mentions ?? "N/A"} Mentions</p>
                <p>{data.userData?.tags ?? "N/A"} Tags</p>
            </div>
        </div>

        <div class="friends-related">
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
        </div>
    {:else}
        <p>Could not detect the current user!</p>
    {/if}

</main>


<style>
    main, .friends-related {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    main {
        flex-direction: column;
    }

    .friends-related > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--size-l);
    }

    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 25vh;
    }

    .user-data {
        display: flex;
        flex-direction: row;
    }

    .user-data > p {
        padding: var(--size-m);
        font-size: var(--size-l);
    }

    .user-info {
        display: flex;
        flex-direction: row;
    }
</style>