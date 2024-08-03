<script lang="ts">
    import type { Tag_T } from "$lib/datatypes";
    import { arrayDifference } from "$lib/utils";
    import Tag from "./Tag.svelte";
    import { createEventDispatcher } from "svelte";

    export let quoteTags: Tag_T[] = [];
    const userTags: Tag_T[] = JSON.parse(sessionStorage.getItem("userTags") || "[]") as Tag_T[];
    const dispatch = createEventDispatcher();

    $: tags = arrayDifference<Tag_T>(userTags, quoteTags, (x: Tag_T, y: Tag_T) => x.id === y.id);
</script>

{#each tags as tag}
    <button on:click={() => dispatch("click", tag)}>
        <Tag tag={tag}/>
    </button>
{/each}
