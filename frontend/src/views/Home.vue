<template>
  <h1>Bienvenue sur la home</h1>
  <h2>Bonjour </h2>
  <section id="create-post">
    <div class="form_wrapper">
      <div class="form_wrapper_background">
        <form class="connection_form"
              @submit.prevent="sendPost">
          <div id="textarea"
               class="form_wrapper__field text_field">
            <label for="text">Rédigez un post</label>
            <input type="text"
                   name="text"
                   id="text"
                   placeholder="À quoi pensez vous ?"
                   :v-model="content"
                   required />
          </div>
          <div id="textarea">
            <label for="file">Ajoutez une image</label>
            <input type="file"
                   name="file"
                   id="file"
                   :v-model="imageUrl" />
          </div>
          <div class="form_wrapper__button submit__button">
            <input type="submit"
                   id="submit"
                   value="Envoyer !" />
          </div>
        </form>
      </div>
    </div>
  </section>
  <!-- <section class="posts"
           id="all-posts">
    <p v-if="!isPosts"
       id="no-post">There's no post for the moment !</p>
    <Post v-else
          class="single-post" />
  </section> -->
</template>

<script>
import Post from '../components/Post.vue'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      email: '',
      password: '',
      content: '',
      imageUrl: ''
    }
  },
  components: {
    Post
  },
  methods: {
    async sendPost() {
      await axios.post('posts',
        {
          content: this.content,
          imageUrl: this.imageUrl
        })
      this.$router.push('/')
    }
  },
  // mounted:
  //   async function getAllPosts() {
  //     await axios.get('posts')
  //   }
}
</script>