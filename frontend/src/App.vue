<template>
    <div id="app">

        <nav class="nav">
            <ul>
                <li><router-link to="/">Accueil</router-link></li>
                <li><router-link to="/signup">Inscription</router-link></li>
                <li><router-link to="/login">Connexion</router-link></li>
            </ul>
            <ul>
                <li><router-link to="/notes">Notes</router-link></li>
                <li><router-link to="/new">Partagez</router-link></li>
            </ul>
        </nav>

        <div>
            <router-view />
        </div>

    </div>
</template>

<script>
export default {
    name: "app"
};
</script>

<style lang="scss">
#app {
    color: #312c50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0 auto;
    max-width: 1920px;
    text-align: center;
}

.main-title {
    background-color: #ffd7d7;
    border-radius: 10px;
    margin: 20px 36px;
    padding: 10px;
}

.side-title {
    width: 100%;

    @media screen and (min-width: 640px) {
        max-width: 50%;
        position: relative;
        top: -50px;
    }

    @media screen and (min-width: 1280px) {
        max-width: 50%;
        position: relative;
        top: -100px;
    }

    & img {
        height: 100px;
        object-fit: cover;
        width: 50%;
    }
}

.nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 30px;

    @media screen and (min-width: 640px) {
        justify-content: flex-end;
    }

    li {
        display: inline-block;
    }

    a {
        background-color: #fcfcfc;
        border: 3px solid #eee;
        border-radius: 15px;
        color: #312c50;
        display: block;
        font-weight: bold;
        margin: 5px;
        padding: 10px;
        text-decoration: none;
        transition: all 200ms ease-out;
        width: 100px;

        &:hover {
            background-color: #fff;
            border: 3px solid #ddd;
            color: #000;
        }

        &.router-link-exact-active {
            color: #ad1f01;
            background-color: #fff7f5;
        }
    }
}
</style>
