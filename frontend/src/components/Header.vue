<template>
  <header class="header__wrapper">
    <router-link to="/">
      <img src="/Groupomania_Logos/icon-left-font.jpeg" />
    </router-link>
    <div id="user-controls">
      <router-link to="/profile">Mon profil</router-link>
      <router-link v-if="!auth"
                   @click="logOut"
                   to="/login">Deconnexion
      </router-link>

    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  props: ['auth'],
  data() {
    return {}
  },
  methods: {
    logOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
    }
  }
}
</script>
<style >
</style>