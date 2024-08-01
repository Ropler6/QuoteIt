<script lang="ts">
    import menu from "/src/assets/menu.svg"
    import tags from "/src/assets/tags.svg"
    import app from "/src/assets/app.svg"

    const SVG_WIDTH = 35;
    const SVG_HEIGHT = 35;
</script>

<main>
    <div class="title">
        QUOTES
    </div>

    <div class="links">
        <a href="/app">
            <img src={app} width={SVG_WIDTH} height={SVG_HEIGHT} alt="App">
        </a>

        <a href="/tags">
            <img src={tags} width={SVG_WIDTH} height={SVG_HEIGHT} alt="Tags">
        </a>
        
        <a href="/menu" class="menu">
            <img src={menu} width={SVG_WIDTH} height={SVG_HEIGHT} alt="Menu">
        </a>
    </div>
</main>
<style>
    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: yellow;
        padding: 20px 5vw;
        margin: 0px;
    }

    .links {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 30px;
    }

    .title {
        font-size: xx-large;
    }
</style>