<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      auth: null
    }
  },
  mounted:
    function getAuth() {
  console.log(localStorage.getItem('token') === null);
  localStorage.getItem('token') == null ? { auth: null } : { auth: true }
}
  
}
</script>