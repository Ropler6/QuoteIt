<script lang="ts">
    import type { Tag_T } from "$lib/datatypes"
    import VisibleOnHover from "./VisibleOnHover.svelte";

    export let tag: Tag_T;
</script>


<p>{tag.name}</p>
<VisibleOnHover>
    <p>hash: {tag.hash}</p>
</VisibleOnHover>


