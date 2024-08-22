<script lang="ts">
    import type { User_T } from "$lib/datatypes";

    export let user: User_T;
</script>


<p>{user.name}</p>


<style>
    p {
        display: inline-block;
        margin: 0 var(--size-xxs);
    }
</style>