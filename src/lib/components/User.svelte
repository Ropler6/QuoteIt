<script lang="ts">
    import type { User_T } from "$lib/datatypes";

    export let user: User_T;
    export let fontSize: string = "1.25em"
</script>


<p style:font-size={fontSize}>
    {user.name}
</p>


<style>
    p {
        display: inline-block;
        margin: 0 var(--size-xxs);
    }
</style>