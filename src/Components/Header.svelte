<script lang="ts">
    import menu from "/src/assets/menu.svg"
    import tags from "/src/assets/tags.svg"


</script>

<main>
    <a href="/tags">
        <img src={tags} width="35" height="35" alt="Tags">
    </a>
    
    <div class="title">
        QUOTES
    </div>
    
    <a href="/menu" class="menu">
        <img src={menu} width="35" height="35" alt="Menu">
    </a>

</main>

<style>
    main {
        background-color: yellow;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 20px;
        margin: 0px;
    }

    .title {
        font-size: xx-large;
    }
</style>