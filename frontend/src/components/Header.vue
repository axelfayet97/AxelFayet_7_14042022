<template>
  <header class="header__wrapper">
    <router-link to="/">
      <img src="/Groupomania_Logos/icon-left-font.jpeg"
           alt="accueil" />
    </router-link>
    <div id="user-controls"
         v-if="auth">
      <router-link to="/profile"><img src="../../public/noun-user-4584119.svg"
             class="pictos-header"
             alt="profil" /></router-link>
      <router-link @click="logOut"
                   to="/login"><img src="../../public/noun-power-714772.svg"
             class="pictos-header"
             alt="Déconnexion" />
      </router-link>

    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      auth: null
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.go('/login')
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.auth = true
    } else { this.auth = false }
  }
}
</script>
<style >
</style>