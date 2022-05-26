<template>
  <div id="alert-message">{{ alertMessage }}</div>
  <h1>Bienvenue sur <span class="span-h">Groupomania</span> {{ firstName }} {{ lastName }} !</h1>
  <section id="create-post">
    <div class="form_wrapper">
      <div class="form_wrapper_background">
        <NewPost />
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
import NewPost from '@/components/NewPost.vue'

export default {
  name: 'Home',
  components: {
    Post,
    NewPost
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      userId: '',
      alertMessage: ''
    }
  },
  created() {
    const userId = localStorage.getItem('userId')
    this.userId = userId
    fetch(`http://localhost:3000/api/auth/${this.userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(promise => {
        return promise.json()
      }).then(response => {
        this.firstName = response.firstName
        this.lastName = response.lastName
      })
      .catch(error => {
        document.getElementById('alert-message').classList.add('error-message')
        console.log(error);
        return this.alertMessage = 'Une erreur s\'est produite ' + error
      })
  }
}
</script>