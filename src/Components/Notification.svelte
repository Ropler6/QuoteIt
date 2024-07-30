<script lang="ts">
    export let text: string = "";
    let visible = true;
</script>


{#if visible}
    <p>{text}</p>
    <button on:click={() => visible = false}>X</button>
{/if}


<style>
    p {
        display: inline;
    }
</style>