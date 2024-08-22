<script lang="ts">
    import type { Tag_T, User_T } from "$lib/datatypes"
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import "/src/style.css"
    import { slide } from "svelte/transition"

    export let tag: Tag_T;
    export let showHash = false;
    let visible = false;
</script>

<div class="tag">
    <div class="main">
        <div class="name">{tag.name}</div>
        {#if showHash}
            <CustomCheckbox bind:toggled={visible}/>
        {/if}
    </div>
    {#if visible}
        <div transition:slide class="details">
            <p>Hash: {tag.hash}</p>
            <p>Created at: {new Date(tag.createdAt).toDateString()}</p>
        </div>
    {/if}
</div>


<style>
    .tag {
        font-size: var(--size-m);
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 var(--size-xs);
    }
    
    .main {
        background: var(--secondary-colour);
        padding: var(--size-xs);
        margin: var(--size-xs);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        gap: var(--size-xs);
    }

    .name {
        color: var(--text-colour);
    }

    .details {
        border-radius: 10px;
        background-color: var(--secondary-colour);
        padding: var(--size-xs);
        margin: var(--size-xs);
    }
</style>