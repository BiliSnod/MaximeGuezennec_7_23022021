<!-- "Welcome" component with "msg" variable defined in Home.vue -->
<template>
    <div class="welcome">
        <h1 class="welcome__title">{{ msg }}</h1>
        <p v-if="!currentUser">Rejoignez le <strong>réseau social</strong> interne de <em>Groupomania</em> pour échanger entre collègues.</p>
        <p v-if="currentUser">Bonjour <strong>{{currentUser.firstname}}</strong>, merci d'avoir rejoint <em>Groupomania</em>, vous pouvez désormais partager avec vos collègues.</p>
        <p v-if="!currentUser"><a href="/signup">Inscrivez-vous</a> dès maintenant pour rejoindre la discussion !</p>
        <p v-if="currentUser"><a href="/notes">Consultez</a> les dernières notes envoyées dès maintenant, ou <a href="/new">publiez-en une</a> !</p>
    </div>
</template>


<script>
export default {
    name: "welcome",
    props: {  // defining the type of data for "msg"
        msg: String
    },    
    computed: {
        currentUser() {  // stating if the user is logged in
            return this.$store.state.auth.user;
        }
    },
}
</script>


<style lang="scss" scoped>
/* --- scoped" attribute to limit CSS to this component only --- */

.welcome {

    &__title {
        font-size: 2rem;
    }

    p {
        padding: 0 5%;

        @media screen and (min-width: 640px) {
            padding: 0 15%;
        }
    }

    a {
        color: #ad1f01;

        &:hover {
            color: #751500;
        }
    }

}
</style>
