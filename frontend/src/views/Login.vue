<!-- Log in template -->
<template>
  <div class="login">
    <img alt="Vue logo side" src="../assets/icon/icon-left-font.png" />
    <h1>Connectez-vous</h1>
  </div>
</template>

<style lang="scss" scoped>
img {
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
</style>
