<template>
  <header class="header__wrapper">
    <router-link to="/">
      <img src="/Groupomania_Logos/icon-left-font.jpeg"
           alt="accueil" />
    </router-link>
    <div id="user-controls"
         v-show="auth">
      <router-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 200 250" role="img">
             <title>Retour à l'accueil</title>
          <path
                d="M99.81 199.81A99.83 99.83 0 0 0 200 99.62 99.83 99.83 0 0 0 99.81-.57 99.85 99.85 0 0 0-.38 99.62 99.85 99.85 0 0 0 99.81 199.81Zm5.75-17a46 46 0 0 1-5.75.24c-2.63 0-5.27-.24-7.91-.48A145.51 145.51 0 0 1 73 139.65h42.42a20.76 20.76 0 0 0 7.19 9.1 145.72 145.72 0 0 1-17.05 34.04Zm22.77-4.81a150.27 150.27 0 0 0 11-25.65 20.83 20.83 0 0 0 15.1-12.7h18.46A85.52 85.52 0 0 1 128.33 178ZM183 99.62a92.19 92.19 0 0 1-3.11 23H154a21.89 21.89 0 0 0-6.71-8.15q.72-7.91.72-15.82a167.35 167.35 0 0 0-1.44-22h33.08A73.45 73.45 0 0 1 183 99.62Zm-10.06-40h-29.27A161.27 161.27 0 0 0 129.77 22a84.88 84.88 0 0 1 43.15 37.59Zm-41.73 39.04c0 4.08-.24 8.15-.48 12.22a20.77 20.77 0 0 0-14.86 11.75H69.61a166.82 166.82 0 0 1-1.68-21.81 130.07 130.07 0 0 1 .72-13.66A21.64 21.64 0 0 0 83 76.61h46.74a167.35 167.35 0 0 1 1.44 22Zm-37.63-82a56.18 56.18 0 0 1 6.23-.24 71.87 71.87 0 0 1 7.19.24 145.8 145.8 0 0 1 18.94 42.9H84.23a22.86 22.86 0 0 0-7.43-10.3 155.48 155.48 0 0 1 16.78-32.6Zm-22.77 4.82a178.5 178.5 0 0 0-10.55 24 21.22 21.22 0 0 0-15.82 13.9H27a84.25 84.25 0 0 1 43.81-37.9ZM16.64 99.62a80.83 80.83 0 0 1 3.36-23h26.12a23.81 23.81 0 0 0 6 7c-.47 5.75-1 11.51-1 17.26a165.42 165.42 0 0 0 1.43 21.81H20a74.2 74.2 0 0 1-3.36-23.07Zm38.83 39.79A165.83 165.83 0 0 0 69.37 177a84 84 0 0 1-42.66-37.63Z" />
        </svg>
      </router-link>
      <router-link to="/profile"><i class="bi bi-person"></i></router-link>
      <router-link @click="logOut"
                   to="/login"><i class="bi bi-power"></i>
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
      localStorage.removeItem('isAdmin')
      this.$router.push('/login')
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