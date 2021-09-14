<template>
    <div>
        <header>
            <nav class="main-menu">
                <ul>
                    <!-- <li><router-link to="/">Accueil</router-link></li> -->
                    <!-- Only show for admin account
                    <li v-if="currentAdmin"><router-link to="/admin">Admin</router-link></li> -->
                    <!-- Only show when user is logged out -->
                    <li v-if="!currentUser"><router-link to="/signup">Inscription</router-link></li>
                    <li v-if="!currentUser"><router-link to="/login">Connexion</router-link></li>
                    <!-- Only show when user is logged in -->
                    <li v-if="currentUser"><router-link to="/profile">Profil</router-link></li>
                    <li v-if="currentUser"><router-link to="/notes">Notes</router-link></li>
                    <li v-if="currentUser"><router-link to="/new">Publier</router-link></li>
                    <li v-if="currentUser"><a @click.prevent="logOut">Déconnexion</a></li>
                </ul>
            </nav>
        </header>
        <!-- Nested content from router -->
        <div>
            <router-view />
        </div>
        <footer class="site-information">
            <p><em>Groupomania</em> &copy; 2021</p>
            <p><a href="mailto:contact@groupomania.fr">Nous contacter</a></p>
        </footer>
    </div>
</template>


<script>
export default {
    name: "app",
    computed: {
        currentUser() {  // stating if the user is logged in
            return this.$store.state.auth.user;
        },
        currentAdmin() {  // stating if the user got an admin role
        if (this.currentUser && this.currentUser["roles"]) {
            return this.currentUser["roles"].includes("ROLE_ADMIN");
        }
        return false;
        },
    },
    methods: {
        logOut() {  // disconnecting user function, redirecting to login page
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
        }
    }
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Sarala&display=swap');

body {
    margin: 0;

    @media screen and (min-width: 768px) {
        margin: 2%;
    }

}

#app {
    color: #312c50;
    font-family: Sarala, Arial, sans-serif;
    margin: 0 auto;
    max-width: 1920px;
    text-align: center;
}

.logo-median {
    height: 120px;
    margin-left: -10%;
    object-fit: cover;
    width: 100%;

    @media screen and (min-width: 768px) {
        width: 75%;
    }

    @media screen and (min-width: 1024px) {
        max-width: 800px;
    }
}

.logo-nav {
    width: 100%;
    // z-index: -1;

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
        transition: all 400ms ease-in-out;

        &:hover, &:focus {
            transform: rotate(-1deg);
        }
    }
}

.main-menu {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 30px;

    @media screen and (min-width: 640px) {
        justify-content: flex-end;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        display: inline-block;
    }

    a {
        background-color: #fcfcfc;
        border: 3px solid #eee;
        border-radius: 15px;
        color: #312c50;
        cursor: pointer;
        display: block;
        font-weight: bold;
        margin: 5px;
        padding: 10px;
        text-decoration: none;
        transition: all 200ms ease-out;
        width: 100px;

        &:hover, &:focus {
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

.main-title {
    background-color: #ffd7d7;
    border-radius: 10px;
    font-size: 2rem;
    margin: 20px 5%;
    padding: 10px;
}

.main-button {
    text-align: center;

    &__message {
        font-size: 1.4rem;
        font-weight: 600;
        margin: 0 auto;

        &--valid {
        background-color: #9fffcf;
        border-radius: 10px;
        padding: 10px;
        width: 50%;
        }

    }

    a {
        background-color: #fcfcfc;
        border: 3px solid #eee;
        border-radius: 15px;
        color: #312c50;
        cursor: pointer;
        display: block;
        font-weight: bold;
        margin: 0 auto;
        padding: 10px;
        text-decoration: none;
        transition: all 200ms ease-out;
        width: 40%;
    }

    & button {
        background-color: #e52901;
        border: none;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
        font-size: 1.2em;
        font-weight: 600;
        margin: 20px;
        padding: 20px;
        transition: all 100ms;

        &:hover, &:focus {
            background-color: #ad1f01;
        }
    }
}

.default-block {
    background-color: #f5f5f5;
    border-radius: 10px;
    margin: 20px 5%;
    padding: 20px;
}

.default-subtitle {
    background-color: #b9e9ff;
    border-radius: 10px;
    margin: 20px 5%;
    padding: 10px;
}

.object-about {
    font-style: italic;

    @media screen and (min-width: 640px) {
        display: flex;
        justify-content: space-between;
    }

    &__user {
        font-weight: 600;
        padding: 0 50px;
        text-align: left;
    }

    &__date {
        padding: 0 50px;
        text-align: right;
    }
}

.site-information {
    background-color: #E5F7FF;
    border-radius: 10px;
    margin: 20px 5%;
    padding: 10px;

    a {
        color: #312c50;
        font-weight: 600;
        text-decoration: none;

        &:hover, &:focus {
            color: #ad1f01;
        }
    }
}
</style>
