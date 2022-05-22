<template>
  <h1>Bienvenue sur <span class="span-h">Groupomania</span> {{ firstName }} {{ lastName }} !</h1>
  <section id="create-post">
    <div class="form_wrapper">
      <div class="form_wrapper_background">
        <h2>Partagez vos humeurs !</h2>
        <PostForm />
      </div>
    </div>
  </section>
  <section class="posts"
           id="all-posts">
    <Post />
  </section>
</template>

<script>
import Post from '@/components/Post.vue'
import PostForm from '@/components/PostForm.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Post,
    PostForm
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      userId: '',
    }
  },
  async created() {
    const userId = localStorage.getItem('userId')
    this.userId = userId
    const response = await axios.get(`auth/${this.userId}`)
    this.firstName = response.data.firstName
    this.lastName = response.data.lastName
  }
}
</script>