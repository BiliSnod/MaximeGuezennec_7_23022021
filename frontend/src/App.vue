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

.loggedout-logo {
  height: 120px;
  object-fit: cover;
  width: 100%;

  @media screen and (min-width: 640px) {
    width: 75%;
  }

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  @media screen and (min-width: 1024px) {
    max-width: 800px;
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

.default-block {
    background-color: #f5f5f5;
    border-radius: 10px;
    margin: 20px 36px;
    padding: 20px;
}

.default-subtitle {
    background-color: #b9e9ff;
    border-radius: 10px;
    margin: 20px 36px;
    padding: 10px;
}

.main-button {
    text-align: center;

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

.site-information {
    background-color: #E5F7FF;
    border-radius: 10px;
    margin: 20px 0;
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
