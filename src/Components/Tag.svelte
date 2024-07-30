<script lang="ts">
    import type { Tag_T } from "$lib/datatypes"

    export let tag: Tag_T;
    let visibility: "visible" | "hidden" = "hidden";
</script>


<main on:mouseenter={() => visibility = "visible"}
      on:mouseleave={() => visibility = "hidden"}>
    <p>{tag.name}</p>
    <p style:visibility>hash: {tag.hash}</p>
</main>

