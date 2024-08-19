<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import OutgoingRequestManager from "$lib/components/OutgoingRequestManager.svelte";
    import IncomingRequestManager from "$lib/components/IncomingRequestManager.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<Header/>
{#if data.success && data.user}
    <IncomingRequestManager/>
    <OutgoingRequestManager/>
{:else}
    <p>Could not detect the current user!</p>
{/if}
