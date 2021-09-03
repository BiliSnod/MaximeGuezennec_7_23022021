<!-- "Welcome" component with "msg" variable defined in Home.vue -->
<template>
  <div class="welcome">
    <h1>{{ msg }}</h1>
    <p>Rejoignez le <strong>réseau social</strong> interne de <em>Groupomania</em> pour échanger entre collègues.</p>
    <p><a href="/signup">Inscrivez-vous</a> dès maintenant pour rejoindre la discussion !</p>
  </div>
</template>

<!-- Definining the type of data for "msg" -->
<script>
export default {
  name: 'Welcome',
  props: {
    msg: String
  }
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-size: 1.8em;
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
</style>
