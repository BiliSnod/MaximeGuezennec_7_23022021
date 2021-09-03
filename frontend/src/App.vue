<template>
  <nav id="nav">
    <router-link to="/">Accueil</router-link>
    <router-link to="/signup">Inscription</router-link>
    <router-link to="/login">Connexion</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #312c50;
}

#nav {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 30px;

  @media screen and (min-width: 640px) {
    justify-content: flex-end;
  }

  a {
    background-color: #fcfcfc;
    border: 3px solid #eee;
    border-radius: 15px;
    color: #312c50;
    font-weight: bold;
    margin: 5px;
    min-width: 100px;
    padding: 10px;
    text-decoration: none;
    transition: all 200ms ease-out;

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
