<script lang="ts">
    import type { Tag_T } from "$lib/datatypes"
    import VisibleOnHover from "./VisibleOnHover.svelte";

    export let tag: Tag_T;
    export let showHash = false;
</script>


<span>{tag.name}</span>
{#if showHash}
    <VisibleOnHover>
        <p>hash: {tag.hash}</p>
    </VisibleOnHover>
{/if}
