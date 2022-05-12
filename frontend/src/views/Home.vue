<template>
  <h1>Bienvenue sur la home</h1>
  <h2 v-if="user">Bonjour {{ user.firstName }} {{ user.lastName }}</h2>
  <section id="create-post">
    <div class="form_wrapper">
      <div class="form_wrapper_background">
        <form class="connection_form">
          <div id="textarea"
               class="form_wrapper__field text_field">
            <label for="text">Rédigez un post</label>
            <input type="text"
                   name="text"
                   id="text"
                   placeholder="À quoi pensez vous ?">
          </div>
          <div id="textarea">
            <label for="file">Ajoutez une image</label>
            <input type="file"
                   name="file"
                   id="file"
                   placeholder="" />
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
  <section @load="posts"
           class="posts"
           id="all-posts">
    <p v-if="!isPosts"
       id="no-post">There's no post for the moment !</p>
    <Post v-if="isPosts"
          class="single-post" />
  </section>
</template>

<script>
import Post from "../components/Post.vue"
import axios from "axios"

export default {
  name: 'Home',
  async created() {
    const response = await axios.get('posts')
    this.user = response.data
  },
  components: {
    Post
  },
  methods: {

  },
  data() {
    return {
      user: null
    }
  }
}
</script>