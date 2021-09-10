<!-- Homepage template calling "Welcome" componen -->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon/icon-above-font.png" />
    <div class="home__welcome">
      <Welcome msg="Bienvenue sur Groupomania" />
    </div>    
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue"

export default {
  name: 'Home',
  components: {
    Welcome
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 240px;
  object-fit: cover;
  width: 100%;

  @media screen and (min-width: 640px) {
    height: 360px;
    width: 75%;
  }

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  @media screen and (min-width: 1024px) {
    max-width: 800px;
  }
}

.home__welcome {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
}
</style>
