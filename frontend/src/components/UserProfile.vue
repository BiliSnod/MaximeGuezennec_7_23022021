<template>
    <div v-if="currentUser">
        <div class="logo-nav">
            <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Groupomania logo"/></a>
        </div>
        <h1 class="main-title">Informations sur {{currentUser.firstname}} {{currentUser.lastname}}</h1>
        <!-- Displaying user info, according to role -->
        <section class="default-block">
            <p v-if="currentAdmin"><strong>Token :</strong> <i>{{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}</i></p>
            <!-- Disabling user ID display  // <p v-if="currentAdmin"><strong>ID :</strong> <i>{{currentUser.id}}</i></p> -->
            <p><strong>E-mail :</strong> <i>{{currentUser.email}}</i></p>
            <div v-if="currentAdmin">
                <p v-for="role in currentUser.roles" :key="role"><strong>Accès :</strong> <i>{{role}}</i></p>
            </div>
        </section>
        <!-- Displaying button to delete this user account -->
        <section v-if="!currentAdmin">
            <div class="main-button">
                <button @click="deleteUser">Supprimer ce compte</button>
            </div>
        </section>
    </div>
</template>


<script>
import DataUser from "../services/DataUser";

export default {
    name: "profile",
    computed: {
        currentUser() {  // stating with Vuex store if the user is logged in
            return this.$store.state.auth.user;
        },
        currentAdmin() {  // stating if the user got an admin role
        if (this.currentUser && this.currentUser["roles"]) {
            return this.currentUser["roles"].includes("ROLE_ADMIN");
        }
        return false;
        }
    },
    methods: {
        deleteUser() {
            DataUser.delete(this.currentUser.id)
            .then(response => {

                console.log(response.data);
                this.$store.dispatch("auth/logout");  // removing user information in localStorage and logging out deleted user
                this.$router.push({ name: "welcome" });  // going back to welcome page after deletion

            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        if (!this.currentUser) {  // at this cycle, if not logged in, redirect to log in page
            this.$router.push("/login");
        }
    }
};
</script>
