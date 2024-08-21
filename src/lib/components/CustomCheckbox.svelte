<script lang="ts">
    import eyeVisible from "/src/assets/eye-visible.svg"
    import eyeInvisible from "/src/assets/eye-invisible.svg"

    export let toggled = false;
    const toggle = () => toggled = !toggled;
</script>


<button on:click={toggle} style="background-image: url({toggled ? eyeVisible : eyeInvisible});"></button>


<style>
    button {
        background-size: cover;
        background-position: center;
        border: none;
        padding: 0;
        width: 20px;
        height: 20px;
    }
</style>