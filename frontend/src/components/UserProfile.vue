<template>
    <div>
        <header>
            <div class="side-title">
                <a href="/"><img src="../assets/icon/icon-left-font-monochrome-black.png" alt="Vue logo"/></a>
            </div>
            <h1 class="main-title">Informations sur {{currentUser.firstname}} {{currentUser.lastname}}</h1>
        </header>
        <section class="default-block">
            <p v-if="currentAdmin"><strong>Token :</strong> <i>{{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}</i></p>
            <p v-if="currentAdmin"><strong>ID :</strong> <i>{{currentUser.id}}</i></p>
            <p><strong>E-mail :</strong> <i>{{currentUser.email}}</i></p>
            <div v-if="currentAdmin">
                <p v-for="role in currentUser.roles" :key="role"><strong>Accès :</strong> <i>{{role}}</i></p>
            </div>
        </section>
    </div>
</template>


<script>
export default {
    name: 'Profile',
    computed: {
        currentUser() {  // stating if the user is logged in
            return this.$store.state.auth.user;
        },
        currentAdmin() {  // stating if the user got an admin role
        if (this.currentUser && this.currentUser['roles']) {
            return this.currentUser['roles'].includes('ROLE_ADMIN');
        }
        return false;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
