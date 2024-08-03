<script lang="ts">
    import { createEventDispatcher } from "svelte";
    let opacity: 0 | 1 = 0;
    const dispatch = createEventDispatcher();

    const reveal = () => {
        opacity = 1;
        dispatch("reveal");
    }

    const hide = () => {
        opacity = 0;
        dispatch("hide");
    }

</script>

<div
    on:mouseenter={reveal}
    on:mouseleave={hide}
    style:opacity>
    
    <slot/>
</div>