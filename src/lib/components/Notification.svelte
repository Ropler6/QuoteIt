<script lang="ts">
    export let text: string = "";
    let visible = true;
</script>


{#if visible}
    <div>
        <p>{text}</p>
        <button on:click={() => visible = false}>X</button>
    </div>
{/if}


<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: max-content;
        padding: var(--size-m);
    }

    p {
        display: inline;
        font-size: var(--size-l);
    }

    button {
        width: 2em;
        height: 2em;
    }
</style>