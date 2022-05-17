<template>
  <header class="header__wrapper">
    <div class="header__wrapper__col">
      <router-link v-if="auth" to="/">
        <img src="/Groupomania_Logos/icon-left-font.jpeg" />
      </router-link>
      <router-link v-if="!auth"
                   @click="logOut"
                   to="/login">Deconnexion</router-link>
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
      this.$router.push('/login')
    }
  }
}
</script>
<style >
</style>