<script lang="ts">
    import type { Tag_T } from "$lib/datatypes"
    import VisibleOnHover from "./VisibleOnHover.svelte";

    export let tag: Tag_T;
    export let showHash = false;
</script>


<p>{tag.name}</p>
{#if showHash}
    <VisibleOnHover>
        <p>hash: {tag.hash}</p>
    </VisibleOnHover>
{/if}
