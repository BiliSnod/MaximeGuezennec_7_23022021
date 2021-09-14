<!-- Homepage template calling "Welcome" component -->
<template>
      <div class="home">
            <img src="../assets/icon/icon-above-font.png" class="logo-main" alt="Groupomania logo" />
            <div class="default-block">
                <Welcome msg="Bienvenue sur Groupomania" />
            </div>    
      </div>
</template>


<script>
import Welcome from "@/components/Welcome.vue"  // @ is an alias to /src

export default {
    name: "Home",
    components: {
        Welcome
    }
}
</script>


<style lang="scss" scoped>
.logo-main {
    height: 240px;
    object-fit: cover;
    width: 100%;

    @media screen and (min-width: 540px) {
        height: 320px;
    }

    @media screen and (min-width: 768px) {
        width: 80%;
    }

    @media screen and (min-width: 1024px) {
        max-width: 800px;
    }
}
</style>
