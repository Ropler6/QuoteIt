<script lang="ts">
    import eyeVisible from "/src/assets/eye-visible.svg"
    import eyeInvisible from "/src/assets/eye-invisible.svg"

    export let width = "2em";
    export let height = "2em";
    export let toggled = false;
    const toggle = () => toggled = !toggled;
</script>


<button on:click={toggle} style="--width: {width}; --height: {height}; background-image: url({toggled ? eyeVisible : eyeInvisible});"></button>


<style>
    button {
        display: inline-block;
        background-size: cover;
        background-position: center;
        border: none;
        padding: 0;
        width: var(--width);
        height: var(--height);
    }
</style>