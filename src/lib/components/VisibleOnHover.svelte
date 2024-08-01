<script lang="ts">
    let opacity: 0 | 1 = 0;
</script>

<div
    on:mouseenter={() => opacity = 1}
    on:mouseleave={() => opacity = 0}
    style:opacity>
    
    <slot/>
</div>